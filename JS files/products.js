const products = [
    // ===========================
    //  CATEGORY: APPAREL (6 items)
    // ===========================
    {
        id: "prod1",
        name: "Neon Grid Hoodie",
        price: 89.99,
        category: "Apparel",
        product_type: "apparel",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
        description: "Premium heavyweight 400gsm cotton hoodie with glow-in-the-dark cyber grid stitching. Designed for the urban dweller and the digital nomad. Features an oversized drop-shoulder fit.",
        features: [
            "Heavyweight 400gsm Cotton",
            "Glow-in-the-dark grid threading",
            "Hidden tech pocket for hardware",
            "Oversized Cyberpunk fit"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["#8B5CF6", "#1E1E2E", "#F5F5F5"],
        fit_guide: "Oversized — size down for regular fit"
    },
    {
        id: "prod2",
        name: "Geometric Tee",
        price: 45.00,
        category: "Apparel",
        product_type: "apparel",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        description: "Breathable synthetic-cotton blend t-shirt featuring algorithmic geometric patterns. Moisture-wicking properties keep you cool during intense server runs.",
        features: [
            "Moisture-wicking fabric",
            "Algorithmic digital print",
            "Reinforced collar"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["#09090B", "#F5F5F5"],
        fit_guide: "True to size"
    },
    {
        id: "prod5",
        name: "Void Runner Cap",
        price: 35.00,
        category: "Apparel",
        product_type: "apparel",
        image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&q=80",
        description: "Tactical streetwear cap designed for anonymous traversal. Features a metallic SoulThread logo and adjustable back strap.",
        features: [
            "Adjustable fit",
            "Metallic 3D Logo",
            "Water-resistant material"
        ],
        sizes: ["One Size"],
        colors: ["#09090B", "#8B5CF6"],
        fit_guide: "One size — adjustable strap"
    },
    {
        id: "prod6",
        name: "Quantum Grid Hoodie",
        price: 85.00,
        category: "Apparel",
        product_type: "apparel",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
        description: "An alternate hue variant of our signature Neon Grid Hoodie. The Quantum Grid edition features shifted spectrum threading for a subtler cyberpunk look.",
        features: [
            "Heavyweight 400gsm Cotton",
            "Color-shifting thread",
            "Oversized Cyberpunk fit"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["#3B82F6", "#1E1E2E"],
        fit_guide: "Oversized — size down for regular fit"
    },
    {
        id: "prod7",
        name: "Circuit Breaker Jacket",
        price: 129.99,
        category: "Apparel",
        product_type: "apparel",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
        description: "Windproof tactical jacket with embedded circuit-pattern reflective strips. Water-resistant coating keeps you dry in neon-lit rain. Internal mesh lining for breathability.",
        features: [
            "Reflective circuit-pattern strips",
            "Water-resistant outer shell",
            "Internal mesh lining",
            "Zippered tech pockets"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["#09090B", "#8B5CF6", "#10B981"],
        fit_guide: "Slim fit — size up for layering"
    },
    {
        id: "prod8",
        name: "Neural Joggers",
        price: 65.00,
        category: "Apparel",
        product_type: "apparel",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80",
        description: "Tech-fleece joggers with subtle neural-network embroidery along the seams. Tapered fit with reinforced zippered pockets and ribbed ankle cuffs.",
        features: [
            "Tech-fleece fabric",
            "Neural-network seam embroidery",
            "Zippered side pockets",
            "Tapered fit with ribbed cuffs"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["#09090B", "#1E1E2E"],
        fit_guide: "Slim tapered — true to size"
    },

    // ===========================
    //  CATEGORY: PRINTS & DECOR (5 items)
    // ===========================
    {
        id: "prod3",
        name: "Neon City Poster",
        price: 25.00,
        category: "Prints & Decor",
        product_type: "print",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
        description: "High-resolution digital artwork of Neo-Tokyo Sector 4. Printed on museum-grade holographic paper. Created digitally at 8K resolution with Adobe RGB wide gamut color profile.",
        features: [
            "Museum-grade paper",
            "Holographic finish",
            "A3 Size (11.7 × 16.5 inches)"
        ],
        sizes: ["One Size"],
        resolution: "8000x6000",
        dpi: 300,
        dimensions: "A3 (11.7 × 16.5 in)",
        frame_options: ["No Frame", "Black Frame", "White Frame"]
    },
    {
        id: "prod4",
        name: "Cyberpunk Portrait",
        price: 150.00,
        category: "Prints & Decor",
        product_type: "print",
        image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80",
        description: "A custom hand-drawn digital portrait by our lead cyber-artists. Rendered at 8K resolution (8000×6000px) with 300 DPI print-ready quality. Adobe RGB wide gamut color profile ensures cinema-grade colors.",
        features: [
            "Custom 1-of-1 digital art",
            "High-res PNG & SVG delivery",
            "Commercial usage rights",
            "8K Resolution · 300 DPI"
        ],
        sizes: ["Digital Delivery"],
        resolution: "8000x6000",
        dpi: 300,
        dimensions: "Digital (any print size)",
        frame_options: ["Digital Only", "Canvas Print", "Framed Canvas"]
    },
    {
        id: "prod9",
        name: "Midnight Skyline Canvas",
        price: 79.99,
        category: "Prints & Decor",
        product_type: "print",
        image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80",
        description: "Breathtaking panoramic cityscape of a cyberpunk metropolis at midnight. Gallery-wrapped canvas print, stretched on solid wood frame. Created digitally, printed on premium cotton canvas.",
        features: [
            "Gallery-wrapped canvas",
            "Solid wood frame",
            "Fade-resistant archival inks",
            "8K Resolution · 300 DPI"
        ],
        sizes: ["One Size"],
        resolution: "8000x6000",
        dpi: 300,
        dimensions: "24 × 36 inches",
        frame_options: ["No Frame", "Black Frame", "Natural Wood"]
    },
    {
        id: "prod10",
        name: "Glitch Garden Print",
        price: 35.00,
        category: "Prints & Decor",
        product_type: "print",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
        description: "A surreal digital painting of a bioluminescent garden corrupted by data glitches. Neon flora meets digital entropy. Museum-grade archival print.",
        features: [
            "Museum-grade archival paper",
            "Vivid neon color reproduction",
            "A2 Size (16.5 × 23.4 inches)"
        ],
        sizes: ["One Size"],
        resolution: "8000x6000",
        dpi: 300,
        dimensions: "A2 (16.5 × 23.4 in)",
        frame_options: ["No Frame", "Black Frame", "White Frame"]
    },
    {
        id: "prod11",
        name: "Cyber Samurai Wall Art",
        price: 95.00,
        category: "Prints & Decor",
        product_type: "print",
        image: "https://images.unsplash.com/photo-1614728263952-84ea206f99b6?w=800&q=80",
        description: "A warrior reimagined in the cyberpunk era. Digitally painted with cinematic lighting and atmosphere. Available as canvas print or high-res digital download.",
        features: [
            "Hand-painted digital artwork",
            "Cinema-grade color grading",
            "Available in canvas or digital",
            "Adobe RGB Wide Gamut"
        ],
        sizes: ["One Size"],
        resolution: "8000x6000",
        dpi: 300,
        dimensions: "20 × 30 inches",
        frame_options: ["No Frame", "Black Frame", "Floating Frame"]
    },

    // ===========================
    //  CATEGORY: GAMING & LIFESTYLE (4 items)
    // ===========================
    {
        id: "prod12",
        name: "Neon Grid Desk Mat",
        price: 39.99,
        category: "Gaming & Lifestyle",
        product_type: "gaming",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80",
        description: "Extended desk mat with a cyberpunk grid pattern printed edge-to-edge. Anti-slip rubber base, micro-textured cloth surface for precise mouse tracking.",
        features: [
            "Anti-slip rubber base",
            "Micro-textured cloth surface",
            "Stitched edges for durability",
            "Machine washable"
        ],
        sizes: ["One Size"],
        size_variants: ["Standard (300×800mm)", "XL (400×900mm)"],
        material: "Cloth top / Rubber base",
        desk_size: "400 × 900mm (XL)"
    },
    {
        id: "prod13",
        name: "Cyber Mousepad",
        price: 19.99,
        category: "Gaming & Lifestyle",
        product_type: "gaming",
        image: "../products/hoodie_prod_1777238758809.png",
        description: "Compact mousepad featuring a glowing-edge cyberpunk cityscape design. Optimized for low-friction glide with precision tracking surface.",
        features: [
            "Low-friction surface",
            "Anti-fray stitched edges",
            "3mm cushioned thickness"
        ],
        sizes: ["One Size"],
        size_variants: ["Standard (250×300mm)"],
        material: "Micro-weave cloth / Rubber",
        desk_size: "250 × 300mm"
    },
    {
        id: "prod14",
        name: "Cyberpunk Keycap Set",
        price: 49.99,
        category: "Gaming & Lifestyle",
        product_type: "gaming",
        image: "../products/product3_1777237964700.png",
        description: "Custom PBT keycap set with cyber-themed legends and translucent underglow keys. Compatible with Cherry MX stems. Double-shot legends never fade.",
        features: [
            "PBT double-shot legends",
            "Cherry MX compatible",
            "Translucent underglow keys",
            "104-key full set"
        ],
        sizes: ["One Size"],
        size_variants: ["Full Set (104 keys)", "TKL Set (87 keys)"],
        material: "PBT Plastic",
        desk_size: "N/A"
    },
    {
        id: "prod15",
        name: "LED Art Frame Display",
        price: 89.99,
        category: "Gaming & Lifestyle",
        product_type: "gaming",
        image: "../products/product_art_1777236847250.png",
        description: "Backlit LED frame that showcases any SoulThread art print with ambient edge-lighting. USB-C powered with adjustable brightness and color temperature.",
        features: [
            "USB-C powered",
            "Adjustable LED brightness",
            "Color temperature control",
            "Fits up to A3 prints"
        ],
        sizes: ["One Size"],
        size_variants: ["A4 Frame", "A3 Frame"],
        material: "Matte Black Aluminum",
        desk_size: "N/A"
    },

    // ===========================
    //  CATEGORY: ACCESSORIES (3 items)
    // ===========================
    {
        id: "prod16",
        name: "Neon Circuit Mug",
        price: 18.00,
        category: "Accessories",
        product_type: "accessory",
        image: "https://images.unsplash.com/photo-1517256011273-071dfa299144?w=800&q=80",
        description: "Ceramic mug with a heat-reactive circuit pattern that glows when filled with hot liquid. Dishwasher-safe with matte black exterior finish.",
        features: [
            "Heat-reactive color-changing design",
            "Matte black ceramic",
            "Dishwasher safe",
            "350ml capacity"
        ],
        sizes: ["One Size"],
        design_variants: ["Circuit Pattern", "Neon Skyline", "Glitch Art"],
        material: "Ceramic"
    },
    {
        id: "prod17",
        name: "Cyber Sticker Pack",
        price: 12.00,
        category: "Accessories",
        product_type: "accessory",
        image: "../products/product3_1777237964700.png",
        description: "Pack of 15 premium vinyl stickers featuring SoulThread cyberpunk artwork. Waterproof, UV-resistant, and perfect for laptops, water bottles, and phone cases.",
        features: [
            "15 unique designs",
            "Waterproof vinyl",
            "UV-resistant coating",
            "Easy peel backing"
        ],
        sizes: ["One Size"],
        design_variants: ["Cyberpunk Pack", "Neon Flora Pack", "Glitch Pack"],
        material: "Premium Vinyl"
    },
    {
        id: "prod18",
        name: "Data Carrier Tote Bag",
        price: 28.00,
        category: "Accessories",
        product_type: "accessory",
        image: "https://images.unsplash.com/photo-1544816153-199d88f126ee?w=800&q=80",
        description: "Heavy-duty canvas tote bag with cyberpunk artwork printed on both sides. Reinforced handles and internal laptop sleeve. The perfect data carrier for the urban operative.",
        features: [
            "Heavy-duty canvas",
            "Double-sided print",
            "Internal laptop sleeve",
            "Reinforced handles"
        ],
        sizes: ["One Size"],
        design_variants: ["Neon Grid", "Glitch Circuit", "Cyber Samurai"],
        material: "12oz Canvas"
    },

    // ===========================
    //  CATEGORY: CUSTOM SERVICES (3 items)
    // ===========================
    {
        id: "prod19",
        name: "Custom Digital Portrait",
        price: 150.00,
        starting_price: 150.00,
        category: "Custom Services",
        product_type: "service",
        image: "../products/product_art_1777236847250.png",
        description: "A bespoke, hand-crafted digital portrait rendered in our signature cyberpunk style. Submit your reference photos and our artists will transform your identity into a digital masterpiece. 8K resolution, Adobe RGB.",
        features: [
            "1-on-1 artist collaboration",
            "8K Resolution · 300 DPI",
            "3 revision rounds included",
            "Full commercial usage rights"
        ],
        sizes: ["Digital Delivery"],
        turnaround_days: 5,
        revision_rounds: 3
    },
    {
        id: "prod20",
        name: "Environment Scene Commission",
        price: 250.00,
        starting_price: 250.00,
        category: "Custom Services",
        product_type: "service",
        image: "../products/product2_1777237951009.png",
        description: "A fully custom cyberpunk environment scene. Describe your vision — a neon-lit alley, a rooftop at dusk, a data center core — and our artists will bring it to life in 8K detail.",
        features: [
            "Full environment illustration",
            "8K Resolution · 300 DPI",
            "4 revision rounds included",
            "Print-ready + digital delivery"
        ],
        sizes: ["Digital Delivery"],
        turnaround_days: 7,
        revision_rounds: 4
    },
    {
        id: "prod21",
        name: "Brand Art Package",
        price: 400.00,
        starting_price: 400.00,
        category: "Custom Services",
        product_type: "service",
        image: "../products/hoodie_prod_1777238758809.png",
        description: "Complete brand identity art package: logo, banner art, social media kit, and avatar — all in cyberpunk style. Perfect for streamers, creators, and businesses seeking a cohesive digital presence.",
        features: [
            "Logo + Banner + Avatar + Social Kit",
            "All assets in 8K Resolution",
            "5 revision rounds included",
            "Source files (PSD/AI) delivered"
        ],
        sizes: ["Digital Delivery"],
        turnaround_days: 10,
        revision_rounds: 5
    }
];

// Function to get a product by ID
function getProductById(id) {
    return products.find(p => p.id === id);
}

// Function to get products by category
function getProductsByCategory(category) {
    if (category === 'All') return products;
    return products.filter(p => p.category === category);
}

// Function to get products by product_type
function getProductsByType(type) {
    return products.filter(p => p.product_type === type);
}

// Get all unique categories
function getAllCategories() {
    return [...new Set(products.map(p => p.category))];
}
