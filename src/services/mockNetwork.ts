import { useOpsStore, OpsContextLayer } from '../store/opsStore';

// Define the shape of our network messages
type NetworkMessage = {
    type: 'CONTEXT_UPDATE';
    layer: OpsContextLayer;
    payload: any;
    sourceId: string; // To prevent echoing back to self
};

const CHANNEL_NAME = 'ops-context-grid-sync';
const LOCAL_ID = Math.random().toString(36).substring(7);

class MockNetworkService {
    private channel: BroadcastChannel;

    constructor() {
        this.channel = new BroadcastChannel(CHANNEL_NAME);
        this.setupListener();
        console.log(`[Network] Initialized with ID: ${LOCAL_ID}`);
    }

    private setupListener() {
        this.channel.onmessage = (event: MessageEvent<NetworkMessage>) => {
            const { type, layer, payload, sourceId } = event.data;

            // Ignore messages from ourselves
            if (sourceId === LOCAL_ID) {
                console.log('[Network] Ignoring own message');
                return;
            }

            if (type === 'CONTEXT_UPDATE') {
                console.log(`[Network] Received update for ${layer} from ${sourceId}`, payload);

                // CRITICAL FIX: We need to call the setters which will trigger Zustand's
                // subscription system. Getting the state snapshot and calling the actions
                // directly ensures proper reactivity.
                if (layer === 'global') {
                    useOpsStore.getState().setGlobalContext(payload);
                    console.log('[Network] Applied global context update');
                } else if (layer === 'team') {
                    useOpsStore.getState().setTeamContext(payload);
                    console.log('[Network] Applied team context update');
                }
                // Personal context is NOT synced
            }
        };
    }

    public broadcastUpdate(layer: OpsContextLayer, payload: any) {
        // Only broadcast Global and Team updates
        if (layer === 'personal') return;

        const message: NetworkMessage = {
            type: 'CONTEXT_UPDATE',
            layer,
            payload,
            sourceId: LOCAL_ID,
        };

        console.log(`[Network] Broadcasting update for ${layer}`, payload);
        this.channel.postMessage(message);
    }
}

export const mockNetwork = new MockNetworkService();
