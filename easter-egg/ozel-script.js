// DOM Elementleri
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const modal = document.getElementById("add-modal");
const closeModal = document.querySelector(".close");
const addForm = document.getElementById("add-form");

// Aşk sayacı için başlangıç tarihi
const loveStartDate = new Date("2024-10-08T22:50:00");

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  initializeLoveTimer();
  initializeModal();
  loadStoredData();
  initializeFloatingHearts();
});

// Navigasyon fonksiyonları
function initializeNavigation() {
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSection = this.getAttribute("data-section");
      showSection(targetSection);
      updateActiveNavLink(this);

      // Mobil menüyü kapat
      navMenu.classList.remove("active");
    });
  });

  // Mobil menü toggle
  mobileMenuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });

  // Modal dışına tıklandığında kapat
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModalFunction();
    }
  });
}

function showSection(sectionId) {
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add("active");
  }
}

function updateActiveNavLink(activeLink) {
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
  activeLink.classList.add("active");
}

// Aşk sayacı fonksiyonları
function initializeLoveTimer() {
  updateLoveTimer();
  setInterval(updateLoveTimer, 1000);
}

function updateLoveTimer() {
  const now = new Date();
  const diff = now - loveStartDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("love-days").textContent = days;
  document.getElementById("love-hours").textContent = hours;
  document.getElementById("love-minutes").textContent = minutes;
  document.getElementById("love-seconds").textContent = seconds;
}

// Modal fonksiyonları
function initializeModal() {
  closeModal.addEventListener("click", closeModalFunction);

  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    handleFormSubmit();
  });
}

function openAddModal(type) {
  const modalTitle = document.getElementById("modal-title");
  const typeLabels = {
    film: "Yeni Film Ekle",
    dizi: "Yeni Dizi Ekle",
    oyun: "Yeni Oyun Ekle",
    mekan: "Yeni Mekan Ekle",
    anı: "Yeni Anı Ekle",
  };

  modalTitle.textContent = typeLabels[type] || "Yeni Ekle";
  modal.style.display = "block";

  // Formu temizle
  addForm.reset();
  addForm.dataset.type = type;
}

function closeModalFunction() {
  modal.style.display = "none";
  addForm.reset();
}

function handleFormSubmit() {
  const formData = {
    id: Date.now(),
    name: document.getElementById("item-name").value,
    description: document.getElementById("item-description").value,
    rating: document.getElementById("item-rating").value,
    date: document.getElementById("item-date").value,
    image: document.getElementById("item-image").value,
    type: addForm.dataset.type,
    createdAt: new Date().toISOString(),
  };

  // Veriyi localStorage'a kaydet
  saveItem(formData);

  // Kartı ekle
  addCard(formData);

  // Modal'ı kapat
  closeModalFunction();

  // Başarı mesajı göster
  showNotification(`${formData.name} başarıyla eklendi! 💕`);
}

// Veri yönetimi fonksiyonları
function saveItem(item) {
  const items = getStoredItems();
  items.push(item);
  localStorage.setItem("lovePageData", JSON.stringify(items));
}

function getStoredItems() {
  const stored = localStorage.getItem("lovePageData");
  return stored ? JSON.parse(stored) : [];
}

