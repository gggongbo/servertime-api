import { ServerTimeResponse } from "./interfaces";
export declare class AppService {
    getServerTime(targetUrl: string): Promise<ServerTimeResponse>;
    private extractServerTime;
    getHealth(): {
        message: string;
        timestamp: number;
    };
}
