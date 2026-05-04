// ========================================
// GLOBAL PRODUCT DATABASE — Ótica Leal
// ========================================

const ALL_PRODUCTS = [
    // INDEX / HOME
    { id: 'alpha-pro-carbon-gold', name: 'Alpha Pro Carbon Gold', category: 'Esportivo • Premium', price: 599.90, url: 'index.html' },
    { id: 'breeze-drift-tartaruga', name: 'Breeze Drift Tartaruga', category: 'Casual • Praia', price: 349.90, url: 'index.html' },
    { id: 'titan-stealth-fosco', name: 'Titan Stealth Fosco', category: 'Esportivo • Performance', price: 450.00, url: 'index.html' },
    { id: 'ocean-wave-azul', name: 'Ocean Wave Azul', category: 'Unissex • Praia', price: 299.90, url: 'index.html' },

    // MASCULINO ESPORTIVOS
    { id: 'titan-pro-carbono-black', name: 'Titan Pro Carbono Black', category: 'Esporte • Carbono', price: 549.90, url: 'Html/Esportivos.html' },
    { id: 'stealth-fosco-militar', name: 'Stealth Fosco Militar', category: 'Esporte • Performance', price: 489.90, url: 'Html/Esportivos.html' },
    { id: 'iron-vision-g2-onyx', name: 'Iron Vision G2 Onyx', category: 'Rugged • Durabilidade', price: 450.00, url: 'Html/Esportivos.html' },
    { id: 'alpha-commander-gold', name: 'Alpha Commander Gold', category: 'Premium • Esporte', price: 620.00, url: 'Html/Esportivos.html' },

    // FEMININO ESPORTIVAS
    { id: 'titan-lady-rose', name: 'Titan Lady Rose', category: 'Esporte • Elegância', price: 499.90, url: 'Html/Esportivas.html' },
    { id: 'stealth-lite-pearl', name: 'Stealth Lite Pearl', category: 'Esporte • Ultra-leve', price: 459.90, url: 'Html/Esportivas.html' },
    { id: 'iron-queen-crystal', name: 'Iron Queen Crystal', category: 'Resistência • Chic', price: 430.00, url: 'Html/Esportivas.html' },
    { id: 'alpha-diva-gold', name: 'Alpha Diva Gold', category: 'Premium • Style', price: 650.00, url: 'Html/Esportivas.html' },

    // MASCULINO PRAIEROS
    { id: 'beach-king-amber', name: 'Beach King Amber', category: 'Sol • Polarizado', price: 320.00, url: 'Html/Praieros.html' },
    { id: 'sunset-drift-ocean', name: 'Sunset Drift Ocean', category: 'Sol • Proteção UV', price: 289.90, url: 'Html/Praieros.html' },
    { id: 'palm-breeze-green', name: 'Palm Breeze Green', category: 'Estilo • Tropical', price: 250.00, url: 'Html/Praieros.html' },
    { id: 'surf-master-navy', name: 'Surf Master Navy', category: 'Performance • Mar', price: 380.00, url: 'Html/Praieros.html' },

    // FEMININO PRAIERAS
    { id: 'beach-queen-emerald', name: 'Beach Queen Emerald', category: 'Sol • Glamour', price: 340.00, url: 'Html/Praieras.html' },
    { id: 'sunset-bloom-pink', name: 'Sunset Bloom Pink', category: 'Sol • Elegância', price: 299.90, url: 'Html/Praieras.html' },
    { id: 'palm-breeze-white', name: 'Palm Breeze White', category: 'Estilo • Verão', price: 270.00, url: 'Html/Praieras.html' },
    { id: 'wave-lady-azure', name: 'Wave Lady Azure', category: 'Sol • Conforto', price: 310.00, url: 'Html/Praieras.html' },

    // KIDS MENINOS
    { id: 'little-hero-blue', name: 'Little Hero Blue', category: 'Kids • Aventura', price: 159.90, url: 'Html/kidsEM.html' },
    { id: 'dino-explorer-green', name: 'Dino Explorer Green', category: 'Kids • Diversão', price: 145.00, url: 'Html/kidsEM.html' },
    { id: 'space-cadet-silver', name: 'Space Cadet Silver', category: 'Kids • Estilo', price: 165.00, url: 'Html/kidsEM.html' },
    { id: 'mini-racer-red', name: 'Mini Racer Red', category: 'Kids • Esporte', price: 139.90, url: 'Html/kidsEM.html' },

    // KIDS MENINAS
    { id: 'fairy-dust-pink', name: 'Fairy Dust Pink', category: 'Kids • Magia', price: 159.90, url: 'Html/kidsEF.html' },
    { id: 'butterfly-dream-purple', name: 'Butterfly Dream Purple', category: 'Kids • Encanto', price: 149.00, url: 'Html/kidsEF.html' },
    { id: 'sparkle-star-gold', name: 'Sparkle Star Gold', category: 'Kids • Estrela', price: 169.90, url: 'Html/kidsEF.html' },
    { id: 'mermaid-aqua', name: 'Mermaid Aqua', category: 'Kids • Brilho', price: 135.00, url: 'Html/kidsEF.html' }
];

window.ALL_PRODUCTS = ALL_PRODUCTS;
