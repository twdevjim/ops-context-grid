# Ops Context Grid

A collaborative operations console demonstrating shared context across multiple operators using React, Zustand, and Dockview.

## 🎯 Overview

Ops Context Grid is a proof-of-concept application that showcases how to build a multi-user operations console where operators can share global context (like active incidents) while maintaining individual workspace layouts. It uses a **three-layer context model** (Global, Team, Personal) to balance collaboration with personalization.

## ✨ Key Features

- **🔴 Global Context**: Synced across all users (e.g., active incident selection)
- **🔵 Team Context**: Shared within team groups (e.g., team filters)
- **⚪ Personal Context**: Local to each user (e.g., panel layout, preferences)
- **📊 Hierarchical Sidebar**: Collapsible categories for 23+ AI ops panels
- **🔄 Real-time Sync**: Uses BroadcastChannel API to sync state across browser tabs
- **🪟 Dockview Integration**: IDE-like workspace with draggable, resizable panels

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Access the app at `http://localhost:3001`. Open multiple tabs to see real-time synchronization in action!

## 🏗️ Architecture

### Three-Layer Context Model

1. **Global Slice** - Broadcasted to all users
   - Active incident ID
   - Global time range
   - Shared tags

2. **Team Slice** - Synced within team
   - Team ID
   - Team-level filters

3. **Personal Slice** - Local only
   - Active panels
   - Layout mode
   - Expanded categories

### Tech Stack

- **React 18** + **TypeScript** - UI framework
- **Zustand** - Lightweight state management
- **Dockview** - Panel/docking system
- **AG Grid** - Data grid component
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool

## 📂 Project Structure

```
src/
├── components/
│   ├── Shell.tsx                    # Main layout (CSS Grid)
│   ├── HierarchicalSidebar.tsx      # Collapsible panel navigator
│   ├── DockLayout.tsx               # Dockview wrapper
│   └── panels/
│       ├── IncidentGrid.tsx         # AG Grid incidents
│       ├── IncidentMap.tsx          # Map placeholder
│       ├── DetailPanel.tsx          # Incident details
│       └── PlaceholderPanel.tsx     # For future panels
├── store/
│   └── opsStore.ts                  # Zustand store (3-layer model)
├── services/
│   └── mockNetwork.ts               # BroadcastChannel sync
└── config/
    └── panelHierarchy.ts            # Panel categories definition
```

## 🎨 Panel Categories

- **Monitoring & Observability** - Incidents, Maps, Metrics, Traces
- **Agent Management** - Fleet Status, Task Queue, Logs, Analytics
- **Workflow & Automation** - Designer, Pipelines, Jobs, Triggers
- **Data & Knowledge** - Knowledge Graph, Vector Store, Lineage
- **Security & Governance** - Audit, Access Control, Compliance
- **General** - Details and utility panels

## 🧪 Testing Multi-Tab Sync

1. Open `http://localhost:3001` in two browser tabs side-by-side
2. Click an incident in Tab 1's grid
3. Watch Tab 2's Details and Map panels update instantly
4. Click a different incident in Tab 2
5. Tab 1 updates to reflect the change

This demonstrates the BroadcastChannel-based synchronization without requiring a backend.

## 📝 License

MIT

## 🤝 Contributing

This is a proof-of-concept project. Feel free to fork and extend it!
