import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs";
import { createWorker } from "https://cdn.jsdelivr.net/npm/tesseract.js@5/+esm";
import { jsPDF } from "https://cdn.jsdelivr.net/npm/jspdf@2.5.2/+esm";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";

const $ = s => document.querySelector(s);
let file = null, articles = [], sourcePages = 0, currentOCRPage = 1;

$("#pdfInput").addEventListener("change", e => pick(e.target.files[0]));
$("#processBtn").addEventListener("click", processPDF);
$("#newBtn").onclick = () => location.reload();
$("#downloadBtn").onclick = makePDF;

["dragenter", "dragover"].forEach(x => $("#drop").addEventListener(x, e => {
  e.preventDefault();
  $("#drop").classList.add("drag");
}));
["dragleave", "drop"].forEach(x => $("#drop").addEventListener(x, e => {
  e.preventDefault();
  $("#drop").classList.remove("drag");
}));
$("#drop").addEventListener("drop", e => pick(e.dataTransfer.files[0]));

function pick(f) {
  if (!f || f.type !== "application/pdf") {
    alert("Please choose a PDF file.");
    return;
  }
  file = f;
  $("#fileName").textContent =
    `${f.name} · ${(f.size / 1024 / 1024).toFixed(1)} MB`;
  $("#processBtn").disabled = false;
}

async function processPDF() {
  $("#processBtn").disabled = true;
  $("#progress").classList.remove("hidden");

  let worker = null;

  try {
    setProgress(2, "Opening PDF…");
    const data = new Uint8Array(await file.arrayBuffer());
    const pdf = await pdfjsLib.getDocument({ data }).promise;
    sourcePages = pdf.numPages;

    // Newspaper PDFs frequently have an incomplete or unusable text layer.
    // Always render the pages and OCR them so scanned PDFs actually work.
    worker = await createWorker("eng", 1, {
      logger: m => {
        if (m.status === "recognizing text" && typeof m.progress === "number") {
          const completed = (currentOCRPage - 1 + m.progress) / sourcePages;
          setProgress(
            Math.min(90, Math.round(5 + completed * 85)),
            `OCR: reading page ${currentOCRPage} of ${sourcePages}…`
          );
        }
      }
    });

    const pages = [];

    for (let n = 1; n <= pdf.numPages; n++) {
      currentOCRPage = n;

      const page = await pdf.getPage(n);
      const viewport = page.getViewport({ scale: 2.25 });

      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);

      const ctx = canvas.getContext("2d", {
        alpha: false,
        willReadFrequently: true
      });

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      setProgress(
        5 + Math.round(((n - 1) / pdf.numPages) * 85),
        `Rendering page ${n} of ${sourcePages}…`
      );

      await page.render({
        canvasContext: ctx,
        viewport
      }).promise;

      const result = await worker.recognize(canvas);

      const words = (result.data.words || [])
        .filter(w => (w.text || "").trim());

      pages.push({
        n,
        items: words.map(w => ({
          text: w.text.trim(),
          x: w.bbox.x0,
          y: canvas.height - w.bbox.y1,
          size: Math.max(8, w.bbox.y1 - w.bbox.y0),
          confidence: w.confidence
        }))
      });

      canvas.width = 1;
      canvas.height = 1;
      await new Promise(requestAnimationFrame);
    }

    setProgress(92, "Identifying headlines and broad topics…");
    articles = buildArticles(pages);

    if (!articles.length) {
      throw new Error(
        "OCR completed, but no article blocks could be detected. Try a clearer newspaper scan."
      );
    }

    setProgress(97, "Building readable edition…");
    render();
    setProgress(100, `Ready · ${articles.length} articles detected`);

    setTimeout(() => {
      $("#hero").classList.add("hidden");
      $("#result").classList.remove("hidden");
      scrollTo(0, 0);
    }, 250);

  } catch (err) {
    console.error(err);
    alert(`Could not process this PDF.\n\n${err?.message || err}`);
    $("#processBtn").disabled = false;
  } finally {
    if (worker) {
      try {
        await worker.terminate();
      } catch (_) {}
    }
  }
}

