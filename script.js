// ---------------------------------------------------------------
// Destination data, grouped by starting city.
// Costs are per person, in INR, built from four line items:
// transport (round trip from the selected city), stay per night,
// food per day, and a flat activities/entry-fee allowance.
// Each destination also carries static review data used on the
// detail view — ratings, snippets and host info are illustrative,
// not live data.
// ---------------------------------------------------------------

const destinationsByCity = {

    vijayawada: [
        {
            id: "araku",
            name: "Araku Valley",
            region: "Visakhapatnam district — 5 hrs by road, or the Kirandul line",
            tags: ["nature", "food", "culture"],
            transport: 1100, stay: 1400, food: 500, activities: 600,
            minDays: 2, maxDays: 4,
            blurb: "Coffee estates cut into the Eastern Ghats, a tribal museum, and a train that climbs through 58 tunnels to get there.",
            highlightPool: [
                "Ride the Kirandul line through Borra Caves",
                "Walk the tribal museum's dioramas",
                "Taste single-estate coffee at a hillside plantation",
                "Hike down to Katiki waterfall before the afternoon crowd",
                "Browse the tribal haat if the weekend lines up",
                "Slow morning at the guesthouse — the valley is worth sitting still in"
            ],
            reviews: {
                rating: 4.7, count: 412, host: "Araku Valley Homestays", responseTime: "Usually responds within an hour", verified: true,
                snippets: [
                    "The train ride through the tunnels was worth the trip by itself.",
                    "Cooler than we expected in December — pack a light jacket."
                ]
            }
        },
        {
            id: "gandikota",
            name: "Gandikota",
            region: "Kadapa district — 4 hrs by road",
            tags: ["adventure", "nature"],
            transport: 900, stay: 1200, food: 450, activities: 500,
            minDays: 1, maxDays: 2,
            blurb: "A gorge on the Pennar deep enough that people call it the Grand Canyon of India, with a ruined fort along the rim.",
            highlightPool: [
                "Watch sunrise over the gorge from the fort ramparts",
                "Explore the Jama Masjid and Madhavaraya temple inside the fort",
                "Raft a calm stretch of the Pennar, season permitting",
                "Camp at the canyon edge under a clear sky"
            ],
            reviews: {
                rating: 4.5, count: 189, host: "Gandikota Eco Camps", responseTime: "Responds within 3 hours", verified: true,
                snippets: [
                    "The canyon view at sunrise is genuinely one of the best in the state.",
                    "Camping gear was basic but the location made up for it."
                ]
            }
        },
        {
            id: "lambasingi",
            name: "Lambasingi",
            region: "Visakhapatnam district — 6 hrs by road, often paired with Araku",
            tags: ["nature", "peaceful"],
            transport: 1300, stay: 1600, food: 500, activities: 300,
            minDays: 2, maxDays: 3,
            blurb: "A hill village cold enough in December to see frost on the coffee terraces — the closest Andhra gets to a mountain town.",
            highlightPool: [
                "Catch the pre-dawn mist over the coffee terraces",
                "Walk the apple orchards planted here as a 1990s experiment",
                "Short trek to the Thajangi reservoir viewpoint",
                "Sit by a bonfire once the temperature drops after sunset"
            ],
            reviews: {
                rating: 4.4, count: 156, host: "Lambasingi Farmstay Collective", responseTime: "Usually responds within 4 hours", verified: true,
                snippets: [
                    "Went in December specifically for the frost and it delivered.",
                    "Roads get narrow near the village, go slow after dark."
                ]
            }
        },
        {
            id: "papikondalu",
            name: "Papikondalu",
            region: "East Godavari — boat from Rajahmundry, 2.5 hrs from Vijayawada",
            tags: ["nature", "adventure"],
            transport: 1800, stay: 1500, food: 550, activities: 200,
            minDays: 1, maxDays: 2,
            blurb: "A full-day cruise through a river gorge on the Godavari, with a tribal-village lunch stop along the way.",
            highlightPool: [
                "Full-day cruise through the Papikondalu gorge",
                "Lunch stop at a Konda Reddi village on the riverbank",
                "Pass Kolluru's rubber plantations by boat",
                "Evening at a riverside eco-camp"
            ],
            reviews: {
                rating: 4.6, count: 301, host: "Godavari River Cruises", responseTime: "Responds within 2 hours", verified: true,
                snippets: [
                    "The gorge stretch after the tribal village stop is the best part of the cruise.",
                    "Bring sunscreen, there's very little shade on the boat deck."
                ]
            }
        },
        {
            id: "amaravati-undavalli",
            name: "Amaravati & Undavalli",
            region: "Guntur district — 30 to 45 minutes from Vijayawada",
            tags: ["culture", "peaceful"],
            transport: 300, stay: 900, food: 350, activities: 350,
            minDays: 1, maxDays: 2,
            blurb: "A close-in pairing of the 4th-century Undavalli caves and the Amaravati stupa site, easy to do without much travel time.",
            highlightPool: [
                "Explore the rock-cut Vishnu shrine at Undavalli",
                "Walk the Amaravati stupa complex and site museum",
                "Evening boat ride on the Krishna near the ghat",
                "Mirchi bajji from a roadside stall on the way back"
            ],
            reviews: {
                rating: 4.3, count: 97, host: "Amaravati Heritage Tours", responseTime: "Usually responds same day", verified: false,
                snippets: [
                    "Good half-day trip if you don't want to commit a whole weekend.",
                    "The cave carvings at Undavalli are more detailed than photos suggest."
                ]
            }
        },
        {
            id: "srisailam",
            name: "Srisailam",
            region: "Nallamala forest, Kurnool district — 4.5 hrs by road",
            tags: ["culture", "peaceful"],
            transport: 1000, stay: 1000, food: 400, activities: 400,
            minDays: 1, maxDays: 3,
            blurb: "A temple town wedged inside a tiger reserve, with a dam viewpoint that empties out well after the pilgrim crowds do.",
            highlightPool: [
                "Darshan at the Mallikarjuna Jyotirlinga temple",
                "Sunset at the Srisailam dam viewpoint",
                "Drive through the Nallamala buffer zone",
                "Short trek to the Akka Mahadevi caves"
            ],
            reviews: {
                rating: 4.5, count: 524, host: "Srisailam Devasthanam Stays", responseTime: "Responds within 6 hours", verified: true,
                snippets: [
                    "Go early to beat the temple crowd, the dam viewpoint is calm by comparison.",
                    "Ghat road has good views but plan for slow going in the forest stretch."
                ]
            }
        },
        {
            id: "rushikonda",
            name: "Rushikonda, Vizag",
            region: "Visakhapatnam — 4.5 hrs by road or an overnight train",
            tags: ["beaches", "adventure"],
            transport: 1400, stay: 1800, food: 600, activities: 700,
            minDays: 2, maxDays: 4,
            blurb: "The cleanest working beach on this stretch of coast, with a submarine museum and enough water sports to fill a spare afternoon.",
            highlightPool: [
                "Morning on Rushikonda beach before the day-trippers arrive",
                "Tour the INS Kursura submarine museum",
                "Parasailing or jet-skiing session at Rushikonda",
                "Sunset walk along the RK Beach promenade"
            ],
            reviews: {
                rating: 4.4, count: 268, host: "Vizag Beach Adventures", responseTime: "Responds within an hour", verified: true,
                snippets: [
                    "Cleanest beach we've seen on this coast, water sports desk was well organized.",
                    "Weekends get crowded by mid-morning, an early start helps."
                ]
            }
        },
        {
            id: "borra",
            name: "Borra Caves",
            region: "Ananthagiri hills — 4.5 hrs by road, en route to Araku",
            tags: ["nature", "adventure"],
            transport: 1100, stay: 1300, food: 450, activities: 400,
            minDays: 1, maxDays: 2,
            blurb: "Million-year-old limestone caverns you descend into on foot, with a coffee-estate trail nearby if you have a second day.",
            highlightPool: [
                "Descend into the limestone caverns",
                "Walk the Ananthagiri coffee estate trail",
                "Photograph the valley from the Tyda viewpoint",
                "Try bamboo chicken cooked roadside"
            ],
            reviews: {
                rating: 4.6, count: 213, host: "Ananthagiri Trails", responseTime: "Usually responds within 2 hours", verified: true,
                snippets: [
                    "The caves are cooler than expected, worth the steep steps down.",
                    "Pair it with the coffee estate walk if you have the extra hour."
                ]
            }
        },
        {
            id: "konaseema",
            name: "Konaseema backwaters",
            region: "East Godavari delta — 3 hrs by road",
            tags: ["peaceful", "nature"],
            transport: 1200, stay: 1700, food: 550, activities: 300,
            minDays: 2, maxDays: 3,
            blurb: "A houseboat through the Godavari delta's canals, past coconut groves and a mangrove patch near Yanam.",
            highlightPool: [
                "Overnight on a houseboat through the delta canals",
                "Visit a jaggery and coir-making unit in a delta village",
                "Row through the mangrove patch near Yanam",
                "Temple stop at Draksharamam on the way back"
            ],
            reviews: {
                rating: 4.5, count: 174, host: "Konaseema Houseboats", responseTime: "Responds within 3 hours", verified: true,
                snippets: [
                    "Slept better on the houseboat than I expected, very calm water.",
                    "Food on board was simple but fresh, mostly local fish."
                ]
            }
        },
        {
            id: "kondapalli",
            name: "Kondapalli Fort",
            region: "Krishna district — 25 minutes from Vijayawada",
            tags: ["culture"],
            transport: 200, stay: 0, food: 250, activities: 250,
            minDays: 1, maxDays: 1,
            blurb: "A hillside fort a short auto ride out of the city, best paired with a toy-making workshop on the way down.",
            highlightPool: [
                "Climb Kondapalli Fort for a Krishna valley view",
                "Watch a Kondapalli toy-making demonstration",
                "Back in the city by early evening"
            ],
            reviews: {
                rating: 4.1, count: 88, host: "Kondapalli Heritage Walks", responseTime: "Usually responds same day", verified: false,
                snippets: [
                    "Good quick trip if you're short on time, the toy workshop is a nice add-on.",
                    "Fort itself is compact, an hour or so is enough."
                ]
            }
        }
    ],

    hyderabad: [
        {
            id: "hyd-ramoji",
            name: "Ramoji Film City",
            region: "Abdullapurmet, Hyderabad outskirts — about 40 minutes from the city",
            tags: ["culture", "adventure", "food"],
            transport: 400, stay: 1200, food: 700, activities: 1500,
            minDays: 1, maxDays: 2,
            blurb: "A working film studio turned theme park, with backlot tours, stunt shows and enough rides to fill a full day even if you skip the movie-making bits.",
            highlightPool: [
                "Backlot tour past standing film sets",
                "Catch the stunt and action show",
                "Ride the park's roller coasters and water rides",
                "Evening light-and-sound show at the amphitheatre",
                "Studio tour of an active shooting set, schedule permitting"
            ],
            reviews: {
                rating: 4.5, count: 892, host: "Ramoji Film City Resorts", responseTime: "Responds within an hour", verified: true,
                snippets: [
                    "Plan for a full day, the property is bigger than it looks on the map.",
                    "Kids loved the stunt show more than the rides."
                ]
            }
        },
        {
            id: "hyd-bhongir",
            name: "Bhongir Fort",
            region: "Yadadri Bhuvanagiri district — about 1 hour from Hyderabad",
            tags: ["adventure", "culture"],
            transport: 300, stay: 0, food: 250, activities: 100,
            minDays: 1, maxDays: 1,
            blurb: "A single monolithic granite rock with a fort built into its slopes, best climbed early before the stone heats up.",
            highlightPool: [
                "Climb the rock-cut steps to the fort ramparts",
                "Loop around the base of the monolith",
                "Stop at Yadagirigutta temple on the way back"
            ],
            reviews: {
                rating: 4.3, count: 341, host: "Bhongir Local Guides", responseTime: "Usually responds within a few hours", verified: false,
                snippets: [
                    "Steep in parts but the climb is short, done in under two hours.",
                    "Go before 9am, there's no shade on the rock."
                ]
            }
        },
        {
            id: "hyd-warangal",
            name: "Warangal",
            region: "Warangal district — about 3 hours from Hyderabad",
            tags: ["culture", "peaceful"],
            transport: 900, stay: 1300, food: 450, activities: 400,
            minDays: 1, maxDays: 2,
            blurb: "The Kakatiya dynasty's old capital, with the carved Thousand Pillar Temple and the UNESCO-listed Ramappa Temple a short drive further out.",
            highlightPool: [
                "Explore the Thousand Pillar Temple's carvings",
                "Day trip to the Ramappa Temple and Ramappa lake",
                "Walk the ruins of Warangal Fort's stone gateways",
                "Boating at Bhadrakali lake"
            ],
            reviews: {
                rating: 4.6, count: 276, host: "Kakatiya Heritage Trails", responseTime: "Responds within 3 hours", verified: true,
                snippets: [
                    "Ramappa Temple's carvings are worth the extra drive out from Warangal town.",
                    "Fort ruins are spread out, a guide helps make sense of the layout."
                ]
            }
        },
        {
            id: "hyd-ananthagiri",
            name: "Ananthagiri Hills, Vikarabad",
            region: "Vikarabad district — about 1.5 hours from Hyderabad",
            tags: ["nature", "peaceful"],
            transport: 500, stay: 900, food: 350, activities: 200,
            minDays: 1, maxDays: 2,
            blurb: "Forested hills close enough for a day trip, with a small waterfall and a hilltop temple wrapped in coffee-adjacent greenery.",
            highlightPool: [
                "Walk the forest trail to Ananthagiri temple",
                "Short hike down to Thirumala Reservoir viewpoint",
                "Picnic stop along the Anantagiri hills ghat road",
                "Detour to Kotapally waterfalls if it's rained recently"
            ],
            reviews: {
                rating: 4.2, count: 128, host: "Vikarabad Nature Camps", responseTime: "Usually responds within 4 hours", verified: false,
                snippets: [
                    "Good short escape from the city, gets busy on Sunday mornings.",
                    "Waterfall depends heavily on recent rain, check before you go."
                ]
            }
        },
        {
            id: "hyd-nagarjunasagar",
            name: "Nagarjuna Sagar",
            region: "Nalgonda district — about 3.5 hours from Hyderabad",
            tags: ["culture", "nature"],
            transport: 1000, stay: 1400, food: 500, activities: 500,
            minDays: 1, maxDays: 2,
            blurb: "One of the world's tallest masonry dams, with a boat ride out to the Nagarjunakonda island museum of Buddhist relics.",
            highlightPool: [
                "Boat out to the Nagarjunakonda island museum",
                "View the dam from the Nagarjuna Sagar viewpoint",
                "Visit the Ethipothala waterfall nearby",
                "Walk the excavated Buddhist stupa remains on the island"
            ],
            reviews: {
                rating: 4.4, count: 203, host: "Nagarjuna Sagar Boat Tours", responseTime: "Responds within 2 hours", verified: true,
                snippets: [
                    "Island museum is small but the boat ride there is the highlight.",
                    "Check boat timings in advance, they don't run late in the day."
                ]
            }
        },
        {
            id: "hyd-kuntala",
            name: "Kuntala Waterfalls",
            region: "Nirmal district — about 4.5 hours from Hyderabad",
            tags: ["nature", "adventure"],
            transport: 1400, stay: 1100, food: 400, activities: 200,
            minDays: 1, maxDays: 2,
            blurb: "Telangana's tallest waterfall, a two-tier drop through forest that's at its fullest right after the monsoon.",
            highlightPool: [
                "View the falls from the upper and lower viewpoints",
                "Short forest trail down to the base of the falls",
                "Stop at Pochera waterfall on the same route",
                "Photograph the drop from the suspension bridge"
            ],
            reviews: {
                rating: 4.5, count: 142, host: "Nirmal Forest Trails", responseTime: "Usually responds within a few hours", verified: false,
                snippets: [
                    "Best right after monsoon, thin trickle otherwise.",
                    "Path down to the base gets slippery, decent shoes help."
                ]
            }
        }
    ],

    mumbai: [
        {
            id: "mum-lonavala",
            name: "Lonavala",
            region: "Sahyadri hills, Pune district — about 2 hours from Mumbai",
            tags: ["nature", "peaceful"],
            transport: 600, stay: 1500, food: 500, activities: 400,
            minDays: 1, maxDays: 2,
            blurb: "The Mumbai-Pune corridor's default hill escape, thick with monsoon waterfalls, old forts and roadside chikki stalls.",
            highlightPool: [
                "Waterfall stop at Bhushi Dam, monsoon season only",
                "Climb up to Lohagad or Rajmachi fort",
                "Viewpoint at Tiger's Leap for the valley drop",
                "Chikki tasting along the main market street",
                "Karla and Bhaja caves detour"
            ],
            reviews: {
                rating: 4.3, count: 967, host: "Lonavala Hill Stays", responseTime: "Responds within an hour", verified: true,
                snippets: [
                    "Gets extremely crowded on monsoon weekends, go on a weekday if you can.",
                    "Fort climb is a nice half-day add if you want more than the viewpoints."
                ]
            }
        },
        {
            id: "mum-alibaug",
            name: "Alibaug",
            region: "Raigad district — ferry or 2.5 hrs by road from Mumbai",
            tags: ["beaches", "peaceful"],
            transport: 700, stay: 1800, food: 600, activities: 400,
            minDays: 1, maxDays: 2,
            blurb: "A quieter beach town across the harbour, known for its black-sand beaches and an old sea fort you can walk to at low tide.",
            highlightPool: [
                "Ferry across the harbour from Gateway of India",
                "Walk out to Kolaba Fort at low tide",
                "Cycle along Alibaug's beach road",
                "Sunset at Nagaon or Kihim beach"
            ],
            reviews: {
                rating: 4.4, count: 512, host: "Alibaug Beach Homes", responseTime: "Responds within 2 hours", verified: true,
                snippets: [
                    "Fort walk only works at low tide, check the timing before you plan the day.",
                    "Nagaon beach is much cleaner than the main Alibaug stretch."
                ]
            }
        },
        {
            id: "mum-matheran",
            name: "Matheran",
            region: "Raigad district — about 2.5 hours from Mumbai, plus the toy train",
            tags: ["nature", "peaceful"],
            transport: 800, stay: 1600, food: 500, activities: 300,
            minDays: 1, maxDays: 2,
            blurb: "A vehicle-free hill station reached by a narrow-gauge toy train, with red-mud trails and viewpoints you get to on foot or horseback.",
            highlightPool: [
                "Ride the narrow-gauge toy train up from Neral",
                "Walk out to Panorama Point and Louisa Point",
                "Horse ride along the red-mud trails",
                "Sunset at Charlotte Lake"
            ],
            reviews: {
                rating: 4.5, count: 634, host: "Matheran Hill Resorts", responseTime: "Usually responds within a few hours", verified: true,
                snippets: [
                    "No vehicles anywhere in town, it's a genuinely quiet couple of days.",
                    "Toy train gets cancelled in heavy rain, have a backup road plan."
                ]
            }
        },
        {
            id: "mum-kashid",
            name: "Kashid Beach",
            region: "Raigad district — about 3 hours from Mumbai",
            tags: ["beaches", "peaceful"],
            transport: 900, stay: 1400, food: 500, activities: 300,
            minDays: 1, maxDays: 2,
            blurb: "A quieter white-sand beach past Alibaug's crowds, backed by casuarina trees and a couple of forts worth the detour.",
            highlightPool: [
                "Morning swim before the beach fills up",
                "Detour to Murud-Janjira sea fort",
                "Walk the casuarina groves behind the beach",
                "Stop at Phansad wildlife sanctuary nearby"
            ],
            reviews: {
                rating: 4.4, count: 287, host: "Kashid Coastal Stays", responseTime: "Responds within 3 hours", verified: false,
                snippets: [
                    "Much quieter than Alibaug proper, worth the extra hour of driving.",
                    "Janjira fort boat crossing is short but often has a queue."
                ]
            }
        },
        {
            id: "mum-nashik",
            name: "Nashik wine country",
            region: "Nashik district — about 4 hours from Mumbai",
            tags: ["food", "culture"],
            transport: 1200, stay: 1700, food: 600, activities: 600,
            minDays: 2, maxDays: 3,
            blurb: "India's biggest wine region, with vineyard tours and tastings a short drive from the Trimbakeshwar temple town.",
            highlightPool: [
                "Vineyard tour and tasting at a Nashik winery",
                "Temple visit at Trimbakeshwar",
                "Walk the ghats along the Godavari in Panchavati",
                "Grape-harvest season visit if the timing lines up"
            ],
            reviews: {
                rating: 4.6, count: 445, host: "Nashik Vineyard Tours", responseTime: "Responds within 2 hours", verified: true,
                snippets: [
                    "Book the tasting slot ahead on weekends, it fills up fast.",
                    "Combine with Trimbakeshwar for a good mix of temple and vineyard time."
                ]
            }
        },
        {
            id: "mum-mahabaleshwar",
            name: "Mahabaleshwar",
            region: "Satara district — about 5 hours from Mumbai",
            tags: ["nature", "peaceful"],
            transport: 1500, stay: 1800, food: 550, activities: 400,
            minDays: 2, maxDays: 3,
            blurb: "A colonial-era hill station known for strawberry farms and a string of viewpoints overlooking the Western Ghats.",
            highlightPool: [
                "Strawberry picking at a local farm, season permitting",
                "Viewpoint hop: Arthur's Seat, Elephant's Head, Kate's Point",
                "Boating at Venna Lake",
                "Short drive to Panchgani's Table Land"
            ],
            reviews: {
                rating: 4.5, count: 578, host: "Mahabaleshwar Hill Homes", responseTime: "Usually responds within a few hours", verified: true,
                snippets: [
                    "Strawberries are only really fresh Feb to April, plan around it.",
                    "Viewpoints are spread out, budget a full day of driving between them."
                ]
            }
        }
    ],

    delhi: [
        {
            id: "del-rishikesh",
            name: "Rishikesh",
            region: "Uttarakhand — about 5.5 hours from Delhi",
            tags: ["adventure", "peaceful"],
            transport: 1200, stay: 1300, food: 500, activities: 900,
            minDays: 2, maxDays: 3,
            blurb: "The Ganga's foothill town, split between whitewater rafting by day and riverside aarti ceremonies at dusk.",
            highlightPool: [
                "Whitewater rafting on the Ganga",
                "Evening Ganga aarti at Triveni Ghat",
                "Walk across Laxman Jhula and Ram Jhula",
                "Short trek to Neer Garh waterfall",
                "Optional bungee jump at the outskirts jump park"
            ],
            reviews: {
                rating: 4.6, count: 721, host: "Rishikesh River Rafting Co.", responseTime: "Responds within an hour", verified: true,
                snippets: [
                    "Rafting grade depends heavily on season, ask before booking.",
                    "Aarti at Triveni Ghat in the evening is worth timing your day around."
                ]
            }
        },
        {
            id: "del-neemrana",
            name: "Neemrana",
            region: "Alwar district, Rajasthan — about 2.5 hours from Delhi",
            tags: ["culture", "peaceful"],
            transport: 700, stay: 2200, food: 600, activities: 300,
            minDays: 1, maxDays: 2,
            blurb: "A 15th-century fort-palace turned heritage hotel, terraced down a hillside with a zipline strung across the valley.",
            highlightPool: [
                "Wander the terraced courtyards of the fort-palace",
                "Zipline across the valley below the fort",
                "Sunset from the palace's highest terrace",
                "Short drive to Sariska Tiger Reserve if extending the trip"
            ],
            reviews: {
                rating: 4.5, count: 389, host: "Neemrana Fort Palace", responseTime: "Responds within 2 hours", verified: true,
                snippets: [
                    "The zipline is a genuine highlight, not just a gimmick add-on.",
                    "Rooms vary a lot in size since it's a converted fort, ask before booking."
                ]
            }
        },
        {
            id: "del-agra",
            name: "Agra",
            region: "Uttar Pradesh — about 3.5 hours from Delhi",
            tags: ["culture"],
            transport: 900, stay: 1400, food: 450, activities: 1100,
            minDays: 1, maxDays: 2,
            blurb: "The Taj Mahal at sunrise, paired with Agra Fort and the sandstone ghost city of Fatehpur Sikri if you have a second day.",
            highlightPool: [
                "Sunrise visit to the Taj Mahal before the crowds",
                "Walk the ramparts of Agra Fort",
                "Day trip to Fatehpur Sikri's abandoned Mughal city",
                "Evening at Mehtab Bagh for the Taj's river-side view"
            ],
            reviews: {
                rating: 4.7, count: 1284, host: "Agra Heritage Tours", responseTime: "Responds within an hour", verified: true,
                snippets: [
                    "Sunrise slot is worth the early wake-up, far fewer people than midday.",
                    "Fatehpur Sikri is a solid half-day add if you're not rushing back."
                ]
            }
        },
        {
            id: "del-mussoorie",
            name: "Mussoorie",
            region: "Uttarakhand — about 6.5 hours from Delhi",
            tags: ["nature", "peaceful"],
            transport: 1500, stay: 1600, food: 500, activities: 400,
            minDays: 2, maxDays: 3,
            blurb: "A ridge-top hill station with a mall road view over the Doon valley, and a cable car up to Gun Hill for a wider one.",
            highlightPool: [
                "Cable car up to Gun Hill for valley views",
                "Walk the length of Mall Road",
                "Short trek to Kempty Falls",
                "Sunset at Lal Tibba, the highest point in town"
            ],
            reviews: {
                rating: 4.3, count: 456, host: "Mussoorie Ridge Stays", responseTime: "Usually responds within a few hours", verified: false,
                snippets: [
                    "Mall Road gets packed on weekends, Lal Tibba is a quieter escape.",
                    "Long drive up, factor in extra time on the ghat road."
                ]
            }
        },
        {
            id: "del-nainital",
            name: "Nainital",
            region: "Uttarakhand — about 7 hours from Delhi",
            tags: ["nature", "peaceful"],
            transport: 1700, stay: 1700, food: 550, activities: 400,
            minDays: 2, maxDays: 4,
            blurb: "A lake town wrapped around Naini Lake, with a ropeway up to Snow View and quieter twin lakes a short drive further out.",
            highlightPool: [
                "Boating on Naini Lake",
                "Ropeway up to Snow View for a Himalayan skyline",
                "Drive out to the quieter Bhimtal and Sattal lakes",
                "Walk the Mall Road loop around the lake"
            ],
            reviews: {
                rating: 4.4, count: 612, host: "Nainital Lake Resorts", responseTime: "Responds within 3 hours", verified: true,
                snippets: [
                    "Snow View ropeway only pays off on a clear day, check the forecast.",
                    "Bhimtal is much calmer than Nainital itself if you need a break from crowds."
                ]
            }
        },
        {
            id: "del-chandigarh",
            name: "Chandigarh",
            region: "Punjab/Haryana border — about 4 hours from Delhi",
            tags: ["culture", "peaceful"],
            transport: 1000, stay: 1300, food: 500, activities: 350,
            minDays: 1, maxDays: 2,
            blurb: "A planned city built around Le Corbusier's grid, with a sprawling Rock Garden built entirely from industrial scrap.",
            highlightPool: [
                "Walk the winding passages of the Rock Garden",
                "Boating at Sukhna Lake",
                "Visit the Capitol Complex's Le Corbusier architecture",
                "Evening at the Sukhna Lake promenade"
            ],
            reviews: {
                rating: 4.5, count: 398, host: "Chandigarh City Tours", responseTime: "Responds within 2 hours", verified: true,
                snippets: [
                    "Rock Garden is far bigger and stranger than photos suggest, budget two hours.",
                    "Capitol Complex needs advance permission to enter certain buildings, check ahead."
                ]
            }
        }
    ]
};

