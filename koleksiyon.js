var products = [];

async function loadData() {
    if (!window.fs || !window.db) {
        setTimeout(loadData, 300);
        return;
    }
    try {
        const querySnapshot = await window.fs.getDocs(window.fs.collection(window.db, "ayeli_products"));
        products = [];
        querySnapshot.forEach((doc) => {
            products.push({ dbId: doc.id, ...doc.data() });
        });
        render('all');
    } catch (error) {
        console.error("Yükleme Hatası:", error);
        document.getElementById('productGrid').innerHTML = '<div class="col-span-full text-center text-red-400">Ürünler yüklenirken bir sorun oluştu.</div>';
    }
}

function render(filter = 'all') {
    const grid = document.getElementById('productGrid');
    if(!grid) return;
    grid.innerHTML = '';

    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    if (filtered.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center text-gray-400 py-12">Bu kategoride ürün bulunamadı.</div>';
        return;
    }

    filtered.forEach(p => {
        const media = p.images?.[0] || p.image;
        const isVideo = media && typeof media === 'object' && media.type === 'video';
        const mediaSrc = isVideo ? media.src : (media.src || media);

        const card = document.createElement('div');
        card.className = "group cursor-pointer relative animate-fadeIn";
        card.onclick = () => window.location.href = `urun_detay.html?id=${p.dbId || p.id}`;
        
        card.innerHTML = `
            <div class="relative aspect-[3/4] overflow-hidden bg-[#f9f9f9] mb-6">
                ${isVideo 
                    ? `<video src="${mediaSrc}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" muted loop autoplay playsinline></video>`
                    : `<img src="${mediaSrc}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">`
                }
            </div>
            <p class="text-[10px] tracking-[0.3em] text-gold mb-2 uppercase">${p.category}</p>
            <h3 class="luxury-font text-lg tracking-wider">${p.name}</h3>
        `;
        grid.appendChild(card);
    });
}

function filterItems(category) {
    render(category);
    const buttons = document.querySelectorAll('button[onclick^="filterItems"]');
    buttons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(`'${category}'`)) {
            btn.classList.remove('border-transparent', 'text-gray-300');
            btn.classList.add('border-gold', 'text-black');
        } else {
            btn.classList.remove('border-gold', 'text-black');
            btn.classList.add('border-transparent', 'text-gray-300');
        }
    });
}

window.onload = loadData;
window.filterItems = filterItems;
