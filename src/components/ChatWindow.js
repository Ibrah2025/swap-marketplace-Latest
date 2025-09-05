import chatService from "../services/chat.service.js";

export class ChatWindow {
  constructor(conversationId) {
    this.conversationId = conversationId;
    this.conversation = chatService.getConversations().find(c => c.id === conversationId);
    chatService.markAsRead(conversationId);
  }

  render() {
    const messages = chatService.getMessages(this.conversationId);
    
    return `
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: white; z-index: 1001; display: flex; flex-direction: column;">
        <!-- Chat Header -->
        <header style="background: #007185; color: white; padding: 12px; display: flex; align-items: center; gap: 12px;">
          <button onclick="window.closeChat()" style="background: none; border: none; color: white; font-size: 24px;"></button>
          <div style="flex: 1;">
            <div style="font-weight: 600;">${this.conversation.participantName}</div>
            <div style="font-size: 12px; opacity: 0.8;">${this.conversation.itemTitle}</div>
          </div>
        </header>
        
        <!-- Messages Area -->
        <div id="messagesArea" style="flex: 1; overflow-y: auto; padding: 12px; background: #f5f5f5;">
          ${messages.map(msg => this.renderMessage(msg)).join('')}
        </div>
        
        <!-- Input Area -->
        <div style="background: white; border-top: 1px solid #e5e7eb; padding: 12px; display: flex; gap: 8px;">
          <input type="text" id="messageInput" placeholder="Nachricht schreiben..." 
                 style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 20px; outline: none;">
          <button onclick="window.sendMessage('${this.conversationId}')" 
                  style="background: #007185; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
            
          </button>
        </div>
      </div>
    `;
  }

  renderMessage(msg) {
    const isMine = msg.senderId === 'current';
    const time = new Date(msg.time).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    
    return `
      <div style="display: flex; justify-content: ${isMine ? 'flex-end' : 'flex-start'}; margin-bottom: 12px;">
        <div style="max-width: 70%; padding: 10px 14px; border-radius: 18px; 
                    background: ${isMine ? '#007185' : 'white'}; 
                    color: ${isMine ? 'white' : 'black'};">
          <div>${msg.text}</div>
          <div style="font-size: 11px; margin-top: 4px; opacity: 0.7;">${time}</div>
        </div>
      </div>
    `;
  }
}