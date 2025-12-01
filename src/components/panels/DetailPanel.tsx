import React from 'react';
import { useOpsStore } from '../../store/opsStore';
import { IDockviewPanelProps } from 'dockview';

export const DetailPanel: React.FC<IDockviewPanelProps> = () => {
    const activeIncidentId = useOpsStore((s) => s.global.activeIncidentId);

    if (!activeIncidentId) {
        return (
            <div className="h-full w-full bg-slate-900 text-slate-500 flex items-center justify-center p-4 text-center">
                Select an incident to view details.
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-slate-900 text-slate-200 p-4 overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">Incident Details</h2>

            <div className="space-y-4">
                <div className="bg-slate-800 p-3 rounded border border-slate-700">
                    <label className="text-xs text-slate-500 uppercase font-bold block mb-1">ID</label>
                    <div className="font-mono text-indigo-400">{activeIncidentId}</div>
                </div>

                <div className="bg-slate-800 p-3 rounded border border-slate-700">
                    <label className="text-xs text-slate-500 uppercase font-bold block mb-1">Status</label>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span>Active</span>
                    </div>
                </div>

                <div className="bg-slate-800 p-3 rounded border border-slate-700">
                    <label className="text-xs text-slate-500 uppercase font-bold block mb-1">Description</label>
                    <p className="text-sm text-slate-300">
                        Detailed analysis of the incident would appear here. This panel is reactive to the global selection.
                    </p>
                </div>

                <div className="bg-slate-800 p-3 rounded border border-slate-700">
                    <label className="text-xs text-slate-500 uppercase font-bold block mb-1">Team Context</label>
                    <p className="text-sm text-slate-300">
                        Notes from the Network Ops team...
                    </p>
                </div>
            </div>
        </div>
    );
};
