import "reflect-metadata";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정 (클라이언트에서 접근 가능하도록)
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(
    `🚀 Time Macro API Server is running on http://localhost:${port}`
  );

  return app;
}

// Vite 개발 서버용 export (vite-plugin-node가 이걸 사용함)
export const viteNodeApp = bootstrap();
