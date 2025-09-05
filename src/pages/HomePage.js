import { categories } from '../components/Categories.js';
import firebaseService from '../services/firebase.service.mock.js';

export class HomePage {
  constructor(user) {
    this.user = user;
    this.items = [];
    this.filteredItems = [];
    this.currentFilter = 'all';
  }

  render() {
    return `
      <!-- Header -->
      <header class="swap-header">
        <div class="search-container">
          <div class="search-bar">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input type="text" class="search-input" placeholder="Nach Artikeln suchen..." id="searchInput">
            <button class="filter-btn" id="filterBtn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <!-- Logo Section -->
      <div class="logo-section">
        <svg class="swap-logo" width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="55" fill="white" stroke="var(--secondary)" stroke-width="2"/>
          <text x="60" y="75" text-anchor="middle" class="logo-text">SWAP</text>
        </svg>
      </div>

      <!-- Categories Grid -->
      <section class="categories-section">
        <div class="categories-grid">
          ${this.renderCategories()}
        </div>
      </section>

      <!-- Items Feed -->
      <section class="feed-section">
        <div class="feed-header">
          <h2>Neueste Tauschangebote</h2>
          <div class="feed-filters">
            <button class="filter-chip active" data-filter="all">Alle</button>
            <button class="filter-chip" data-filter="nearby">In der Nhe</button>
            <button class="filter-chip" data-filter="today">Heute</button>
          </div>
        </div>
        <div class="items-grid" id="itemsGrid">
          <!-- Items will be loaded here -->
        </div>
      </section>

      <!-- Bottom Navigation -->
      <nav class="bottom-nav">
        <button class="nav-item active" data-page="home">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          <span>Home</span>
        </button>
        <button class="nav-item" data-page="favorites">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
          <span>Favoriten</span>
        </button>
        <button class="camera-btn" id="cameraBtn">
          <div class="camera-inner">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </div>
        </button>
        <button class="nav-item" data-page="messages">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <span>Chats</span>
        </button>
        <button class="nav-item" data-page="profile">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          <span>Profil</span>
        </button>
      </nav>
    `;
  }

  renderCategories() {
    return categories.slice(0, 14).map(cat => `
      <div class="category-card" data-category="${cat.id}">
        <div class="category-icon">${cat.icon}</div>
        <div class="category-name">${cat.name}</div>
      </div>
    `).join('');
  }

  async attachEvents() {
    // Load items
    await this.loadItems();

    // Search functionality
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
      this.handleSearch(e.target.value);
    });

    // Filter chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.filterItems(chip.dataset.filter);
      });
    });

    // Category clicks
    document.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        this.openCategory(card.dataset.category);
      });
    });

    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        this.navigateTo(item.dataset.page);
      });
    });

    // Camera button
    document.getElementById('cameraBtn')?.addEventListener('click', () => {
      this.openCamera();
    });
  }

  async loadItems() {
    try {
      this.items = await firebaseService.getItems();
      this.renderItems(this.items);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  }

  renderItems(items) {
    const grid = document.getElementById('itemsGrid');
    if (!grid) return;

    if (items.length === 0) {
      grid.innerHTML = '<div class="empty-state">Keine Artikel gefunden</div>';
      return;
    }

    grid.innerHTML = items.map(item => `
      <div class="item-card" data-item-id="${item.id}">
        <div class="item-image-container">
          <img src="${item.photoURL}" alt="${item.title}" class="item-image">
        </div>
        <div class="item-info">
          <h3 class="item-title">${item.title}</h3>
          <p class="item-location"> ${item.location}</p>
        </div>
      </div>
    `).join('');

    // Attach click events to items
    grid.querySelectorAll('.item-card').forEach(card => {
      card.addEventListener('click', () => {
        this.openItemDetail(card.dataset.itemId);
      });
    });
  }

  handleSearch(query) {
    if (!query) {
      this.renderItems(this.items);
      return;
    }

    const filtered = this.items.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    this.renderItems(filtered);
  }

  filterItems(filter) {
    this.currentFilter = filter;
    // Implement filter logic
    this.renderItems(this.items);
  }

  openCategory(categoryId) {
    console.log('Opening category:', categoryId);
    // Navigate to category page
  }

  openItemDetail(itemId) {
    console.log('Opening item:', itemId);
    // Navigate to item detail
  }

  openCamera() {
    console.log('Opening camera');
    // Open photo upload
  }

  navigateTo(page) {
    console.log('Navigating to:', page);
    // Handle navigation
  }
}