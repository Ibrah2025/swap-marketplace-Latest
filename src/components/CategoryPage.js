import { getCategoryById } from './Categories.js';
import firebaseService from '../services/firebase.service.mock.js';

export class CategoryPage {
  constructor(categoryId) {
    this.category = getCategoryById(categoryId);
  }

  async render() {
    const items = await this.getItemsForCategory();
    
    return `
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #f5f5f5; z-index: 1000; overflow-y: auto;">
        <header style="background: #007185; color: white; padding: 12px; position: sticky; top: 0; z-index: 10;">
          <div style="display: flex; align-items: center;">
            <button onclick="window.closeCategoryPage()" style="background: none; border: none; color: white; font-size: 24px; margin-right: 15px;">←</button>
            <h1 style="margin: 0; font-size: 20px;">${this.category.icon} ${this.category.name}</h1>
          </div>
        </header>
        
        <div style="padding: 10px; padding-bottom: 70px;">
          ${items.length === 0 ? `
            <div style="text-align: center; padding: 40px; color: #666;">
              <div style="font-size: 48px; opacity: 0.3;">${this.category.icon}</div>
              <p>Noch keine Artikel in dieser Kategorie</p>
              <button onclick="window.openCamera()" style="margin-top: 20px; padding: 10px 20px; background: #007185; color: white; border: none; border-radius: 4px;">
                Ersten Artikel einstellen
              </button>
            </div>
          ` : `
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
              ${items.map(item => this.renderItem(item)).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  }

  async getItemsForCategory() {
    const allItems = await firebaseService.getItems();
    return allItems.filter(item => item.category === this.category.id);
  }

  renderItem(item) {
    return `
      <div onclick="window.viewItemDetail('${item.id}')" style="background: white; border-radius: 8px; overflow: hidden; cursor: pointer;">
        <img src="${item.photoURL}" style="width: 100%; height: 150px; object-fit: cover;">
        <div style="padding: 10px;">
          <div style="font-weight: 600; font-size: 14px; color: #232f3e;">${item.title}</div>
          <div style="color: #666; font-size: 12px; margin-top: 4px;">✓ ${item.condition}</div>
          <div style="color: #007185; font-size: 12px; margin-top: 4px;">📍 ${item.location}</div>
          <div style="background: #FFA41C; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; margin-top: 8px; text-align: center;">
            Tausch möglich
          </div>
        </div>
      </div>
    `;
  }
}