class SwapService {
  constructor() {
    this.proposals = this.loadProposals();
  }

  loadProposals() {
    const saved = localStorage.getItem("swapProposals");
    if (saved) return JSON.parse(saved);
    
    // Mock proposals
    return [
      {
        id: "swap1",
        fromUserId: "user2",
        fromUserName: "Anna Schmidt",
        toUserId: "current",
        offeredItemId: "item3",
        offeredItemTitle: "Samsung Galaxy S21",
        offeredItemPhoto: "https://via.placeholder.com/150",
        requestedItemId: "item1",
        requestedItemTitle: "iPhone 12",
        requestedItemPhoto: "https://via.placeholder.com/150",
        status: "pending",
        createdAt: new Date(Date.now() - 3600000).toISOString()
      }
    ];
  }

  saveProposals() {
    localStorage.setItem("swapProposals", JSON.stringify(this.proposals));
  }

  getMyProposals() {
    return this.proposals.filter(p => 
      p.toUserId === "current" || p.fromUserId === "current"
    );
  }

  createProposal(offeredItem, requestedItem, toUser) {
    const proposal = {
      id: "swap" + Date.now(),
      fromUserId: "current",
      fromUserName: "Me",
      toUserId: toUser.id,
      toUserName: toUser.name,
      offeredItemId: offeredItem.id,
      offeredItemTitle: offeredItem.title,
      offeredItemPhoto: offeredItem.photoURL,
      requestedItemId: requestedItem.id,
      requestedItemTitle: requestedItem.title,
      requestedItemPhoto: requestedItem.photoURL,
      status: "pending",
      createdAt: new Date().toISOString()
    };
    
    this.proposals.push(proposal);
    this.saveProposals();
    return proposal;
  }

  acceptProposal(proposalId) {
    const proposal = this.proposals.find(p => p.id === proposalId);
    if (proposal) {
      proposal.status = "accepted";
      this.saveProposals();
    }
  }

  rejectProposal(proposalId) {
    const proposal = this.proposals.find(p => p.id === proposalId);
    if (proposal) {
      proposal.status = "rejected";
      this.saveProposals();
    }
  }
}

export default new SwapService();