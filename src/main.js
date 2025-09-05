console.log("SWAP initializing...");

import firebaseService from "./services/firebase.service.mock.js";
import store from "./store/store.js";
import { categories } from "./components/Categories.js";
import { CategoryPage } from "./components/CategoryPage.js";
import { ItemDetailPage } from "./components/ItemDetailPage.js";
import { MessagesListPage } from "./components/MessagesList.js";
import { ChatWindow } from "./components/ChatWindow.js";
import { PhotoUploadComponent } from "./components/PhotoUpload.js";
import { SearchComponent } from "./components/Search.js";
import chatService from "./services/chat.service.js";

window.__imgFallback = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 250 200'><rect width='100%25' height='100%25' fill='%23f3f4f6'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial,Segoe UI,system-ui' font-size='14' fill='%239ca3af'>No Image</text></svg>";

import { SwapsPage } from './components/SwapsPage.js';

const app = document.getElementById("app");
let photoUploadComponent = null;

firebaseService.onAuthChange((user) => {
  store.setState({ user });
  if (user) renderHomePage(user);
  else renderLoginPage();
});

function renderLoginPage() {
  app.innerHTML = `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); width: 90%; max-width: 400px;">
        <h1 style="text-align: center; color: #ff9900; font-size: 48px; margin-bottom: 10px;">SWAP</h1>
        <p style="text-align: center; color: #666; margin-bottom: 30px;">Tauschen statt kaufen</p>
        <form id="loginForm">
          <input type="email" id="email" placeholder="E-Mail" required
                 style="width: 100%; padding: 12px; margin-bottom: 16px; border: 2px solid #e3e6e8; border-radius: 8px; font-size: 16px;">
          <input type="password" id="password" placeholder="Passwort" required
                 style="width: 100%; padding: 12px; margin-bottom: 20px; border: 2px solid #e3e6e8; border-radius: 8px; font-size: 16px;">
          <button type="submit" 
                  style="width: 100%; padding: 14px; background: #007185; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">
            Anmelden
          </button>
        </form>
      </div>
    </div>
  `;
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      await firebaseService.login(email, password);
    } catch (error) {
      alert("Login fehlgeschlagen: " + error.message);
    }
  });
}

