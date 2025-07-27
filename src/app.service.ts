import { Injectable } from "@nestjs/common";
import { ServerTimeResponse } from "./interfaces";

@Injectable()
export class AppService {
  async getServerTime(targetUrl: string): Promise<ServerTimeResponse> {
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
        success: true,
      };
    } catch (error) {
      return {
        serverTime: "",
        targetHost: targetUrl,
        timestamp: Date.now(),
        success: false,
        error: `Failed to fetch server time: ${error.message}`,
      };
    }
  }

  private extractServerTime(htmlContent: string): string {
    // 여러 방법으로 시간 추출 시도

    // 방법 1: JavaScript에서 현재 시간 표시하는 요소 찾기
    const timeRegex = /(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})/;
    const timeMatch = htmlContent.match(timeRegex);

    if (timeMatch) {
      return timeMatch[1];
    }

    // 방법 2: 다른 시간 포맷 찾기
    const timeRegex2 = /(\d{2}:\d{2}:\d{2})/;
    const timeMatch2 = htmlContent.match(timeRegex2);

    if (timeMatch2) {
      const today = new Date().toISOString().split("T")[0];
      return `${today} ${timeMatch2[1]}`;
    }

    // 방법 3: 현재 시스템 시간 반환 (fallback)
    return new Date().toLocaleString("sv-SE"); // YYYY-MM-DD HH:mm:ss 형식
  }

  getHealth(): { message: string; timestamp: number } {
    return {
      message: "Time Macro API Server is running!",
      timestamp: Date.now(),
    };
  }
}
