export const categories = [
  { id: 'elektronik', name: 'Elektronik', icon: '', color: '#4CAF50' },
  { id: 'mode', name: 'Mode', icon: '', color: '#E91E63' },
  { id: 'haushalt', name: 'Haushalt', icon: '', color: '#FF9800' },
  { id: 'autos', name: 'Autos', icon: '', color: '#2196F3' },
  { id: 'baby', name: 'Baby & Kind', icon: '', color: '#9C27B0' },
  { id: 'sport', name: 'Sport & Freizeit', icon: '', color: '#00BCD4' },
  { id: 'heimwerken', name: 'Heimwerken', icon: '', color: '#795548' },
  { id: 'buecher', name: 'Bcher', icon: '', color: '#607D8B' },
  { id: 'haustiere', name: 'Haustiere', icon: '', color: '#8BC34A' },
  { id: 'jobs', name: 'Jobs', icon: '', color: '#3F51B5' },
  { id: 'musik', name: 'Musik', icon: '', color: '#FF5722' },
  { id: 'immobilien', name: 'Immobilien', icon: '', color: '#009688' },
  { id: 'nachbarschaft', name: 'Nachbarschaft', icon: '', color: '#FFC107' },
  { id: 'essen', name: 'Essen & Trinken', icon: '', color: '#FF6B6B' },
  { id: 'unternehmungen', name: 'Unternehmungen', icon: '', color: '#7B68EE' },
  { id: 'tickets', name: 'Tickets', icon: '', color: '#20B2AA' },
  { id: 'verschenken', name: 'Zu verschenken', icon: '', color: '#32CD32' },
  { id: 'tauschboerse', name: 'Tauschbrse', icon: '', color: '#FF1493' }
];

export class CategoriesGrid {
  render() {
    return `
      <div style="padding: 10px;">
        <h2 style="font-size: 18px; margin-bottom: 15px; color: #232f3e;">Kategorien</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
          ${categories.map(cat => `
            <div onclick="window.navigateToCategory('${cat.id}')" 
                 style="background: white; padding: 15px; text-align: center; border-radius: 8px; 
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1); cursor: pointer; 
                        transition: transform 0.2s; position: relative;">
              <div style="font-size: 28px; margin-bottom: 5px;">${cat.icon}</div>
              <div style="font-size: 12px; color: #333;">${cat.name}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

export function getCategoryById(id) {
  return categories.find(cat => cat.id === id);
}