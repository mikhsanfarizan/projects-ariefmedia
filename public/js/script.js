/**
 * SCRIPT.JS - Arief Media Grafikart
 * Fitur: Mobile Menu, Slider, Product Fetching, Detail Page (Zoom + Gallery + Video)
 */

// ================= 1. UI INTERACTION (Mobile Menu & Scroll) =================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mainNav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    document.addEventListener('click', (e) => {
        if (mainNav.classList.contains('active') &&
            !mainNav.contains(e.target) &&
            !mobileMenuBtn.contains(e.target)) {
            mainNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 150)) {
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

// ================= 2. MAIN SLIDER (HERO SECTION) =================

const mainSlider = document.getElementById('mainSlider');
if (mainSlider) {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('sliderDots');

    let currentSlide = 0;
    const totalSlides = slides.length;

    if (sliderDots) {
        sliderDots.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetInterval();
            });
            sliderDots.appendChild(dot);
        }
    }

    const dots = document.querySelectorAll('.dot');

    function goToSlide(slideIndex) {
        mainSlider.style.transform = `translateX(-${slideIndex * 100}%)`;
        currentSlide = slideIndex;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
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

    let slideInterval = setInterval(nextSlide, 5000);

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
}

// ================= 3. PRODUCT MANAGEMENT (JSON FETCH) =================

const categoryInfo = {
    "digital-printing": {
        name: "Digital Printing",
        icon: "fas fa-print",
        description: "Solusi cetak digital cepat untuk berbagai kebutuhan promosi."
    },
    "sablon": {
        name: "Sablon Digital",
        icon: "fas fa-tshirt",
        description: "Sablon berkualitas pada kain, plastik, dan merchandise."
    },
    "akrilik": {
        name: "Produk Akrilik",
        icon: "fas fa-gem",
        description: "Kreasi akrilik laser cutting yang presisi dan elegan."
    },
    "signage": {
        name: "Signage & Papan",
        icon: "fas fa-map-signs",
        description: "Papan nama, neon box, dan petunjuk arah profesional."
    },
    "merchandise": {
        name: "Merchandise",
        icon: "fas fa-gift",
        description: "Souvenir unik dan custom untuk hadiah atau promosi."
    },
    "gerobak": {
        name: "Gerobak Custom",
        icon: "fas fa-truck",
        description: "Branding gerobak usaha agar lebih menarik."
    }
};

let allProductsData = [];

function mapJsonCategoryToUi(jsonCategoryString) {
    const cat = jsonCategoryString.toLowerCase();

    if (cat.includes('stiker') || cat.includes('baliho') || cat.includes('banner') || cat.includes('bendera') || cat.includes('id card') || cat.includes('buku') || cat.includes('undangan') || cat.includes('kartu')) return 'digital-printing';
    if (cat.includes('sablon') || cat.includes('kaos') || cat.includes('jersey') || cat.includes('lanyard') || cat.includes('pdh') || cat.includes('pakaian')) return 'sablon';
    if (cat.includes('akrilik') || cat.includes('tempat tisu') || cat.includes('nomor meja') || cat.includes('piala') || cat.includes('vandel') || cat.includes('nama dada')) return 'akrilik';
    if (cat.includes('papan') || cat.includes('wall') || cat.includes('neon') || cat.includes('prasasti') || cat.includes('letter') || cat.includes('logo')) return 'signage';
    if (cat.includes('gantungan') || cat.includes('jam') || cat.includes('pin') || cat.includes('mug')) return 'merchandise';
    if (cat.includes('gerobak')) return 'gerobak';

    return 'digital-printing';
}

async function loadProducts() {
  try {
    const response = await fetch("/product/list");
    if (!response.ok) throw new Error("Gagal memuat data.json");

    const rawData = await response.json();

    allProductsData = rawData.map((item) => ({
      ...item,
      ui_category: mapJsonCategoryToUi(item.categories || ""),
    }));

    // Halaman Home
    if (document.getElementById("productsContainer")) {
      new ProductManager(allProductsData);
    }

    // Halaman Detail
    if (window.location.pathname.includes("product")) {
      initDetailPage();
    }
  } catch (error) {
    console.error("Error loading products:", error);
    const container = document.getElementById("productsContainer");
    if (container)
      container.innerHTML =
        '<p class="slider-loading">Gagal memuat produk. Pastikan file data.json tersedia.</p>';
  }
}

function getProductImage(product) {
  if (product.featured_image) return product.featured_image;
  if (product.gallery_images) {
    const images = product.gallery_images.split(",");
    if (images.length > 0) return images[0].trim();
  }
  return "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
}

