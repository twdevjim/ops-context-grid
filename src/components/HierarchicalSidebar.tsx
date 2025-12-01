import React from 'react';
import { clsx } from 'clsx';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useOpsStore } from '../store/opsStore';
import { panelHierarchy } from '../config/panelHierarchy';

export const HierarchicalSidebar: React.FC = () => {
    const activePanels = useOpsStore((s) => s.personal.activePanels);
    const expandedCategories = useOpsStore((s) => s.personal.expandedCategories);
    const togglePanel = useOpsStore((s) => s.togglePanel);
    const toggleCategory = useOpsStore((s) => s.toggleCategory);

    return (
        <div className="h-full w-full bg-slate-900 border-r border-slate-800 overflow-y-auto">
            <div className="py-2">
                {panelHierarchy.map((category) => {
                    const isExpanded = expandedCategories.includes(category.id);
                    const CategoryIcon = category.icon;

                    return (
                        <div key={category.id} className="mb-1">
                            {/* Category Header */}
                            <button
                                onClick={() => toggleCategory(category.id)}
                                className={clsx(
                                    "w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors",
                                    "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                                )}
                            >
                                {isExpanded ? (
                                    <ChevronDown size={14} className="flex-shrink-0" />
                                ) : (
                                    <ChevronRight size={14} className="flex-shrink-0" />
                                )}
                                <CategoryIcon size={14} className="flex-shrink-0" />
                                <span className="truncate">{category.label}</span>
                            </button>

                            {/* Panels */}
                            {isExpanded && (
                                <div className="ml-6 border-l border-slate-800">
                                    {category.panels.map((panel) => {
                                        const isActive = activePanels.includes(panel.id);
                                        const PanelIcon = panel.icon;

                                        return (
                                            <button
                                                key={panel.id}
                                                onClick={() => togglePanel(panel.id)}
                                                className={clsx(
                                                    "w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors",
                                                    isActive
                                                        ? "bg-indigo-600 text-white"
                                                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                                                )}
                                            >
                                                {PanelIcon && <PanelIcon size={14} className="flex-shrink-0" />}
                                                <span className="truncate">{panel.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