function loadStoredData() {
  const items = getStoredItems();

  // Eğer hiç veri yoksa örnek filmler ekle
  if (items.length === 0) {
    const sampleData = [
      // Filmler
      {
        id: 1,
        name: "Titanic",
        description: "Romantik drama filmi. Jack ve Rose'un aşk hikayesi...",
        rating: 10,
        date: "2024-01-15",
        image:
          "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400",
        type: "film",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "La La Land",
        description:
          "Müzikal romantik film. Sebastian ve Mia'nın Hollywood aşkı...",
        rating: 9,
        date: "2024-02-20",
        image:
          "https://images.unsplash.com/photo-1489599808412-4b8b8b8b8b8b?w=400",
        type: "film",
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        name: "The Notebook",
        description: "Klasik romantik film. Noah ve Allie'nin zamansız aşkı...",
        rating: 10,
        date: "2024-03-10",
        image:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
        type: "film",
        createdAt: new Date().toISOString(),
      },
      // Diziler
      {
        id: 4,
        name: "Friends",
        description: "Klasik komedi dizisi. 6 arkadaşın New York maceraları...",
        rating: 9,
        date: "2024-01-20",
        image:
          "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400",
        type: "dizi",
        createdAt: new Date().toISOString(),
      },
      {
        id: 5,
        name: "The Office",
        description:
          "Mokumenter komedi. Dunder Mifflin şirketindeki günlük hayat...",
        rating: 8,
        date: "2024-02-25",
        image:
          "https://images.unsplash.com/photo-1489599808412-4b8b8b8b8b8b?w=400",
        type: "dizi",
        createdAt: new Date().toISOString(),
      },
      {
        id: 6,
        name: "Stranger Things",
        description: "Bilim kurgu gerilim. Hawkins'teki gizemli olaylar...",
        rating: 9,
        date: "2024-03-15",
        image:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
        type: "dizi",
        createdAt: new Date().toISOString(),
      },
      // Oyunlar
      {
        id: 7,
        name: "It Takes Two",
        description: "Co-op macera oyunu. Cody ve May'in aşk hikayesi...",
        rating: 10,
        date: "2024-01-30",
        image:
          "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400",
        type: "oyun",
        createdAt: new Date().toISOString(),
      },
      {
        id: 8,
        name: "Overcooked 2",
        description:
          "Kaotik mutfak simülasyonu. Birlikte yemek yapma macerası...",
        rating: 8,
        date: "2024-02-10",
        image:
          "https://images.unsplash.com/photo-1489599808412-4b8b8b8b8b8b?w=400",
        type: "oyun",
        createdAt: new Date().toISOString(),
      },
      {
        id: 9,
        name: "Minecraft",
        description: "Yaratıcılık oyunu. Birlikte dünya inşa etme...",
        rating: 9,
        date: "2024-03-05",
        image:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
        type: "oyun",
        createdAt: new Date().toISOString(),
      },
      // Mekanlar
      {
        id: 10,
        name: "Boğaz Köprüsü",
        description:
          "İstanbul'un en romantik manzarası. Güneş batımında yürüyüş...",
        rating: 10,
        date: "2024-01-12",
        image:
          "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400",
        type: "mekan",
        createdAt: new Date().toISOString(),
      },
      {
        id: 11,
        name: "Galata Kulesi",
        description: "Tarihi kule manzarası. Şehri tepeden izleme...",
        rating: 9,
        date: "2024-02-18",
        image:
          "https://images.unsplash.com/photo-1489599808412-4b8b8b8b8b8b?w=400",
        type: "mekan",
        createdAt: new Date().toISOString(),
      },
      {
        id: 12,
        name: "Emirgan Korusu",
        description: "Doğa içinde romantik yürüyüş. Lale zamanı...",
        rating: 8,
        date: "2024-03-22",
        image:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
        type: "mekan",
        createdAt: new Date().toISOString(),
      },
      // Anılar
      {
        id: 13,
        name: "İlk Buluşma",
        description: "Unutulmaz ilk randevu. Kahve içerken tanışma...",
        rating: 10,
        date: "2024-10-08",
        image:
          "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400",
        type: "anı",
        createdAt: new Date().toISOString(),
      },
      {
        id: 14,
        name: "Doğum Günü",
        description: "Sürpriz doğum günü kutlaması. Pasta ve hediyeler...",
        rating: 10,
        date: "2024-11-15",
        image:
          "https://images.unsplash.com/photo-1489599808412-4b8b8b8b8b8b?w=400",
        type: "anı",
        createdAt: new Date().toISOString(),
      },
      {
        id: 15,
        name: "Yılbaşı Gecesi",
        description: "Birlikte geçirdiğimiz ilk yılbaşı. Havai fişekler...",
        rating: 9,
        date: "2024-12-31",
        image:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
        type: "anı",
        createdAt: new Date().toISOString(),
      },
    ];

    sampleData.forEach((item) => {
      saveItem(item);
      addCard(item);
    });
  } else {
    items.forEach((item) => {
      addCard(item);
    });
  }
}

