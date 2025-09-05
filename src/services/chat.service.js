class ChatService {
  constructor() {
    this.conversations = this.loadConversations();
    this.messages = this.loadMessages();
  }

  loadConversations() {
    const saved = localStorage.getItem("conversations");
    if (saved) return JSON.parse(saved);
    
    // Mock conversations
    return [
      {
        id: "conv1",
        participantId: "user2",
        participantName: "Anna Schmidt",
        itemId: "item1",
        itemTitle: "iPhone 12",
        lastMessage: "Ist der Artikel noch verfgbar?",
        lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
        unread: 2
      },
      {
        id: "conv2",
        participantId: "user3",
        participantName: "Max Mller",
        itemId: "item2",
        itemTitle: "MacBook Air",
        lastMessage: "Knnen wir tauschen?",
        lastMessageTime: new Date(Date.now() - 7200000).toISOString(),
        unread: 0
      }
    ];
  }

  loadMessages() {
    const saved = localStorage.getItem("messages");
    if (saved) return JSON.parse(saved);
    
    return {
      conv1: [
        { id: "m1", senderId: "user2", text: "Hallo, ist der iPhone 12 noch da?", time: new Date(Date.now() - 7200000).toISOString() },
        { id: "m2", senderId: "current", text: "Ja, noch verfgbar!", time: new Date(Date.now() - 3700000).toISOString() },
        { id: "m3", senderId: "user2", text: "Ist der Artikel noch verfgbar?", time: new Date(Date.now() - 3600000).toISOString() }
      ],
      conv2: [
        { id: "m4", senderId: "user3", text: "Knnen wir tauschen?", time: new Date(Date.now() - 7200000).toISOString() }
      ]
    };
  }

  saveConversations() {
    localStorage.setItem("conversations", JSON.stringify(this.conversations));
  }

  saveMessages() {
    localStorage.setItem("messages", JSON.stringify(this.messages));
  }

  getConversations() {
    return this.conversations.sort((a, b) => 
      new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
    );
  }

  getMessages(conversationId) {
    return this.messages[conversationId] || [];
  }

  sendMessage(conversationId, text) {
    const message = {
      id: "m" + Date.now(),
      senderId: "current",
      text: text,
      time: new Date().toISOString()
    };
    
    if (!this.messages[conversationId]) {
      this.messages[conversationId] = [];
    }
    this.messages[conversationId].push(message);
    
    // Update conversation
    const conv = this.conversations.find(c => c.id === conversationId);
    if (conv) {
      conv.lastMessage = text;
      conv.lastMessageTime = message.time;
    }
    
    this.saveMessages();
    this.saveConversations();
    
    return message;
  }

  createConversation(participantId, participantName, itemId, itemTitle) {
    const conversation = {
      id: "conv" + Date.now(),
      participantId,
      participantName,
      itemId,
      itemTitle,
      lastMessage: "",
      lastMessageTime: new Date().toISOString(),
      unread: 0
    };
    
    this.conversations.push(conversation);
    this.saveConversations();
    return conversation;
  }

  markAsRead(conversationId) {
    const conv = this.conversations.find(c => c.id === conversationId);
    if (conv) {
      conv.unread = 0;
      this.saveConversations();
    }
  }
}

export default new ChatService();