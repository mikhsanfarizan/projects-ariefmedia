// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mainNav.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (mainNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('active') && 
        !mainNav.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        mainNav.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Main Slider Functionality
const mainSlider = document.getElementById('mainSlider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');

let currentSlide = 0;
const totalSlides = slides.length;

// Create dots for slider
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        goToSlide(i);
    });
    sliderDots.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

function goToSlide(slideIndex) {
    mainSlider.style.transform = `translateX(-${slideIndex * 100}%)`;
    currentSlide = slideIndex;
    
    // Update active dot
    dots.forEach((dot, index) => {
        if (index === slideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
}

// Auto slide every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Reset interval when user interacts with slider
function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

// Product Data
// Data produk sederhana (hanya id, category, title, image, link)
const produkDataSimple = [
    // ========== DIGITAL PRINTING ==========
    {
        id: 1,
        category: "digital-printing",
        title: "Stiker Oneway Custom",
        // image: "images/products/digital-printing/blank.jpg",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/stiker-one-way-1.jpg",
        link: "https://ariefmedia.com/product/stiker-oneway/"
    },
    {
        id: 2,
        category: "digital-printing",
        title: "Stiker Sunblast",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/stiker-sunblast-scaled-1.jpg",
        link: "#"
    },
    {
        id: 3,
        category: "digital-printing",
        title: "Cetak ID Card, Kartu Ucapan & Undangan",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/id-card-2-1.webp",
        link: "#"
    },
    {
        id: 4,
        category: "digital-printing",
        title: "Baliho",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/Baliho-1.webp",
        link: "#"
    },
    {
        id: 5,
        category: "digital-printing",
        title: "Bendera & Umbul-Umbul",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/bendera-dan-umbul-umbul-1.webp",
        link: "#"
    },
    {
        id: 6,
        category: "digital-printing",
        title: "Roll Banner & X-Banner",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/roll-banner-1.jpg",
        link: "#"
    },
    {
        id: 23,
        category: "digital-printing",
        title: "Buku Yasin Custom",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/buku-yasin-1.jpg",
        link: "#"
    },

    // ========== SABLON DIGITAL ==========
    {
        id: 7,
        category: "sablon",
        title: "Kaos & Jersey Sablon",
        // image: "images/products/sablon/blank.jpg",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/kaos-sablon-1.jpg",
        link: "#"
    },
    {
        id: 7,
        category: "sablon",
        title: "Pakaian Dinas Custom",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/pdh-1.jpg",
        link: "#"
    },
    {
        id: 8,
        category: "sablon",
        title: "Lanyard Custom",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/lanyard-1.jpg",
        link: "#"
    },
    {
        id: 9,
        category: "sablon",
        title: "Logo Bahan Busa",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/logo-bahan-busa-visual-mmt-1.jpg",
        link: "#"
    },
    {
        id: 10,
        category: "sablon",
        title: "Sablon Sponbond",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/sablon-sponbond-1.jpg",
        link: "#"
    },

    // ========== PRODUK AKRILIK ==========
    {
        id: 11,
        category: "akrilik",
        title: "Akrilik Custom",
        // image: "images/products/akrilik/blank.jpg",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/akrilik-custom-1.webp",
        link: "#"
    },
    {
        id: 12,
        category: "akrilik",
        title: "Wall Lamp Custom",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/walllamp-1.jpg",
        link: "#"
    },
    {
        id: 13,
        category: "akrilik",
        title: "Tempat Tisu Custom",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/tempat-tisu-custom-1.jpg",
        link: "#"
    },
    {
        id: 13,
        category: "akrilik",
        title: "Nomor Meja Custom",
        image: "Https://ariefmedia.com/wp-content/uploads/2024/12/nomor-meja-1.jpg",
        link: "#"
    },
    {
        id: 14,
        category: "akrilik",
        title: "Piala & Vandel Akrilik",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/piala-1.jpg",
        link: "#"
    },
    {
        id: 15,
        category: "akrilik",
        title: "Display Retail Akrilik",
        image: "https://qpstorage.sgp1.digitaloceanspaces.com/uploads/posts/268/4_20220922031957_acridis2.jpg",
        link: "#"
    },

    // ========== SIGNAGE & PAPAN ==========
    {
        id: 16,
        category: "signage",
        title: "Papan Nama Finishing & Cutting",
        // image: "images/products/signage/blank.jpg",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/papan-nama-finishing-cat-dan-cutting-1.jpg",
        link: "#"
    },
    {
        id: 17,
        category: "signage",
        title: "Papan Kayu Custom",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/papan-kayu-custom-1.jpg",
        link: "#"
    },
    {
        id: 18,
        category: "signage",
        title: "Papan Besi & Metal",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/papan-besi-custom-1.jpg",
        link: "#"
    },
    {
        id: 19,
        category: "signage",
        title: "Neon Box / Flex",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/neon-flex-1.jpg",
        link: "#"
    },
    {
        id: 20,
        category: "signage",
        title: "Letter Timbul",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/letter-timbul-3-1.jpg",
        link: "#"
    },
    {
        id: 20,
        category: "signage",
        title: "Papan Custom",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/papan-custom-1.jpg",
        link: "#"
    },

    // ========== MERCHANDISE ==========
    {
        id: 21,
        category: "merchandise",
        title: "Gantungan Kunci Custom",
        // image: "images/products/merchandise/gantungan-kunci.jpg",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/gantungan-kunci-1.webp",
        link: "#"
    },
    {
        id: 22,
        category: "merchandise",
        title: "Jam Dinding Custom",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/jam-dinding-1.webp",
        link: "#"
    },
    {
        id: 23,
        category: "merchandise",
        title: "Pin Custom",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/pin-1.jpg",
        link: "#"
    },
    {
        id: 24,
        category: "merchandise",
        title: "Nama Dada / Tag Name",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/nama-dada-1.jpg",
        link: "#"
    },
    {
        id: 25,
        category: "merchandise",
        title: "Mug Custom",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/mug-1.jpg",
        link: "#"
    },

    // ========== GEROBAK CUSTOM ==========
    {
        id: 26,
        category: "gerobak",
        title: "Branding Gerobak",
        image: "https://ariefmedia.com/wp-content/uploads/2024/12/branding-gerobak-1.webp",
        link: "#"
    },
    {
        id: 27,
        category: "gerobak",
        title: "Gerobak Makanan & Minuman",
        image: "https://cdn.vectorstock.com/i/500p/94/59/gerobak-nasi-goreng-abang-abang-warung-nasgor-vector-48799459.jpg",
        link: "#"
    },
    {
        id: 28,
        category: "gerobak",
        title: "Gerobak Display Produk",
        image: "https://cdn.vectorstock.com/i/500p/14/04/street-market-stand-open-food-cart-icon-vector-44501404.jpg",
        link: "#"
    },
    {
        id: 29,
        category: "gerobak",
        title: "Gerobak dengan Penyimpanan",
        image: "https://cdn.pixabay.com/photo/2021/02/06/08/27/food-cart-5987275_1280.png",
        link: "#"
    },
];

// Info kategori
const categoryInfo = {
    "digital-printing": {
        name: "Digital Printing",
        icon: "fas fa-print",
        description: " "
    },
    "sablon": {
        name: "Sablon Digital",
        icon: "fas fa-tshirt",
        description: " "
    },
    "akrilik": {
        name: "Produk Akrilik",
        icon: "fas fa-gem",
        description: " "
    },
    "signage": {
        name: "Signage & Papan",
        icon: "fas fa-map-signs",
        description: " "
    },
    "merchandise": {
        name: "Merchandise",
        icon: "fas fa-gift",
        description: " "
    },
    "gerobak": {
        name: "Gerobak Custom",
        icon: "fas fa-truck",
        description: " "
    }
};

// Kelas untuk mengelola slider produk per kategori
// Kelas untuk mengelola slider produk per kategori (SLIDER MODE - untuk "Semua Produk")
class CategorySliderSimple {
    constructor(containerId, products, categoryId) {
        this.container = document.getElementById(containerId);
        this.products = products;
        this.categoryId = categoryId;
        this.currentPosition = 0;
        this.productsPerView = 5; // Default untuk desktop
        this.stepSize = 1; // Geser 1 produk per klik
        
        this.calculateProductsPerView();
        this.init();
    }
    
    calculateProductsPerView() {
        const width = window.innerWidth;
        
        if (width >= 1200) {
            this.productsPerView = 5;
        } else if (width >= 992) {
            this.productsPerView = 4;
        } else if (width >= 768) {
            this.productsPerView = 3;
        } else if (width >= 576) {
            this.productsPerView = 2;
        } else {
            this.productsPerView = 1;
        }
        
        // Jika produk kurang dari atau sama dengan yang bisa ditampilkan, sembunyikan tombol
        this.hasNavigation = this.products.length > this.productsPerView;
    }
    
    init() {
        this.render();
        if (this.hasNavigation) {
            this.setupEventListeners();
            this.updateButtonStates();
        }
    }
    
    render() {
        const info = categoryInfo[this.categoryId];
        const productsCount = this.products.length;
        
        this.container.innerHTML = `
            <div class="category-slider-container ${!this.hasNavigation ? 'category-few-products' : ''}">
                <div class="category-header-slider">
                    <div class="category-title-slider">
                        <div class="category-icon-slider">
                            <i class="${info.icon}"></i>
                        </div>
                        <h3>${info.name} <span class="products-count">(${productsCount} produk)</span></h3>
                    </div>
                </div>
                
                <div class="slider-main-container">
                    ${this.hasNavigation ? `
                    <button class="category-nav-side prev-side" id="prev-${this.categoryId}" disabled>
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    ` : ''}
                    
                    <div class="products-slider-wrapper">
                        <div class="products-slider-track" id="track-${this.categoryId}">
                            ${this.products.map((product, index) => `
                                <a href="${product.link || '#'}" class="product-slider-card" data-category="${product.category}" data-index="${index}">
                                    <div class="product-slider-image">
                                        <img src="${this.getProductImage(product)}" alt="${product.title}" loading="lazy">
                                    </div>
                                    <div class="product-slider-title">
                                        ${product.title}
                                    </div>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                    
                    ${this.hasNavigation ? `
                    <button class="category-nav-side next-side" id="next-${this.categoryId}">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Update state tombol
        if (this.hasNavigation) {
            this.updateButtonStates();
        }
    }
    
    getProductImage(product) {
        if (product.image && product.image !== "images/products/") {
            return product.image;
        }
        
        const fallbackImages = {
            "digital-printing": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "sablon": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=70",
            "akrilik": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            "signage": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=50",
            "merchandise": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=40",
            "gerobak": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=30"
        };
        
        return fallbackImages[product.category] || fallbackImages["digital-printing"];
    }
    
    setupEventListeners() {
        const prevBtn = document.getElementById(`prev-${this.categoryId}`);
        const nextBtn = document.getElementById(`next-${this.categoryId}`);
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.scrollPrev());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.scrollNext());
        }
        
        // Responsive: update pada resize window
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }
    
    handleResize() {
        const oldProductsPerView = this.productsPerView;
        this.calculateProductsPerView();
        
        if (oldProductsPerView !== this.productsPerView) {
            this.currentPosition = 0; // Reset ke posisi awal
            this.render();
            if (this.hasNavigation) {
                this.setupEventListeners();
                this.updateButtonStates();
            }
        }
    }
    
    scrollPrev() {
        if (this.currentPosition > 0) {
            this.currentPosition -= this.stepSize;
            this.updateSliderPosition();
            this.updateButtonStates();
        }
    }
    
    scrollNext() {
        const maxPosition = this.products.length - this.productsPerView;
        if (this.currentPosition < maxPosition) {
            this.currentPosition += this.stepSize;
            this.updateSliderPosition();
            this.updateButtonStates();
        }
    }
    
    updateSliderPosition() {
        const track = document.getElementById(`track-${this.categoryId}`);
        if (!track) return;
        
        // Hitung lebar satu produk + gap
        const productCards = track.querySelectorAll('.product-slider-card');
        if (productCards.length === 0) return;
        
        const productWidth = productCards[0].offsetWidth;
        const gap = 15; // Sesuai dengan CSS gap
        const translateX = -(this.currentPosition * (productWidth + gap));
        
        track.style.transform = `translateX(${translateX}px)`;
    }
    
    updateButtonStates() {
        const prevBtn = document.getElementById(`prev-${this.categoryId}`);
        const nextBtn = document.getElementById(`next-${this.categoryId}`);
        
        if (!prevBtn || !nextBtn) return;
        
        // Cek apakah sudah di awal
        if (this.currentPosition <= 0) {
            prevBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
        }
        
        // Cek apakah sudah di akhir
        const maxPosition = this.products.length - this.productsPerView;
        if (this.currentPosition >= maxPosition) {
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
        }
    }
}

// Fungsi untuk render kategori tunggal dalam GRID MODE (tanpa slider)
function renderCategoryGrid(categoryId) {
    const productsContainer = document.getElementById('productsContainer');
    const categoryProducts = produkDataSimple.filter(product => product.category === categoryId);
    const info = categoryInfo[categoryId];
    
    if (categoryProducts.length === 0) {
        productsContainer.innerHTML = '<p class="slider-loading">Tidak ada produk dalam kategori ini.</p>';
        return;
    }
    
    productsContainer.innerHTML = `
        <div class="category-slider-container grid-mode">
            <div class="category-header-slider">
                <div class="category-title-slider">
                    <div class="category-icon-slider">
                        <i class="${info.icon}"></i>
                    </div>
                    <h3>${info.name} <span class="products-count">(${categoryProducts.length} produk)</span></h3>
                </div>
            </div>
            
            <div class="products-grid-container" id="grid-${categoryId}">
                ${categoryProducts.map(product => `
                    <a href="${product.link || '#'}" class="product-grid-card" data-category="${product.category}">
                        <div class="product-grid-image">
                            <img src="${getProductImage(product)}" alt="${product.title}" loading="lazy">
                        </div>
                        <div class="product-grid-title">
                            ${product.title}
                        </div>
                    </a>
                `).join('')}
            </div>
        </div>
    `;
}

// Helper function untuk mendapatkan gambar produk
function getProductImage(product) {
    if (product.image && product.image !== "images/products/") {
        return product.image;
    }
    
    const fallbackImages = {
        "digital-printing": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "sablon": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=70",
        "akrilik": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        "signage": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=50",
        "merchandise": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=40",
        "gerobak": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=30"
    };
    
    return fallbackImages[product.category] || fallbackImages["digital-printing"];
}

// Manager untuk semua slider produk
class ProductManager {
    constructor() {
        this.categorySliders = {};
        this.currentFilter = 'all';
        this.productsContainer = document.getElementById('productsContainer');
        
        this.init();
    }
    
    init() {
        this.renderAllCategories();
        this.setupFilterButtons();
        this.setupResizeHandler();
    }
    
    renderAllCategories() {
        this.productsContainer.innerHTML = '';
        this.categorySliders = {};
        
        Object.keys(categoryInfo).forEach(categoryId => {
            const categoryProducts = produkDataSimple.filter(product => product.category === categoryId);
            
            if (categoryProducts.length > 0) {
                const sliderId = `slider-${categoryId}`;
                const categoryDiv = document.createElement('div');
                categoryDiv.id = sliderId;
                this.productsContainer.appendChild(categoryDiv);
                
                this.categorySliders[categoryId] = new CategorySliderSimple(sliderId, categoryProducts, categoryId);
            }
        });
    }
    
    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filterValue = button.getAttribute('data-filter');
                this.currentFilter = filterValue;
                
                // Render based on filter
                if (filterValue === 'all') {
                    this.renderAllCategories();
                } else {
                    renderCategoryGrid(filterValue);
                }
            });
        });
    }
    
    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (this.currentFilter === 'all') {
                    Object.values(this.categorySliders).forEach(slider => {
                        if (slider.handleResize) {
                            slider.handleResize();
                        }
                    });
                }
            }, 250);
        });
    }
}

// Initialize product manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi product manager
    if (document.getElementById('productsContainer')) {
        new ProductManager();
    }
    
    // Optimasi gambar
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.onerror = function() {
            console.warn('Gambar gagal dimuat:', this.src);
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9IiNmNWY1ZjUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjODg4Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
            this.alt = 'Gambar tidak tersedia';
        };
    });
});



// Product Filtering Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const productsContainer = document.getElementById('productsContainer');

// Fungsi untuk mendapatkan gambar fallback jika gambar tidak ditemukan
function getProductImage(product) {
    // Jika ada image custom, gunakan itu
    if (product.image && product.image !== "images/products/") {
        return product.image;
    }
    
    // Fallback ke gambar placeholder berdasarkan kategori
    const categoryImages = {
        "digital-printing": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "sablon": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=70",
        "akrilik": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        "signage": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=50",
        "merchandise": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=40",
        "gerobak": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=30"
    };
    
    return categoryImages[product.category] || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
}

// Render semua produk dalam satu grid (untuk filter "Semua Produk")
function renderAllProducts() {
    productsContainer.innerHTML = '';
    
    const productsGrid = document.createElement('div');
    productsGrid.className = 'products-grid-all';
    
    produkDataSimple.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    productsContainer.appendChild(productsGrid);
}

// Render kategori spesifik dengan header
function renderCategory(categoryId) {
    productsContainer.innerHTML = '';
    
    if (!categoryInfo[categoryId]) return;
    
    // Buat section kategori
    const categorySection = document.createElement('div');
    categorySection.className = 'product-category-section';
    
    // Header kategori
    const categoryHeader = document.createElement('div');
    categoryHeader.className = 'category-header';
    
    const info = categoryInfo[categoryId];
    categoryHeader.innerHTML = `
        <div class="category-icon">
            <i class="${info.icon}"></i>
        </div>
        <div class="category-title-text">
            <h3>${info.name}</h3>
            <p>${info.description}</p>
        </div>
    `;
    
    categorySection.appendChild(categoryHeader);
    
    // Grid produk
    const productsGrid = document.createElement('div');
    productsGrid.className = 'products-grid-category';
    
    // Filter produk berdasarkan kategori
    const filteredProducts = produkDataSimple.filter(product => product.category === categoryId);
    
    // Tambahkan produk ke grid
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    categorySection.appendChild(productsGrid);
    productsContainer.appendChild(categorySection);
}

// Render semua kategori seperti dalam gambar (dengan header masing-masing)
function renderAllCategories() {
    productsContainer.innerHTML = '';
    
    // Untuk setiap kategori
    Object.keys(categoryInfo).forEach((categoryId, index) => {
        const info = categoryInfo[categoryId];
        const categoryProducts = produkDataSimple.filter(product => product.category === categoryId);
        
        if (categoryProducts.length === 0) return;
        
        // Buat section kategori
        const categorySection = document.createElement('div');
        categorySection.className = 'product-category-section';
        
        // Header kategori
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';
        
        categoryHeader.innerHTML = `
            <div class="category-icon">
                <i class="${info.icon}"></i>
            </div>
            <div class="category-title-text">
                <h3>${info.name}</h3>
                <p>${info.description}</p>
            </div>
        `;
        
        categorySection.appendChild(categoryHeader);
        
        // Grid produk
        const productsGrid = document.createElement('div');
        productsGrid.className = 'products-grid-category';
        
        // Tambahkan produk (maksimal 5 untuk tampilan awal)
        categoryProducts.slice(0, 5).forEach(product => {
            const productCard = createProductCard(product);
            productsGrid.appendChild(productCard);
        });
        
        categorySection.appendChild(productsGrid);
        productsContainer.appendChild(categorySection);
        
        // Tambahkan divider antara kategori (kecuali untuk kategori terakhir)
        if (index < Object.keys(categoryInfo).length - 1) {
            const divider = document.createElement('hr');
            divider.className = 'category-divider';
            productsContainer.appendChild(divider);
        }
    });
}

// Fungsi helper untuk membuat card produk
function createProductCard(product) {
    const productCard = document.createElement('a');
    productCard.className = 'product-card-simple';
    productCard.href = product.link || '#';
    productCard.setAttribute('data-category', product.category);
    
    // Gunakan gambar produk atau fallback
    const productImage = getProductImage(product);
    
    productCard.innerHTML = `
        <div class="product-image-simple">
            <img src="${productImage}" alt="${product.title}" loading="lazy">
        </div>
        <div class="product-title-simple">
            ${product.title}
        </div>
    `;
    
    return productCard;
}

// Inisialisasi: render semua kategori seperti dalam gambar
renderAllCategories();

// Event listener untuk filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Render berdasarkan filter
        if (filterValue === 'all') {
            renderAllCategories();
        } else {
            renderCategory(filterValue);
        }
    });
});

// Testimonial Slider Functionality
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialPrevBtn = document.getElementById('testimonialPrevBtn');
const testimonialNextBtn = document.getElementById('testimonialNextBtn');

let currentTestimonial = 0;
const totalTestimonials = testimonialSlides.length;

function updateTestimonialSlider() {
    testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
}

testimonialNextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    updateTestimonialSlider();
});

testimonialPrevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    updateTestimonialSlider();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.getAttribute('href') !== '#') {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set the first navigation link as active
    if (document.querySelector('nav ul li a')) {
        document.querySelector('nav ul li a').classList.add('active');
    }
});

// Optimasi gambar slider
function optimizeSliderImages() {
    const sliderImages = document.querySelectorAll('.slider img');
    
    sliderImages.forEach(img => {
        // Tambahkan attribute untuk lazy loading
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Tambahkan error handling
        img.addEventListener('error', function() {
            console.warn('Gambar gagal dimuat:', this.src);
            // Fallback ke gambar placeholder jika diperlukan
            this.src = 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
        });
        
        // Preload gambar berikutnya untuk transisi yang smooth
        const nextSlideIndex = (Array.from(sliderImages).indexOf(img) + 1) % sliderImages.length;
        if (sliderImages[nextSlideIndex]) {
            const nextImg = new Image();
            nextImg.src = sliderImages[nextSlideIndex].src;
        }
    });
}

// Panggil fungsi saat DOM siap
document.addEventListener('DOMContentLoaded', optimizeSliderImages);

