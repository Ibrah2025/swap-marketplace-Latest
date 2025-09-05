import firebaseService from "../services/firebase.service.mock.js";
import swapService from "../services/swap.service.js";

export class SwapProposalModal {
  constructor(requestedItemId) {
    this.requestedItemId = requestedItemId;
  }

  async render() {
    const items = await firebaseService.getItems();
    const requestedItem = items.find(i => i.id === this.requestedItemId);
    
    // Get user's items for swap
    const myItems = items.filter(i => i.userId === "mock-user-123" || Math.random() > 0.5);
    
    return `
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1002; display: flex; align-items: flex-end;">
        <div style="background: white; width: 100%; border-radius: 20px 20px 0 0; max-height: 80vh; overflow-y: auto;">
          <div style="padding: 20px; border-bottom: 1px solid #e5e7eb;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h2 style="font-size: 20px; margin: 0;">Tausch vorschlagen</h2>
              <button onclick="window.closeSwapModal()" style="background: none; border: none; font-size: 24px;">✕</button>
            </div>
          </div>
          
          <div style="padding: 20px;">
            <div style="margin-bottom: 20px;">
              <p style="font-size: 14px; color: #666; margin-bottom: 10px;">Du möchtest tauschen gegen:</p>
              <div style="display: flex; gap: 12px; padding: 12px; background: #f5f5f5; border-radius: 8px;">
                <img src="${requestedItem.photoURL}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                <div>
                  <p style="font-weight: 600;">${requestedItem.title}</p>
                  <p style="font-size: 14px; color: #666;">${requestedItem.condition}</p>
                </div>
              </div>
            </div>
            
            <div>
              <p style="font-size: 14px; color: #666; margin-bottom: 10px;">Wähle einen deiner Artikel zum Tausch:</p>
              ${myItems.length === 0 ? `
                <div style="text-align: center; padding: 40px; color: #666;">
                  <p>Du hast noch keine Artikel eingestellt.</p>
                  <button onclick="window.openCamera()" style="margin-top: 20px; padding: 10px 20px; background: #007185; color: white; border: none; border-radius: 8px;">
                    Artikel hinzufügen
                  </button>
                </div>
              ` : `
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                  ${myItems.map(item => `
                    <div onclick="window.selectItemForSwap('${item.id}')" 
                         id="swap-item-${item.id}"
                         style="border: 2px solid transparent; border-radius: 8px; padding: 8px; cursor: pointer; transition: all 0.2s;">
                      <img src="${item.photoURL}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px;">
                      <p style="font-size: 14px; font-weight: 600; margin: 8px 0 4px;">${item.title}</p>
                      <p style="font-size: 12px; color: #666;">${item.condition}</p>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
            
            <div id="swapMessage" style="margin-top: 20px; display: none;">
              <p style="font-size: 14px; color: #666; margin-bottom: 10px;">Nachricht (optional):</p>
              <textarea id="swapMessageText" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; resize: vertical;" 
                        placeholder="Warum ist das ein fairer Tausch?" rows="3"></textarea>
            </div>
            
            <button id="confirmSwapBtn" onclick="window.confirmSwap('${requestedItem.id}')" 
                    style="width: 100%; padding: 14px; background: #ff9900; color: white; border: none; border-radius: 8px; 
                           font-size: 16px; font-weight: 600; margin-top: 20px; display: none;">
              Tausch vorschlagen
            </button>
          </div>
        </div>
      </div>
    `;
  }
}