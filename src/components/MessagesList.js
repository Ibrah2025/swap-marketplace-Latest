import chatService from "../services/chat.service.js";

export class MessagesListPage {
  render() {
    const conversations = chatService.getConversations();
    
    return `
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 60px; background: #f5f5f5; z-index: 999; overflow-y: auto;">
        <header style="background: #007185; color: white; padding: 12px; position: sticky; top: 0; z-index: 10;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center;">
              <button onclick="window.closeMessagesPage()" style="background: none; border: none; color: white; font-size: 24px; margin-right: 15px;">←</button>
              <h1 style="margin: 0; font-size: 20px;">Nachrichten</h1>
            </div>
          </div>
        </header>
        
        <div style="padding-bottom: 20px;">
          ${conversations.length === 0 ? `
            <div style="text-align: center; padding: 40px; color: #666;">
              <div style="font-size: 48px; opacity: 0.3;">💬</div>
              <p>Noch keine Nachrichten</p>
              <p style="font-size: 14px; color: #999;">Starte einen Chat, indem du bei einem Artikel "Nachricht senden" klickst</p>
            </div>
          ` : conversations.map(conv => this.renderConversation(conv)).join('')}
        </div>
      </div>
    `;
  }

  renderConversation(conv) {
    const timeAgo = this.getTimeAgo(new Date(conv.lastMessageTime));
    
    return `
      <div onclick="window.openChat('${conv.id}')" style="background: white; padding: 12px; border-bottom: 1px solid #e5e7eb; cursor: pointer; display: flex; gap: 12px;">
        <div style="width: 50px; height: 50px; background: #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">
          👤
        </div>
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: 600;">${conv.participantName}</span>
            <span style="font-size: 12px; color: #999;">${timeAgo}</span>
          </div>
          <div style="font-size: 14px; color: #666; margin-bottom: 4px;">${conv.itemTitle}</div>
          <div style="font-size: 14px; color: ${conv.unread > 0 ? '#000' : '#999'}; ${conv.unread > 0 ? 'font-weight: 600;' : ''}">
            ${conv.lastMessage || 'Neue Unterhaltung'}
          </div>
        </div>
        ${conv.unread > 0 ? `
          <div style="background: #ff0000; color: white; border-radius: 50%; min-width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px;">
            ${conv.unread}
          </div>
        ` : ''}
      </div>
    `;
  }

  getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'Jetzt';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' Min';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' Std';
    return Math.floor(seconds / 86400) + ' Tage';
  }
}