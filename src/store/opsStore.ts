import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// --- Types ---

export type OpsContextLayer = 'global' | 'team' | 'personal';

export interface OpsState {
    // Global Slice (Synced to everyone)
    global: {
        activeIncidentId: string | null;
        timeRange: { from: string; to: string } | null;
        tags: string[];
    };

    // Team Slice (Synced to team)
    team: {
        id: string | null;
        filters: Record<string, any>;
    };

    // Personal Slice (Local only)
    personal: {
        focusPanelId: string | null;
        activePanels: string[]; // Track open panels
        expandedCategories: string[]; // Track which sidebar categories are expanded
        filters: Record<string, any>;
        layoutMode: 'default' | 'focus' | 'custom';
    };

    // Actions
    setGlobalContext: (update: Partial<OpsState['global']>) => void;
    setTeamContext: (update: Partial<OpsState['team']>) => void;
    setPersonalContext: (update: Partial<OpsState['personal']>) => void;
    togglePanel: (panelId: string) => void;
    toggleCategory: (categoryId: string) => void;

    // Computed / Helpers
    getEffectiveFilters: () => Record<string, any>;
}

// --- Store ---

export const useOpsStore = create<OpsState>()(
    immer((set, get) => ({
        global: {
            activeIncidentId: null,
            timeRange: null,
            tags: [],
        },
        team: {
            id: 'network-ops', // Default team for now
            filters: {},
        },
        personal: {
            focusPanelId: null,
            activePanels: ['grid', 'map', 'details'], // Default open
            expandedCategories: ['monitoring', 'general'], // Default expanded
            filters: {},
            layoutMode: 'default',
        },

        setGlobalContext: (update) =>
            set((state) => {
                Object.assign(state.global, update);
            }),

        setTeamContext: (update) =>
            set((state) => {
                Object.assign(state.team, update);
            }),

        setPersonalContext: (update) =>
            set((state) => {
                Object.assign(state.personal, update);
            }),

        togglePanel: (panelId) =>
            set((state) => {
                const panels = state.personal.activePanels;
                if (panels.includes(panelId)) {
                    state.personal.activePanels = panels.filter((p: string) => p !== panelId);
                } else {
                    state.personal.activePanels.push(panelId);
                }
            }),

        toggleCategory: (categoryId) =>
            set((state) => {
                const categories = state.personal.expandedCategories;
                if (categories.includes(categoryId)) {
                    state.personal.expandedCategories = categories.filter((c: string) => c !== categoryId);
                } else {
                    state.personal.expandedCategories.push(categoryId);
                }
            }),

        getEffectiveFilters: () => {
            const state = get();
            // Merge logic: Personal > Team > Global (or additive, depending on business logic)
            // Here we assume additive for tags/filters, but overriding for specific keys
            return {
                ...state.team.filters,
                ...state.personal.filters,
                // Global tags might be treated differently, e.g., as a specific filter key
                ...(state.global.tags.length > 0 ? { tags: state.global.tags } : {}),
            };
        },
    }))
);
