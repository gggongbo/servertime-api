# Time Macro API Server

navyism.com에서 서버시간을 크롤링하여 JSON API로 제공하는 간단한 NestJS 서버입니다.

## 🚀 Quick Start

### 설치

```bash
# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm run start:dev
```

### API 사용법

```bash
# 케이뱅크 서버시간 조회
curl "http://localhost:3000/server-time?url=www.kbanknow.com"

# 응답 예시
{
  "serverTime": "2025-01-27 14:30:45.123",
  "targetHost": "www.kbanknow.com",
  "timestamp": 1706348445123,
  "success": true
}
```

## 📋 요구사항

- Node.js 18+
- pnpm (패키지 매니저)

## 🛠 기술 스택

- **Framework**: NestJS
- **Language**: TypeScript
- **Package Manager**: pnpm
- **HTTP Client**: fetch API

## 📂 프로젝트 구조

```
servertime-api/
├── src/
│   ├── app.controller.ts    # API 엔드포인트
│   ├── app.service.ts       # 크롤링 비즈니스 로직
│   ├── app.module.ts        # NestJS 모듈 설정
│   └── main.ts              # 서버 진입점
├── package.json
├── tsconfig.json
├── PRD.korean.md           # 제품 요구사항 문서
└── README.md               # 프로젝트 가이드
```

## 🔄 작동 원리

1. `GET /server-time?url={target_url}` 요청 수신
2. `https://time.navyism.com/?host=${target_url}` 로 매핑
3. navyism.com에서 HTML 응답 수신
4. HTML 파싱하여 서버시간 추출
5. JSON 형태로 클라이언트에 응답

## 📝 개발 진행 상황

### ✅ 완료된 작업

- [x] 프로젝트 초기 설정
- [x] PRD 문서 작성
- [x] README 문서 작성

### 🔄 진행 중인 작업

- [ ] NestJS 패키지 설치
- [ ] 기본 프로젝트 구조 생성
- [ ] navyism.com 크롤링 로직 구현

### 📅 다음 할 일

- [ ] HTML 파싱 로직 구현
- [ ] API 엔드포인트 완성
- [ ] 테스트 및 검증

## 🎯 API 스펙

### GET /server-time

**파라미터:**

- `url` (required): 대상 호스트 URL

**응답 형식:**

```typescript
interface ServerTimeResponse {
  serverTime: string; // 서버시간 (YYYY-MM-DD HH:mm:ss.SSS)
  targetHost: string; // 요청한 호스트
  timestamp: number; // Unix 타임스탬프
  success: boolean; // 성공 여부
}
```

**에러 응답:**

```json
{
  "success": false,
  "error": "Failed to fetch server time",
  "targetHost": "invalid.com"
}
```

## 🤝 기여

이 프로젝트는 간단한 API 서버이므로 복잡한 기능은 추가하지 않습니다.

### 제외된 기능

- Guard, Interceptor 등 보안 기능
- 데이터베이스 연동
- 복잡한 인증/인가 시스템
- 캐싱 및 로깅 시스템

## 📄 라이센스

MIT License