function renderHomePage(user) {
  const unreadCount = chatService.getConversations().reduce((sum, c) => sum + c.unread, 0);

  app.innerHTML = `
    <!-- Search Header -->
    <div style="background: white; padding: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); position: sticky; top: 0; z-index: 100;">
      <div style="max-width: 600px; margin: 0 auto;">
        <div onclick="showSearch()" style="display: flex; align-items: center; gap: 10px; background: #f5f6f7; padding: 10px 15px; border-radius: 12px; cursor: pointer;">
          <svg width="20" height="20" fill="none" stroke="#666" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input type="text" placeholder="Nach Artikeln suchen..." 
                 style="flex: 1; border: none; background: none; outline: none; font-size: 16px; pointer-events: none;">
        </div>
      </div>
    </div>

    <!-- Logo Section -->
    <div style="text-align: center; padding: 20px;">
      <div style="display: inline-block; position: relative;">
        <svg width="100" height="100" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="45" fill="white" stroke="#ff9900" stroke-width="3"/>
          <text x="50" y="60" text-anchor="middle" style="font-size: 32px; font-weight: 800; fill: #ff9900;">SWAP</text>
        </svg>
      </div>
    </div>

    <!-- Categories Grid -->
    <div style="padding: 0 16px; margin-bottom: 20px;">
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 800px; margin: 0 auto;">
        ${categories.slice(0, 16).map(cat => `
          <div onclick="navigateToCategory('${cat.id}')" 
               style="background: white; border: 2px solid #f39c12; border-radius: 12px; padding: 15px 8px; text-align: center; cursor: pointer; transition: all 0.3s;">
            <div style="font-size: 28px; margin-bottom: 8px;">${cat.icon}</div>
            <div style="font-size: 11px; font-weight: 600; color: #232f3e;">${cat.name}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Feed Section -->
    <div style="padding: 0 16px 100px;">
      <h2 style="font-size: 20px; margin-bottom: 16px; font-weight: 600;">Neueste Tauschangebote</h2>
      <div id="itemsGrid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;"></div>
    </div>

    <!-- Bottom Navigation -->
    <nav class="navbar" role="navigation" aria-label="Primary">
      <!-- Favorites -->
      <button class="nav-btn" data-nav="favorites" onclick="showFavorites()" aria-label="Favorites">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                d="M4.3 6.3a4.5 4.5 0 0 0 0 6.4L12 20.4l7.7-7.7a4.5 4.5 0 0 0-6.4-6.4L12 7.6 10.7 6.3a4.5 4.5 0 0 0-6.4 0z"/>
        </svg>
        <span class="nav-label">Favorites</span>
      </button>

      <!-- Messages -->
      <button class="nav-btn" data-nav="messages" onclick="showMessages()" aria-label="Messages">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.4-4 8-9 8a9.9 9.9 0 0 1-4.3-.95L3 20l1.4-3.7A7.9 7.9 0 0 1 3 12c0-4.4 4-8 9-8s9 3.6 9 8z"/>
        </svg>
        <span class="nav-label">Messages</span>
        ${unreadCount > 0 ? ('<span class="nav-badge" aria-label="' + unreadCount + ' unread">' + unreadCount + '</span>') : ''}
      </button>

      <!-- CENTER SWAP BUTTON (exact original: suitcase + white ring + orange halo) -->
      <button onclick="openCamera()" class="swap-cta" aria-label="Create swap">
        <span class="swap-cta__halo" aria-hidden="true"></span>
        <span class="swap-cta__ring" aria-hidden="true">
          <span class="swap-cta__disc">
            <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#FFFFFF" d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2Zm2-1a1 1 0 0 0-1 1v1h4V6a1 1 0 0 0-1-1h-2Z"/>
            </svg>
          </span>
        </span>
      </button>

      <!-- Swaps (list) -->
      <button class="nav-btn" data-nav="swaps" onclick="showSwaps()" aria-label="Swaps">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                d="M3 7h11l-3-3m3 13H3l3 3M21 7h-6M21 17h-6"/>
        </svg>
        <span class="nav-label">Swaps</span>
      </button>

      <!-- Me -->
      <button class="nav-btn" data-nav="me" onclick="showProfile()" aria-label="Me">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM5 21a7 7 0 0 1 14 0H5z"/>
        </svg>
        <span class="nav-label">Me</span>
      </button>
    </nav>

    <!-- Modal Container -->
    <div id="modalContainer"></div>

    <!-- Modern nav styles + exact SWAP styles -->
    <style>
      :root{
        --nav-fg: #8d9096;
        --nav-active: #232f3e;
        --badge: #ff3b30;
        --primary-1:#FF8A00; --primary-2:#F96A00; --primary-3:#C94E00;
      }
      .navbar{
        position: fixed; bottom: 0; left: 0; right: 0;
        background:#fff; border-top:1px solid #e3e6e8;
        display:flex; justify-content:space-around; align-items:center;
        padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
        z-index: 50;
        -webkit-user-select: none; user-select:none;
      }
      .nav-btn{
        -webkit-tap-highlight-color: transparent;
        background:none; border:none; cursor:pointer;
        display:flex; flex-direction:column; align-items:center; justify-content:center;
        gap:4px; padding:6px 10px; min-width:60px; border-radius:12px;
        color: var(--nav-fg); position:relative; outline:none;
        transition: transform .15s ease;
      }
      .nav-btn:focus-visible{ box-shadow: 0 0 0 3px rgba(0,113,133,.25); }
      .nav-btn:hover .nav-icon, .nav-btn:focus-visible .nav-icon{ transform: translateY(-1px); }
      .nav-btn:active{ transform: translateY(1px) scale(.98); }

      .nav-icon{ width:26px; height:26px; stroke-width:1.9; transition: transform .2s ease, filter .2s ease; }
      .nav-label{ font-size:11px; line-height:1; color: currentColor; }
      .nav-btn.nav-active{ color: var(--nav-active); }

      .nav-badge{
        position:absolute; top:0px; right:10px;
        background: var(--badge); color:#fff; min-width:16px; line-height:16px; padding:0 5px;
        font-size:10px; border-radius:999px; box-shadow:0 1px 0 rgba(0,0,0,.08);
      }

      /* Center SWAP button (exact original look) */
      .swap-cta{
        position: relative; margin-top: -34px; background:none; border:none; width:96px; height:96px; padding:0; cursor:pointer; outline:none;
      }
      .swap-cta__halo{
        position:absolute; top:50%; left:50%; width:118px; height:118px; transform:translate(-50%,-50%);
        border-radius:50%; background: radial-gradient(circle, rgba(255,138,0,0.38) 0%, rgba(255,138,0,0.18) 40%, transparent 70%);
        filter: blur(2px); animation: swapGlow 2.4s ease-in-out infinite; pointer-events:none;
      }
      .swap-cta__ring{
        position:relative; display:block; width:86px; height:86px; border-radius:50%;
        border:6px solid #fff;
        margin:0 auto;
        box-shadow:0 10px 26px rgba(233,101,0,.35), 0 0 0 1px rgba(0,0,0,.02) inset;
        background: radial-gradient(circle at 50% 32%, var(--primary-1) 0%, var(--primary-2) 55%, var(--primary-3) 100%);
      }
      .swap-cta__disc{
        position:absolute; inset:0; border-radius:50%; display:flex; align-items:center; justify-content:center;
        box-shadow: inset 0 2px 6px rgba(255,255,255,.25), inset 0 -6px 10px rgba(0,0,0,.18);
      }
      .swap-cta:active .swap-cta__ring{ transform: translateY(1px) scale(.99); }
      @keyframes swapGlow{
        0%{ opacity:1; transform:translate(-50%,-50%) scale(1); }
        50%{ opacity:.55; transform:translate(-50%,-50%) scale(1.06); }
        100%{ opacity:1; transform:translate(-50%,-50%) scale(1); }
      }
      @media (prefers-reduced-motion: reduce){
        .swap-cta__halo{ animation:none; }
        .nav-icon, .nav-btn{ transition:none; }
      }
    </style>
  `;

  loadItems();
}

async function loadItems() {
  const items = await firebaseService.getItems();
  const grid = document.getElementById("itemsGrid");
  if (!grid) return;
  grid.innerHTML = items.map(item => `
    <div onclick="viewItemDetail('${item.id}')" 
         style="background: white; border-radius: 12px; overflow: hidden; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: transform 0.2s;">
      <img src="${item.photoURL}" style="width: 100%; height: 120px; object-fit: cover;">
      <div style="padding: 10px;">
        <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">${item.title}</div>
        <div style="font-size: 11px; color: #666;"> ${item.location}</div>
      </div>
    </div>
  `).join('');
}

/* ===== Nav state ===== */
function setActiveNav(id){
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("nav-active"));
  const el = document.querySelector('.nav-btn[data-nav="' + id + '"]');
  if (el) el.classList.add("nav-active");
}

/* ===== Global functions ===== */
window.navigateToCategory = async (categoryId) => {
  const categoryPage = new CategoryPage(categoryId);
  document.getElementById("modalContainer").innerHTML = await categoryPage.render();
};

window.viewItemDetail = async (itemId) => {
  const itemDetailPage = new ItemDetailPage(itemId);
  document.getElementById("modalContainer").innerHTML = await itemDetailPage.render();
};

window.openCamera = () => {
  photoUploadComponent = new PhotoUploadComponent(() => {
    document.getElementById("modalContainer").innerHTML = "";
    loadItems();
  });
  document.getElementById("modalContainer").innerHTML = photoUploadComponent.render();
  setActiveNav(null);
};

window.showMessages = () => {
  const messagesPage = new MessagesListPage();
  document.getElementById("modalContainer").innerHTML = messagesPage.render();
  setActiveNav("messages");
};

window.showSearch = () => {
  const searchComponent = new SearchComponent();
  document.getElementById("modalContainer").innerHTML = searchComponent.render();
};

window.showFavorites = () => {
  alert("Favoriten - Kommt bald!");
  setActiveNav("favorites");
};

window.showProfile = () => {
  setActiveNav("me");
  if (confirm("Mchten Sie sich abmelden?")) {
    firebaseService.logout();
  }
};

window.closeItemDetail = () => { document.getElementById("modalContainer").innerHTML = ""; };
window.closeCategoryPage = () => { document.getElementById("modalContainer").innerHTML = ""; };
window.closeSearch = () => { document.getElementById("modalContainer").innerHTML = ""; };
window.closeMessagesPage = () => { document.getElementById("modalContainer").innerHTML = ""; };

window.openChat = (conversationId) => {
  const chatWindow = new ChatWindow(conversationId);
  document.getElementById("modalContainer").innerHTML = chatWindow.render();
};

window.closeChat = () => { showMessages(); };

window.sendMessage = (conversationId) => {
  const input = document.getElementById("messageInput");
  const text = (input && input.value) ? input.value.trim() : "";
  if (!text) return;
  chatService.sendMessage(conversationId, text);
  const chatWindow = new ChatWindow(conversationId);
  document.getElementById("modalContainer").innerHTML = chatWindow.render();
};

window.showPhotoSourceModal = () => {
  const modal = document.getElementById("photoSourceModal");
  if (modal) modal.style.display = "flex";
};
window.closePhotoSourceModal = () => {
  const modal = document.getElementById("photoSourceModal");
  if (modal) modal.style.display = "none";
};
window.choosePhotoSource = (source) => {
  const input = document.getElementById("photoInput");
  if (!input) return;
  if (source === "camera") input.setAttribute("capture", "environment");
  else input.removeAttribute("capture");
  input.click();
  closePhotoSourceModal();
};
window.removePhoto = (index) => { if (photoUploadComponent) photoUploadComponent.removePhoto(index); };

window.submitItem = async () => {
  const titleEl = document.getElementById("itemTitle");
  const categoryEl = document.getElementById("itemCategory");
  const locationEl = document.getElementById("itemLocation");
  const title = titleEl ? titleEl.value : "";
  const category = categoryEl ? categoryEl.value : "";
  if (!title || !category) { alert("Bitte flle alle Pflichtfelder aus"); return; }
  const itemData = {
    title,
    category,
    location: locationEl && locationEl.value ? locationEl.value : "Berlin",
    photoURL: "https://via.placeholder.com/200"
  };
  await firebaseService.addItem(itemData);
  alert("Artikel erfolgreich eingestellt!");
  document.getElementById("modalContainer").innerHTML = "";
  loadItems();
};
window.closePhotoUpload = () => { document.getElementById("modalContainer").innerHTML = ""; };

document.addEventListener("change", (e) => {
  if (e.target && e.target.id === "photoInput") {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (photoUploadComponent) {
          photoUploadComponent.addPhoto(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  }
});

window.firebaseService = firebaseService;

window.showSwaps = () => {
  const mc = document.getElementById("modalContainer");
  if (!mc) { console.warn("modalContainer not found"); return; }
  window.__swaps = new SwapsPage();
  mc.innerHTML = window.__swaps.render();
  if (typeof setActiveNav === "function") setActiveNav("swaps");
};

window.closeSwapsPage = () => {
  const mc = document.getElementById("modalContainer");
  if (mc) mc.innerHTML = "";
};
