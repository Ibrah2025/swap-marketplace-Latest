export class SwapsPage {
  constructor() {
    this.activeTab = "incoming"; // 'incoming' | 'outgoing' | 'completed'
    this.swapProposals = this.loadSwapProposals();
  }

  loadSwapProposals() {
    try {
      const saved = localStorage.getItem("swapProposals");
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return {
      incoming: [
        {
          id: "swap1",
          fromUser: "Anna Schmidt",
          offeredItem: { title: "Samsung Galaxy S21", image: "", condition: "Sehr gut" },
          requestedItem:{ title: "iPhone 12",           image: "", condition: "Wie neu"   },
          status: "pending",
          date: "Heute, 14:30",
          message: "Wuerde gerne tauschen! Mein Samsung ist in top Zustand."
        }
      ],
      outgoing: [],
      completed: []
    };
  }

  save() {
    try { localStorage.setItem("swapProposals", JSON.stringify(this.swapProposals)); } catch(e) {}
  }

  // ---------- RENDER ----------
  render() {
    const count = (this.swapProposals.incoming || []).length;
    return `
      <div style="position:fixed;top:0;left:0;right:0;bottom:60px;background:#f9fafb;z-index:999;overflow-y:auto;">
        <!-- Header -->
        <header style="background:#007185;color:#fff;padding:12px 16px;position:sticky;top:0;z-index:10;">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:12px;">
              <button onclick="window.closeSwapsPage()" style="background:none;border:none;color:#fff;font-size:20px;cursor:pointer;" aria-label="Zurueck">&#8592;</button>
              <h1 style="margin:0;font-size:18px;font-weight:600;">Tauschangebote</h1>
            </div>
          </div>
        </header>

        <!-- Tabs -->
        <div style="background:#fff;border-bottom:1px solid #e5e7eb;display:flex;">
          ${["incoming","outgoing","completed"].map(t => `
            <button
              onclick="window.__swaps.switchTab('${t}')"
              id="tab-${t}"
              style="
                flex:1;padding:14px;background:none;border:none;
                border-bottom:2px solid ${this.activeTab===t?'#ff9900':'transparent'};
                color:${this.activeTab===t?'#ff9900':'#6b7280'};
                font-weight:500;cursor:pointer;">
              ${t==='incoming'?'Eingehend':t==='outgoing'?'Ausgehend':'Abgeschlossen'}
              ${t==='incoming' && count>0 ? `<span style="background:#ef4444;color:#fff;padding:2px 6px;border-radius:10px;font-size:11px;margin-left:4px;">${count}</span>` : ``}
            </button>
          `).join("")}
        </div>

        <!-- Content -->
        <div id="swapContent" style="padding:16px;">
          ${this.renderSwapContent()}
        </div>
      </div>
    `;
  }

  renderSwapContent() {
    const arr = this.swapProposals[this.activeTab] || [];
    if (!arr.length) {
      const label = this.activeTab==='incoming' ? 'eingehenden' : (this.activeTab==='outgoing' ? 'ausgehenden' : 'abgeschlossenen');
      return `
        <div style="text-align:center;padding:60px 20px;">
          <div style="font-size:40px;margin-bottom:12px;">&#10227;</div>
          <p style="color:#6b7280;font-size:16px;">Keine ${label} Tauschvorschlaege</p>
        </div>`;
    }

    return arr.map(p => `
      <div style="background:#fff;border-radius:12px;padding:16px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <!-- User -->
        <div style="display:flex;align-items:center;margin-bottom:12px;">
          <div style="width:40px;height:40px;border-radius:50%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-weight:600;color:#374151;">
            ${p.fromUser ? p.fromUser.charAt(0) : "U"}
          </div>
          <div style="margin-left:12px;">
            <div style="font-weight:600;color:#111827;">${p.fromUser || "Unbekannt"}</div>
            <div style="font-size:12px;color:#6b7280;">${p.date || ""}</div>
          </div>
        </div>

        <!-- Items -->
        <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#f9fafb;border-radius:8px;margin-bottom:12px;">
          <div style="text-align:center;flex:1;">
            <img src="${p.offeredItem.image || (window.__imgFallback||'')}"
                 onerror="this.onerror=null;this.src=window.__imgFallback"
                 style="width:80px;height:80px;object-fit:cover;border-radius:8px;margin-bottom:8px;">
            <div style="font-size:13px;font-weight:500;">${p.offeredItem.title}</div>
            <div style="font-size:11px;color:#6b7280;">${p.offeredItem.condition}</div>
          </div>

          <div style="font-size:22px;color:#ff9900;">&#8646;</div>

          <div style="text-align:center;flex:1;">
            <img src="${p.requestedItem.image || (window.__imgFallback||'')}"
                 onerror="this.onerror=null;this.src=window.__imgFallback"
                 style="width:80px;height:80px;object-fit:cover;border-radius:8px;margin-bottom:8px;">
            <div style="font-size:13px;font-weight:500;">${p.requestedItem.title}</div>
            <div style="font-size:11px;color:#6b7280;">${p.requestedItem.condition}</div>
          </div>
        </div>

        ${p.message ? `
          <div style="padding:10px;background:#f0f9ff;border-left:3px solid #3b82f6;margin-bottom:12px;border-radius:4px;">
            <p style="margin:0;font-size:14px;color:#1e40af;">"${p.message}"</p>
          </div>` : ``}

        ${p.status==='pending' && this.activeTab==='incoming' ? `
          <div style="display:flex;gap:8px;">
            <button onclick="window.__swaps.accept('${p.id}')"
                    style="flex:1;padding:10px;background:#10b981;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;">
              &#10003; Annehmen
            </button>
            <button onclick="window.__swaps.reject('${p.id}')"
                    style="flex:1;padding:10px;background:#ef4444;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;">
              &#10005; Ablehnen
            </button>
            <button onclick="window.__swaps.chat('${p.id}')"
                    style="padding:10px 16px;background:#f3f4f6;color:#111827;border:none;border-radius:8px;font-weight:600;cursor:pointer;">
              &#128172;
            </button>
          </div>` : ``}

        ${p.status==='accepted' ? `
          <div style="text-align:center;padding:8px;background:#d1fae5;color:#065f46;border-radius:8px;font-weight:600;">
            &#10003; Angenommen
          </div>` : ``}

        ${p.status==='rejected' ? `
          <div style="text-align:center;padding:8px;background:#fee2e2;color:#991b1b;border-radius:8px;font-weight:600;">
            &#10005; Abgelehnt
          </div>` : ``}
      </div>
    `).join("");
  }

  // ---------- Actions / UI updates ----------
  switchTab(tab) {
    this.activeTab = tab;
    const sc = document.getElementById("swapContent");
    if (sc) sc.innerHTML = this.renderSwapContent();
    ["incoming","outgoing","completed"].forEach(t => {
      const el = document.getElementById(`tab-${t}`);
      if (!el) return;
      el.style.borderBottomColor = t===tab ? "#ff9900" : "transparent";
      el.style.color            = t===tab ? "#ff9900" : "#6b7280";
    });
  }

  accept(id) {
    const idx = (this.swapProposals.incoming||[]).findIndex(p=>p.id===id);
    if (idx>-1) {
      const p = this.swapProposals.incoming[idx];
      p.status = "accepted";
      (this.swapProposals.completed = this.swapProposals.completed||[]).unshift(p);
      this.swapProposals.incoming.splice(idx,1);
      this.save();
      this.switchTab("incoming");
    }
  }

  reject(id) {
    const idx = (this.swapProposals.incoming||[]).findIndex(p=>p.id===id);
    if (idx>-1) {
      const p = this.swapProposals.incoming[idx];
      p.status = "rejected";
      (this.swapProposals.completed = this.swapProposals.completed||[]).unshift(p);
      this.swapProposals.incoming.splice(idx,1);
      this.save();
      this.switchTab("incoming");
    }
  }

  chat(id) { alert("Chat ueber Tausch " + id + " oeffnen"); }
}