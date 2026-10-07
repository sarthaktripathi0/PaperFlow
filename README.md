# Paperflow OCR

Same filenames as the previous version:
- index.html
- style.css
- app.js
- README.md

This version adds browser-side OCR with Tesseract.js.

Flow:
1. Try extracting embedded PDF text.
2. If the PDF has little/no selectable text, render each page with PDF.js.
3. Run Tesseract.js OCR on each rendered page.
4. Preserve OCR word bounding boxes.
5. Reconstruct lines and detect likely headlines from relative text size.
6. Group headlines into broad topics.
7. Generate a readable A4 PDF with a clickable contents page.

OCR runs locally in the browser. The current version does not send the source PDF to a server.

Important limitation: newspaper article segmentation is still heuristic. The next accuracy upgrade is to send the extracted block structure to Groq for semantic article grouping, while keeping the original text from OCR.
