import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정 (클라이언트에서 접근 가능하도록)
  app.enableCors();

  await app.listen(3000);
  console.log("🚀 Time Macro API Server is running on http://localhost:3000");
}

bootstrap();
