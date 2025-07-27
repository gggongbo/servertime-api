# 🕐 ServerTime API

NestJS + TypeScript + Vite로 구성된 서버시간 조회 API

특정 사이트의 서버시간을 밀리초 단위까지 정확하게 조회할 수 있는 REST API입니다.

## 📁 프로젝트 구조

```
servertime-api/
├── src/
│   ├── main.ts           # 애플리케이션 진입점
│   ├── app.module.ts     # NestJS 루트 모듈
│   ├── app.controller.ts # API 컨트롤러
│   ├── app.service.ts    # 비즈니스 로직
│   └── interfaces.ts     # TypeScript 인터페이스
├── dist/                 # 빌드 결과물
├── vite.config.js        # Vite 설정
├── tsconfig.json         # TypeScript 설정
├── vercel.json          # Vercel 배포 설정
└── package.json
```

## 🚀 빠른 시작

### 1. 설치

```bash
# 저장소 클론
git clone <repository-url>
cd servertime-api

# 의존성 설치
pnpm install
```

### 2. 개발 서버 실행

```bash
pnpm dev
```

서버가 `http://localhost:3000`에서 실행됩니다.

### 3. 프로덕션 빌드

```bash
# 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

## 📖 API 사용법

### 서버시간 조회

특정 사이트의 서버시간을 조회합니다.

**요청:**

```http
GET /server-time?url={target_site}
```

**파라미터:**

- `url` (required): 조회할 사이트 URL (예: `www.naver.com`)

**응답 예시:**

```json
{
  "serverTime": "2025-01-20 14:30:45.123",
  "targetHost": "www.naver.com",
  "timestamp": 1737370245123,
  "success": true
}
```

**에러 응답:**

```json
{
  "serverTime": "",
  "targetHost": "invalid-site.com",
  "timestamp": 1737370245123,
  "success": false,
  "error": "Failed to fetch server time: ..."
}
```

### 헬스체크

서버 상태를 확인합니다.

**요청:**

```http
GET /
```

**응답:**

```json
{
  "message": "Time Macro API Server is running!",
  "timestamp": 1737370245123
}
```

## 💡 사용 예시

### cURL

```bash
# 네이버 서버시간 조회
curl "http://localhost:3000/server-time?url=www.naver.com"
```

### JavaScript (fetch)

```javascript
const response = await fetch(
  "http://localhost:3000/server-time?url=www.naver.com"
);
const data = await response.json();

if (data.success) {
  console.log("서버시간:", data.serverTime);
} else {
  console.error("에러:", data.error);
}
```

### Python (requests)

```python
import requests

response = requests.get('http://localhost:3000/server-time',
                       params={'url': 'www.naver.com'})
data = response.json()

if data['success']:
    print(f"서버시간: {data['serverTime']}")
else:
    print(f"에러: {data['error']}")
```

## ⚙️ 기술 스택

- **Backend:** NestJS, TypeScript
- **Build Tool:** Vite + vite-plugin-node
- **Compiler:** SWC (데코레이터 메타데이터 지원)
- **Package Manager:** pnpm
- **Deployment:** Vercel

## 🌐 배포

### Vercel에 배포

1. Vercel CLI 설치:

```bash
npm i -g vercel
```

2. 배포:

```bash
vercel --prod
```

또는 GitHub 연동으로 자동 배포 가능합니다.

## 📝 스크립트

- `pnpm dev` - 개발 서버 실행 (HMR 지원)
- `pnpm build` - 프로덕션 빌드
- `pnpm start` - 프로덕션 서버 실행
- `pnpm start:dev` - nodemon으로 개발 서버 실행

## 🔧 특징

- **밀리초 정확도**: 서버시간을 밀리초 단위까지 정확하게 조회
- **Hot Module Replacement**: Vite를 활용한 빠른 개발 경험
- **TypeScript**: 타입 안전성 보장
- **CORS 지원**: 클라이언트에서 직접 호출 가능
- **에러 핸들링**: 친화적인 에러 메시지 제공

## 📄 라이선스

MIT License
