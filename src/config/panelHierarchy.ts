import {
    Activity,
    LayoutGrid,
    Map,
    FileText,
    Bot,
    ListChecks,
    ScrollText,
    BarChart3,
    GitBranch,
    Rocket,
    Calendar,
    Zap,
    Network,
    Database,
    BookOpen,
    Shield,
    Lock,
    AlertTriangle,
    LucideIcon
} from 'lucide-react';

export interface PanelDefinition {
    id: string;
    label: string;
    component: string;
    icon?: LucideIcon;
}

export interface PanelCategory {
    id: string;
    label: string;
    icon: LucideIcon;
    panels: PanelDefinition[];
}

export const panelHierarchy: PanelCategory[] = [
    {
        id: 'monitoring',
        label: 'Monitoring & Observability',
        icon: Activity,
        panels: [
            { id: 'grid', label: 'Incidents Grid', component: 'grid', icon: LayoutGrid },
            { id: 'map', label: 'Live Map', component: 'map', icon: Map },
            { id: 'metrics', label: 'Metrics Dashboard', component: 'placeholder', icon: BarChart3 },
            { id: 'traces', label: 'Trace Viewer', component: 'placeholder', icon: Network },
        ]
    },
    {
        id: 'agents',
        label: 'Agent Management',
        icon: Bot,
        panels: [
            { id: 'fleet', label: 'Agent Fleet Status', component: 'placeholder', icon: Bot },
            { id: 'queue', label: 'Task Queue', component: 'placeholder', icon: ListChecks },
            { id: 'logs', label: 'Execution Logs', component: 'placeholder', icon: ScrollText },
            { id: 'performance', label: 'Performance Analytics', component: 'placeholder', icon: BarChart3 },
        ]
    },
    {
        id: 'workflows',
        label: 'Workflow & Automation',
        icon: GitBranch,
        panels: [
            { id: 'designer', label: 'Workflow Designer', component: 'placeholder', icon: GitBranch },
            { id: 'pipeline', label: 'Pipeline Status', component: 'placeholder', icon: Rocket },
            { id: 'scheduled', label: 'Scheduled Jobs', component: 'placeholder', icon: Calendar },
            { id: 'triggers', label: 'Event Triggers', component: 'placeholder', icon: Zap },
        ]
    },
    {
        id: 'knowledge',
        label: 'Data & Knowledge',
        icon: BookOpen,
        panels: [
            { id: 'graph', label: 'Knowledge Graph', component: 'placeholder', icon: Network },
            { id: 'vectors', label: 'Vector Store Browser', component: 'placeholder', icon: Database },
            { id: 'lineage', label: 'Data Lineage', component: 'placeholder', icon: GitBranch },
            { id: 'models', label: 'Model Registry', component: 'placeholder', icon: BookOpen },
        ]
    },
    {
        id: 'security',
        label: 'Security & Governance',
        icon: Shield,
        panels: [
            { id: 'audit', label: 'Audit Logs', component: 'placeholder', icon: ScrollText },
            { id: 'access', label: 'Access Control', component: 'placeholder', icon: Lock },
            { id: 'compliance', label: 'Compliance Dashboard', component: 'placeholder', icon: Shield },
            { id: 'threats', label: 'Threat Detection', component: 'placeholder', icon: AlertTriangle },
        ]
    },
    {
        id: 'general',
        label: 'General',
        icon: FileText,
        panels: [
            { id: 'details', label: 'Details Panel', component: 'details', icon: FileText },
        ]
    }
];
