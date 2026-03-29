# 🌌 Stardust Mono

[](https://vercel.com/new)

> 一个专为极客与创作者打造的 API-First 无头数字花园。
> 抛弃沉重的服务器，告别内存焦虑，回归书写与自动化的纯粹。

## 💡 核心哲学：Why Stardust Mono?

天下苦重型 CMS 久矣。我们需要一个能够随时随地记录状态、承载知识的个人空间，但这并不意味着我们要为此去租用一台昂贵的云服务器，或者每天操心 Node.js 进程有没有崩溃。

Stardust Mono 采用彻底的 **Serverless（无服务器）** 与 **动静分离** 架构：

- **📝 文章归于 Git，享受静态极速：** 长篇的硬核物理公式、技术推导，是需要沉淀的结构化知识。它们交由 Git 管理，在本地使用 Markdown 编写，借助 Astro 在构建时直接将 MathJax 渲染为静态 SVG。
- **⚡️ 状态归于 API，拥抱动态数据：** 日常的碎片吐槽、自动化脚本推送的打卡记录、Agent 感知到的你的心情状态，这些 `Data Stream` 不需要死板的 Git 工作流。通过极简的 Core API，瞬间写入边缘数据库。

真正的 Zero-Ops 不该是提供更复杂的运维脚本，而是从架构底层消解掉运维的需求。

## ✨ 核心特性

- **☁️ 真正的 Zero-Ops：** 零服务器成本，零内存泄漏焦虑。前端边缘 CDN 分发，后端 Serverless 函数冷启动，数据库全球边缘同步。
- **📐 学术级排版引擎：** 内置 `rehype-mathjax` 与 `Tailwind Typography`，完美渲染复杂数学公式与多行推导，无需客户端加载冗余字体库。
- **🔌 API-First 架构：** 后端不仅仅是为了服务博客前端，更是一个标准的 RESTful 接口。你可以轻松接入你的 Telegram Bot、快捷指令，甚至是你自己编写的 AI Agent 运行时。
- **🧩 高度解耦：** 铁打的后端引擎，流水的展现层。你可以随时抛弃自带的 Astro 模板，用任何你喜欢的框架重新接入数据。

## 🛠 技术栈

- **前端页面 (Frontend):** [Astro](https://astro.build/) + Tailwind CSS
- **核心 API (Core API):** [Hono](https://hono.dev/) (运行于 Vercel Edge Functions)
- **边缘数据 (Database):** [Turso](https://turso.tech/) (基于 libSQL) + Drizzle ORM

## 🚀 快速开始（目前尚未完成）

### 1. 准备工作

确保你拥有 [GitHub](https://github.com/)、[Vercel](https://vercel.com/) 和 [Turso](https://turso.tech/) 的免费账号。

### 2. 初始化

```bash
npm create stardust-mono@latest my-garden
cd my-garden
npm install
```

### 3. 配置环境变量

复制 `.env.example` 为 `.env`，并填入你的 Turso 数据库密钥与自定义的 API Token：

```env
TURSO_DATABASE_URL="libsql://your-db-name.turso.io"
TURSO_AUTH_TOKEN="your-turso-token"
AGENT_SECRET_KEY="your-super-secret-key"
```

### 4. 本地运行与部署

```bash
npm run dev
```

开发完成后，一键推送到 GitHub，Vercel 将自动接管一切构建与部署流程。

-----

## 📖 目录结构说明

Stardust Mono 严格遵循“框架与数据隔离”的原则：

- `src/content/`: 你的专属数据区。所有的长篇 Markdown 笔记请放在这里。
- `src/api/`: 核心 API 引擎，处理所有流动的状态数据。
- `src/core/`: 框架的 UI 组件与布局逻辑。
