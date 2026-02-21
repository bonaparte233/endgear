# EndGear

EndGear 是一个用于《明日方舟：终末地》装备精锻分析的前端工具，支持按目标装备快速筛选可用材料并按属性对比。

## 技术栈

- React 19 + Vite 7 + TypeScript
- Tailwind CSS v4
- Express（生产环境静态托管）

## 快速开始

```bash
npx pnpm install
npx pnpm dev
```

构建与校验：

```bash
npx pnpm check
npx pnpm build
npx pnpm build:full
```

## 目录结构

```text
client/              前端应用
server/              生产静态服务
scripts/data/        装备数据清洗与检查脚本
docs/                过程文档和设计记录
```

## 许可证

MIT
