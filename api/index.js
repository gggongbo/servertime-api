const express = require("express");
const cors = require("cors");

const app = express();

// CORS 설정
app.use(cors());
app.use(express.json());

// 서버 타임 추출 함수
function extractServerTime(htmlContent) {
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

// 서버 타임 가져오기 함수
async function getServerTime(targetUrl) {
  try {
    // navyism.com으로 요청 URL 구성
    const navyismUrl = `https://time.navyism.com/?host=${targetUrl}`;

    // HTML 페이지 요청
    const response = await fetch(navyismUrl);
    const htmlContent = await response.text();

    // 현재 시간 추출
    const serverTime = extractServerTime(htmlContent);

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

// 라우트 정의
app.get("/api", (req, res) => {
  res.json({
    message: "Time Macro API Server is running!",
    timestamp: Date.now(),
  });
});

app.get("/api/server-time", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({
      success: false,
      error: "URL parameter is required",
      example: "/server-time?url=www.naver.com",
    });
  }

  const result = await getServerTime(url);
  res.json(result);
});

// Vercel 서버리스 함수용 export
module.exports = app;

// 로컬 개발용
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Express API Server running on http://localhost:${port}`);
  });
}
