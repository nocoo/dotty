<p align="center">
  <img src="assets/brand/icon-rounded.png" width="128" height="128" alt="Dotty" />
</p>

<h1 align="center">Dotty</h1>

<p align="center">用冷色灰阶、双层卡片和像素柱图搭建数据看板。</p>

<p align="center">
  <a href="https://dotty.hexly.ai">站点</a> ·
  <a href="docs/README.en.md">English</a>
</p>

## 这是什么

Dotty 是 React 数据看板模板和界面示例集，适合为管理后台、个人数据页面或产品原型复用布局、控件与图表。它把外层直角框架与圆角卡片组合起来，以灰阶层次组织信息。

项目是使用示例数据的静态 SPA。健康、财务、网络和登录页面用于展示界面与交互，没有接入业务后端、数据库或真实身份认证。

## 功能

- 提供侧栏布局、导航、表单、数据表、弹窗、通知和交互控件示例。
- 组合统计卡片、像素堆叠柱图、趋势图、热力图、雷达图和流向图。
- 展示账户、进度、组合持仓、健康、可穿戴设备、银行与网络运维场景。
- 提供登录、徽章登录、加载、静态内容和 404 页面样式。
- 支持明暗主题与中英文切换，并提供色板和布局参考页。
- 将一部分计算逻辑和展示状态拆为 models / viewmodels，便于替换示例数据。

## 使用

打开[在线示例](https://dotty.hexly.ai)，从侧栏浏览各类页面。登录表单、统计指标和业务操作都属于模板演示。

| 示例 | 路由 |
| --- | --- |
| Dashboard 与组件 | `/`、`/components` |
| 控件、数据、表单、导航 | `/interactive`、`/data`、`/forms`、`/navigation` |
| 账户、进度、流向、持仓 | `/accounts`、`/progress-tracking`、`/flow-comparison`、`/portfolio` |
| 场景页面 | `/health`、`/wearable`、`/banking`、`/network` |
| 布局与主题参考 | `/layout`、`/palette`、`/settings` |

用于自己的项目时，从 `src/pages/` 选择页面与组件，替换 `src/data/mock.ts` 以及页面内的示例数据，再添加自己的数据访问与认证。

主要视觉设置集中在 [src/index.css](src/index.css)：`:root` 与 `.dark` 定义主题，`--radius-card` 和 `--radius-widget` 控制两层卡片。正文使用 Inter，数值用 `font-mono-num` 的 IBM Plex Mono；[PixelBarChart](src/components/PixelBarChart.tsx)负责将数值绘制成堆叠方块。

## 开发

使用 Bun；Node.js 建议采用 24 或更新版本。

```bash
git clone https://github.com/nocoo/dotty.git
cd dotty
bun install --frozen-lockfile
bun run dev
```

开发地址为 `http://localhost:7002`，不需要环境变量或后端账号。

```bash
bun run typecheck
bun run lint
bun run build
bun run preview
```

构建结果在 `dist/`。部署到静态主机时，为 React Router 配置回退到 `index.html`。仓库的 [Cloudflare 配置](wrangler.toml)已设置 SPA 回退，现有[部署工作流](.github/workflows/release.yml)使用这些静态资源。

`src/models/` 保存计算逻辑，`src/viewmodels/` 组合数据与界面状态，`src/i18n/locales/` 保存中英文文案。`/api/live` 由 Vite 开发服务器提供，并在构建时输出 `api/live.json` 供生产静态托管；它返回状态和版本，不承载业务数据。

## 测试

| 测试层 | 命令 |
| --- | --- |
| 单元与组件测试 | `bun run test` |
| 开发时持续运行 | `bun run test:watch` |

测试使用 Vitest、jsdom 与 Testing Library，读取本地示例数据，不需要云服务。可用 `bun run test:coverage` 查看 models、viewmodels 和 lib 的覆盖率报告。仓库当前没有独立的 API 或浏览器端到端测试入口。

## 技术栈

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-149ECA?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF)

| 部分 | 实现 |
| --- | --- |
| 应用与路由 | React、TypeScript、React Router |
| 构建与样式 | Vite、SWC、Tailwind CSS、Radix UI |
| 图表与国际化 | Recharts、PixelBarChart、i18next / react-i18next |
| 开发与托管 | Bun、Biome、Vitest、Testing Library、Cloudflare Workers 静态资源 |

## 文档

- [品牌资源与使用](assets/brand/README.md)
- [无障碍审查记录](docs/accessibility-audit.md)
- [变更记录](CHANGELOG.md)

## 许可证

[MIT](LICENSE) © 2026 Zheng Li