const cityLabels = {
    vijayawada: "Vijayawada",
    hyderabad: "Hyderabad",
    mumbai: "Mumbai",
    delhi: "Delhi"
};

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------

const state = {
    city: "vijayawada",
    budget: 5000,
    duration: 2,
    travelers: 2,
    interests: new Set(["nature", "food"])
};

let currentMatches = [];
let openItineraryId = null;

function currentDestinations() {
    return destinationsByCity[state.city];
}

// ---------------------------------------------------------------
// Cost + scoring
// ---------------------------------------------------------------

function costFor(dest, duration, travelers) {
    const nights = Math.max(duration - 1, 0);
    const stayRate = travelers >= 3 ? dest.stay * 0.85 : dest.stay; // shared-room saving
    const total = dest.transport + stayRate * nights + dest.food * duration + dest.activities;
    return {
        transport: dest.transport,
        stay: Math.round(stayRate * nights),
        food: dest.food * duration,
        activities: dest.activities,
        total: Math.round(total)
    };
}

function scoreDestination(dest, { budget, duration, interests }) {
    const cost = costFor(dest, duration, state.travelers);

    // Budget fit
    let budgetScore;
    if (cost.total <= budget) {
        budgetScore = 1;
    } else {
        const overshoot = (cost.total - budget) / budget;
        budgetScore = Math.max(0, 1 - overshoot * 1.4);
    }

    // Interest overlap
    let interestScore = 0.5;
    if (interests.size > 0) {
        const matched = dest.tags.filter((t) => interests.has(t)).length;
        const vsSelected = matched / interests.size;
        const vsDestTags = matched / dest.tags.length;
        interestScore = matched === 0 ? 0.1 : (vsSelected + vsDestTags) / 2;
    }

    // Duration fit
    let durationScore;
    if (duration >= dest.minDays && duration <= dest.maxDays) {
        durationScore = 1;
    } else {
        const dist = Math.min(Math.abs(duration - dest.minDays), Math.abs(duration - dest.maxDays));
        durationScore = Math.max(0, 1 - dist * 0.22);
    }

    const raw = interestScore * 0.45 + budgetScore * 0.35 + durationScore * 0.2;
    const percent = Math.min(97, Math.max(8, Math.round(raw * 100)));

    return { cost, percent, matchedTags: dest.tags.filter((t) => interests.has(t)) };
}

