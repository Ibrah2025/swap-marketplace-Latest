export class SearchComponent {
  constructor() {
    this.searchQuery = '';
    this.activeFilters = {
      category: '',
      condition: '',
      distance: 50
    };
  }

  render() {
    return `
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: white; z-index: 1000; display: flex; flex-direction: column;">
        <!-- Header with Search Bar -->
        <header style="background: #007185; padding: 12px; position: sticky; top: 0; z-index: 10;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <button onclick="window.closeSearch()" style="background: none; border: none; color: white; font-size: 24px;"></button>
            <input type="text" id="searchInput" placeholder="Suche nach Artikeln..." 
                   style="flex: 1; padding: 10px; border: none; border-radius: 20px; font-size: 16px;"
                   oninput="window.handleSearch(this.value)">
            <button onclick="window.toggleFilters()" style="background: none; border: none; color: white; font-size: 20px;"></button>
          </div>
        </header>
        
        <!-- Filters Panel -->
        <div id="filtersPanel" style="display: none; background: #f5f5f5; padding: 12px; border-bottom: 1px solid #ddd;">
          <!-- Category Filter -->
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 14px; margin-bottom: 6px; font-weight: 600;">Kategorie</label>
            <select id="filterCategory" onchange="window.applyFilters()" 
                    style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 8px;">
              <option value="">Alle Kategorien</option>
              <option value="elektronik"> Elektronik</option>
              <option value="mode"> Mode</option>
              <option value="haushalt"> Haushalt</option>
              <option value="sport"> Sport</option>
              <option value="buecher"> Bcher</option>
              <option value="baby"> Baby & Kind</option>
            </select>
          </div>
          
          <!-- Condition Filter -->
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 14px; margin-bottom: 6px; font-weight: 600;">Zustand</label>
            <select id="filterCondition" onchange="window.applyFilters()"
                    style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 8px;">
              <option value="">Alle Zustnde</option>
              <option value="new">Wie neu</option>
              <option value="very-good">Sehr gut</option>
              <option value="good">Gut</option>
              <option value="fair">Akzeptabel</option>
            </select>
          </div>
          
          <!-- Distance Filter -->
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 14px; margin-bottom: 6px; font-weight: 600;">
              Entfernung: <span id="distanceValue">50</span> km
            </label>
            <input type="range" id="filterDistance" min="1" max="100" value="50"
                   oninput="window.updateDistance(this.value)"
                   style="width: 100%;">
          </div>
          
          <!-- Sort Options -->
          <div>
            <label style="display: block; font-size: 14px; margin-bottom: 6px; font-weight: 600;">Sortieren nach</label>
            <select id="sortBy" onchange="window.applyFilters()"
                    style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 8px;">
              <option value="newest">Neueste zuerst</option>
              <option value="nearest">In der Nhe</option>
              <option value="title">Alphabetisch</option>
            </select>
          </div>
        </div>
        
        <!-- Search Suggestions -->
        <div id="searchSuggestions" style="padding: 12px; background: #f5f5f5; display: none;">
          <p style="font-size: 14px; color: #666; margin-bottom: 10px;">Beliebte Suchen:</p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <button onclick="window.searchFor('iPhone')" style="padding: 6px 12px; background: white; border: 1px solid #ddd; border-radius: 16px; font-size: 14px;">iPhone</button>
            <button onclick="window.searchFor('Laptop')" style="padding: 6px 12px; background: white; border: 1px solid #ddd; border-radius: 16px; font-size: 14px;">Laptop</button>
            <button onclick="window.searchFor('Fahrrad')" style="padding: 6px 12px; background: white; border: 1px solid #ddd; border-radius: 16px; font-size: 14px;">Fahrrad</button>
            <button onclick="window.searchFor('Bcher')" style="padding: 6px 12px; background: white; border: 1px solid #ddd; border-radius: 16px; font-size: 14px;">Bcher</button>
          </div>
        </div>
        
        <!-- Results Area -->
        <div id="searchResults" style="flex: 1; overflow-y: auto; padding: 12px;">
          <p style="text-align: center; color: #999; margin-top: 40px;">Gib einen Suchbegriff ein oder nutze die Filter</p>
        </div>
      </div>
    `;
  }
}