// Kart ekleme fonksiyonları
function addCard(item) {
  const containerId = `${item.type}-cards`;
  const container = document.getElementById(containerId);

  if (!container) return;

  // Anılar için özel galeri kartı
  if (item.type === "anı") {
    const memoryItem = createMemoryCard(item);
    container.appendChild(memoryItem);
  } else {
    const card = createCard(item);
    container.appendChild(card);
  }
}

// Anı kartı oluşturma fonksiyonu
function createMemoryCard(item) {
  const memoryItem = document.createElement("div");
  memoryItem.className = "memory-item";
  memoryItem.dataset.id = item.id;

  const imageHtml = item.image
    ? `<img src="${item.image}" alt="${item.name}" class="memory-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZvdG9ncmFmIFlvcms8L3RleHQ+PC9zdmc+'">`
    : `<div class="memory-image" style="background: linear-gradient(45deg, #ff9a9e, #fecfef); display: flex; align-items: center; justify-content: center; color: #666; font-size: 1.2rem;">📷 Fotoğraf Yok</div>`;

  memoryItem.innerHTML = `
    ${imageHtml}
    <div class="memory-content">
      <h3 class="memory-title">${item.name}</h3>
      <p class="memory-description">${item.description || "Açıklama yok"}</p>
      <div class="memory-meta">
        <span class="memory-date">📅 ${formatDate(item.date)}</span>
        <span class="memory-rating">${generateHearts(item.rating)} ${
    item.rating
  }/10</span>
      </div>
    </div>
    <div class="memory-overlay">
      <h3>${item.name}</h3>
      <p>${item.description || "Unutulmaz anılarımız..."}</p>
      <div class="memory-hearts">💖</div>
    </div>
  `;

  // Anı kartına tıklama olayı ekle
  memoryItem.addEventListener("click", function () {
    showMemoryDetails(item);
  });

  return memoryItem;
}