// Helper: Create HTML Element for Product Card
function createProductCardElement(product) {
  const card = document.createElement("a");
  card.href = `/product/${product.slug}`;
  card.className = "product-card-simple position-relative";

  card.innerHTML = `
        <div class="product-image-simple">
            <img src="${getProductImage(product)}" alt="${
    product.product_name
  }" loading="lazy">
        </div>
        <svg class="product-blob-title position-absolute " width="100%" height="100%" id="svg" viewBox="0 0 1440 590" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="38%" y1="1%" x2="62%" y2="99%"><stop offset="5%" stop-color="#0693e3"></stop><stop offset="95%" stop-color="#9900ef"></stop></linearGradient></defs><path d="M 0,600 L 0,300 C 109.33333333333331,314.66666666666663 218.66666666666663,329.3333333333333 400,289 C 581.3333333333334,248.66666666666669 834.6666666666667,153.33333333333334 1020,121 C 1205.3333333333333,88.66666666666666 1322.6666666666665,119.33333333333333 1440,150 L 1440,600 L 0,600 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg>
        <div class="product-title-simple position-absolute">
            ${product.product_name}
        </div>
    `;
  return card;
}

class CategorySliderSimple {
  constructor(containerId, products, categoryId) {
    this.container = document.getElementById(containerId);
    this.products = products;
    this.categoryId = categoryId;
    this.currentPosition = 0;
    this.productsPerView = 5;
    this.stepSize = 1;
    this.calculateProductsPerView();
    this.init();
  }

  calculateProductsPerView() {
    const width = window.innerWidth;
    if (width >= 1200) this.productsPerView = 5;
    else if (width >= 992) this.productsPerView = 4;
    else if (width >= 768) this.productsPerView = 3;
    else if (width >= 576) this.productsPerView = 2;
    else this.productsPerView = 1;
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

    this.container.innerHTML = `
            <div class="category-slider-container ${
              !this.hasNavigation ? "category-few-products" : ""
            }">
                <div class="category-header-slider">
                    <div class="category-title-slider">
                        <div class="category-icon-slider"><i class="${
                          info.icon
                        }"></i></div>
                        <h3>${info.name} <span class="products-count">(${
      this.products.length
    } Produk)</span></h3>
                    </div>
                </div>
                <div class="slider-main-container">
                    ${
                      this.hasNavigation
                        ? `<button class="category-nav-side prev-side" id="prev-${this.categoryId}" disabled><i class="fas fa-chevron-left"></i></button>`
                        : ""
                    }
                    <div class="products-slider-wrapper">
                        <div class="products-slider-track" id="track-${
                          this.categoryId
                        }"></div>
                    </div>
                    ${
                      this.hasNavigation
                        ? `<button class="category-nav-side next-side" id="next-${this.categoryId}"><i class="fas fa-chevron-right"></i></button>`
                        : ""
                    }
                </div>
            </div>
        `;

    const track = document.getElementById(`track-${this.categoryId}`);
    this.products.forEach((product) => {
      const cardLink = createProductCardElement(product);
      const sliderCard = document.createElement("a");
      sliderCard.href = cardLink.href;
      sliderCard.className = "product-slider-card position-relative";
      sliderCard.innerHTML = cardLink.innerHTML;
      track.appendChild(sliderCard);
    });
  }

  setupEventListeners() {
    const prevBtn = document.getElementById(`prev-${this.categoryId}`);
    const nextBtn = document.getElementById(`next-${this.categoryId}`);
    if (prevBtn) prevBtn.addEventListener("click", () => this.scrollPrev());
    if (nextBtn) nextBtn.addEventListener("click", () => this.scrollNext());

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.handleResize(), 250);
    });
  }

  handleResize() {
    const oldVal = this.productsPerView;
    this.calculateProductsPerView();
    if (oldVal !== this.productsPerView) {
      this.currentPosition = 0;
      this.render();
    }
  }

  scrollPrev() {
    if (this.currentPosition > 0) {
      this.currentPosition -= this.stepSize;
      this.updateSlider();
    }
  }

  scrollNext() {
    const maxPos = this.products.length - this.productsPerView;
    if (this.currentPosition < maxPos) {
      this.currentPosition += this.stepSize;
      this.updateSlider();
    }
  }

  updateSlider() {
    const track = document.getElementById(`track-${this.categoryId}`);
    const card = track.querySelector(".product-slider-card");
    if (!card) return;
    const width = card.offsetWidth + 15;
    track.style.transform = `translateX(-${this.currentPosition * width}px)`;
    this.updateButtonStates();
  }

  updateButtonStates() {
    const prevBtn = document.getElementById(`prev-${this.categoryId}`);
    const nextBtn = document.getElementById(`next-${this.categoryId}`);
    const maxPos = this.products.length - this.productsPerView;
    if (prevBtn) prevBtn.disabled = this.currentPosition <= 0;
    if (nextBtn) nextBtn.disabled = this.currentPosition >= maxPos;
  }
}

class ProductManager {
  constructor(data) {
    this.productsData = data;
    this.container = document.getElementById("productsContainer");
    this.init();
  }

