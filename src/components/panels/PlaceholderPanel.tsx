import React from 'react';
import { IDockviewPanelProps } from 'dockview';
import { Construction } from 'lucide-react';

export const PlaceholderPanel: React.FC<IDockviewPanelProps> = () => {
    return (
        <div className="h-full w-full bg-slate-900 flex items-center justify-center flex-col gap-4 p-8 text-center">
            <Construction size={48} className="text-slate-600" />
            <div className="text-slate-400">
                <h3 className="text-lg font-semibold mb-2">Panel Coming Soon</h3>
                <p className="text-sm text-slate-500">
                    This panel is part of the planned AI Ops Console architecture.
                </p>
            </div>
        </div>
    );
};
