# Time Macro API 서버 PRD (Product Requirements Document)

## 📝 프로젝트 개요

**프로젝트명**: Time Macro API 서버  
**목적**: navyism.com에서 서버시간을 크롤링하여 JSON API로 제공하는 간단한 서버  
**기술스택**: NestJS + TypeScript + pnpm

## 🎯 핵심 요구사항

### 주요 기능

- navyism.com의 서버시간 데이터를 실시간으로 크롤링
- GET 요청으로 URL 파라미터를 받아 동적 매핑
- HTML 파싱을 통한 서버시간 추출
- JSON 형태로 클라이언트에 응답

### API 스펙

```
GET /server-time?url={target_url}

요청 예시:
GET /server-time?url=www.kbanknow.com

응답 예시:
{
  "serverTime": "2025-01-27 14:30:45.123",
  "targetHost": "www.kbanknow.com",
  "timestamp": 1706348445123,
  "success": true
}
```

## 🔧 기술적 요구사항

### 프레임워크 및 언어

- **Backend**: NestJS (Node.js 기반)
- **언어**: TypeScript
- **패키지 매니저**: pnpm (필수)
- **HTTP 클라이언트**: fetch API

### 핵심 로직

1. `GET /server-time?url={parameter_url}` 요청 수신
2. `https://time.navyism.com/?host=${parameter_url}` 로 매핑
3. navyism.com에 fetch 요청 전송
4. 받은 HTML 파싱하여 서버시간 추출
5. JSON 형태로 응답 반환

### 필수 패키지

```json
{
  "dependencies": {
    "@nestjs/core": "latest",
    "@nestjs/common": "latest",
    "@nestjs/platform-express": "latest",
    "reflect-metadata": "latest",
    "rxjs": "latest"
  }
}
```

## 🚫 제외 사항

다음 기능들은 **구현하지 않음**:

- Guard, Interceptor 등 보안 기능
- 데이터베이스 연동
- 복잡한 인증/인가
- 로깅 시스템
- 캐싱 기능
- 에러 핸들링 미들웨어

## 📂 프로젝트 구조

```
servertime-api/
├── src/
│   ├── app.controller.ts    # API 엔드포인트
│   ├── app.service.ts       # 비즈니스 로직 (크롤링)
│   ├── app.module.ts        # NestJS 모듈
│   └── main.ts              # 서버 엔트리포인트
├── package.json
├── tsconfig.json
├── PRD.korean.md
└── README.md
```

## ✅ 성공 기준

1. **기능적 요구사항**

   - URL 파라미터로 동적 호스트 매핑 가능
   - navyism.com HTML 파싱 성공
   - 서버시간 정확 추출
   - JSON 응답 정상 반환

2. **비기능적 요구사항**
   - 응답 시간 3초 이내
   - TypeScript 컴파일 에러 없음
   - pnpm 패키지 매니저 사용
   - 코드 가독성 확보

## 🏁 마일스톤

1. **Phase 1**: 프로젝트 셋업 및 패키지 설치
2. **Phase 2**: 기본 NestJS 구조 생성
3. **Phase 3**: navyism.com 크롤링 로직 구현
4. **Phase 4**: HTML 파싱 및 시간 추출
5. **Phase 5**: API 엔드포인트 완성 및 테스트