function computeMatches() {
    return currentDestinations()
        .map((dest) => {
            const { cost, percent, matchedTags } = scoreDestination(dest, state);
            return { dest, cost, percent, matchedTags };
        })
        .sort((a, b) => b.percent - a.percent);
}

// ---------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------

const el = {
    citySelect: document.getElementById("location"),
    budgetSlider: document.getElementById("budget"),
    budgetDisplay: document.getElementById("budget-display"),
    heroBudget: document.getElementById("hero-budget"),
    heroCount: document.getElementById("hero-count"),
    heroCity: document.getElementById("hero-city"),
    heroFill: document.getElementById("hero-fill"),
    heroCaption: document.getElementById("hero-caption"),
    durationGroup: document.getElementById("duration-group"),
    travelersCount: document.getElementById("travelers-count"),
    travelersMinus: document.getElementById("travelers-minus"),
    travelersPlus: document.getElementById("travelers-plus"),
    interestGroup: document.getElementById("interest-group"),
    createTrip: document.getElementById("create-trip"),
    message: document.getElementById("message"),
    resultsHeading: document.getElementById("results-heading"),
    resultsBadge: document.getElementById("results-count-badge"),
    list: document.getElementById("destination-list"),
    itinerary: document.getElementById("itinerary"),
    itineraryEyebrow: document.getElementById("itinerary-eyebrow"),
    itineraryTitle: document.getElementById("itinerary-title"),
    itineraryDays: document.getElementById("itinerary-days"),
    costRows: document.getElementById("cost-rows"),
    costTotal: document.getElementById("cost-total-value"),
    costNote: document.getElementById("cost-note"),
    trust: document.getElementById("itinerary-trust"),
    closeItinerary: document.getElementById("close-itinerary")
};

