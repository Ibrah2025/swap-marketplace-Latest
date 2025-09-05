// Mock Firebase Service with localStorage persistence
class MockFirebaseService {
  constructor() {
    this.currentUser = this.loadUser();
    this.authCallbacks = [];
    this.mockItems = this.loadItems();
  }

  // Load user from localStorage
  loadUser() {
    const savedUser = localStorage.getItem("mockUser");
    return savedUser ? JSON.parse(savedUser) : null;
  }

  // Load items from localStorage
  loadItems() {
    const saved = localStorage.getItem("mockItems");
    if (saved) {
      return JSON.parse(saved);
    }
    // Default items
    return [
      { id: "1", title: "iPhone 12", condition: "Like new", location: "Berlin", photoURL: "https://via.placeholder.com/250x200", createdAt: new Date().toISOString() },
      { id: "2", title: "MacBook Air", condition: "Good", location: "Munich", photoURL: "https://via.placeholder.com/250x200", createdAt: new Date().toISOString() },
      { id: "3", title: "iPad Pro", condition: "Very good", location: "Hamburg", photoURL: "https://via.placeholder.com/250x200", createdAt: new Date().toISOString() }
    ];
  }

  // Save items to localStorage
  saveItems() {
    localStorage.setItem("mockItems", JSON.stringify(this.mockItems));
  }

  async login(email, password) {
    console.log("Mock login:", email);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.currentUser = { 
      uid: "mock-user-123", 
      email: email,
      displayName: email.split("@")[0]
    };
    
    // Save to localStorage
    localStorage.setItem("mockUser", JSON.stringify(this.currentUser));
    
    this.authCallbacks.forEach(callback => callback(this.currentUser));
    return this.currentUser;
  }

  async register(email, password, name) {
    console.log("Mock register:", email);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.currentUser = { 
      uid: "mock-user-" + Date.now(), 
      email: email,
      displayName: name
    };
    
    localStorage.setItem("mockUser", JSON.stringify(this.currentUser));
    this.authCallbacks.forEach(callback => callback(this.currentUser));
    return this.currentUser;
  }

  async logout() {
    console.log("Mock logout");
    this.currentUser = null;
    localStorage.removeItem("mockUser");
    this.authCallbacks.forEach(callback => callback(null));
    return Promise.resolve();
  }

  onAuthChange(callback) {
    this.authCallbacks.push(callback);
    // Call immediately with current state
    setTimeout(() => callback(this.currentUser), 100);
    
    return () => {
      this.authCallbacks = this.authCallbacks.filter(cb => cb !== callback);
    };
  }

  async getItems(limit = 20) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.mockItems.slice(0, limit);
  }

  async addItem(itemData) {
    const newItem = {
      id: "item-" + Date.now(),
      ...itemData,
      photoURL: "https://via.placeholder.com/250x200",
      createdAt: new Date().toISOString()
    };
    this.mockItems.unshift(newItem);
    this.saveItems(); // Save to localStorage
    return newItem.id;
  }

  async uploadImage(file, path) {
    return "https://via.placeholder.com/250x200";
  }
}

export default new MockFirebaseService();