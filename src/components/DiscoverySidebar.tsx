import React from 'react';
import { useOpsStore } from '../store/opsStore';
import {
    Clock,
    MapPin,
    AlertCircle,
    User,
    Tag,
    Activity,
    CheckCircle,
    XCircle
} from 'lucide-react';

export const DiscoverySidebar: React.FC = () => {
    const { global, team } = useOpsStore();
    const activeIncidentId = global.activeIncidentId;

    // Mock incident data - in a real app, this would come from an API
    const incidentData = React.useMemo(() => {
        if (!activeIncidentId) return null;

        const incidents: Record<string, any> = {
            'INC-001': {
                id: 'INC-001',
                title: 'Database Latency',
                severity: 'High',
                status: 'Active',
                region: 'us-east-1',
                assignee: 'Sarah Chen',
                createdAt: '2024-12-01T14:23:00Z',
                updatedAt: '2024-12-01T18:45:00Z',
                description: 'Database response times have increased to 2.5s average, affecting API performance.',
                tags: ['database', 'performance', 'backend'],
                affectedServices: ['API Gateway', 'Auth Service', 'User Service'],
                metrics: {
                    responseTime: '2.5s',
                    errorRate: '0.02%',
                    affectedUsers: '~500'
                }
            },
            'INC-002': {
                id: 'INC-002',
                title: 'API Timeout',
                severity: 'Critical',
                status: 'Investigating',
                region: 'eu-west-1',
                assignee: 'Mike Johnson',
                createdAt: '2024-12-01T16:10:00Z',
                updatedAt: '2024-12-01T19:15:00Z',
                description: 'Multiple API endpoints timing out after 30 seconds. Root cause investigation in progress.',
                tags: ['api', 'timeout', 'critical'],
                affectedServices: ['Payment API', 'Notification Service'],
                metrics: {
                    responseTime: '30s+',
                    errorRate: '15.3%',
                    affectedUsers: '~2,000'
                }
            },
            'INC-003': {
                id: 'INC-003',
                title: 'Disk Full',
                severity: 'Medium',
                status: 'Resolved',
                region: 'us-west-2',
                assignee: 'Alex Kumar',
                createdAt: '2024-11-30T09:00:00Z',
                updatedAt: '2024-12-01T11:30:00Z',
                description: 'Log server disk usage reached 98%. Logs rotated and old files archived.',
                tags: ['infrastructure', 'storage', 'logs'],
                affectedServices: ['Log Aggregator'],
                metrics: {
                    diskUsage: '98% → 45%',
                    errorRate: '0%',
                    affectedUsers: 'None'
                }
            }
        };

        return incidents[activeIncidentId] || null;
    }, [activeIncidentId]);

    if (!activeIncidentId) {
        return (
            <div className="h-full w-full bg-slate-900 border-l border-slate-800 p-4 flex flex-col items-center justify-center text-center">
                <Activity size={48} className="text-slate-700 mb-4" />
                <h3 className="text-sm font-semibold text-slate-400 mb-2">Discovery Panel</h3>
                <p className="text-xs text-slate-500">
                    Select an incident or item to view detailed information
                </p>
            </div>
        );
    }

    if (!incidentData) {
        return (
            <div className="h-full w-full bg-slate-900 border-l border-slate-800 p-4">
                <p className="text-sm text-slate-500">Incident not found</p>
            </div>
        );
    }

    const StatusIcon = incidentData.status === 'Resolved' ? CheckCircle :
        incidentData.status === 'Active' ? AlertCircle : XCircle;
    const statusColor = incidentData.status === 'Resolved' ? 'text-green-400' :
        incidentData.status === 'Active' ? 'text-yellow-400' : 'text-red-400';

    return (
        <div className="h-full w-full bg-slate-900 border-l border-slate-800 overflow-y-auto">
            <div className="p-4 space-y-4">
                {/* Header */}
                <div className="pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2 mb-1">
                        <StatusIcon size={16} className={statusColor} />
                        <span className="text-xs font-mono text-slate-400">{incidentData.id}</span>
                    </div>
                    <h2 className="text-lg font-semibold text-slate-100">{incidentData.title}</h2>
                </div>

                {/* Status & Severity */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <div className="text-xs text-slate-500 mb-1">Status</div>
                        <div className={`text-sm font-semibold ${statusColor}`}>
                            {incidentData.status}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-slate-500 mb-1">Severity</div>
                        <div className={`text-sm font-semibold ${incidentData.severity === 'Critical' ? 'text-red-400' :
                                incidentData.severity === 'High' ? 'text-orange-400' : 'text-yellow-400'
                            }`}>
                            {incidentData.severity}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <div className="text-xs text-slate-500 mb-2">Description</div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        {incidentData.description}
                    </p>
                </div>

                {/* Metadata */}
                <div className="space-y-2">
                    <div className="flex items-start gap-2">
                        <MapPin size={14} className="text-slate-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <div className="text-xs text-slate-500">Region</div>
                            <div className="text-sm text-slate-300 font-mono">{incidentData.region}</div>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <User size={14} className="text-slate-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <div className="text-xs text-slate-500">Assignee</div>
                            <div className="text-sm text-slate-300">{incidentData.assignee}</div>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <Clock size={14} className="text-slate-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <div className="text-xs text-slate-500">Created</div>
                            <div className="text-sm text-slate-300">
                                {new Date(incidentData.createdAt).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <div className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                        <Tag size={12} />
                        Tags
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {incidentData.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-slate-800 text-slate-300 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Affected Services */}
                <div>
                    <div className="text-xs text-slate-500 mb-2">Affected Services</div>
                    <div className="space-y-1">
                        {incidentData.affectedServices.map((service: string) => (
                            <div
                                key={service}
                                className="text-sm text-slate-300 py-1 px-2 bg-slate-800/50 rounded"
                            >
                                {service}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Metrics */}
                <div>
                    <div className="text-xs text-slate-500 mb-2">Key Metrics</div>
                    <div className="bg-slate-800/50 rounded p-3 space-y-2">
                        {Object.entries(incidentData.metrics).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center">
                                <span className="text-xs text-slate-400 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                <span className="text-sm text-slate-200 font-mono">{value as string}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Context */}
                {team.id && (
                    <div className="pt-3 border-t border-slate-800">
                        <div className="text-xs text-slate-500 mb-1">Team Context</div>
                        <div className="text-sm text-blue-400">{team.id}</div>
                    </div>
                )}
            </div>
        </div>
    );
};
