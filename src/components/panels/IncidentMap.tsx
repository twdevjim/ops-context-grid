import React from 'react';
import { useOpsStore } from '../../store/opsStore';
import { IDockviewPanelProps } from 'dockview';

export const IncidentMap: React.FC<IDockviewPanelProps> = () => {
    const activeIncidentId = useOpsStore((s) => s.global.activeIncidentId);

    return (
        <div className="h-full w-full bg-slate-800 flex items-center justify-center flex-col p-4">
            <h2 className="text-xl font-bold mb-2">Live Map</h2>
            <div className="text-slate-400">
                {activeIncidentId
                    ? `Focused on Incident: ${activeIncidentId}`
                    : "No Incident Selected"}
            </div>
            <div className="mt-4 w-full h-64 bg-slate-700 rounded border border-slate-600 flex items-center justify-center">
                [Map Visualization Placeholder]
            </div>
        </div>
    );
};
