import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    ...VitePluginNode({
      // NestJS는 express와 호환
      adapter: "nest",
      // 앱 진입점
      appPath: "./src/main.ts",
      // export되는 앱 이름
      exportName: "viteNodeApp",
      // NestJS 데코레이터 메타데이터를 위해 SWC 사용 (필수!)
      tsCompiler: "swc",
      // SWC 설정 - NestJS 데코레이터 지원
      swcOptions: {
        jsc: {
          target: "es2019",
          parser: {
            syntax: "typescript",
            decorators: true,
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
      },
    }),
  ],

  // 빌드 설정
  build: {
    // SSR 모드로 빌드 (Node.js용)
    ssr: true,
    target: "node18",
    outDir: "api",

    // CommonJS 형태로 빌드
    rollupOptions: {
      input: "src/main.ts",
      output: {
        format: "cjs",
        entryFileNames: "index.js",
      },
      external: [
        // Node.js 내장 모듈
        /^node:.*/,
        // NestJS 패키지들
        /@nestjs\/.*/,
        "rxjs",
        "reflect-metadata",
      ],
    },
  },
});