function formatINR(n) {
    return n.toLocaleString("en-IN");
}

function durationLabel(days) {
    if (days === 2) return "weekend";
    if (days === 3) return "long weekend";
    if (days === 5) return "short break";
    return "week away";
}

function updateHeroStat() {
    const matches = computeMatches();
    const strong = matches.filter((m) => m.percent >= 55);
    const dests = currentDestinations();

    el.heroBudget.textContent = formatINR(state.budget);
    el.heroCount.textContent = strong.length;
    el.heroCity.textContent = cityLabels[state.city];
    const fillPct = Math.min(100, Math.round((strong.length / dests.length) * 100));
    el.heroFill.style.width = fillPct + "%";

    if (strong.length === 0) {
        el.heroCaption.textContent = "Nothing clears that budget yet — try loosening it";
    } else if (state.interests.size === 0) {
        el.heroCaption.textContent = "Pick at least one interest to sharpen this";
    } else {
        el.heroCaption.textContent = `Best fit: ${matches[0].dest.name}, ${matches[0].percent}% match`;
    }
}

function renderList() {
    currentMatches = computeMatches();
    const shown = currentMatches.slice(0, 4);

    el.resultsHeading.textContent = `Top picks for your ${durationLabel(state.duration)}`;
    el.resultsBadge.textContent = `${shown.filter((m) => m.percent >= 55).length} strong matches`;

    el.list.innerHTML = "";

    if (shown.every((m) => m.percent < 30)) {
        const empty = document.createElement("div");
        empty.className = "empty-state";
        empty.textContent = "Nothing scores well against this combination — try a wider budget or a different duration.";
        el.list.appendChild(empty);
        return;
    }

    shown.forEach((match, i) => {
        const row = document.createElement("div");
        row.className = "destination";
        row.setAttribute("role", "button");
        row.setAttribute("tabindex", "0");
        row.setAttribute("aria-expanded", openItineraryId === match.dest.id ? "true" : "false");

        row.innerHTML = `
            <span class="destination-rank">${i + 1}</span>
            <div class="destination-main">
                <h3>${match.dest.name}</h3>
                <p class="region">${match.dest.region}</p>
                <p class="blurb">${match.dest.blurb}</p>
                <div class="destination-tags">
                    ${match.dest.tags.map((t) => `<span>${t}</span>`).join("")}
                </div>
            </div>
            <div class="destination-match">
                <strong>${match.percent}%</strong>
                match
            </div>
            <div class="destination-cost">
                <strong>₹${formatINR(match.cost.total)}</strong>
                <span>per person, ${state.duration} ${state.duration === 1 ? "day" : "days"}</span>
            </div>
        `;

        row.addEventListener("click", () => openItinerary(match));
        row.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openItinerary(match);
            }
        });

        el.list.appendChild(row);
    });
}

