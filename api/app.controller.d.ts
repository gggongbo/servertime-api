import { AppService } from "./app.service";
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHealth(): {
        message: string;
        timestamp: number;
    };
    getServerTime(url: string): Promise<import("./interfaces").ServerTimeResponse | {
        success: boolean;
        error: string;
        example: string;
    }>;
}
