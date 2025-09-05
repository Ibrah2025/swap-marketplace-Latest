import firebaseService from "../services/firebase.service.mock.js";
import swapService from "../services/swap.service.js";
import chatService from "../services/chat.service.js";

export class ItemDetailPage {
  constructor(itemId) {
    this.itemId = itemId;
  }

  async render() {
    const items = await firebaseService.getItems();
    const item = items.find(i => i.id === this.itemId);
    
    if (!item) return '<div>Artikel nicht gefunden</div>';
    
    return `
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: white; z-index: 1000; overflow-y: auto;">
        <header style="background: #007185; color: white; padding: 12px; position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center;">
            <button onclick="window.closeItemDetail()" style="background: none; border: none; color: white; font-size: 24px; margin-right: 15px;">←</button>
            <h1 style="margin: 0; font-size: 20px;">Artikel Details</h1>
          </div>
          <button onclick="window.toggleFavorite('${item.id}')" style="background: none; border: none; color: white; font-size: 24px;">
            ❤️
          </button>
        </header>
        
        <div style="padding-bottom: 100px;">
          <!-- Image -->
          <img src="${item.photoURL}" style="width: 100%; height: 300px; object-fit: cover;">
          
          <!-- Item Info -->
          <div style="padding: 16px;">
            <h2 style="font-size: 22px; margin-bottom: 8px;">${item.title}</h2>
            <div style="display: flex; gap: 10px; margin-bottom: 16px;">
              <span style="background: #e3f2fd; color: #1976d2; padding: 4px 12px; border-radius: 16px; font-size: 14px;">
                ${item.condition}
              </span>
              <span style="background: #fff3e0; color: #f57c00; padding: 4px 12px; border-radius: 16px; font-size: 14px;">
                ${item.category || 'Elektronik'}
              </span>
            </div>
            
            <div style="background: #f5f5f5; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
              <p style="font-size: 14px; color: #666; margin-bottom: 8px;">📍 Standort</p>
              <p style="font-weight: 600;">${item.location}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="font-size: 16px; margin-bottom: 8px;">Beschreibung</h3>
              <p style="color: #666; line-height: 1.5;">
                ${item.description || 'Artikel in gutem Zustand, bereit zum Tausch!'}
              </p>
            </div>
            
            <div style="background: #fff8e1; padding: 12px; border-radius: 8px; margin-bottom: 20px;">
              <p style="font-size: 14px; color: #f57c00; margin-bottom: 4px;">🔄 Tauschwunsch:</p>
              <p style="font-weight: 600;">${item.wantInReturn || 'Offen für Vorschläge'}</p>
            </div>
            
            <!-- Seller Info -->
            <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f5f5f5; border-radius: 8px; margin-bottom: 20px;">
              <div style="width: 50px; height: 50px; background: #e0e0e0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">
                👤
              </div>
              <div style="flex: 1;">
                <p style="font-weight: 600;">${item.userEmail || 'Test User'}</p>
                <p style="font-size: 14px; color: #666;">Mitglied seit 2024</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div style="position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 1px solid #e5e7eb; padding: 12px; display: flex; gap: 10px;">
          <button onclick="window.proposeSwap('${item.id}')" 
                  style="flex: 1; padding: 14px; background: #ff9900; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600;">
            🔄 Tausch vorschlagen
          </button>
          <button onclick="window.sendMessageToSeller('${item.id}')" 
                  style="flex: 1; padding: 14px; background: #007185; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600;">
            💬 Nachricht senden
          </button>
        </div>
      </div>
    `;
  }
}