function buildDayPlan(dest, duration) {
    const pool = dest.highlightPool.slice();
    const days = [];
    const perDay = Math.max(1, Math.ceil(pool.length / duration));

    for (let d = 0; d < duration; d++) {
        const chunk = pool.splice(0, perDay);
        if (chunk.length === 0) {
            chunk.push(d === duration - 1 ? "Free morning before heading back" : "Rest and explore the immediate area at your own pace");
        }
        days.push(chunk);
    }
    return days;
}

function renderTrust(dest) {
    const r = dest.reviews;
    if (!r) {
        el.trust.innerHTML = "";
        return;
    }

    const fullStars = Math.round(r.rating);
    const stars = Array.from({ length: 5 }, (_, i) =>
        `<span class="star ${i < fullStars ? "filled" : ""}">★</span>`
    ).join("");

    el.trust.innerHTML = `
        <div class="trust-summary">
            <div class="trust-rating">
                <span class="trust-rating-value">${r.rating.toFixed(1)}</span>
                <div class="trust-stars" aria-hidden="true">${stars}</div>
                <span class="trust-count">${r.count} reviews</span>
            </div>
            <div class="trust-host">
                <span class="trust-host-name">${r.host}</span>
                ${r.verified ? '<span class="trust-badge">Verified operator</span>' : ""}
                <span class="trust-response">${r.responseTime}</span>
            </div>
        </div>
        <div class="trust-reviews">
            ${r.snippets.map((s) => `<blockquote class="trust-review">${s}</blockquote>`).join("")}
        </div>
    `;
}

