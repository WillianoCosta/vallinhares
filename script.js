// --- DADOS DOS VEÍCULOS (Mesma lista, só atualizando as imagens para ilustrar melhor) ---
const cars = [
    { id: 1, name: "Fiat Strada Freedom", type: "Picape", price: "R$ 115.000", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "VW Polo Track", type: "Hatch", price: "R$ 89.900", image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Chevrolet Onix Plus", type: "Sedan", price: "R$ 95.500", image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "Toyota Corolla XEi", type: "Sedan", price: "R$ 155.000", image: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&w=600&q=80" },
    { id: 5, name: "Jeep Compass Longitude", type: "SUV", price: "R$ 190.000", image: "https://mundodoautomovelparapcd.com.br/wp-content/uploads/2020/07/Compass-Longitude-Diesel-7-1536x864.jpg" },
    { id: 6, name: "Hyundai Creta", type: "SUV", price: "R$ 135.900", image: "https://cdn.motor1.com/images/mgl/jlwm9g/s3/novo-hyundai-creta-electric.webp" },
    { id: 7, name: "Fiat Toro Volcano", type: "Picape", price: "R$ 175.000", image: "https://www.planetcarsz.com/img/carros/2023/08/fiat-toro-volcano-my24-001-20230815192747-1600x1067.jpg" },
    { id: 8, name: "Honda HR-V EXL", type: "SUV", price: "R$ 160.000", image: "https://www.honda.com.br/automoveis/sites/hab/files/2022-08/New%20HR-V_0001s_0007_VENDAS_DIRETAS_FRONTAL_LADO_A_EXL_AZUL_COSMICO_300_0.jpg" },
    { id: 9, name: "Chevrolet Tracker", type: "SUV", price: "R$ 145.000", image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=600&q=80" },
    { id: 10, name: "Toyota Hilux SRX", type: "Picape", price: "R$ 320.000", image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=600&q=80" }
];

// INSIRA A URL DO APPSCRIPT AQUI
const SCRIPT_URL = 'COLE_SUA_URL_AQUI'; 

// --- SELETORES ---
const grid = document.getElementById('productGrid');
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModalBtn = document.getElementById('closeModalBtn');
const mobileMenuIcon = document.getElementById('mobileMenuIcon');
const navMenu = document.getElementById('navMenu');

// --- RENDERIZAÇÃO ---
function renderCars() {
    // Adiciona delay incremental para efeito de cascata
    grid.innerHTML = cars.map((car, index) => `
        <div class="product-card reveal" style="transition-delay: ${index * 100}ms">
            <div class="img-wrapper">
                <span class="product-tag">${car.type}</span>
                <img src="${car.image}" alt="${car.name}" class="product-img">
            </div>
            <div class="product-info">
                <h3 class="product-name">${car.name}</h3>
                <p class="product-price">${car.price}</p>
                <div class="actions">
                    <button class="btn btn-details" onclick="openDetails(${car.id})">
                        <i class="fas fa-eye"></i> Detalhes
                    </button>
                    <button class="btn btn-finance" onclick="openFinance(${car.id})">
                        <i class="fas fa-bolt"></i> Simular
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Reinicia o observer após renderizar
    initScrollReveal();
}

// --- EFEITO SCROLL REVEAL (O Segredo da Animação) ---
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 }); // Dispara quando 10% do item aparece

    reveals.forEach(el => observer.observe(el));
}

// --- MENU MOBILE ANIMADO ---
mobileMenuIcon.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuIcon.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Fechar menu ao clicar em link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuIcon.querySelector('i').classList.add('fa-bars');
        mobileMenuIcon.querySelector('i').classList.remove('fa-times');
    });
});

// --- MODAL & FORMULÁRIO ---
function openModal() { modalOverlay.classList.add('active'); }
function closeModal() { modalOverlay.classList.remove('active'); }

closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if(e.target === modalOverlay) closeModal(); });

function openDetails(id) {
    const car = cars.find(c => c.id === id);
    modalTitle.innerText = car.name;
    modalBody.innerHTML = `
        <img src="${car.image}" style="width:100%; border-radius:10px; margin-bottom:1rem; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
        <p style="font-size:1.1rem; color:#555;"><strong>Categoria:</strong> ${car.type}</p>
        <p style="font-size:1.5rem; color:#2ecc71; font-weight:bold; margin: 10px 0;">${car.price}</p>
        <p style="color:#666;">Veículo revisado, com garantia e procedência.</p>
        <a href="https://wa.me/5584996106961?text=Tenho interesse no ${car.name}" class="btn-submit" style="display:block; text-align:center; text-decoration:none; margin-top:20px; background:#25d366;">
            <i class="fab fa-whatsapp"></i> Chamar no WhatsApp
        </a>
    `;
    openModal();
}

function openFinance(id) {
    const car = cars.find(c => c.id === id);
    modalTitle.innerText = "Simular: " + car.name;
    modalBody.innerHTML = `
        <form onsubmit="submitFinance(event, '${car.name}')">
            <div class="form-group"><input type="text" name="nome" placeholder="Seu Nome" required></div>
            <div class="form-group"><input type="text" name="cpf" placeholder="CPF" required></div>
            <div class="form-group"><input type="tel" name="telefone" placeholder="WhatsApp" required></div>
            <div class="form-group"><input type="number" name="entrada" placeholder="Entrada (R$)" required></div>
            <button type="submit" class="btn-submit">Enviar Proposta <i class="fas fa-paper-plane"></i></button>
        </form>
        <div id="statusMessage" style="margin-top:15px; text-align:center; display:none; font-weight:bold;"></div>
    `;
    openModal();
}

function submitFinance(e, carName) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const msg = document.getElementById('statusMessage');
    const formData = new FormData(e.target);
    
    formData.append('carro', carName);
    formData.append('data', new Date().toLocaleString());

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    fetch(SCRIPT_URL, { method: 'POST', body: formData })
    .then(() => {
        msg.style.display = 'block';
        msg.style.color = '#2ecc71';
        msg.innerText = "✅ Proposta enviada com sucesso!";
        e.target.reset();
        setTimeout(closeModal, 3000);
    })
    .catch(() => {
        msg.style.display = 'block';
        msg.style.color = '#2ecc71';
        msg.innerText = "✅ Recebemos seus dados!";
    })
    .finally(() => {
        btn.disabled = false;
        btn.innerText = "Enviar Proposta";
    });
}

// Inicializa o site
renderCars();