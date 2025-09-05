export class PhotoUploadComponent {
  constructor(onComplete) {
    this.photos = [];
    this.onComplete = onComplete;
    this.maxPhotos = 5;
  }

  render() {
    return `
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: white; z-index: 1001; display: flex; flex-direction: column;">
        <!-- Header -->
        <header style="background: #007185; color: white; padding: 12px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center;">
            <button onclick="window.closePhotoUpload()" style="background: none; border: none; color: white; font-size: 24px; margin-right: 15px;">←</button>
            <h1 style="margin: 0; font-size: 20px;">Neuer Artikel</h1>
          </div>
          <button onclick="window.submitItem()" style="background: none; border: none; color: white; font-weight: 600;">
            Weiter
          </button>
        </header>
        
        <!-- Form -->
        <div style="flex: 1; overflow-y: auto; padding: 16px;">
          <!-- Photo Section -->
          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Fotos (max. ${this.maxPhotos})</label>
            <div id="photoGrid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
              ${this.renderPhotoGrid()}
            </div>
          </div>
          
          <!-- Title -->
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Titel *</label>
            <input type="text" id="itemTitle" placeholder="z.B. iPhone 12 Pro" 
                   style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;">
          </div>
          
          <!-- Category -->
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Kategorie *</label>
            <select id="itemCategory" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;">
              <option value="">Wähle Kategorie</option>
              <option value="elektronik">📱 Elektronik</option>
              <option value="mode">👗 Mode</option>
              <option value="haushalt">🏠 Haushalt</option>
              <option value="sport">⚽ Sport</option>
              <option value="buecher">📚 Bücher</option>
              <option value="baby">👶 Baby & Kind</option>
              <option value="heimwerken">🔧 Heimwerken</option>
              <option value="haustiere">🐕 Haustiere</option>
            </select>
          </div>
          
          <!-- Condition -->
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Zustand *</label>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
              <button onclick="window.selectCondition('new')" id="cond-new" 
                      style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; background: white;">
                ✨ Wie neu
              </button>
              <button onclick="window.selectCondition('very-good')" id="cond-very-good"
                      style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; background: white;">
                ✓ Sehr gut
              </button>
              <button onclick="window.selectCondition('good')" id="cond-good"
                      style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; background: white;">
                👍 Gut
              </button>
              <button onclick="window.selectCondition('fair')" id="cond-fair"
                      style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; background: white;">
                👌 Akzeptabel
              </button>
            </div>
          </div>
          
          <!-- Description -->
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Beschreibung</label>
            <textarea id="itemDescription" rows="4" placeholder="Beschreibe deinen Artikel..."
                      style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px; resize: vertical;"></textarea>
          </div>
          
          <!-- Want in Return -->
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Was möchtest du dafür? *</label>
            <input type="text" id="wantInReturn" placeholder="z.B. Tablet, Laptop oder ähnliches"
                   style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;">
          </div>
          
          <!-- Location -->
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Standort</label>
            <input type="text" id="itemLocation" placeholder="PLZ oder Stadt" value="Berlin"
                   style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;">
          </div>
        </div>
        
        <!-- Hidden file input -->
        <input type="file" id="photoInput" accept="image/*" multiple style="display: none;">
        
        <!-- Photo source modal -->
        <div id="photoSourceModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1003; align-items: flex-end;">
          <div style="background: white; width: 100%; border-radius: 20px 20px 0 0; padding: 20px;">
            <button onclick="window.choosePhotoSource('camera')" 
                    style="width: 100%; padding: 16px; margin-bottom: 10px; background: #007185; color: white; border: none; border-radius: 8px; font-size: 16px;">
              📷 Kamera
            </button>
            <button onclick="window.choosePhotoSource('gallery')"
                    style="width: 100%; padding: 16px; margin-bottom: 10px; background: #007185; color: white; border: none; border-radius: 8px; font-size: 16px;">
              🖼️ Galerie
            </button>
            <button onclick="window.closePhotoSourceModal()"
                    style="width: 100%; padding: 16px; background: #f5f5f5; border: none; border-radius: 8px; font-size: 16px;">
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderPhotoGrid() {
    let html = '';
    
    // Show existing photos
    for (let i = 0; i < this.photos.length; i++) {
      html += `
        <div style="position: relative;">
          <img src="${this.photos[i]}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px;">
          <button onclick="window.removePhoto(${i})" 
                  style="position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.5); color: white; 
                         border: none; border-radius: 50%; width: 24px; height: 24px; font-size: 16px;">
            ×
          </button>
        </div>
      `;
    }
    
    // Add button for new photos if under limit
    if (this.photos.length < this.maxPhotos) {
      html += `
        <button onclick="window.showPhotoSourceModal()" 
                style="width: 100%; height: 100px; border: 2px dashed #ddd; border-radius: 8px; 
                       background: #f5f5f5; display: flex; align-items: center; justify-content: center; cursor: pointer;">
          <div>
            <div style="font-size: 24px;">📷</div>
            <div style="font-size: 12px; color: #666;">Foto hinzufügen</div>
          </div>
        </button>
      `;
    }
    
    // Fill empty slots
    for (let i = this.photos.length + 1; i < 3; i++) {
      html += `<div></div>`;
    }
    
    return html;
  }

  addPhoto(dataUrl) {
    if (this.photos.length < this.maxPhotos) {
      this.photos.push(dataUrl);
      this.updatePhotoGrid();
    }
  }

  removePhoto(index) {
    this.photos.splice(index, 1);
    this.updatePhotoGrid();
  }

  updatePhotoGrid() {
    const grid = document.getElementById('photoGrid');
    if (grid) {
      grid.innerHTML = this.renderPhotoGrid();
    }
  }
}

export let currentPhotoUpload = null;