  init() {
    this.renderAllCategories();
    this.setupFilters();
  }

  renderAllCategories() {
    this.container.innerHTML = "";
    Object.keys(categoryInfo).forEach((catId) => {
      const products = this.productsData.filter((p) => p.ui_category === catId);
      if (products.length > 0) {
        const div = document.createElement("div");
        div.id = `slider-${catId}`;
        this.container.appendChild(div);
        new CategorySliderSimple(`slider-${catId}`, products, catId);
        const hr = document.createElement("hr");
        hr.className = "category-divider";
        this.container.appendChild(hr);
      }
    });
    if (this.container.lastChild) this.container.lastChild.remove();
  }

  renderSingleCategory(catId) {
    this.container.innerHTML = "";
    if (!categoryInfo[catId]) return;

    const info = categoryInfo[catId];
    const products = this.productsData.filter((p) => p.ui_category === catId);

    const section = document.createElement("div");
    section.className = "product-category-section";
    section.innerHTML = `
            <div class="category-header">
                <div class="category-icon"><i class="${info.icon}"></i></div>
                <div class="category-title-text">
                    <h3>${info.name}</h3><p>${info.description}</p>
                </div>
            </div>
            <div class="products-grid-category"></div>
        `;

    const grid = section.querySelector(".products-grid-category");
    if (products.length === 0) {
      grid.innerHTML = "<p>Produk belum tersedia.</p>";
    } else {
      products.forEach((p) => {
        grid.appendChild(createProductCardElement(p));
      });
    }
    this.container.appendChild(section);
  }

  setupFilters() {
    const btns = document.querySelectorAll(".filter-btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");
        if (filter === "all") this.renderAllCategories();
        else this.renderSingleCategory(filter);
      });
    });
  }
}

// ================= 4. TESTIMONIALS SLIDER =================
const testimonialTrack = document.getElementById("testimonialTrack");
const testimonialPrevBtn = document.getElementById("testimonialPrevBtn");
const testimonialNextBtn = document.getElementById("testimonialNextBtn");

if (testimonialTrack) {
  const slides = document.querySelectorAll(".testimonial-slide");
  let index = 0;

  function updateTestimonial() {
    testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
  }

  if (testimonialNextBtn) {
    testimonialNextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      updateTestimonial();
    });
  }

  if (testimonialPrevBtn) {
    testimonialPrevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      updateTestimonial();
    });
  }
}

// ================= 5. INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});

// ================= 6. DETAIL PAGE LOGIC (ZOOM + GALLERY + VIDEO) =================

function initDetailPage() {
  // Polling: Menunggu data siap
  const hydrationProduct = document.getElementById("hydration-data").getAttribute("data");
  const productData = JSON.parse(hydrationProduct);
  const checkDataInterval = setInterval(() => {
    if (typeof productData !== "undefined" && productData !== "") {
      clearInterval(checkDataInterval);

      const product = productData;

      if (product) {
        renderDetailContent(product);
      } else {
        document.querySelector(".detail-grid").innerHTML =
          "<h3>Produk tidak ditemukan.</h3>";
      }
    }
  }, 100);
}