function openItinerary(match) {
    openItineraryId = match.dest.id;
    const days = buildDayPlan(match.dest, state.duration);

    el.itineraryEyebrow.textContent = `${match.percent}% match · ${match.dest.region}`;
    el.itineraryTitle.textContent = `${state.duration}-day plan for ${match.dest.name}`;

    el.itineraryDays.innerHTML = days
        .map(
            (items, i) => `
        <div class="itinerary-day">
            <h4>Day ${i + 1}</h4>
            <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
    `
        )
        .join("");

    el.costRows.innerHTML = `
        <div class="cost-row"><span>Transport (round trip)</span><span>₹${formatINR(match.cost.transport)}</span></div>
        <div class="cost-row"><span>Stay${state.travelers >= 3 ? " (shared room)" : ""}</span><span>₹${formatINR(match.cost.stay)}</span></div>
        <div class="cost-row"><span>Food</span><span>₹${formatINR(match.cost.food)}</span></div>
        <div class="cost-row"><span>Activities and entry fees</span><span>₹${formatINR(match.cost.activities)}</span></div>
    `;
    el.costTotal.textContent = "₹" + formatINR(match.cost.total);

    const diff = match.cost.total - state.budget;
    if (diff <= 0) {
        el.costNote.textContent = `₹${formatINR(Math.abs(diff))} under your budget of ₹${formatINR(state.budget)}, for ${state.travelers} ${state.travelers === 1 ? "traveler" : "travelers"}.`;
    } else {
        el.costNote.textContent = `Runs ₹${formatINR(diff)} over your budget of ₹${formatINR(state.budget)} — drop a day or shift the duration selector to bring it down.`;
    }

    renderTrust(match.dest);

    el.itinerary.hidden = false;
    el.itinerary.scrollIntoView({ behavior: "smooth", block: "nearest" });
    renderList();
}

