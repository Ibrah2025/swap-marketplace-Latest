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
          <div style="background: white; padding: 16px; border-bottom: 1px solid #e5e7eb;">
            <label style="display: block; margin-bottom: 4px; font-size: 14px; color: #1f2937;">
              Kategorie <span style="color: #ef4444;">*</span>
            </label>
            <select id="itemCategory" style="width: 100%; padding: 0; border: none; font-size: 16px; background: none; outline: none;">
              <option value="">Wähle Kategorie</option>
              <option value="elektronik">Elektronik</option>
              <option value="mode">Mode</option>
              <option value="haushalt">Haushalt</option>
            </select>
          </div>

          <!-- Condition -->
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

        </div>
        
        <input type="file" id="photoInput" accept="image/*" multiple style="display: none;">
      </div>
    `;
  }

  renderPhotoGrid() {
    let html = '';
    
    for (let i = 0; i < this.photos.length; i++) {
      html += `<div style="position: relative; flex-shrink: 0;">
        <img src="${this.photos[i]}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
        <button onclick="window.removePhoto(${i})" style="position: absolute; top: -4px; right: -4px; background: #ef4444; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 12px; cursor: pointer;">×</button>
      </div>`;
    }
    
    if (this.photos.length < this.maxPhotos) {
      html += `<button onclick="window.showPhotoSourceModal()" style="width: 80px; height: 80px; border: 2px solid #e5e7eb; border-radius: 8px; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;">
        <span style="font-size: 24px; color: #9ca3af;">📷</span>
      </button>`;
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
}