// Anı detayları gösterme fonksiyonu
function showMemoryDetails(item) {
  const detailModal = document.createElement("div");
  detailModal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: modalFadeIn 0.3s ease-out;
  `;

  detailModal.innerHTML = `
    <div style="
      background: white;
      border-radius: 25px;
      padding: 30px;
      max-width: 500px;
      width: 90%;
      text-align: center;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
      animation: modalSlideIn 0.3s ease-out;
    ">
      <h2 style="font-family: 'Dancing Script', cursive; color: #e91e63; margin-bottom: 20px;">${
        item.name
      }</h2>
      <img src="${
        item.image ||
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZvdG9ncmFmIFlvcms8L3RleHQ+PC9zdmc+"
      }" 
           alt="${item.name}" 
           style="width: 100%; height: 250px; object-fit: cover; border-radius: 15px; margin-bottom: 20px;">
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">${
        item.description || "Unutulmaz anılarımız..."
      }</p>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <span style="color: #888;">📅 ${formatDate(item.date)}</span>
        <span style="background: linear-gradient(45deg, #e91e63, #f06292); color: white; padding: 5px 15px; border-radius: 20px;">${generateHearts(
          item.rating
        )} ${item.rating}/10</span>
      </div>
      <button onclick="this.closest('.memory-detail-modal').remove()" style="
        background: linear-gradient(45deg, #e91e63, #f06292);
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 600;
      ">💖 Kapat</button>
    </div>
  `;

  detailModal.className = "memory-detail-modal";
  document.body.appendChild(detailModal);

  // Modal dışına tıklandığında kapat
  detailModal.addEventListener("click", function (e) {
    if (e.target === detailModal) {
      detailModal.remove();
    }
  });
}

function createCard(item) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.id = item.id;

  const imageHtml = item.image
    ? `<img src="${item.image}" alt="${item.name}" class="card-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZvdG9ncmFmIFlvcms8L3RleHQ+PC9zdmc+'">`
    : `<div class="card-image" style="background: linear-gradient(45deg, #ff9a9e, #fecfef); display: flex; align-items: center; justify-content: center; color: #666; font-size: 1.2rem;">📷 Fotoğraf Yok</div>`;

  // Kart türüne göre ikon
  const typeIcon = {
    film: "🎬",
    dizi: "📺",
    oyun: "🎮",
    mekan: "📍",
    anı: "🖼️",
  };

  card.innerHTML = `
        <div class="card-header">
            <span class="card-type-icon">${typeIcon[item.type] || "📄"}</span>
            <div class="card-rating-badge">
                ${generateHearts(item.rating)} ${item.rating}/10
            </div>
        </div>
        ${imageHtml}
        <div class="card-content">
            <h3 class="card-title">${item.name}</h3>
            <p class="card-description">${
              item.description || "Açıklama yok"
            }</p>
            <div class="card-meta">
                <span class="card-date">📅 ${formatDate(item.date)}</span>
                <span class="card-type">${getTypeLabel(item.type)}</span>
            </div>
        </div>
        <div class="card-actions">
            <button class="btn-edit" onclick="editItem(${
              item.id
            })" title="Düzenle">
                <span>✏️</span>
                <span>Düzenle</span>
            </button>
            <button class="btn-delete" onclick="deleteItem(${
              item.id
            })" title="Sil">
                <span>🗑️</span>
                <span>Sil</span>
            </button>
            <button class="btn-favorite" onclick="toggleFavorite(${
              item.id
            })" title="Favorilere Ekle">
                <span>💖</span>
                <span>Favori</span>
            </button>
        </div>
    `;

  return card;
}

function getTypeLabel(type) {
  const labels = {
    film: "Film",
    dizi: "Dizi",
    oyun: "Oyun",
    mekan: "Mekan",
    anı: "Anı",
  };
  return labels[type] || "Öğe";
}

function generateHearts(rating) {
  return "❤️".repeat(Math.min(rating, 5));
}

function formatDate(dateString) {
  if (!dateString) return "Tarih yok";
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR");
}

// Düzenleme ve silme fonksiyonları
function editItem(id) {
  const items = getStoredItems();
  const item = items.find((i) => i.id === id);

  if (item) {
    // Formu doldur
    document.getElementById("item-name").value = item.name;
    document.getElementById("item-description").value = item.description || "";
    document.getElementById("item-rating").value = item.rating;
    document.getElementById("item-date").value = item.date || "";
    document.getElementById("item-image").value = item.image || "";

    // Modal'ı aç
    openAddModal(item.type);

    // Form submit'ini düzenleme için ayarla
    addForm.dataset.editId = id;
  }
}

function deleteItem(id) {
  if (confirm("Bu öğeyi silmek istediğinizden emin misiniz? 💔")) {
    // DOM'dan kaldır
    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) {
      card.remove();
    }

    // localStorage'dan kaldır
    const items = getStoredItems();
    const filteredItems = items.filter((item) => item.id !== id);
    localStorage.setItem("lovePageData", JSON.stringify(filteredItems));

    showNotification("Öğe silindi! 💔");
  }
}

// Favori fonksiyonu
function toggleFavorite(id) {
  const items = getStoredItems();
  const item = items.find((i) => i.id === id);

  if (item) {
    item.isFavorite = !item.isFavorite;
    localStorage.setItem("lovePageData", JSON.stringify(items));

    const card = document.querySelector(`[data-id="${id}"]`);
    const favoriteBtn = card.querySelector(".btn-favorite");

    if (item.isFavorite) {
      favoriteBtn.innerHTML = "<span>💖</span><span>Favori</span>";
      favoriteBtn.style.background = "#e91e63";
      showNotification("💖 Favorilere eklendi!");
    } else {
      favoriteBtn.innerHTML = "<span>🤍</span><span>Favori</span>";
      favoriteBtn.style.background = "#666";
      showNotification("🤍 Favorilerden çıkarıldı!");
    }
  }
}

// Arama ve filtreleme fonksiyonları
function initializeSearchAndFilter() {
  // Film arama
  const filmSearch = document.getElementById("film-search");
  const filmGenre = document.getElementById("film-genre");

  if (filmSearch) {
    filmSearch.addEventListener("input", () => filterItems("film"));
  }
  if (filmGenre) {
    filmGenre.addEventListener("change", () => filterItems("film"));
  }

  // Dizi arama
  const diziSearch = document.getElementById("dizi-search");
  const diziGenre = document.getElementById("dizi-genre");

  if (diziSearch) {
    diziSearch.addEventListener("input", () => filterItems("dizi"));
  }
  if (diziGenre) {
    diziGenre.addEventListener("change", () => filterItems("dizi"));
  }

  // Oyun arama
  const oyunSearch = document.getElementById("oyun-search");
  const oyunType = document.getElementById("oyun-type");

  if (oyunSearch) {
    oyunSearch.addEventListener("input", () => filterItems("oyun"));
  }
  if (oyunType) {
    oyunType.addEventListener("change", () => filterItems("oyun"));
  }

  // Mekan arama
  const mekanSearch = document.getElementById("mekan-search");
  const mekanType = document.getElementById("mekan-type");

  if (mekanSearch) {
    mekanSearch.addEventListener("input", () => filterItems("mekan"));
  }
  if (mekanType) {
    mekanType.addEventListener("change", () => filterItems("mekan"));
  }
}

function filterItems(type) {
  const searchInput = document.getElementById(`${type}-search`);
  const genreSelect = document.getElementById(`${type}-genre`);
  const cards = document.querySelectorAll(`#${type}-cards .card`);

  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
  const selectedGenre = genreSelect ? genreSelect.value : "";

  cards.forEach((card) => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    const description = card
      .querySelector(".card-description")
      .textContent.toLowerCase();

    const matchesSearch =
      title.includes(searchTerm) || description.includes(searchTerm);
    const matchesGenre =
      !selectedGenre || description.includes(selectedGenre.toLowerCase());

    if (matchesSearch && matchesGenre) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Bildirim fonksiyonu
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #e91e63, #f06292);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 10px 30px rgba(233, 30, 99, 0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// CSS animasyonları ekle
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Uçan kalpler animasyonu
function initializeFloatingHearts() {
  setInterval(createFloatingHeart, 3000);
}

function createFloatingHeart() {
  const hearts = ["💕", "💖", "💗", "💝", "💘", "❤️"];
  const heart = document.createElement("div");

  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        bottom: -50px;
        font-size: ${1 + Math.random() * 2}rem;
        z-index: 100;
        pointer-events: none;
        animation: floatUp 6s linear forwards;
    `;

  document.body.appendChild(heart);

  setTimeout(() => {
    if (heart.parentNode) {
      heart.parentNode.removeChild(heart);
    }
  }, 6000);
}

// Ana sayfa özel fonksiyonları
function initializeHomePageFeatures() {
  initializeLoveMessages();
  initializeSpecialButtons();
}

// Aşk mesajları rotasyonu
function initializeLoveMessages() {
  const messages = [
    "Birlikte geçirdiğimiz her an bir hazine... ❤️",
    "Sen benim sonsuzluğumsun... 💕",
    "Her gün seni daha çok seviyorum... 💖",
    "Sen olmadan hayatın anlamı yok... 💗",
  ];

  let currentMessageIndex = 0;

  setInterval(() => {
    const messageElement = document.getElementById("current-message");
    const indicators = document.querySelectorAll(".indicator");

    // Mevcut mesajı gizle
    messageElement.classList.remove("active");

    setTimeout(() => {
      // Yeni mesajı göster
      currentMessageIndex = (currentMessageIndex + 1) % messages.length;
      messageElement.textContent = messages[currentMessageIndex];
      messageElement.classList.add("active");

      // İndikatörleri güncelle
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === currentMessageIndex);
      });
    }, 500);
  }, 4000);
}

// Özel buton fonksiyonları
function initializeSpecialButtons() {
  // Butonlara hover efektleri ekle
  const specialBtns = document.querySelectorAll(".special-btn");
  specialBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)";
    });

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Rastgele kalp gönder
function showRandomHeart() {
  const hearts = ["💕", "💖", "💗", "💝", "💘", "❤️", "💙", "💚", "🧡", "💜"];
  const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];

  const heartElement = document.createElement("div");
  heartElement.textContent = randomHeart;
  heartElement.className = "random-heart";
  heartElement.style.left = Math.random() * 100 + "vw";
  heartElement.style.top = "50vh";
  heartElement.style.fontSize = 2 + Math.random() * 2 + "rem";

  document.body.appendChild(heartElement);

  setTimeout(() => {
    if (heartElement.parentNode) {
      heartElement.parentNode.removeChild(heartElement);
    }
  }, 2000);

  showNotification(`${randomHeart} Kalp gönderildi!`);
}

// Aşk sözü göster
function showLoveQuote() {
  const quotes = [
    "Aşk, iki kişinin birbirini bulması değil, birbirini aramasıdır. 💕",
    "Sen benim hayatımın en güzel hatası... 💖",
    "Aşk, kalbinin attığı her saniyede seni düşünmektir. 💗",
    "Sen olmadan geçen her gün, kayıp bir gündür. ❤️",
    "Aşk, seninle birlikte olmak istediğim her an... 💘",
    "Sen benim yarımım, ben senin tamamın... 💕",
    "Aşk, seninle birlikte yaşlanmak istemektir. 💖",
    "Sen benim sonsuzluğumsun, sonsuzluğum sensin. 💗",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const quoteElement = document.createElement("div");
  quoteElement.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.95);
    padding: 30px 40px;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(233, 30, 99, 0.3);
    z-index: 10000;
    max-width: 80%;
    text-align: center;
    font-size: 1.2rem;
    color: #333;
    border: 2px solid rgba(233, 30, 99, 0.2);
    animation: quoteAppear 0.5s ease-out;
  `;
  quoteElement.textContent = randomQuote;

  document.body.appendChild(quoteElement);

  setTimeout(() => {
    quoteElement.style.animation = "quoteDisappear 0.5s ease-out forwards";
    setTimeout(() => {
      if (quoteElement.parentNode) {
        quoteElement.parentNode.removeChild(quoteElement);
      }
    }, 500);
  }, 3000);
}

// Kalp patlaması efekti
function createHeartExplosion() {
  const hearts = ["💕", "💖", "💗", "💝", "💘", "❤️"];
  const explosionCount = 15;

  for (let i = 0; i < explosionCount; i++) {
    setTimeout(() => {
      const heartElement = document.createElement("div");
      heartElement.textContent =
        hearts[Math.floor(Math.random() * hearts.length)];
      heartElement.className = "heart-explosion";
      heartElement.style.left = 50 + (Math.random() - 0.5) * 20 + "vw";
      heartElement.style.top = 50 + (Math.random() - 0.5) * 20 + "vh";
      heartElement.style.fontSize = 1 + Math.random() * 2 + "rem";

      document.body.appendChild(heartElement);

      setTimeout(() => {
        if (heartElement.parentNode) {
          heartElement.parentNode.removeChild(heartElement);
        }
      }, 1000);
    }, i * 50);
  }

  showNotification("💥 Kalp patlaması!");
}

// CSS animasyonları ekle
const additionalStyle = document.createElement("style");
additionalStyle.textContent = `
  @keyframes quoteAppear {
    from { 
      opacity: 0; 
      transform: translate(-50%, -50%) scale(0.5); 
    }
    to { 
      opacity: 1; 
      transform: translate(-50%, -50%) scale(1); 
    }
  }
  @keyframes quoteDisappear {
    from { 
      opacity: 1; 
      transform: translate(-50%, -50%) scale(1); 
    }
    to { 
      opacity: 0; 
      transform: translate(-50%, -50%) scale(0.5); 
    }
  }
`;
document.head.appendChild(additionalStyle);

// Sayfa yüklendiğinde tüm özellikleri başlat
document.addEventListener("DOMContentLoaded", function () {
  // Performans için setTimeout kullanarak sıralı yükleme
  setTimeout(initializeSearchAndFilter, 100);
  setTimeout(initializeHomePageFeatures, 200);
  setTimeout(initializePerformanceOptimizations, 300);
  setTimeout(initializeKeyboardShortcuts, 400);
});

// Performans optimizasyonları
function initializePerformanceOptimizations() {
  // Lazy loading için intersection observer
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      }
    });
  });

  // Tüm görselleri gözlemle
  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });

  // Debounce fonksiyonu için arama optimizasyonu
  const searchInputs = document.querySelectorAll(".search-input");
  searchInputs.forEach((input) => {
    let timeout;
    input.addEventListener("input", function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const type = this.id.split("-")[0];
        filterItems(type);
      }, 300);
    });
  });
}

