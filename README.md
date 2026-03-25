# YT-ClashBoard

YT-ClashBoard 是一个自托管的 Clash / Mihomo / OpenClash 面板，包含前端界面和一个轻量服务端，用于配置持久化、规则缓存以及控制器代理中转。

它适合部署在个人网络、家庭实验环境或其他可信场景中使用。

## 特性

- 支持 Clash / Mihomo / OpenClash 控制器接入
- 前端界面基于 Vue 3 + TypeScript + Vite
- 服务端提供本地持久化、规则缓存与控制器代理
- 默认服务端端口为 `80`
- 通过 `ALLOWED_TARGETS` 限制服务端仅可代理指定控制器地址
- 支持通过 GitHub Container Registry（GHCR）直接拉取镜像部署

## 项目结构

- `src/`：前端源码
- `server/`：服务端源码
- `config/`：默认配置与规则源示例
- `public/`：静态资源
- `scripts/`：安装和辅助脚本
- `.env.example`：环境变量示例
- `.github/workflows/`：CI / 镜像发布工作流
- `SECURITY.md`：安全说明

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 本地开发

```bash
pnpm run dev:full
```

### 3. 构建

```bash
pnpm run build
```

### 4. 启动服务端

```bash
pnpm start
```

## 版本号说明

当前前端显示版本号来自 `package.json`，现在已改为：

```text
1.0.0
```

建议你的 GitHub Release / Tag 也保持同一套版本号规则：

```text
package.json: 1.0.0
GitHub tag:   v1.0.0
GitHub release: v1.0.0
```

这样面板内的“更新面板”提示和 GitHub Releases 才能正确按版本比较。

自动更新检查当前已改为引用你自己的仓库：

```text
https://api.github.com/repos/YTjungle666/YT-ClashBoard/releases/latest
```

## 镜像发布与拉取

GitHub Actions 会在以下场景自动构建并推送镜像到 GHCR：
- push 到 `main`
- push `v*` tag
- 手动触发 workflow

镜像地址：

```bash
ghcr.io/ytjungle666/yt-clashboard:latest
```

拉取镜像：

```bash
docker pull ghcr.io/ytjungle666/yt-clashboard:latest
```

## Docker 运行示例

```bash
docker run -d \
  --name yt-clashboard \
  -p 80:80 \
  -e ALLOWED_TARGETS=http://127.0.0.1:9090 \
  -v ./data:/app/data \
  --restart unless-stopped \
  ghcr.io/ytjungle666/yt-clashboard:latest
```

## 环境变量

| 变量名 | 默认值 | 说明 |
|---|---:|---|
| `PORT` | `80` | 服务端监听端口 |
| `ALLOWED_TARGETS` | 空 | 允许服务端代理访问的控制器 base URL 列表，多个值用英文逗号分隔 |

### `ALLOWED_TARGETS` 示例

单个控制器：

```bash
ALLOWED_TARGETS=http://127.0.0.1:9090
```

多个控制器：

```bash
ALLOWED_TARGETS=http://127.0.0.1:9090,http://10.10.10.254:9090
```

规则：
- 必须写完整 base URL，包含协议、主机、端口
- 只支持 `http://` 和 `https://`
- 多个目标用英文逗号分隔
- 不在 `ALLOWED_TARGETS` 里的目标会被服务端拒绝代理
- 如果 `ALLOWED_TARGETS` 为空，服务端代理默认禁用

## Docker / 部署提示

如果你用容器或面板部署，除了 `PORT`，还需要设置：

```bash
ALLOWED_TARGETS=http://127.0.0.1:9090
```

多个控制器示例：

```bash
ALLOWED_TARGETS=http://127.0.0.1:9090,http://10.10.10.254:9090
```

`scripts/install.sh` 生成的 `.env` 会包含默认 GHCR 镜像地址和一个 `ALLOWED_TARGETS` 示例值，你部署前按自己的实际控制器地址改掉即可。

参考 `.env.example`：

```bash
PORT=80
ALLOWED_TARGETS=http://127.0.0.1:9090
```

## 安全与部署提醒

- 服务端代理只允许访问 `ALLOWED_TARGETS` 中声明的控制器地址
- 浏览器侧“密码访问”更适合作为本地便利功能，不应视为强鉴权
- 如需公开部署，建议放在你自己的反向代理、内网或其他访问控制之后
- 部分功能依赖外部网络服务（例如规则源、IP 信息查询、字体 CDN）
- 详细说明见 [SECURITY.md](SECURITY.md)

## 开发检查

已验证可执行：

```bash
pnpm run type-check
pnpm run lint
pnpm run build
```

## 许可证

本仓库保留 `LICENSE` 文件，请按许可证要求使用。
