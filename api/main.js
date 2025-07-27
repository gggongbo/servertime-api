"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viteNodeApp = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Time Macro API Server is running on http://localhost:${port}`);
    return app;
}
exports.viteNodeApp = bootstrap();
//# sourceMappingURL=main.js.map