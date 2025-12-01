import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { useOpsStore } from '../../store/opsStore';
import { mockNetwork } from '../../services/mockNetwork';
import { IDockviewPanelProps } from 'dockview';

export const IncidentGrid: React.FC<IDockviewPanelProps> = () => {
    const { setGlobalContext } = useOpsStore();

    // Mock Data
    const rowData = useMemo(() => [
        { id: 'INC-001', title: 'Database Latency', severity: 'High', region: 'us-east-1', status: 'Active' },
        { id: 'INC-002', title: 'API Timeout', severity: 'Critical', region: 'eu-west-1', status: 'Investigating' },
        { id: 'INC-003', title: 'Disk Full', severity: 'Medium', region: 'us-west-2', status: 'Resolved' },
    ], []);

    const colDefs: ColDef[] = useMemo(() => [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'severity', headerName: 'Severity', width: 100, cellStyle: (params) => ({ color: params.value === 'Critical' ? 'red' : 'inherit' }) },
        { field: 'region', headerName: 'Region', width: 120 },
        { field: 'status', headerName: 'Status', width: 120 },
    ], []);

    const onRowClicked = (event: any) => {
        console.log('[IncidentGrid] Row clicked:', event.data.id);
        const update = { activeIncidentId: event.data.id };
        setGlobalContext(update);
        // Broadcast to other tabs
        mockNetwork.broadcastUpdate('global', update);
    };

    return (
        <div className="h-full w-full ag-theme-alpine-dark">
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                onRowClicked={onRowClicked}
                rowSelection="single"
                animateRows={true}
                rowClass="cursor-pointer"
            />
        </div>
    );
};
