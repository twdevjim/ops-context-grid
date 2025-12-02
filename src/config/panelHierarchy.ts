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
    Package,
    Server,
    CreditCard,
    DollarSign,
    Wrench,
    PlayCircle,
    GitPullRequest,
    Heart,
    HelpCircle,
    Lightbulb,
    Award,
    TrendingUp,
    Users,
    PieChart,
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
        id: 'agents',
        label: 'Agent Management',
        icon: Bot,
        panels: [
            { id: 'fleet', label: 'Agent Fleet Status', component: 'placeholder', icon: Bot },
            { id: 'logs', label: 'Execution Logs', component: 'placeholder', icon: ScrollText },
            { id: 'performance', label: 'Performance Analytics', component: 'placeholder', icon: BarChart3 },
            { id: 'queue', label: 'Task Queue', component: 'placeholder', icon: ListChecks },
        ]
    },
    {
        id: 'assets',
        label: 'Assets & Infrastructure',
        icon: Package,
        panels: [
            { id: 'inventory', label: 'Asset Inventory', component: 'placeholder', icon: Package },
            { id: 'costs', label: 'Cost Analysis', component: 'placeholder', icon: DollarSign },
            { id: 'hardware', label: 'Hardware Status', component: 'placeholder', icon: Server },
            { id: 'licenses', label: 'Software Licenses', component: 'placeholder', icon: FileText },
        ]
    },
    {
        id: 'knowledge',
        label: 'Data & Knowledge',
        icon: BookOpen,
        panels: [
            { id: 'lineage', label: 'Data Lineage', component: 'placeholder', icon: GitBranch },
            { id: 'graph', label: 'Knowledge Graph', component: 'placeholder', icon: Network },
            { id: 'models', label: 'Model Registry', component: 'placeholder', icon: BookOpen },
            { id: 'vectors', label: 'Vector Store Browser', component: 'placeholder', icon: Database },
        ]
    },
    {
        id: 'general',
        label: 'General',
        icon: FileText,
        panels: [
            { id: 'details', label: 'Details Panel', component: 'details', icon: FileText },
        ]
    },
    {
        id: 'kb',
        label: 'Knowledge Base',
        icon: BookOpen,
        panels: [
            { id: 'best-practices', label: 'Best Practices', component: 'placeholder', icon: Award },
            { id: 'docs', label: 'Documentation Browser', component: 'placeholder', icon: BookOpen },
            { id: 'faq', label: 'FAQ & Troubleshooting', component: 'placeholder', icon: HelpCircle },
            { id: 'lessons', label: 'Lessons Learned', component: 'placeholder', icon: Lightbulb },
        ]
    },
    {
        id: 'markets',
        label: 'Markets & Analytics',
        icon: TrendingUp,
        panels: [
            { id: 'competitors', label: 'Competitor Analysis', component: 'placeholder', icon: Users },
            { id: 'trends', label: 'Market Trends', component: 'placeholder', icon: TrendingUp },
            { id: 'pricing', label: 'Service Pricing', component: 'placeholder', icon: CreditCard },
            { id: 'usage', label: 'Usage Analytics', component: 'placeholder', icon: PieChart },
        ]
    },
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
        id: 'ops',
        label: 'Operations',
        icon: Wrench,
        panels: [
            { id: 'change-mgmt', label: 'Change Management', component: 'placeholder', icon: GitPullRequest },
            { id: 'incident-response', label: 'Incident Response', component: 'placeholder', icon: AlertTriangle },
            { id: 'runbooks', label: 'Runbooks', component: 'placeholder', icon: PlayCircle },
            { id: 'service-health', label: 'Service Health', component: 'placeholder', icon: Heart },
        ]
    },
    {
        id: 'security',
        label: 'Security & Governance',
        icon: Shield,
        panels: [
            { id: 'access', label: 'Access Control', component: 'placeholder', icon: Lock },
            { id: 'audit', label: 'Audit Logs', component: 'placeholder', icon: ScrollText },
            { id: 'compliance', label: 'Compliance Dashboard', component: 'placeholder', icon: Shield },
            { id: 'threats', label: 'Threat Detection', component: 'placeholder', icon: AlertTriangle },
        ]
    },
    {
        id: 'workflows',
        label: 'Workflow & Automation',
        icon: GitBranch,
        panels: [
            { id: 'triggers', label: 'Event Triggers', component: 'placeholder', icon: Zap },
            { id: 'pipeline', label: 'Pipeline Status', component: 'placeholder', icon: Rocket },
            { id: 'scheduled', label: 'Scheduled Jobs', component: 'placeholder', icon: Calendar },
            { id: 'designer', label: 'Workflow Designer', component: 'placeholder', icon: GitBranch },
        ]
    }
];
