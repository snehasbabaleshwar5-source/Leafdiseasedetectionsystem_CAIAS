import sqlite3, os

DB_PATH = os.path.join(os.path.dirname(__file__), "pest_guide.db")

SEED_DATA = [
    # ── FUNGAL ──────────────────────────────────────────────────────────────
    {
        "category": "fungal", "type_label": "Fungal Disease",
        "name": "Anthracnose",
        "agent": "Colletotrichum spp.",
        "crops": ["Pepper", "Papaw", "Soursop"],
        "management": [
            "Avoid water splash in field during irrigation to prevent spread.",
            "Use clean seeds, resistant cultivars, adequate spacing, and practice crop rotation and field sanitation.",
            "Rotate appropriate fungicide e.g. Copper hydroxide at fruit set and at regular intervals.",
            "Hot water dip at 48 degrees C for 20 minutes is effective.",
        ],
    },
    {
        "category": "fungal", "type_label": "Fungal Disease",
        "name": "Black and Yellow Sigatoka",
        "agent": "Mycosphaerella musicola / M. fijiensis",
        "crops": ["Plantains", "Bananas"],
        "management": [
            "Field sanitation, leaf surgery and leaf tip removal of diseased leaves.",
            "Provide adequate drainage, irrigation, weed control and use resistant cultivars if available.",
            "Provide adequate nutrition with high nitrogen and potassium levels.",
            "Timely application of contact and systemic fungicides rotated depending on weather conditions and disease severity.",
        ],
    },
    {
        "category": "fungal", "type_label": "Fungal Disease",
        "name": "Brown Leaf Spot of Cassava",
        "agent": "Cercosporidium henningsii",
        "crops": ["Cassava"],
        "management": [
            "Field sanitation, crop rotation and weed control.",
            "Provide adequate drainage to reduce soil moisture.",
            "Use disease free planting material.",
            "Fungicide e.g. Cuprous oxide and copper oxychloride based fungicides provide good control.",
        ],
    },
    {
        "category": "fungal", "type_label": "Fungal Disease",
        "name": "Cercospora Leaf Spot",
        "agent": "Cercospora sp.",
        "crops": ["Poi"],
        "management": [
            "Provide adequate weed control.",
            "Use high quality, disease free seeds.",
            "Destroy infected plants after harvest to minimize disease spread to subsequent crops.",
            "Rotate with non-host crop.",
            "Avoid splashing irrigation water onto plant leaves.",
        ],
    },
    {
        "category": "fungal", "type_label": "Fungal Disease",
        "name": "Fusarium Fruit and Stalk Rot",
        "agent": "Fusarium sp.",
        "crops": ["Boulanger", "Ochro", "Tomato"],
        "management": [
            "Practice crop rotation and use resistant varieties.",
            "Plant on ridges to reduce soil moisture.",
            "Plant in disease free soil using clean planting material.",
            "Soil fumigation, or treat soils using soil fungicides e.g. Ridomil Gold, Acrobat.",
        ],
    },
    {
        "category": "fungal", "type_label": "Fungal Disease",
        "name": "Gummosis",
        "agent": "Fusarium, Pestalotia, and Colletotrichum spp.",
        "crops": ["Pineapple"],
        "management": [
            "Provide adequate drainage and irrigation to reduce pathogen levels.",
            "Provide good weed control around plants.",
            "Injuries to the pineapple fruit must be avoided, since they provide entry points for pathogens.",
            "Systemic fungicides may be used to protect against infection.",
        ],
    },
    {
        "category": "fungal", "type_label": "Fungal Disease",
        "name": "Leaf Spot of Coconut",
        "agent": "Curvularia sp.",
        "crops": ["Coconut"],
        "management": [
            "Space seedling at 60x60 cm triangular distance to provide adequate room for developing palms.",
            "Prune and collect damaged leaves and burn infected seedlings in nursery.",
            "Overcrowding predisposes young plants to infection.",
            "Provide adequate nutrition to allow for vegetative growth, vigor and resistance to the disease.",
            "Spray appropriate fungicides such as Captan or Mancozeb at 10ml per gallon water every 10-14 days.",
        ],
    },
    {
        "category": "fungal", "type_label": "Fungal Disease",
        "name": "Leaf Spot of Pineapple",
        "agent": "Botryodiplodia sp.",
        "crops": ["Pineapple"],
        "management": [
            "Avoid planting pineapple in moist, shady areas and too close to each other.",
            "Prune plants to improve air circulation.",
        ],
    },
    {
        "category": "fungal", "type_label": "Fungal Disease",
        "name": "Powdery Mildew",
        "agent": "Erysiphe sp.",
        "crops": ["Papaw"],
        "management": [
            "Avoid planting in low areas with high humidity.",
            "Keep plants well-spaced and properly thinned to promote good air circulation.",
            "Use resistant varieties.",
            "Fungicides are most effective when applied immediately at the first signs of infection such as Kocide or Copper Hydroxide.",
        ],
    },
    {
        "category": "fungal", "type_label": "Fungal Disease",
        "name": "Sclerotia Stem Rot",
        "agent": "Sclerotinia spp.",
        "crops": ["Pigeon Peas"],
        "management": [
            "Avoid irrigation during flowering and maintain good weed control.",
            "Use appropriate plant spacing.",
            "Practice crop rotation to limit potential damage to subsequent vegetable crops.",
            "Foliar fungicides are applied in seed fields with a history of severe disease development.",
        ],
    },
    {
        "category": "fungal", "type_label": "Fungal Disease",
        "name": "White Leaf of Pineapple",
        "agent": "Pestalotia sp.",
        "crops": ["Pineapple"],
        "management": ["Use of copper based fungicides."],
    },
    # ── BACTERIAL ───────────────────────────────────────────────────────────
    {
        "category": "bacterial", "type_label": "Bacterial Disease",
        "name": "Bacterial Blotch of Watermelon",
        "agent": "Acidovorax avenae subsp. citrulli",
        "crops": ["Watermelon"],
        "management": [
            "Use disease free planting material.",
            "Eliminate long periods of leaf wetness and provide adequate plant nutrients.",
            "Applications of copper-based fungicides e.g. Coback, Mankocide can be used to reduce disease incidence.",
        ],
    },
    {
        "category": "bacterial", "type_label": "Bacterial Disease",
        "name": "Moko Disease",
        "agent": "Ralstonia solanacearum Race 2",
        "crops": ["Plantain", "Banana"],
        "management": [
            "Use disease free planting material.",
            "Disinfect cutting tools with bleach solution between plants.",
            "Remove and destroy infected plants.",
            "Avoid movement of infected soil and plant material.",
            "Apply copper-based bactericides as a preventive measure.",
        ],
    },
    {
        "category": "bacterial", "type_label": "Bacterial Disease",
        "name": "Bacterial Wilt",
        "agent": "Ralstonia solanacearum",
        "crops": ["Tomato", "Pepper", "Potato", "Eggplant"],
        "management": [
            "Use resistant varieties where available.",
            "Practice strict crop rotation with non-solanaceous crops.",
            "Avoid water-logged conditions and provide proper drainage.",
            "Use disease-free planting material.",
            "Disinfect tools and equipment between use.",
        ],
    },
    {
        "category": "bacterial", "type_label": "Bacterial Disease",
        "name": "Soft Rot of Cabbage",
        "agent": "Erwinia carotovora",
        "crops": ["Cabbage"],
        "management": [
            "Avoid mechanical injury to plants.",
            "Provide adequate drainage to prevent waterlogging.",
            "Control insects that create entry wounds.",
            "Remove and destroy infected plant material.",
            "Practice crop rotation.",
        ],
    },
    # ── VIRAL ────────────────────────────────────────────────────────────────
    {
        "category": "viral", "type_label": "Viral Disease",
        "name": "Citrus Tristeza Virus",
        "agent": "Closterovirus (CTV)",
        "crops": ["Citrus"],
        "management": [
            "Use certified virus-free budwood and rootstocks.",
            "Use tolerant or resistant rootstocks.",
            "Manage aphid vectors using insecticides.",
            "Remove and destroy infected trees.",
            "Quarantine measures to prevent spread.",
        ],
    },
    {
        "category": "viral", "type_label": "Viral Disease",
        "name": "Scarlet Tip Virus",
        "agent": "Phytoplasma",
        "crops": ["Coconut"],
        "management": [
            "Control insect vectors (leafhopper).",
            "Remove and destroy infected palms.",
            "Avoid planting in areas with high vector populations.",
            "Use disease-free planting material.",
        ],
    },
    {
        "category": "viral", "type_label": "Viral Disease",
        "name": "Watermelon Mosaic Virus",
        "agent": "Potyvirus (WMV)",
        "crops": ["Watermelon", "Cucurbits"],
        "management": [
            "Control aphid vectors with insecticides.",
            "Use reflective mulches to deter aphids.",
            "Remove and destroy infected plants.",
            "Plant resistant or tolerant varieties.",
            "Use disease-free transplants and certified seed.",
        ],
    },
    # ── PROTOZOAL ────────────────────────────────────────────────────────────
    {
        "category": "protozoal", "type_label": "Protozoal Disease",
        "name": "Heart Rot of Coconut",
        "agent": "Phytophthora palmivora / Phytomonas spp.",
        "crops": ["Coconut"],
        "management": [
            "Remove and destroy infected palms promptly.",
            "Avoid injury to palms during cultivation.",
            "Control insect vectors.",
            "Provide good drainage to avoid waterlogging.",
            "Apply copper-based fungicides as a preventive treatment.",
        ],
    },
    # ── NEMATODES ────────────────────────────────────────────────────────────
    {
        "category": "nematode", "type_label": "Nematode",
        "name": "Hoplolaimus galeatus (Lance Nematode)",
        "agent": "Hoplolaimus galeatus",
        "crops": ["Various field crops"],
        "management": [
            "Crop rotation with non-host plants.",
            "Soil solarization.",
            "Use of nematicides e.g. Mocap, Furadan.",
            "Use of resistant varieties where available.",
            "Maintain good soil health and organic matter.",
        ],
    },
    {
        "category": "nematode", "type_label": "Nematode",
        "name": "Root Knot Nematodes",
        "agent": "Meloidogyne and Heterodera spp.",
        "crops": ["Vegetables", "Fruits", "Root crops"],
        "management": [
            "Use nematode-resistant varieties.",
            "Soil solarization to reduce nematode populations.",
            "Apply nematicides to infested soils.",
            "Rotate with non-host crops.",
            "Use of biologically active organic amendments.",
        ],
    },
    {
        "category": "nematode", "type_label": "Nematode",
        "name": "Rhabditis sp. (Free-living Nematode)",
        "agent": "Rhabditis sp.",
        "crops": ["Potted plants", "Nursery crops"],
        "management": [
            "Typically not pathogenic but indicates poor drainage.",
            "Improve soil drainage and aeration.",
            "Reduce excessive watering.",
            "Ensure use of clean growing media in nurseries.",
        ],
    },
    # ── PHYSIOLOGICAL ────────────────────────────────────────────────────────
    {
        "category": "physiological", "type_label": "Physiological Disorder",
        "name": "Boron Deficiency",
        "agent": "Micronutrient Deficiency",
        "crops": ["Various crops"],
        "management": [
            "Apply boron-containing fertilizers (e.g. borax) to soil.",
            "Foliar applications of soluble boron.",
            "Maintain proper soil pH (6.0-6.5) for optimal boron uptake.",
            "Avoid excessive liming which can reduce boron availability.",
        ],
    },
    {
        "category": "physiological", "type_label": "Physiological Disorder",
        "name": "Calcium Deficiency",
        "agent": "Macronutrient Deficiency",
        "crops": ["Tomato", "Pepper", "Brassicas"],
        "management": [
            "Apply lime or gypsum to acidic soils.",
            "Ensure consistent and adequate irrigation to improve calcium uptake.",
            "Apply calcium sprays to foliage during fruit development.",
            "Maintain optimal soil pH to improve nutrient availability.",
        ],
    },
    {
        "category": "physiological", "type_label": "Physiological Disorder",
        "name": "Choke Throat",
        "agent": "Boron / Calcium Imbalance",
        "crops": ["Plantain", "Banana"],
        "management": [
            "Ensure adequate boron and calcium nutrition.",
            "Foliar application of boron at recommended rates.",
            "Maintain balanced fertilization programme.",
            "Avoid extreme temperature fluctuations through shade management.",
        ],
    },
    {
        "category": "physiological", "type_label": "Physiological Disorder",
        "name": "Nitrogen Deficiency",
        "agent": "Macronutrient Deficiency",
        "crops": ["All crops"],
        "management": [
            "Apply nitrogen-containing fertilizers (urea, ammonium nitrate).",
            "Incorporate organic matter to improve soil nitrogen levels.",
            "Practice crop rotation with legumes to fix atmospheric nitrogen.",
            "Use split application of nitrogen for better uptake and reduced loss.",
        ],
    },
    # ── INSECTS ──────────────────────────────────────────────────────────────
    {
        "category": "insect", "type_label": "Insect Pest",
        "name": "Ambrosia Beetle",
        "agent": "Xyleborus spp.",
        "crops": ["Hardwood trees", "Fruit trees"],
        "management": [
            "Remove and destroy infested wood promptly.",
            "Avoid creating wounds on tree trunks.",
            "Apply insecticidal sprays to trunks as a preventive measure.",
            "Maintain tree vigor through proper nutrition and irrigation.",
        ],
    },
    {
        "category": "insect", "type_label": "Insect Pest",
        "name": "Brown Aphids",
        "agent": "Aphis gossypii / Myzus persicae",
        "crops": ["Vegetables", "Citrus", "Various crops"],
        "management": [
            "Encourage natural enemies (ladybirds, lacewings, parasitic wasps).",
            "Use insecticidal soaps or neem-based products.",
            "Apply systemic insecticides e.g. Imidacloprid when populations are high.",
            "Use reflective mulches to deter aphids.",
            "Remove heavily infested plant parts.",
        ],
    },
    {
        "category": "insect", "type_label": "Insect Pest",
        "name": "Coconut Moth Caterpillar",
        "agent": "Batrachedra arenosella",
        "crops": ["Coconut"],
        "management": [
            "Spray infested trees with appropriate insecticides.",
            "Encourage natural predators and parasitoids.",
            "Remove and destroy heavily infested leaves.",
            "Chemical control with Carbaryl or Malathion when infestations are severe.",
        ],
    },
    {
        "category": "insect", "type_label": "Insect Pest",
        "name": "Buck Moth Caterpillar",
        "agent": "Automeris spp.",
        "crops": ["Coconut", "Various trees"],
        "management": [
            "Hand-pick larvae (use gloves - larvae have urticating spines).",
            "Apply Bt (Bacillus thuringiensis) for biological control.",
            "Spray with appropriate contact insecticides.",
            "Encourage natural predators.",
        ],
    },
    {
        "category": "insect", "type_label": "Insect Pest",
        "name": "Whiteflies",
        "agent": "Bemisia tabaci / Trialeurodes vaporariorum",
        "crops": ["Tomato", "Cassava", "Vegetables", "Citrus"],
        "management": [
            "Use yellow sticky traps to monitor and reduce populations.",
            "Apply insecticides e.g. Imidacloprid, Acetamiprid.",
            "Use neem-based sprays as a biopesticide.",
            "Introduce natural enemies such as Encarsia formosa.",
            "Remove and destroy heavily infested plant material.",
        ],
    },
    {
        "category": "insect", "type_label": "Insect Pest",
        "name": "Thrips",
        "agent": "Frankliniella occidentalis / Thrips palmi",
        "crops": ["Pepper", "Onion", "Tomato", "Various crops"],
        "management": [
            "Use blue sticky traps for monitoring.",
            "Apply insecticides e.g. Spinosad, Abamectin.",
            "Remove weeds that serve as alternate hosts.",
            "Apply overhead irrigation to knock thrips off plants.",
            "Encourage natural predators (predatory mites, anthocorid bugs).",
        ],
    },
    {
        "category": "insect", "type_label": "Insect Pest",
        "name": "Coconut Leaf Miner",
        "agent": "Opisina arenosella",
        "crops": ["Coconut"],
        "management": [
            "Remove and burn severely infested leaves.",
            "Apply appropriate insecticides when pest levels are high.",
            "Encourage parasitoids for biological control.",
            "Monitor regularly during dry weather when outbreaks are common.",
        ],
    },
    {
        "category": "insect", "type_label": "Insect Pest",
        "name": "Army Worm (Caterpillar)",
        "agent": "Spodoptera frugiperda / S. exigua",
        "crops": ["Corn", "Sorghum", "Pasture grasses", "Vegetables"],
        "management": [
            "Apply Bt (Bacillus thuringiensis) as biological control.",
            "Use pheromone traps to monitor and trap adult moths.",
            "Apply insecticides e.g. Chlorpyrifos, Lambda-cyhalothrin.",
            "Encourage natural enemies (parasitic wasps, predatory insects).",
            "Practice early planting to avoid peak pest populations.",
        ],
    },
    {
        "category": "insect", "type_label": "Insect Pest",
        "name": "Stem Borer",
        "agent": "Diatraea saccharalis / Eldana saccharina",
        "crops": ["Sugarcane", "Corn", "Sorghum"],
        "management": [
            "Plant early to avoid peak egg-laying periods.",
            "Remove and destroy crop residues after harvest.",
            "Release parasitoids e.g. Cotesia flavipes for biological control.",
            "Apply insecticides at early infestation stages.",
            "Use resistant varieties where available.",
        ],
    },
    {
        "category": "insect", "type_label": "Insect Pest",
        "name": "Mealybugs (Citrophilus)",
        "agent": "Pseudococcus calceolariae",
        "crops": ["Citrus", "Pineapple", "Various fruits"],
        "management": [
            "Apply horticultural oil or neem oil sprays.",
            "Use systemic insecticides e.g. Imidacloprid.",
            "Introduce natural enemies such as Cryptolaemus montrouzieri.",
            "Prune and destroy heavily infested plant parts.",
            "Control ants that protect mealybugs from natural enemies.",
        ],
    },
    {
        "category": "insect", "type_label": "Insect Pest",
        "name": "Plantain Weevil Larvae",
        "agent": "Cosmopolites sordidus",
        "crops": ["Plantain", "Banana"],
        "management": [
            "Use clean planting material free from weevils.",
            "Remove and destroy crop debris after harvest.",
            "Use traps made from split pseudostems to attract and trap weevils.",
            "Apply entomopathogenic nematodes or fungi as biological control.",
            "Apply approved insecticides when infestation levels are high.",
        ],
    },
    {
        "category": "insect", "type_label": "Insect Pest",
        "name": "Diamondback Moth",
        "agent": "Plutella xylostella",
        "crops": ["Cabbage", "Broccoli", "Cauliflower", "Kale"],
        "management": [
            "Apply Bt (Bacillus thuringiensis var. kurstaki) as primary biological control.",
            "Use pheromone traps to monitor moth populations.",
            "Rotate insecticides to prevent resistance development.",
            "Apply spinosad or indoxacarb-based insecticides.",
            "Introduce parasitoids e.g. Cotesia plutellae.",
        ],
    },
    {
        "category": "insect", "type_label": "Insect Pest",
        "name": "Scales",
        "agent": "Saissetia oleae / Coccus viridis",
        "crops": ["Citrus", "Mango", "Coffee", "Various fruits"],
        "management": [
            "Apply horticultural oil sprays to smother scale insects.",
            "Introduce natural enemies such as Metaphycus helvolus.",
            "Prune and destroy heavily infested branches.",
            "Apply systemic insecticides e.g. Imidacloprid.",
            "Control ants that protect scales from natural enemies.",
        ],
    },
    {
        "category": "insect", "type_label": "Insect Pest",
        "name": "Leaf Miner",
        "agent": "Liriomyza spp.",
        "crops": ["Tomato", "Beans", "Celery", "Cucumbers"],
        "management": [
            "Use yellow sticky traps to monitor adult fly populations.",
            "Apply spinosad or abamectin-based insecticides.",
            "Remove and destroy heavily mined leaves.",
            "Encourage natural parasitoids.",
            "Avoid excessive nitrogen fertilization which attracts flies.",
        ],
    },
    {
        "category": "insect", "type_label": "Insect Pest",
        "name": "Mites",
        "agent": "Tetranychus urticae / Panonychus citri",
        "crops": ["Citrus", "Tomato", "Papaw", "Various crops"],
        "management": [
            "Apply acaricides e.g. Abamectin, Hexythiazox.",
            "Use miticides specifically labeled for the target mite species.",
            "Introduce predatory mites e.g. Phytoseiulus persimilis.",
            "Apply neem oil or insecticidal soap as organic options.",
            "Avoid excessive nitrogen fertilization which promotes mite populations.",
        ],
    },
    {
        "category": "insect", "type_label": "Insect Pest",
        "name": "Spur Grasshopper",
        "agent": "Zonocerus variegatus",
        "crops": ["Cassava", "Vegetables", "Various crops"],
        "management": [
            "Apply contact insecticides e.g. Dimethoate, Chlorpyrifos.",
            "Hand collection in small farms during early morning when insects are sluggish.",
            "Use bait stations with insecticide-treated bran.",
            "Encourage natural predators.",
            "Early land preparation to destroy egg pods in the soil.",
        ],
    },
]