function renderDetailContent(product) {
    // 1. Render Teks Info
    document.title = `${product.product_name} - Arief Media`;
    document.getElementById('breadcrumb-title').textContent = product.product_name;
    document.getElementById('breadcrumb-category').textContent = product.categories;
    document.getElementById('product-title').textContent = product.product_name;
    document.getElementById('product-category').textContent = product.categories;
    document.getElementById('product-tags').textContent = product.tags;
    document.getElementById('product-description').innerHTML = product.description;

    const waBtn = document.getElementById('wa-button');
    if (waBtn) waBtn.href = product.external_url;

    // 2. Persiapan Galeri Media
    let mediaList = [];

    // A. Featured Image
    if (product.featured_image) {
        mediaList.push({
            type: 'image',
            src: product.featured_image
        });
    }

    // Helper Parse CSV
    const processMedia = (str, type) => {
        if (!str) return;
        const items = str.split(',').map(s => s.trim());
        items.forEach(item => {
            if (item && item !== product.featured_image) {
                if (type === 'video') {
                    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                    const match = item.match(regExp);
                    if (match && match[2].length === 11) {
                        mediaList.push({
                            type: 'video',
                            src: `https://www.youtube.com/embed/${match[2]}`,
                            thumbnail: `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`
                        });
                    }
                } else {
                    mediaList.push({
                        type: 'image',
                        src: item
                    });
                }
            }
        });
    };

    processMedia(product.gallery_images, 'image');
    processMedia(product.gallery_videos, 'video');

    // 3. Render ke DOM
    const mainImg = document.getElementById('main-image');
    const mainVideo = document.getElementById('main-video');
    const thumbContainer = document.getElementById('thumbnail-container');
    const btnZoom = document.getElementById('btn-zoom');
    const displayContainer = document.querySelector('.main-media-display');

    // Reset Area
    thumbContainer.innerHTML = '';
    mainImg.classList.remove('active');
    mainVideo.classList.remove('active');
    if (btnZoom) btnZoom.style.display = 'none';

    // Clean up
    const oldArrows = displayContainer.querySelectorAll('.nav-arrow-prev, .nav-arrow-next, .mobile-slider-indicator');
    oldArrows.forEach(el => el.remove());

    // --- STATE MANAGEMENT ---
    let currentIndex = 0;

    // Fungsi Ganti Gambar Utama
    const setMainDisplay = (index, direction = 'next') => {
        const media = mediaList[index];
        currentIndex = index;

        // Reset Class Animasi
        mainImg.classList.remove('active', 'anim-next', 'anim-prev');
        void mainImg.offsetWidth; // Force Reflow

        // Reset Zoom Style
        mainImg.style.transform = "scale(1)";
        mainImg.style.transformOrigin = "center center";

        if (media.type === 'image') {
            mainVideo.classList.remove('active');
            mainVideo.src = "";

            mainImg.src = `/${media.src}`;
            mainImg.classList.add('active');

            if (direction === 'next') {
                mainImg.classList.add('anim-next');
            } else {
                mainImg.classList.add('anim-prev');
            }

            if (btnZoom) {
                btnZoom.style.display = 'block';
                btnZoom.onclick = (e) => {
                    e.stopPropagation();
                    openLightbox(`/${media.src}`);
                };
            }
        } else {
            mainImg.classList.remove('active');
            if (btnZoom) btnZoom.style.display = 'none';

            const videoSrc = media.src.includes('?') ? `${media.src}&autoplay=1` : `${media.src}?autoplay=1`;
            mainVideo.src = videoSrc;
            mainVideo.classList.add('active');
        }

        // Update Active Thumbnail
        document.querySelectorAll('.thumb-box').forEach((el, idx) => {
            if (idx === currentIndex) {
                el.classList.add('active-thumb');
                el.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            } else {
                el.classList.remove('active-thumb');
            }
        });
    };

    const changeMedia = (direction) => {
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % mediaList.length;
        } else {
            currentIndex = (currentIndex - 1 + mediaList.length) % mediaList.length;
        }
        setMainDisplay(currentIndex, direction);
    };

    // --- LOGIKA SWIPE (TOUCH EVENTS ONLY) ---
    let touchStartX = 0;
    let touchEndX = 0;

    displayContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {
        passive: true
    });

    displayContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {
        passive: true
    });

    function handleSwipe() {
        const threshold = 50;
        if (touchStartX - touchEndX > threshold) {
            changeMedia('next');
        }
        if (touchEndX - touchStartX > threshold) {
            changeMedia('prev');
        }
    }

    // --- LOGIKA HOVER ZOOM (Hanya Desktop) ---
    displayContainer.onmousemove = function(e) {
        if (window.innerWidth > 768 && mainImg.classList.contains('active')) {
            const {
                left,
                top,
                width,
                height
            } = displayContainer.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            const xPercent = (x / width) * 100;
            const yPercent = (y / height) * 100;

            mainImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
            mainImg.style.transform = "scale(2)";
        }
    };

    displayContainer.onmouseleave = function() {
        if (mainImg.classList.contains('active')) {
            mainImg.style.transform = "scale(1)";
            setTimeout(() => {
                mainImg.style.transformOrigin = "center center";
            }, 300);
        }
    };

    // --- INITIAL RENDER ---
    if (mediaList.length > 0) {
        setMainDisplay(0, 'next');
    }

    // Render Thumbnails
    mediaList.forEach((media, index) => {
        const thumbBox = document.createElement('div');
        thumbBox.className = 'thumb-box';

        if (media.type === 'image') {
            thumbBox.innerHTML = `<img src="/${media.src}" alt="Thumb">`;
        } else {
            thumbBox.innerHTML = `
                <img src="${media.thumbnail}" alt="Video">
                <div class="video-thumb-overlay"><i class="fas fa-play"></i></div>
            `;
        }

        thumbBox.onclick = () => setMainDisplay(index, 'next');
        thumbContainer.appendChild(thumbBox);
    });
}

// LOGIKA LIGHTBOX (ZOOM)
const lightbox = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

function openLightbox(src) {
    if (lightbox && lightboxImg) {
        lightbox.style.display = "flex";
        lightbox.style.alignItems = "center";
        lightbox.style.justifyContent = "center";
        lightboxImg.src = src;
    }
}

if (closeLightbox) {
    closeLightbox.onclick = () => {
        lightbox.style.display = "none";
    }
}

if (lightbox) {
    lightbox.onclick = (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    }
}