function buildArticles(pages) {
  let out = [], id = 0;

  for (const p of pages) {
    const lines = [];

    [...p.items]
      .sort((a, b) => b.y - a.y || a.x - b.x)
      .forEach(w => {
        let line = lines.find(
          z => Math.abs(z.y - w.y) < Math.max(5, w.size * 0.4)
        );

        if (!line) {
          line = { y: w.y, words: [] };
          lines.push(line);
        }

        line.words.push(w);
      });

    lines.sort((a, b) => b.y - a.y);
    lines.forEach(l => l.words.sort((a, b) => a.x - b.x));

    const median = medianSize(lines);
    const starts = [];

    lines.forEach((l, i) => {
      const text = l.words.map(w => w.text).join(" ").trim();
      const max = Math.max(...l.words.map(w => w.size), 0);

      const likely =
        max >= Math.max(18, median * 1.45) &&
        text.length >= 12 &&
        text.length <= 220;

      if (likely) starts.push(i);
    });

    const ss = starts.length ? starts : [0];

    ss.slice(0, 35).forEach((s, k) => {
      const e = ss[k + 1] ?? lines.length;

      const title = lines[s].words
        .map(w => w.text)
        .join(" ")
        .trim();

      const block = lines
        .slice(s, e)
        .map(l => l.words.map(w => w.text).join(" "))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      const body = block.replace(title, "").trim();

      if (
        title.length >= 12 &&
        body.length >= 70 &&
        !looksLikeGarbage(title)
      ) {
        out.push({
          id: `a${++id}`,
          title,
          body,
          page: p.n,
          topic: topic(title)
        });
      }
    });
  }

  return dedupe(out);
}