function closeItinerary() {
    openItineraryId = null;
    el.itinerary.hidden = true;
    renderList();
}

// ---------------------------------------------------------------
// Event wiring
// ---------------------------------------------------------------

el.citySelect.addEventListener("change", (e) => {
    state.city = e.target.value;
    closeItinerary();
    updateHeroStat();
    renderList();
});

el.budgetSlider.addEventListener("input", (e) => {
    state.budget = Number(e.target.value);
    el.budgetDisplay.textContent = formatINR(state.budget);
    updateHeroStat();
});

el.durationGroup.addEventListener("click", (e) => {
    const btn = e.target.closest(".segment");
    if (!btn) return;
    state.duration = Number(btn.dataset.days);
    [...el.durationGroup.children].forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    updateHeroStat();
});

el.travelersMinus.addEventListener("click", () => {
    state.travelers = Math.max(1, state.travelers - 1);
    el.travelersCount.textContent = state.travelers;
    updateHeroStat();
});

el.travelersPlus.addEventListener("click", () => {
    state.travelers = Math.min(6, state.travelers + 1);
    el.travelersCount.textContent = state.travelers;
    updateHeroStat();
});

el.interestGroup.addEventListener("click", (e) => {
    const btn = e.target.closest(".interest");
    if (!btn) return;
    const tag = btn.dataset.tag;
    if (state.interests.has(tag)) {
        state.interests.delete(tag);
        btn.classList.remove("active");
    } else {
        state.interests.add(tag);
        btn.classList.add("active");
    }
    updateHeroStat();
});

el.createTrip.addEventListener("click", () => {
    updateHeroStat();
    renderList();
    const strongCount = currentMatches.filter((m) => m.percent >= 55).length;
    el.message.textContent = `Matched ${strongCount} of ${currentDestinations().length} destinations out of ${cityLabels[state.city]} against a ₹${formatINR(state.budget)} budget over a ${durationLabel(state.duration)} for ${state.travelers} ${state.travelers === 1 ? "traveler" : "travelers"}.`;
    document.getElementById("recommendations").scrollIntoView({ behavior: "smooth", block: "start" });
});

el.closeItinerary.addEventListener("click", closeItinerary);

// ---------------------------------------------------------------
// Init
// ---------------------------------------------------------------

updateHeroStat();
renderList();
