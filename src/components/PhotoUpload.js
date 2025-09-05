export class PhotoUploadComponent {
  constructor(onClose) {
    this.onClose = onClose;
    this.photos = [];
    this.maxPhotos = 5;
    this.selectedCondition = null;
  }

  render() {
    return `
      <div style="position: fixed; inset: 0; background: #f9fafb; z-index: 1001; display: flex; flex-direction: column;">
        <!-- Header -->
        <header style="background: #007185; color: white; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center;">
            <button onclick="window.closePhotoUpload()" style="background: none; border: none; color: white; font-size: 24px; margin-right: 12px; cursor: pointer;">
              ←
            </button>
            <h1 style="margin: 0; font-size: 18px; font-weight: 500;">Neuer Artikel</h1>
          </div>
          <button onclick="window.submitItem()" style="background: none; border: none; color: white; font-size: 16px; cursor: pointer;">
            Weiter
          </button>
        </header>

        <!-- Form -->
        <div style="flex: 1; overflow-y: auto;">
          
          <!-- Photos Section -->
          <div style="background: white; padding: 16px; border-bottom: 1px solid #e5e7eb;">
            <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #6b7280;">
              Fotos (max. 5)
            </label>
            <div id="photoGrid" style="display: flex; gap: 12px; overflow-x: auto;">
              <!-- Photo grid renders here -->
            </div>
          </div>

          <!-- Title -->
          <div style="background: white; padding: 16px; border-bottom: 1px solid #e5e7eb;">
            <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #1f2937;">
              Titel <span style="color: #ef4444;">*</span>
            </label>
            <input type="text" id="itemTitle" placeholder="z.B. iPhone 12 Pro"
                   style="width: 100%; padding: 0; border: none; font-size: 16px; outline: none;">
          </div>

          <!-- Category -->
<<<<<<< HEAD
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Kategorie *</label>
            <select id="itemCategory" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;">
              <option value="">W\u00e4hle Kategorie</option>
              <option value="elektronik"> Elektronik</option>
              <option value="mode"> Mode</option>
              <option value="haushalt"> Haushalt</option>
              <option value="sport"> Sport</option>
              <option value="buecher"> Buecher</option>
              <option value="baby"> Baby & Kind</option>
              <option value="heimwerken"> Heimwerken</option>
              <option value="haustiere"> Haustiere</option>
=======
          <div style="background: white; padding: 16px; border-bottom: 1px solid #e5e7eb;">
            <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #1f2937;">
              Kategorie <span style="color: #ef4444;">*</span>
            </label>
            <select id="itemCategory" style="width: 100%; padding: 0; border: none; font-size: 16px; background: none; outline: none;">
              <option value="">Wähle Kategorie</option>
              <option value="elektronik">Elektronik</option>
              <option value="mode">Mode</option>
              <option value="haushalt">Haushalt</option>
>>>>>>> 87fb09fc2003a58e1243cdc1274a3eb44103e670
            </select>
          </div>

          <!-- Condition -->
<<<<<<< HEAD
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Zustand *</label>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
              <button onclick="window.selectCondition('new')" id="cond-new" type="button" 
                      style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; background: white;">
                 Wie neu
              </button>
              <button onclick="window.selectCondition('very-good')" id="cond-very-good" type="button"
                      style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; background: white;">
                 Sehr gut
              </button>
              <button onclick="window.selectCondition('good')" id="cond-good" type="button"
                      style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; background: white;">
                 Gut
              </button>
              <button onclick="window.selectCondition('fair')" id="cond-fair" type="button"
                      style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; background: white;">
                 Akzeptabel
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
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Was M\u00f6chtest du dafuer? *</label>
            <input type="text" id="wantInReturn" placeholder="z.B. Tablet, Laptop oder aehnliches"
                   style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;">
          </div>
          
          <!-- Location -->
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Standort</label>
            <input type="text" id="itemLocation" placeholder="PLZ oder Stadt" value="Berlin"
                   style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;">
          </div>
=======
          <div style="background: white; padding: 16px; border-bottom: 1px solid #e5e7eb;">
            <label style="display: block; margin-bottom: 12px; font-size: 14px; color: #1f2937;">
              Zustand <span style="color: #ef4444;">*</span>
            </label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <button onclick="window.selectCondition('new')" id="cond-new"
                      style="padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; background: white; text-align: left; cursor: pointer;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span>✨</span> <span>Wie neu</span>
                </div>
              </button>
              <button onclick="window.selectCondition('good')" id="cond-good"
                      style="padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; background: white; text-align: left; cursor: pointer;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span>👍</span> <span>Gut</span>
                </div>
              </button>
            </div>
          </div>

>>>>>>> 87fb09fc2003a58e1243cdc1274a3eb44103e670
        </div>
        
        <input type="file" id="photoInput" accept="image/*" multiple style="display: none;">
<<<<<<< HEAD
        
        <!-- Photo source modal -->
        <div id="photoSourceModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1003; align-items: flex-end;">
          <div style="background: white; width: 100%; border-radius: 20px 20px 0 0; padding: 20px;">
            <button onclick="window.choosePhotoSource('camera')" 
                    style="width: 100%; padding: 16px; margin-bottom: 10px; background: #007185; color: white; border: none; border-radius: 8px; font-size: 16px;">
               Kamera
            </button>
            <button onclick="window.choosePhotoSource('gallery')"
                    style="width: 100%; padding: 16px; margin-bottom: 10px; background: #007185; color: white; border: none; border-radius: 8px; font-size: 16px;">
               Galerie
            </button>
            <button onclick="window.closePhotoSourceModal()"
                    style="width: 100%; padding: 16px; background: #f5f5f5; border: none; border-radius: 8px; font-size: 16px;">
              Abbrechen
            </button>
          </div>
        </div>
=======
>>>>>>> 87fb09fc2003a58e1243cdc1274a3eb44103e670
      </div>
    `;
  }

  renderPhotoGrid() {
    let html = '';
    
    for (let i = 0; i < this.photos.length; i++) {
<<<<<<< HEAD
      html += `
        <div style="position: relative;">
          <img src="${this.photos[i]}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px;">
          <button onclick="window.removePhoto(${i})" 
                  style="position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.5); color: white; 
                         border: none; border-radius: 50%; width: 24px; height: 24px; font-size: 16px;">
            
          </button>
        </div>
      `;
=======
      html += `<div style="position: relative; flex-shrink: 0;">
        <img src="${this.photos[i]}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
        <button onclick="window.removePhoto(${i})" style="position: absolute; top: -4px; right: -4px; background: #ef4444; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 12px; cursor: pointer;">×</button>
      </div>`;
>>>>>>> 87fb09fc2003a58e1243cdc1274a3eb44103e670
    }
    
    if (this.photos.length < this.maxPhotos) {
<<<<<<< HEAD
      html += `
        <button onclick="window.showPhotoSourceModal()" 
                style="width: 100%; height: 100px; border: 2px dashed #ddd; border-radius: 8px; 
                       background: #f5f5f5; display: flex; align-items: center; justify-content: center; cursor: pointer;">
          <div>
            <div style="font-size: 24px;"></div>
            <div style="font-size: 12px; color: #666;">Foto hinzuf\u00fcgen</div>
          </div>
        </button>
      `;
    }
    
    // Fill empty slots
    for (let i = this.photos.length + 1; i < 3; i++) {
      html += `<div></div>`;
=======
      html += `<button onclick="window.showPhotoSourceModal()" style="width: 80px; height: 80px; border: 2px solid #e5e7eb; border-radius: 8px; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;">
        <span style="font-size: 24px; color: #9ca3af;">📷</span>
      </button>`;
>>>>>>> 87fb09fc2003a58e1243cdc1274a3eb44103e670
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
    if (grid) grid.innerHTML = this.renderPhotoGrid();
  }
<<<<<<< HEAD
}

export let currentPhotoUpload = null;

/* Zustand selection handler (idempotent) */
if (!window.selectCondition) {
  window.selectCondition = function(key) {
    const all = ['cond-new','cond-very-good','cond-good','cond-fair'];
    all.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const active = (
        (key === 'new'       && id === 'cond-new') ||
        (key === 'very-good' && id === 'cond-very-good') ||
        (key === 'good'      && id === 'cond-good') ||
        (key === 'fair'      && id === 'cond-fair')
      );
      el.style.borderColor = active ? '#ff9900' : '#e5e7eb';
      el.style.background  = active ? '#fff7ed' : '#ffffff';
      el.style.boxShadow   = active ? '0 0 0 3px rgba(255,153,0,0.15)' : 'none';
    });

    // Persist value for submit
    window.__selectedCondition = key;
    let hidden = document.getElementById('conditionValue');
    if (!hidden) {
      hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.id   = 'conditionValue';
      hidden.name = 'condition';
      const grid = document.getElementById('cond-new')?.parentElement;
      (grid?.parentElement || document.body).appendChild(hidden);
    }
    hidden.value = key;
  };
}
=======
}
>>>>>>> 87fb09fc2003a58e1243cdc1274a3eb44103e670
