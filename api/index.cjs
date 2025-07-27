'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const core = require('@nestjs/core');
const common = require('@nestjs/common');

function _ts_decorate$2(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class AppService {
    async getServerTime(targetUrl) {
        try {
            // navyism.com으로 요청 URL 구성
            const navyismUrl = `https://time.navyism.com/?host=${targetUrl}`;
            // HTML 페이지 요청
            const response = await fetch(navyismUrl);
            const htmlContent = await response.text();
            // 현재 시간 추출 (간단한 방식)
            const serverTime = this.extractServerTime(htmlContent);
            return {
                serverTime,
                targetHost: targetUrl,
                timestamp: Date.now(),
                success: true
            };
        } catch (error) {
            return {
                serverTime: "",
                targetHost: targetUrl,
                timestamp: Date.now(),
                success: false,
                error: `Failed to fetch server time: ${error.message}`
            };
        }
    }
    extractServerTime(htmlContent) {
        // 여러 방법으로 시간 추출 시도
        // 방법 1: 밀리초가 포함된 전체 날짜/시간 형식 찾기
        const timeWithMillisRegex = /(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\.\d{3})/;
        const timeWithMillisMatch = htmlContent.match(timeWithMillisRegex);
        if (timeWithMillisMatch) {
            return timeWithMillisMatch[1];
        }
        // 방법 2: 기존 전체 날짜/시간 형식 찾기 (밀리초 없음)
        const timeRegex = /(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})/;
        const timeMatch = htmlContent.match(timeRegex);
        if (timeMatch) {
            return timeMatch[1];
        }
        // 방법 3: 밀리초가 포함된 시간만 찾기
        const timeOnlyWithMillisRegex = /(\d{2}:\d{2}:\d{2}\.\d{3})/;
        const timeOnlyWithMillisMatch = htmlContent.match(timeOnlyWithMillisRegex);
        if (timeOnlyWithMillisMatch) {
            const today = new Date().toISOString().split("T")[0];
            return `${today} ${timeOnlyWithMillisMatch[1]}`;
        }
        // 방법 4: 시간만 찾기 (밀리초 없음)
        const timeRegex2 = /(\d{2}:\d{2}:\d{2})/;
        const timeMatch2 = htmlContent.match(timeRegex2);
        if (timeMatch2) {
            const today = new Date().toISOString().split("T")[0];
            return `${today} ${timeMatch2[1]}`;
        }
        // 방법 5: 현재 시스템 시간 반환 (fallback) - 밀리초 포함
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
            timestamp: Date.now()
        };
    }
}
AppService = _ts_decorate$2([
    common.Injectable()
], AppService);

function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$1(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
class AppController {
    getHealth() {
        return this.appService.getHealth();
    }
    async getServerTime(url) {
        if (!url) {
            return {
                success: false,
                error: "URL parameter is required",
                example: "/server-time?url=www.naver.com"
            };
        }
        return await this.appService.getServerTime(url);
    }
    constructor(appService){
        _define_property(this, "appService", void 0);
        this.appService = appService;
    }
}
_ts_decorate$1([
    common.Get(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], AppController.prototype, "getHealth", null);
_ts_decorate$1([
    common.Get("server-time"),
    _ts_param(0, common.Query("url")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], AppController.prototype, "getServerTime", null);
AppController = _ts_decorate$1([
    common.Controller(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof AppService === "undefined" ? Object : AppService
    ])
], AppController);

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class AppModule {
}
AppModule = _ts_decorate([
    common.Module({
        imports: [],
        controllers: [
            AppController
        ],
        providers: [
            AppService
        ]
    })
], AppModule);

async function bootstrap() {
    const app = await core.NestFactory.create(AppModule);
    // CORS 설정 (클라이언트에서 접근 가능하도록)
    app.enableCors();
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Time Macro API Server is running on http://localhost:${port}`);
    return app;
}
// Vite 개발 서버용 export (vite-plugin-node가 이걸 사용함)
const viteNodeApp = bootstrap();

exports.viteNodeApp = viteNodeApp;