function looksLikeGarbage(s) {
  const letters = (s.match(/[A-Za-z]/g) || []).length;
  const weird = (s.match(/[^A-Za-z0-9\s.,'’!?&:;()\-]/g) || []).length;
  return letters < 5 || weird > s.length * 0.18;
}

function medianSize(lines) {
  const a = lines
    .flatMap(l => l.words.map(w => w.size))
    .filter(Boolean)
    .sort((x, y) => x - y);

  if (!a.length) return 10;
  return a[Math.floor(a.length / 2)];
}

function topic(t) {
  const s = t.toLowerCase();

  if (/sport|cricket|football|tennis|olympic|match|player|league|ipl|wicket|goal/.test(s))
    return "Sports";

  if (/business|market|stock|economy|rupee|bank|company|trade|industry|finance|tax/.test(s))
    return "Business";

  if (/world|us |u\.s|china|russia|ukraine|iran|israel|gaza|europe|trump|pakistan|global/.test(s))
    return "World";

  if (/tech|ai |artificial intelligence|google|apple|microsoft|cyber|software|internet|digital/.test(s))
    return "Technology";

  if (/culture|film|movie|music|book|art|theatre|cinema|entertainment/.test(s))
    return "Culture";

  if (/science|space|research|climate|environment|health|medical|doctor|disease/.test(s))
    return "Science & Life";

  return "National";
}

function dedupe(a) {
  const s = new Set();

  return a.filter(x => {
    const k = x.title
      .toLowerCase()
      .replace(/\W/g, "")
      .slice(0, 100);

    if (s.has(k)) return false;
    s.add(k);
    return true;
  });
}

function render() {
  const g = {};
  articles.forEach(a => (g[a.topic] ??= []).push(a));

  $("#resultTitle").textContent = file.name.replace(/\.pdf$/i, "");
  $("#resultMeta").textContent =
    `${articles.length} articles detected · ${sourcePages} source pages · OCR processed locally`;

  const toc = $("#toc");
  const pre = $("#preview");

  toc.innerHTML = "";

  pre.innerHTML = `
    <h2 class="paperTitle">${esc(file.name.replace(/\.pdf$/i, ""))}</h2>
    <div class="paperMeta">
      Readable edition · OCR processed locally in your browser
    </div>
  `;

  Object.entries(g).forEach(([t, arr]) => {
    const st = document.createElement("div");
    st.className = "sectionTitle";
    st.textContent = t;
    pre.appendChild(st);

    arr.forEach(a => {
      const l = document.createElement("a");
      l.className = "tocItem";
      l.href = "#" + a.id;
      l.innerHTML =
        `<small>${esc(t)} · p.${a.page}</small>${esc(a.title)}`;
      toc.appendChild(l);

      const sec = document.createElement("section");
      sec.className = "article";
      sec.id = a.id;

      sec.innerHTML = `
        <div class="articleMeta">${esc(t)} · Original page ${a.page}</div>
        <h3>${esc(a.title)}</h3>
        ${paras(a.body).map(p => `<p>${esc(p)}</p>`).join("")}
      `;

      pre.appendChild(sec);
    });
  });

  const note = document.createElement("div");
  note.className = "ocrNote";
  note.textContent =
    "OCR and PDF generation run locally in your browser. The source newspaper is never uploaded.";
  pre.appendChild(note);
}

function paras(s) {
  const o = [];
  let b = "";

  for (const w of s.split(/\s+/)) {
    b += (b ? " " : "") + w;

    if (b.length > 650) {
      o.push(b);
      b = "";
    }
  }

  if (b) o.push(b);
  return o;
}

function setProgress(n, t) {
  $("#progressBar").style.width = n + "%";
  $("#progressPct").textContent = n + "%";
  $("#progressText").textContent = t;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[m]));
}

async function makePDF() {
  if (!articles.length) return;

  const btn = $("#downloadBtn");
  const old = btn.textContent;

  btn.disabled = true;
  btn.textContent = "Generating…";

  try {
    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
      compress: true
    });

    const M = 48, W = 595, H = 842;
    let y = 55;

    const g = {};
    articles.forEach(a => (g[a.topic] ??= []).push(a));

    const toc = [];
    const dest = {};

    doc.setFont("times", "bold");
    doc.setFontSize(24);
    doc.text("CONTENTS", M, y);
    y += 35;

    for (const [t, arr] of Object.entries(g)) {
      doc.setFont("times", "bold");
      doc.setFontSize(11);
      doc.text(t.toUpperCase(), M, y);
      y += 17;

      for (const a of arr) {
        const ls = doc.splitTextToSize(
          a.title,
          W - M * 2 - 45
        );

        const h = Math.max(16, ls.length * 14);

        if (y + h > H - 45) {
          doc.addPage();
          y = 55;
        }

        doc.setFont("times", "normal");
        doc.setFontSize(11);
        doc.text(ls, M, y);
        doc.text("→", W - M - 18, y);

        toc.push({ a, y, h });
        y += h + 8;
      }
    }

    for (const [t, arr] of Object.entries(g)) {
      doc.addPage();
      y = 55;

      doc.setFont("times", "bold");
      doc.setFontSize(12);
      doc.text(t.toUpperCase(), M, y);
      y += 26;

      for (const a of arr) {
        if (y > H - 120) {
          doc.addPage();
          y = 55;
        }

        dest[a.id] = doc.internal.getNumberOfPages();

        doc.setFont("times", "bold");
        doc.setFontSize(25);

        const tl = doc.splitTextToSize(
          a.title,
          W - M * 2
        );

        doc.text(tl, M, y);
        y += tl.length * 27 + 8;

        doc.setFont("times", "normal");
        doc.setFontSize(11);

        for (const line of doc.splitTextToSize(
          a.body,
          W - M * 2
        )) {
          if (y > H - 55) {
            doc.addPage();
            y = 55;
          }

          doc.text(line, M, y);
          y += 15;
        }

        y += 20;
      }
    }

    // Make every headline in the contents page clickable.
    doc.setPage(1);

    toc.forEach(e => {
      if (dest[e.a.id]) {
        doc.link(
          M,
          e.y - 11,
          W - M * 2,
          e.h,
          { pageNumber: dest[e.a.id] }
        );
      }
    });

    // Blob + temporary anchor is more reliable than relying on jsPDF's
    // browser-specific save implementation.
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download =
      file.name.replace(/\.pdf$/i, "") +
      "_readable.pdf";

    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => URL.revokeObjectURL(url), 10000);

  } catch (err) {
    console.error(err);
    alert(`PDF generation failed.\n\n${err?.message || err}`);
  } finally {
    btn.disabled = false;
    btn.textContent = old;
  }
}