def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db():
    conn = get_conn()
    cur = conn.cursor()

    cur.executescript("""
        CREATE TABLE IF NOT EXISTS categories (
            id    INTEGER PRIMARY KEY AUTOINCREMENT,
            slug  TEXT NOT NULL UNIQUE,
            label TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS entries (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            category   TEXT NOT NULL,
            type_label TEXT NOT NULL,
            name       TEXT NOT NULL,
            agent      TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS crops (
            id   INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS entry_crops (
            entry_id INTEGER NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
            crop_id  INTEGER NOT NULL REFERENCES crops(id)  ON DELETE CASCADE,
            PRIMARY KEY (entry_id, crop_id)
        );

        CREATE TABLE IF NOT EXISTS management (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            entry_id INTEGER NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
            step_no  INTEGER NOT NULL,
            step     TEXT NOT NULL
        );
    """)

    cats = [
        ("fungal",        "Fungal Disease"),
        ("bacterial",     "Bacterial Disease"),
        ("viral",         "Viral Disease"),
        ("protozoal",     "Protozoal Disease"),
        ("nematode",      "Nematode"),
        ("physiological", "Physiological Disorder"),
        ("insect",        "Insect Pest"),
    ]
    cur.executemany(
        "INSERT OR IGNORE INTO categories (slug, label) VALUES (?,?)", cats
    )

    if cur.execute("SELECT COUNT(*) FROM entries").fetchone()[0] == 0:
        for item in SEED_DATA:
            cur.execute(
                "INSERT INTO entries (category, type_label, name, agent) VALUES (?,?,?,?)",
                (item["category"], item["type_label"], item["name"], item["agent"]),
            )
            entry_id = cur.lastrowid

            for crop_name in item["crops"]:
                cur.execute(
                    "INSERT OR IGNORE INTO crops (name) VALUES (?)", (crop_name,)
                )
                crop_id = cur.execute(
                    "SELECT id FROM crops WHERE name=?", (crop_name,)
                ).fetchone()["id"]
                cur.execute(
                    "INSERT OR IGNORE INTO entry_crops VALUES (?,?)",
                    (entry_id, crop_id),
                )

            for i, step in enumerate(item["management"], 1):
                cur.execute(
                    "INSERT INTO management (entry_id, step_no, step) VALUES (?,?,?)",
                    (entry_id, i, step),
                )

    conn.commit()
    conn.close()
    print(f"[DB] Initialised -> {DB_PATH}")