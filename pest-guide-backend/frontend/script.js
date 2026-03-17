const API = "http://127.0.0.1:5000/api";

const data = [
  // ── FUNGAL ──────────────────────────────────────────────────────────────────
  {
    id: 1, category: 'fungal', typeLabel: 'Fungal Disease',
    name: 'Anthracnose',
    agent: 'Colletotrichum spp.',
    crops: ['Pepper', 'Papaw', 'Soursop'],
    management: [
      'Avoid water splash in field during irrigation to prevent spread.',
      'Use clean seeds, resistant cultivars, adequate spacing, and practice crop rotation and field sanitation.',
      'Rotate appropriate fungicide e.g. Copper hydroxide, at fruit set and at regular intervals.',
      'Hot water dip at 48°C for 20 minutes is effective.'
    ]
  },
  {
    id: 2, category: 'fungal', typeLabel: 'Fungal Disease',
    name: 'Black and Yellow Sigatoka',
    agent: 'Mycosphaerella musicola / M. fijiensis',
    crops: ['Plantains', 'Bananas'],
    management: [
      'Field sanitation, leaf surgery and leaf tip removal of diseased leaves.',
      'Provide adequate drainage, irrigation, weed control and use resistant cultivars if available.',
      'Provide adequate nutrition with high nitrogen and potassium levels.',
      'Timely application of contact and systemic fungicides rotated depending on weather conditions and disease severity.'
    ]
  },
  {
    id: 3, category: 'fungal', typeLabel: 'Fungal Disease',
    name: 'Brown Leaf Spot of Cassava',
    agent: 'Cercosporidium henningsii',
    crops: ['Cassava'],
    management: [
      'Field sanitation, crop rotation and weed control.',
      'Provide adequate drainage to reduce soil moisture.',
      'Use disease free planting material.',
      'Fungicide e.g. Cuprous oxide and copper oxychloride based fungicides provide good control.'
    ]
  },
  {
    id: 4, category: 'fungal', typeLabel: 'Fungal Disease',
    name: 'Cercospora Leaf Spot',
    agent: 'Cercospora sp.',
    crops: ['Poi'],
    management: [
      'Provide adequate weed control.',
      'Use high quality, disease free seeds.',
      'Destroy infected plants after harvest to minimize disease spread to subsequent crops.',
      'Rotate with non-host crop.',
      'Avoid splashing irrigation water onto plant leaves.'
    ]
  },
  {
    id: 5, category: 'fungal', typeLabel: 'Fungal Disease',
    name: 'Fusarium Fruit and Stalk Rot',
    agent: 'Fusarium sp.',
    crops: ['Boulanger', 'Ochro', 'Tomato'],
    management: [
      'Practice crop rotation and use resistant varieties.',
      'Plant on ridges to reduce soil moisture.',
      'Plant in disease free soil using clean planting material.',
      'Soil fumigation, or treat soils using soil fungicides e.g. Ridomil Gold, Acrobat.'
    ]
  },
  {
    id: 6, category: 'fungal', typeLabel: 'Fungal Disease',
    name: 'Gummosis',
    agent: 'Fusarium, Pestalotia, and Colletotrichum spp.',
    crops: ['Pineapple'],
    management: [
      'Provide adequate drainage and irrigation to reduce pathogen levels.',
      'Provide good weed control around plants.',
      'Injuries to the pineapple fruit must be avoided, since they provide entry points for pathogens.',
      'Systemic fungicides may be used to protect against infection.'
    ]
  },
  {
    id: 7, category: 'fungal', typeLabel: 'Fungal Disease',
    name: 'Leaf Spot of Coconut',
    agent: 'Curvularia sp.',
    crops: ['Coconut'],
    management: [
      'Space seedling at 60x60 cm triangular distance to provide adequate room for developing palms.',
      'Prune and collect damaged leaves and burn infected seedlings in nursery.',
      'Overcrowding predisposes young plants to infection.',
      'Provide adequate nutrition to allow for vegetative growth, vigor and resistance to the disease.',
      'Spray appropriate fungicides such as Captan or Mancozeb at 10ml per gallon water every 10-14 days.'
    ]
  },
  {
    id: 8, category: 'fungal', typeLabel: 'Fungal Disease',
    name: 'Leaf Spot of Pineapple',
    agent: 'Botryodiplodia sp.',
    crops: ['Pineapple'],
    management: [
      'Avoid planting pineapple in moist, shady areas and too close to each other.',
      'Prune plants to improve air circulation.'
    ]
  },
  {
    id: 9, category: 'fungal', typeLabel: 'Fungal Disease',
    name: 'Powdery Mildew',
    agent: 'Erysiphe sp.',
    crops: ['Papaw'],
    management: [
      'Avoid planting in low areas with high humidity.',
      'Keep plants well-spaced and properly thinned to promote good air circulation.',
      'Use resistant varieties.',
      'Fungicides are most effective when applied immediately at the first signs of infection such as Kocide or Copper Hydroxide.'
    ]
  },
  {
    id: 10, category: 'fungal', typeLabel: 'Fungal Disease',
    name: 'Sclerotia Stem Rot',
    agent: 'Sclerotinia spp.',
    crops: ['Pigeon Peas'],
    management: [
      'Avoid irrigation during flowering and maintain good weed control.',
      'Use appropriate plant spacing.',
      'Practice crop rotation to limit potential damage to subsequent vegetable crops.',
      'Foliar fungicides are applied in seed fields with a history of severe disease development.'
    ]
  },
  {
    id: 11, category: 'fungal', typeLabel: 'Fungal Disease',
    name: 'White Leaf of Pineapple',
    agent: 'Pestalotia sp.',
    crops: ['Pineapple'],
    management: ['Use of copper based fungicides.']
  },
  {
    id: 12, category: 'bacterial', typeLabel: 'Bacterial Disease',
    name: 'Bacterial Blotch of Watermelon',
    agent: 'Acidovorax avenae subsp. citrulli',
    crops: ['Watermelon'],
    management: [
      'Use disease free planting material.',
      'Eliminate long periods of leaf wetness and provide adequate plant nutrients.',
      'Applications of copper-based fungicides e.g. Coback, Mankocide can be used to reduce disease incidence.'
    ]
  },
  {
    id: 13, category: 'bacterial', typeLabel: 'Bacterial Disease',
    name: 'Moko Disease',
    agent: 'Ralstonia solanacearum Race 2',
    crops: ['Plantain', 'Banana'],
    management: [
      'Use disease free planting material.',
      'Disinfect cutting tools with bleach solution between plants.',
      'Remove and destroy infected plants.',
      'Avoid movement of infected soil and plant material.',
      'Apply copper-based bactericides as a preventive measure.'
    ]
  },
  {
    id: 14, category: 'bacterial', typeLabel: 'Bacterial Disease',
    name: 'Bacterial Wilt',
    agent: 'Ralstonia solanacearum',
    crops: ['Tomato', 'Pepper', 'Potato', 'Eggplant'],
    management: [
      'Use resistant varieties where available.',
      'Practice strict crop rotation with non-solanaceous crops.',
      'Avoid water-logged conditions and provide proper drainage.',
      'Use disease-free planting material.',
      'Disinfect tools and equipment between use.'
    ]
  },
  {
    id: 15, category: 'bacterial', typeLabel: 'Bacterial Disease',
    name: 'Soft Rot of Cabbage',
    agent: 'Erwinia carotovora',
    crops: ['Cabbage'],
    management: [
      'Avoid mechanical injury to plants.',
      'Provide adequate drainage to prevent waterlogging.',
      'Control insects that create entry wounds.',
      'Remove and destroy infected plant material.',
      'Practice crop rotation.'
    ]
  },
  {
    id: 16, category: 'viral', typeLabel: 'Viral Disease',
    name: 'Citrus Tristeza Virus',
    agent: 'Closterovirus (CTV)',
    crops: ['Citrus'],
    management: [
      'Use certified virus-free budwood and rootstocks.',
      'Use tolerant or resistant rootstocks.',
      'Manage aphid vectors using insecticides.',
      'Remove and destroy infected trees.',
      'Quarantine measures to prevent spread.'
    ]
  },
  {
    id: 17, category: 'viral', typeLabel: 'Viral Disease',
    name: 'Scarlet Tip Virus',
    agent: 'Phytoplasma',
    crops: ['Coconut'],
    management: [
      'Control insect vectors (leafhopper).',
      'Remove and destroy infected palms.',
      'Avoid planting in areas with high vector populations.',
      'Use disease-free planting material.'
    ]
  },
  {
    id: 18, category: 'viral', typeLabel: 'Viral Disease',
    name: 'Watermelon Mosaic Virus',
    agent: 'Potyvirus (WMV)',
    crops: ['Watermelon', 'Cucurbits'],
    management: [
      'Control aphid vectors with insecticides.',
      'Use reflective mulches to deter aphids.',
      'Remove and destroy infected plants.',
      'Plant resistant or tolerant varieties.',
      'Use disease-free transplants and certified seed.'
    ]
  },
  {
    id: 19, category: 'protozoal', typeLabel: 'Protozoal Disease',
    name: 'Heart Rot of Coconut',
    agent: 'Phytophthora palmivora / Phytomonas spp.',
    crops: ['Coconut'],
    management: [
      'Remove and destroy infected palms promptly.',
      'Avoid injury to palms during cultivation.',
      'Control insect vectors.',
      'Provide good drainage to avoid waterlogging.',
      'Apply copper-based fungicides as a preventive treatment.'
    ]
  },
  {
    id: 20, category: 'nematode', typeLabel: 'Nematode',
    name: 'Hoplolaimus galeatus (Lance Nematode)',
    agent: 'Hoplolaimus galeatus',
    crops: ['Various field crops'],
    management: [
      'Crop rotation with non-host plants.',
      'Soil solarization.',
      'Use of nematicides e.g. Mocap, Furadan.',
      'Use of resistant varieties where available.',
      'Maintain good soil health and organic matter.'
    ]
  },
  {
    id: 21, category: 'nematode', typeLabel: 'Nematode',
    name: 'Root Knot Nematodes',
    agent: 'Meloidogyne and Heterodera spp.',
    crops: ['Vegetables', 'Fruits', 'Root crops'],
    management: [
      'Use nematode-resistant varieties.',
      'Soil solarization to reduce nematode populations.',
      'Apply nematicides to infested soils.',
      'Rotate with non-host crops.',
      'Use of biologically active organic amendments.'
    ]
  },
  {
    id: 22, category: 'nematode', typeLabel: 'Nematode',
    name: 'Rhabditis sp. (Free-living Nematode)',
    agent: 'Rhabditis sp.',
    crops: ['Potted plants', 'Nursery crops'],
    management: [
      'Typically not pathogenic but indicates poor drainage.',
      'Improve soil drainage and aeration.',
      'Reduce excessive watering.',
      'Ensure use of clean growing media in nurseries.'
    ]
  },
  {
    id: 23, category: 'physiological', typeLabel: 'Physiological Disorder',
    name: 'Boron Deficiency',
    agent: 'Micronutrient Deficiency',
    crops: ['Various crops'],
    management: [
      'Apply boron-containing fertilizers (e.g. borax) to soil.',
      'Foliar applications of soluble boron.',
      'Maintain proper soil pH (6.0-6.5) for optimal boron uptake.',
      'Avoid excessive liming which can reduce boron availability.'
    ]
  },
  {
    id: 24, category: 'physiological', typeLabel: 'Physiological Disorder',
    name: 'Calcium Deficiency',
    agent: 'Macronutrient Deficiency',
    crops: ['Tomato', 'Pepper', 'Brassicas'],
    management: [
      'Apply lime or gypsum to acidic soils.',
      'Ensure consistent and adequate irrigation to improve calcium uptake.',
      'Apply calcium sprays to foliage during fruit development.',
      'Maintain optimal soil pH to improve nutrient availability.'
    ]
  },
  {
    id: 25, category: 'physiological', typeLabel: 'Physiological Disorder',
    name: 'Choke Throat',
    agent: 'Boron / Calcium Imbalance',
    crops: ['Plantain', 'Banana'],
    management: [
      'Ensure adequate boron and calcium nutrition.',
      'Foliar application of boron at recommended rates.',
      'Maintain balanced fertilization programme.',
      'Avoid extreme temperature fluctuations through shade management.'
    ]
  },
  {
    id: 26, category: 'physiological', typeLabel: 'Physiological Disorder',
    name: 'Nitrogen Deficiency',
    agent: 'Macronutrient Deficiency',
    crops: ['All crops'],
    management: [
      'Apply nitrogen-containing fertilizers (urea, ammonium nitrate).',
      'Incorporate organic matter to improve soil nitrogen levels.',
      'Practice crop rotation with legumes to fix atmospheric nitrogen.',
      'Use split application of nitrogen for better uptake and reduced loss.'
    ]
  },
  {
    id: 27, category: 'insect', typeLabel: 'Insect Pest',
    name: 'Ambrosia Beetle',
    agent: 'Xyleborus spp.',
    crops: ['Hardwood trees', 'Fruit trees'],
    management: [
      'Remove and destroy infested wood promptly.',
      'Avoid creating wounds on tree trunks.',
      'Apply insecticidal sprays to trunks as a preventive measure.',
      'Maintain tree vigor through proper nutrition and irrigation.'
    ]
  },
  {
    id: 28, category: 'insect', typeLabel: 'Insect Pest',
    name: 'Brown Aphids',
    agent: 'Aphis gossypii / Myzus persicae',
    crops: ['Vegetables', 'Citrus', 'Various crops'],
    management: [
      'Encourage natural enemies (ladybirds, lacewings, parasitic wasps).',
      'Use insecticidal soaps or neem-based products.',
      'Apply systemic insecticides e.g. Imidacloprid when populations are high.',
      'Use reflective mulches to deter aphids.',
      'Remove heavily infested plant parts.'
    ]
  },
  {
    id: 29, category: 'insect', typeLabel: 'Insect Pest',
    name: 'Coconut Moth Caterpillar',
    agent: 'Batrachedra arenosella',
    crops: ['Coconut'],
    management: [
      'Spray infested trees with appropriate insecticides.',
      'Encourage natural predators and parasitoids.',
      'Remove and destroy heavily infested leaves.',
      'Chemical control with Carbaryl or Malathion when infestations are severe.'
    ]
  },
  {
    id: 30, category: 'insect', typeLabel: 'Insect Pest',
    name: 'Buck Moth Caterpillar',
    agent: 'Automeris spp.',
    crops: ['Coconut', 'Various trees'],
    management: [
      'Hand-pick larvae (use gloves - larvae have urticating spines).',
      'Apply Bt (Bacillus thuringiensis) for biological control.',
      'Spray with appropriate contact insecticides.',
      'Encourage natural predators.'
    ]
  },
  {
    id: 31, category: 'insect', typeLabel: 'Insect Pest',
    name: 'Whiteflies',
    agent: 'Bemisia tabaci / Trialeurodes vaporariorum',
    crops: ['Tomato', 'Cassava', 'Vegetables', 'Citrus'],
    management: [
      'Use yellow sticky traps to monitor and reduce populations.',
      'Apply insecticides e.g. Imidacloprid, Acetamiprid.',
      'Use neem-based sprays as a biopesticide.',
      'Introduce natural enemies such as Encarsia formosa.',
      'Remove and destroy heavily infested plant material.'
    ]
  },
  {
    id: 32, category: 'insect', typeLabel: 'Insect Pest',
    name: 'Thrips',
    agent: 'Frankliniella occidentalis / Thrips palmi',
    crops: ['Pepper', 'Onion', 'Tomato', 'Various crops'],
    management: [
      'Use blue sticky traps for monitoring.',
      'Apply insecticides e.g. Spinosad, Abamectin.',
      'Remove weeds that serve as alternate hosts.',
      'Apply overhead irrigation to knock thrips off plants.',
      'Encourage natural predators (predatory mites, anthocorid bugs).'
    ]
  },
  {
    id: 33, category: 'insect', typeLabel: 'Insect Pest',
    name: 'Coconut Leaf Miner',
    agent: 'Opisina arenosella',
    crops: ['Coconut'],
    management: [
      'Remove and burn severely infested leaves.',
      'Apply appropriate insecticides when pest levels are high.',
      'Encourage parasitoids for biological control.',
      'Monitor regularly during dry weather when outbreaks are common.'
    ]
  },
  {
    id: 34, category: 'insect', typeLabel: 'Insect Pest',
    name: 'Army Worm (Caterpillar)',
    agent: 'Spodoptera frugiperda / S. exigua',
    crops: ['Corn', 'Sorghum', 'Pasture grasses', 'Vegetables'],
    management: [
      'Apply Bt (Bacillus thuringiensis) as biological control.',
      'Use pheromone traps to monitor and trap adult moths.',
      'Apply insecticides e.g. Chlorpyrifos, Lambda-cyhalothrin.',
      'Encourage natural enemies (parasitic wasps, predatory insects).',
      'Practice early planting to avoid peak pest populations.'
    ]
  },
  {
    id: 35, category: 'insect', typeLabel: 'Insect Pest',
    name: 'Stem Borer',
    agent: 'Diatraea saccharalis / Eldana saccharina',
    crops: ['Sugarcane', 'Corn', 'Sorghum'],
    management: [
      'Plant early to avoid peak egg-laying periods.',
      'Remove and destroy crop residues after harvest.',
      'Release parasitoids e.g. Cotesia flavipes for biological control.',
      'Apply insecticides at early infestation stages.',
      'Use resistant varieties where available.'
    ]
  },
  {
    id: 36, category: 'insect', typeLabel: 'Insect Pest',
    name: 'Mealybugs (Citrophilus)',
    agent: 'Pseudococcus calceolariae',
    crops: ['Citrus', 'Pineapple', 'Various fruits'],
    management: [
      'Apply horticultural oil or neem oil sprays.',
      'Use systemic insecticides e.g. Imidacloprid.',
      'Introduce natural enemies such as Cryptolaemus montrouzieri.',
      'Prune and destroy heavily infested plant parts.',
      'Control ants that protect mealybugs from natural enemies.'
    ]
  },
  {
    id: 37, category: 'insect', typeLabel: 'Insect Pest',
    name: 'Plantain Weevil Larvae',
    agent: 'Cosmopolites sordidus',
    crops: ['Plantain', 'Banana'],
    management: [
      'Use clean planting material free from weevils.',
      'Remove and destroy crop debris after harvest.',
      'Use traps made from split pseudostems to attract and trap weevils.',
      'Apply entomopathogenic nematodes or fungi as biological control.',
      'Apply approved insecticides when infestation levels are high.'
    ]
  },
  {
    id: 38, category: 'insect', typeLabel: 'Insect Pest',
    name: 'Diamondback Moth',
    agent: 'Plutella xylostella',
    crops: ['Cabbage', 'Broccoli', 'Cauliflower', 'Kale'],
    management: [
      'Apply Bt (Bacillus thuringiensis var. kurstaki) as primary biological control.',
      'Use pheromone traps to monitor moth populations.',
      'Rotate insecticides to prevent resistance development.',
      'Apply spinosad or indoxacarb-based insecticides.',
      'Introduce parasitoids e.g. Cotesia plutellae.'
    ]
  },
  {
    id: 39, category: 'insect', typeLabel: 'Insect Pest',
    name: 'Scales',
    agent: 'Saissetia oleae / Coccus viridis',
    crops: ['Citrus', 'Mango', 'Coffee', 'Various fruits'],
    management: [
      'Apply horticultural oil sprays to smother scale insects.',
      'Introduce natural enemies such as Metaphycus helvolus.',
      'Prune and destroy heavily infested branches.',
      'Apply systemic insecticides e.g. Imidacloprid.',
      'Control ants that protect scales from natural enemies.'
    ]
  },
  {
    id: 40, category: 'insect', typeLabel: 'Insect Pest',
    name: 'Leaf Miner',
    agent: 'Liriomyza spp.',
    crops: ['Tomato', 'Beans', 'Celery', 'Cucumbers'],
    management: [
      'Use yellow sticky traps to monitor adult fly populations.',
      'Apply spinosad or abamectin-based insecticides.',
      'Remove and destroy heavily mined leaves.',
      'Encourage natural parasitoids.',
      'Avoid excessive nitrogen fertilization which attracts flies.'
    ]
  },
  {
    id: 41, category: 'insect', typeLabel: 'Insect Pest',
    name: 'Mites',
    agent: 'Tetranychus urticae / Panonychus citri',
    crops: ['Citrus', 'Tomato', 'Papaw', 'Various crops'],
    management: [
      'Apply acaricides e.g. Abamectin, Hexythiazox.',
      'Use miticides specifically labeled for the target mite species.',
      'Introduce predatory mites e.g. Phytoseiulus persimilis.',
      'Apply neem oil or insecticidal soap as organic options.',
      'Avoid excessive nitrogen fertilization which promotes mite populations.'
    ]
  },
  {
    id: 42, category: 'insect', typeLabel: 'Insect Pest',
    name: 'Spur Grasshopper',
    agent: 'Zonocerus variegatus',
    crops: ['Cassava', 'Vegetables', 'Various crops'],
    management: [
      'Apply contact insecticides e.g. Dimethoate, Chlorpyrifos.',
      'Hand collection in small farms during early morning when insects are sluggish.',
      'Use bait stations with insecticide-treated bran.',
      'Encourage natural predators.',
      'Early land preparation to destroy egg pods in the soil.'
    ]
  }
];

