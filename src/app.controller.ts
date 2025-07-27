import { Controller, Get, Query } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth() {
    return this.appService.getHealth();
  }

  @Get("server-time")
  async getServerTime(@Query("url") url: string) {
    if (!url) {
      return {
        success: false,
        error: "URL parameter is required",
        example: "/server-time?url=www.kbanknow.com",
      };
    }

    return await this.appService.getServerTime(url);
  }
}
