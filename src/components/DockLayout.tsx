import React, { useRef, useEffect } from 'react';
import { DockviewReact, DockviewReadyEvent } from 'dockview';
import { IncidentGrid } from './panels/IncidentGrid';
import { IncidentMap } from './panels/IncidentMap';
import { DetailPanel } from './panels/DetailPanel';
import { PlaceholderPanel } from './panels/PlaceholderPanel';
import { useOpsStore, OpsState } from '../store/opsStore';

const components = {
    grid: IncidentGrid,
    map: IncidentMap,
    details: DetailPanel,
    placeholder: PlaceholderPanel,
};

export const DockLayout: React.FC = () => {
    const api = useRef<DockviewReadyEvent | null>(null);
    const activePanels = useOpsStore((s: OpsState) => s.personal.activePanels);

    // Sync Dockview with Store state
    useEffect(() => {
        if (!api.current) return;
        const dockApi = api.current.api;

        // Dynamically sync all panels based on activePanels in store
        activePanels.forEach((panelId, index) => {
            const panel = dockApi.getPanel(panelId + '-1');

            if (!panel) {
                // Panel should be open but isn't - create it
                // Determine component based on panel ID (from config)
                const component = ['grid', 'map', 'details'].includes(panelId)
                    ? panelId
                    : 'placeholder';

                dockApi.addPanel({
                    id: panelId + '-1',
                    component,
                    title: panelId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                    position: index === 0 ? undefined : { direction: 'right' }
                });
            }
        });

        // Close panels that shouldn't be open
        const allPanels = dockApi.panels;
        allPanels.forEach((panel) => {
            const panelId = panel.id.replace('-1', '');
            if (!activePanels.includes(panelId)) {
                panel.api.close();
            }
        });
    }, [activePanels]);

    const onReady = (event: DockviewReadyEvent) => {
        api.current = event;

        // Initial Load based on store
        // (The useEffect will handle this if we ensure it runs after mount)
    };

    return (
        <DockviewReact
            components={components}
            onReady={onReady}
            className="dockview-theme-abyss" // Built-in dark theme
        />
    );
};
