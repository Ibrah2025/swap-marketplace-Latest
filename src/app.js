import { config } from './config/app.config.js';
import firebaseService from './services/firebase.service.mock.js';
import store from './store/store.js';
import { AuthComponent } from './components/Auth.js';
import { HomePage } from './pages/HomePage.js';

class SwapApp {
  constructor() {
    this.config = config;
    this.currentUser = null;
    this.init();
  }

  async init() {
    try {
      console.log(`${this.config.appName} v${this.config.version} initializing...`);
      
      // Set up global error handler
      window.addEventListener('error', this.handleError.bind(this));
      
      // Initialize auth listener
      firebaseService.onAuthChange(this.handleAuthChange.bind(this));
      
      // Apply theme
      this.applyTheme();
      
    } catch (error) {
      this.handleError(error);
    }
  }

  handleAuthChange(user) {
    this.currentUser = user;
    store.setState({ user });
    
    if (user) {
      this.renderHomePage();
    } else {
      this.renderAuthPage();
    }
  }

  renderAuthPage() {
    const authComponent = new AuthComponent();
    document.getElementById('app').innerHTML = authComponent.render();
    authComponent.attachEvents();
  }

  renderHomePage() {
    const homePage = new HomePage(this.currentUser);
    document.getElementById('app').innerHTML = homePage.render();
    homePage.attachEvents();
  }

  applyTheme() {
    const root = document.documentElement;
    Object.entries(this.config.theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }

  handleError(error) {
    console.error('Application error:', error);
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-toast';
    errorContainer.textContent = 'Ein Fehler ist aufgetreten';
    document.body.appendChild(errorContainer);
    setTimeout(() => errorContainer.remove(), 3000);
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new SwapApp());
} else {
  new SwapApp();
}