// Klavye kısayolları
function initializeKeyboardShortcuts() {
  document.addEventListener("keydown", function (e) {
    // ESC tuşu ile modal'ları kapat
    if (e.key === "Escape") {
      const modals = document.querySelectorAll(".modal, .memory-detail-modal");
      modals.forEach((modal) => {
        if (modal.style.display !== "none") {
          modal.style.display = "none";
        }
      });
    }

    // Ctrl/Cmd + K ile arama odakla
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      const activeSection = document.querySelector(".section.active");
      if (activeSection) {
        const searchInput = activeSection.querySelector(".search-input");
        if (searchInput) {
          searchInput.focus();
        }
      }
    }

    // Ctrl/Cmd + N ile yeni öğe ekle
    if ((e.ctrlKey || e.metaKey) && e.key === "n") {
      e.preventDefault();
      const activeSection = document.querySelector(".section.active");
      if (activeSection) {
        const addBtn = activeSection.querySelector(".add-btn");
        if (addBtn) {
          addBtn.click();
        }
      }
    }
  });
}

// Gelişmiş bildirim sistemi
function showAdvancedNotification(message, type = "success", duration = 3000) {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;

  const icons = {
    success: "💖",
    error: "💔",
    warning: "⚠️",
    info: "💡",
  };

  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${icons[type]}</span>
      <span class="notification-message">${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;

  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${
      type === "success"
        ? "linear-gradient(45deg, #e91e63, #f06292)"
        : type === "error"
        ? "linear-gradient(45deg, #f44336, #ef5350)"
        : type === "warning"
        ? "linear-gradient(45deg, #ff9800, #ffb74d)"
        : "linear-gradient(45deg, #2196f3, #64b5f6)"
    };
    color: white;
    padding: 0;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
    max-width: 350px;
    overflow: hidden;
  `;

  document.body.appendChild(notification);

  // Otomatik kapanma
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease-out forwards";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }
  }, duration);
}

// CSS animasyonları ekle
const notificationStyle = document.createElement("style");
notificationStyle.textContent = `
  .notification-content {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    gap: 10px;
  }
  
  .notification-icon {
    font-size: 1.2rem;
  }
  
  .notification-message {
    flex: 1;
    font-weight: 500;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.2s ease;
  }
  
  .notification-close:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  @keyframes slideInRight {
    from { 
      transform: translateX(100%); 
      opacity: 0; 
    }
    to { 
      transform: translateX(0); 
      opacity: 1; 
    }
  }
  
  @keyframes slideOutRight {
    from { 
      transform: translateX(0); 
      opacity: 1; 
    }
    to { 
      transform: translateX(100%); 
      opacity: 0; 
    }
  }
`;
document.head.appendChild(notificationStyle);

// Eski showNotification fonksiyonunu güncelle
const originalShowNotification = showNotification;
showNotification = function (message, type = "success") {
  showAdvancedNotification(message, type);
};
