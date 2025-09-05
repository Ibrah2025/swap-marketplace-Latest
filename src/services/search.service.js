class SearchService {
  constructor() {
    this.searchHistory = this.loadSearchHistory();
  }

  loadSearchHistory() {
    const saved = localStorage.getItem("searchHistory");
    return saved ? JSON.parse(saved) : [];
  }

  saveSearchHistory() {
    localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
  }

  addToHistory(query) {
    if (query && !this.searchHistory.includes(query)) {
      this.searchHistory.unshift(query);
      if (this.searchHistory.length > 10) {
        this.searchHistory.pop();
      }
      this.saveSearchHistory();
    }
  }

  async searchItems(query, filters = {}) {
    // Get all items
    const firebaseService = (await import('../services/firebase.service.mock.js')).default;
    const allItems = await firebaseService.getItems();
    
    let results = allItems;
    
    // Apply text search
    if (query && query.trim() !== '') {
      const searchTerm = query.toLowerCase();
      results = results.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        (item.description && item.description.toLowerCase().includes(searchTerm)) ||
        (item.category && item.category.toLowerCase().includes(searchTerm))
      );
      this.addToHistory(query);
    }
    
    // Apply category filter
    if (filters.category) {
      results = results.filter(item => item.category === filters.category);
    }
    
    // Apply condition filter
    if (filters.condition) {
      results = results.filter(item => item.condition === filters.condition);
    }
    
    // Apply distance filter (mock implementation)
    if (filters.distance && filters.distance < 100) {
      // In real app, would calculate actual distance
      results = results.filter((item, index) => {
        const mockDistance = (index * 10) % 100;
        return mockDistance <= filters.distance;
      });
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'newest':
          results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'title':
          results.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'nearest':
          // Mock distance sorting
          results.sort((a, b) => Math.random() - 0.5);
          break;
      }
    }
    
    return results;
  }

  getSearchSuggestions(query) {
    const suggestions = [
      'iPhone', 'Samsung', 'Laptop', 'MacBook', 'iPad',
      'Fahrrad', 'E-Bike', 'Bücher', 'Spielzeug', 'Kleidung',
      'Schuhe', 'Möbel', 'Sofa', 'Tisch', 'PlayStation'
    ];
    
    if (!query) return suggestions.slice(0, 5);
    
    const filtered = suggestions.filter(s => 
      s.toLowerCase().includes(query.toLowerCase())
    );
    
    return filtered.slice(0, 5);
  }
}

export default new SearchService();