// ── STATE ─────────────────────────────────────────────────────────────────────
let allData = [];
let currentCategory = 'all';
let currentSearch   = '';

// ── LOAD DATA FROM BACKEND ────────────────────────────────────────────────────
async function loadData() {
  try {
    const res = await fetch(`${API}/entries?per_page=100`);
    const json = await res.json();
    allData = json.items;
    renderCards();
  } catch (err) {
    console.error("Backend not reachable, using local data", err);
    allData = data;
    renderCards();
  }
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function getCategoryClass(cat) {
  const map = {
    fungal:        'type-fungal',
    bacterial:     'type-bacterial',
    viral:         'type-viral',
    protozoal:     'type-protozoal',
    nematode:      'type-nematode',
    physiological: 'type-physiological',
    insect:        'type-insect'
  };
  return map[cat] || 'type-fungal';
}

// ── RENDER CARDS ──────────────────────────────────────────────────────────────
function renderCards() {
  const grid      = document.getElementById('cardsGrid');
  const noResults = document.getElementById('noResults');
  const q         = currentSearch.toLowerCase();

  const filtered = allData.filter(item => {
    const catMatch = currentCategory === 'all' || item.category === currentCategory;
    if (!catMatch) return false;
    if (!q) return true;
    const label = (item.typeLabel || item.type_label || '').toLowerCase();
    return (
      item.name.toLowerCase().includes(q)      ||
      item.agent.toLowerCase().includes(q)     ||
      label.includes(q)                        ||
      item.crops.some(c => c.toLowerCase().includes(q)) ||
      item.management.some(m => m.toLowerCase().includes(q))
    );
  });

  grid.innerHTML = '';

  if (filtered.length === 0) {
    noResults.classList.add('visible');
    return;
  }
  noResults.classList.remove('visible');

  filtered.forEach((item, i) => {
    const label = item.typeLabel || item.type_label || '';
    const card = document.createElement('div');
    card.className = 'card visible';
    card.style.animationDelay = (i * 0.04) + 's';
    card.onclick = () => openModal(item);

    card.innerHTML = `
      <div class="card-header">
        <div class="card-name">${item.name}</div>
        <div class="card-type ${getCategoryClass(item.category)}">${label}</div>
      </div>
      <div class="card-body">
        <div class="card-row">
          <span class="card-row-label">Agent</span>
          <span class="card-row-value">${item.agent}</span>
        </div>
        <div class="card-row">
          <span class="card-row-label">Crops</span>
          <div class="card-crops">
            ${item.crops.map(c => `<span class="crop-tag">${c}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="management-title">Management</div>
        <ul class="management-list">
          ${item.management.slice(0, 2).map(m => `<li>${m}</li>`).join('')}
          ${item.management.length > 2
            ? `<li style="color:var(--mold);font-style:italic;">+${item.management.length - 2} more practices...</li>`
            : ''}
        </ul>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ── CATEGORY FILTER ───────────────────────────────────────────────────────────
function showCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const titles = {
    all:           'All Pests & Diseases',
    fungal:        'Fungal Plant Diseases',
    bacterial:     'Bacterial Plant Diseases',
    viral:         'Viral Plant Diseases',
    protozoal:     'Protozoal Plant Diseases',
    nematode:      'Plant Parasitic Nematodes',
    physiological: 'Physiological Disorders',
    insect:        'Insect Pests'
  };
  document.getElementById('sectionTitle').textContent = titles[cat] || 'All Pests & Diseases';
  renderCards();
}

// ── SEARCH ────────────────────────────────────────────────────────────────────
function handleSearch() {
  currentSearch = document.getElementById('searchInput').value;
  renderCards();
}

// ── MODAL ─────────────────────────────────────────────────────────────────────
function openModal(item) {
  const label = item.typeLabel || item.type_label || '';
  document.getElementById('modalBadge').textContent    = label;
  document.getElementById('modalTitle').textContent    = item.name;
  document.getElementById('modalAgent').textContent    = item.agent;
  document.getElementById('modalCrops').textContent    = item.crops.join(', ');
  document.getElementById('modalManagement').innerHTML = item.management.map(m => `<li>${m}</li>`).join('');
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModalDirect();
}

function closeModalDirect() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModalDirect();
});

// ── INIT ──────────────────────────────────────────────────────────────────────
loadData();
// ── IMAGE DIAGNOSIS ───────────────────────────────────────────────────────────
let selectedImageFile = null;

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  selectedImageFile = file;

  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('previewImg').src = e.target.result;
    document.getElementById('previewBox').style.display = 'block';
    document.getElementById('uploadBox').style.display = 'none';
    document.getElementById('diagnoseBtn').style.display = 'block';
    document.getElementById('diagnoseResult').style.display = 'none';
    document.getElementById('diagnoseError').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

function removeImage() {
  selectedImageFile = null;
  document.getElementById('previewBox').style.display = 'none';
  document.getElementById('uploadBox').style.display = 'block';
  document.getElementById('diagnoseBtn').style.display = 'none';
  document.getElementById('diagnoseResult').style.display = 'none';
  document.getElementById('diagnoseError').style.display = 'none';
  document.getElementById('imageInput').value = '';
}

async function diagnoseImage() {
  if (!selectedImageFile) return;

  document.getElementById('diagnoseBtn').style.display = 'none';
  document.getElementById('diagnoseLoading').style.display = 'block';
  document.getElementById('diagnoseResult').style.display = 'none';
  document.getElementById('diagnoseError').style.display = 'none';

  const formData = new FormData();
  formData.append('image', selectedImageFile);

  try {
    const res = await fetch(`${API}/diagnose`, {
      method: 'POST',
      body: formData
    });

    const result = await res.json();

    document.getElementById('diagnoseLoading').style.display = 'none';

    if (result.error) {
      document.getElementById('diagnoseError').style.display = 'block';
      document.getElementById('errorText').textContent = result.error;
      document.getElementById('diagnoseBtn').style.display = 'block';
      return;
    }

    document.getElementById('resultName').textContent        = result.disease;
    document.getElementById('resultConfidence').textContent  = `Confidence: ${result.confidence}%`;
    document.getElementById('resultAgent').textContent       = result.agent;
    document.getElementById('resultCrops').textContent       = result.crops.length > 0 ? result.crops.join(', ') : 'Various crops';
    document.getElementById('resultManagement').innerHTML    = result.management.map(m => `<li>${m}</li>`).join('');

    document.getElementById('diagnoseResult').style.display = 'block';
    document.getElementById('diagnoseBtn').style.display    = 'block';

    document.getElementById('diagnoseResult').scrollIntoView({ behavior: 'smooth' });

  } catch (err) {
    document.getElementById('diagnoseLoading').style.display = 'none';
    document.getElementById('diagnoseError').style.display   = 'block';
    document.getElementById('errorText').textContent         = 'Backend not reachable. Make sure the server is running.';
    document.getElementById('diagnoseBtn').style.display     = 'block';
  }
}
