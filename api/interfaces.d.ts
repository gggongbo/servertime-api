export interface ServerTimeResponse {
    serverTime: string;
    targetHost: string;
    timestamp: number;
    success: boolean;
    error?: string;
}
