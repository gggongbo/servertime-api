"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    async getServerTime(targetUrl) {
        try {
            const navyismUrl = `https://time.navyism.com/?host=${targetUrl}`;
            const response = await fetch(navyismUrl);
            const htmlContent = await response.text();
            const serverTime = this.extractServerTime(htmlContent);
            return {
                serverTime,
                targetHost: targetUrl,
                timestamp: Date.now(),
                success: true,
            };
        }
        catch (error) {
            return {
                serverTime: "",
                targetHost: targetUrl,
                timestamp: Date.now(),
                success: false,
                error: `Failed to fetch server time: ${error.message}`,
            };
        }
    }
    extractServerTime(htmlContent) {
        const timeWithMillisRegex = /(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\.\d{3})/;
        const timeWithMillisMatch = htmlContent.match(timeWithMillisRegex);
        if (timeWithMillisMatch) {
            return timeWithMillisMatch[1];
        }
        const timeRegex = /(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})/;
        const timeMatch = htmlContent.match(timeRegex);
        if (timeMatch) {
            return timeMatch[1];
        }
        const timeOnlyWithMillisRegex = /(\d{2}:\d{2}:\d{2}\.\d{3})/;
        const timeOnlyWithMillisMatch = htmlContent.match(timeOnlyWithMillisRegex);
        if (timeOnlyWithMillisMatch) {
            const today = new Date().toISOString().split("T")[0];
            return `${today} ${timeOnlyWithMillisMatch[1]}`;
        }
        const timeRegex2 = /(\d{2}:\d{2}:\d{2})/;
        const timeMatch2 = htmlContent.match(timeRegex2);
        if (timeMatch2) {
            const today = new Date().toISOString().split("T")[0];
            return `${today} ${timeMatch2[1]}`;
        }
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
    getHealth() {
        return {
            message: "Time Macro API Server is running!",
            timestamp: Date.now(),
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map