const express = require("express");
const cors = require("cors");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

// dayjs 플러그인 설정
dayjs.extend(utc);
dayjs.extend(timezone);

const app = express();

// CORS 설정
app.use(cors());
app.use(express.json());

// 시간을 KST로 변환하는 함수
function convertToKST(timeString) {
  try {
    // 시간 문자열이 밀리초를 포함하는지 확인
    const hasMillis = timeString.includes(".");

    if (hasMillis) {
      // 밀리초가 있는 경우 그대로 파싱
      const parsed = dayjs(timeString);
      if (parsed.isValid()) {
        return (
          parsed.tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss") +
          "." +
          timeString.split(".")[1]
        );
      }
    } else {
      // 밀리초가 없는 경우 파싱 후 현재 밀리초 추가
      const parsed = dayjs(timeString);
      if (parsed.isValid()) {
        const kstTime = parsed.tz("Asia/Seoul");
        const currentMillis = String(
          dayjs().tz("Asia/Seoul").millisecond()
        ).padStart(3, "0");
        return `${kstTime.format("YYYY-MM-DD HH:mm:ss")}.${currentMillis}`;
      }
    }

    // 파싱 실패시 null 반환
    return null;
  } catch (error) {
    return null;
  }
}

// 서버 타임 추출 함수
function extractServerTime(htmlContent) {
  // 방법 1: 밀리초가 포함된 전체 날짜/시간 형식 찾기
  const timeWithMillisRegex = /(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\.\d{3})/;
  const timeWithMillisMatch = htmlContent.match(timeWithMillisRegex);

  if (timeWithMillisMatch) {
    const kstTime = convertToKST(timeWithMillisMatch[1]);
    if (kstTime) return kstTime;
  }

  // 방법 2: 기존 전체 날짜/시간 형식 찾기 (밀리초 없음)
  const timeRegex = /(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})/;
  const timeMatch = htmlContent.match(timeRegex);

  if (timeMatch) {
    const kstTime = convertToKST(timeMatch[1]);
    if (kstTime) return kstTime;
  }

  // 방법 3: 밀리초가 포함된 시간만 찾기
  const timeOnlyWithMillisRegex = /(\d{2}:\d{2}:\d{2}\.\d{3})/;
  const timeOnlyWithMillisMatch = htmlContent.match(timeOnlyWithMillisRegex);

  if (timeOnlyWithMillisMatch) {
    const today = dayjs().tz("Asia/Seoul").format("YYYY-MM-DD");
    const timeString = `${today} ${timeOnlyWithMillisMatch[1]}`;
    const kstTime = convertToKST(timeString);
    if (kstTime) return kstTime;
  }

  // 방법 4: 시간만 찾기 (밀리초 없음)
  const timeRegex2 = /(\d{2}:\d{2}:\d{2})/;
  const timeMatch2 = htmlContent.match(timeRegex2);

  if (timeMatch2) {
    const today = dayjs().tz("Asia/Seoul").format("YYYY-MM-DD");
    const timeString = `${today} ${timeMatch2[1]}`;
    const kstTime = convertToKST(timeString);
    if (kstTime) return kstTime;
  }

  // 방법 5: 현재 한국 시간 반환 (fallback) - 밀리초 포함
  const nowKST = dayjs().tz("Asia/Seoul");
  const milliseconds = String(nowKST.millisecond()).padStart(3, "0");

  return `${nowKST.format("YYYY-MM-DD HH:mm:ss")}.${milliseconds}`;
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
      timestamp: dayjs().tz("Asia/Seoul").valueOf(),
      success: true,
    };
  } catch (error) {
    return {
      serverTime: "",
      targetHost: targetUrl,
      timestamp: dayjs().tz("Asia/Seoul").valueOf(),
      success: false,
      error: `Failed to fetch server time: ${error.message}`,
    };
  }
}

// 라우트 정의
app.get("/", (req, res) => {
  res.json({
    message: "Time Macro API Server is running!",
    timestamp: dayjs().tz("Asia/Seoul").valueOf(),
    currentTime: dayjs().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss.SSS"),
  });
});

app.get("/server-time", async (req, res) => {
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
