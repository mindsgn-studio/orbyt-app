import {CONNECT, DISCONNECT, ERROR} from '../../constants';
import { walletState } from '../../interface';

const initialState: walletState = {
    connected: false,
    tokens: [],
    type: null,
    address: "",
    peerId: null,
    peerMeta: null,
    error: false,
    markets: null,
}

export default (state = initialState, action: any) => {
    switch (action.type) {
        case CONNECT:
            return { 
                connected: action.connected,
                address: action.address,
                chainId: action.chainId,
                peerMeta: action.peerMeta,
            };
        case DISCONNECT:
            return {
                connected: action.connected,
                address: action.address,
                chainId: action.chainId,
                peerMeta: action.peerMeta,
            };
        case ERROR:
            return {
                error: action.error
            };
        default:
            return state;
    }
}