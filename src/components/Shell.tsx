import React from 'react';
import { useOpsStore } from '../store/opsStore';
import { HierarchicalSidebar } from './HierarchicalSidebar';
import { DiscoverySidebar } from './DiscoverySidebar';

interface ShellProps {
    children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
    const { global, team, personal } = useOpsStore();

    return (
        <div className="h-full w-full grid grid-cols-[240px_1fr_250px] grid-rows-[60px_1fr_30px] bg-slate-950 text-slate-200 overflow-hidden">

            {/* Header */}
            <header className="col-span-3 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-4">
                <h1 className="font-bold text-indigo-400 tracking-wider">OPS<span className="text-white">CONSOLE</span></h1>

                {/* Context Layer Indicators */}
                <div className="ml-auto flex items-center gap-3 text-xs">
                    {/* Global Context */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-red-950/30 border border-red-900/50">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-red-400 font-semibold">GLOBAL</span>
                        <span className="text-red-300/70">
                            {global.activeIncidentId || 'No Selection'}
                        </span>
                    </div>

                    {/* Team Context */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-blue-950/30 border border-blue-900/50">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-blue-400 font-semibold">TEAM</span>
                        <span className="text-blue-300/70">
                            {team.id || 'No Team'}
                        </span>
                    </div>

                    {/* Personal Context */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800/50 border border-slate-700">
                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                        <span className="text-slate-400 font-semibold">USER</span>
                        <span className="text-slate-400/70">
                            {personal.layoutMode}
                        </span>
                    </div>
                </div>
            </header>

            {/* Left Sidebar (Hierarchical Panel Navigator) */}
            <aside className="row-start-2 row-span-1 h-full overflow-hidden">
                <HierarchicalSidebar />
            </aside>

            {/* Center (Dockview) */}
            <main className="row-start-2 row-span-1 col-start-2 col-span-1 relative bg-slate-950 overflow-hidden">
                {children}
            </main>

            {/* Right Sidebar (Discovery/Context Panel) */}
            <aside className="row-start-2 row-span-1 h-full overflow-hidden">
                <DiscoverySidebar />
            </aside>

            {/* Footer */}
            <footer className="col-span-3 bg-slate-900 border-t border-slate-800 flex items-center px-4 text-xs text-slate-500 justify-between">
                <div>Ready</div>
                <div>v1.0.0</div>
            </footer>

        </div>
    );
};


