# AnGe-ClashBoard

AnGe-ClashBoard 是一个基于 `Vue 3 + TypeScript + Vite` 的 Clash 面板，面向 `Clash API`、`Mihomo` 和 `sing-box` 的运行态管理、观测与排错。

当前版本为 `1.00`，基于开源 [zashboard](https://github.com/Zephyruso/zashboard) 二次开发。

## 项目特点

- 支持 Clash API、Mihomo、sing-box
- 支持 SQLite 持久化设置，换浏览器后仍可保留配置
- 支持背景图服务端持久化
- 支持图标上传、拖拽、复制和预览
- 支持规则缓存、域名规则查询、链路展示和兜底规则判断
- 支持本地自部署，适合个人和局域网环境

## 本地开发

### 安装依赖

```bash
corepack pnpm install
```

### 同时启动前端和后端

```bash
corepack pnpm run dev:full
```

默认地址：

- 前端：[http://localhost:5173](http://localhost:5173)
- 后端健康检查：[http://127.0.0.1:3000/api/health](http://127.0.0.1:3000/api/health)

### 单独启动前端

```bash
corepack pnpm run dev
```

### 单独启动后端

```bash
corepack pnpm run dev:server
```

### 类型检查

```bash
corepack pnpm run type-check
```

## 服务端持久化

项目内置了一个轻量 Node 服务，用于保存：

- 设置
- 背景图
- 规则缓存

默认数据库路径：

```bash
./data/zashboard.sqlite
```

可通过环境变量覆盖：

```bash
ZASHBOARD_DB_PATH
```

示例：

```bash
$env:ZASHBOARD_DB_PATH='D:\data\ange-clashboard.sqlite'
corepack pnpm run dev:server
```

## 规则查询

规则页支持按域名查询命中的规则源，并展示实际策略链路。

当前支持：

- 文本规则源缓存
- `.mrs` 域名规则集解析
- 规则顺序排序
- 兜底规则检测
- 根据 YAML 中的 `interval` 自动更新缓存

规则源默认读取：

```bash
data/rule-source.yaml
```

也可以通过环境变量覆盖：

```bash
ZASHBOARD_RULE_SOURCE_PATH
```

## Docker 安装与运行

推荐直接使用已经发布到 GHCR 的镜像，不需要用户自己构建。

镜像地址：

```bash
ghcr.io/liandu2024/ange-clashboard:latest
```

### 直接运行

Windows PowerShell：

```bash
docker run -d `
  --name ange-clashboard `
  -p 3000:3000 `
  -v ${PWD}/data:/app/data `
  ghcr.io/liandu2024/ange-clashboard:latest
```

Linux / macOS：

```bash
docker run -d \
  --name ange-clashboard \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  ghcr.io/liandu2024/ange-clashboard:latest
```

启动后访问：

- 面板：[http://localhost:3000](http://localhost:3000)

### Docker Compose

```yaml
services:
  ange-clashboard:
    image: ghcr.io/liandu2024/ange-clashboard:latest
    container_name: ange-clashboard
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

启动：

```bash
docker compose up -d
```

### 本地构建

只有在你自己改代码，或者镜像还没发布完成时，才需要本地构建：

```bash
docker build -t ange-clashboard:1.0.0 .
docker run -d --name ange-clashboard -p 3000:3000 -v ./data:/app/data ange-clashboard:1.0.0
```

### 数据目录说明

容器内会使用：

```bash
/app/data
```

建议把它映射到宿主机目录，用于保存：

- SQLite 数据库
- 背景图
- 规则缓存相关数据

## 项目结构

- `src/`：前端代码
- `server/`：本地持久化与规则缓存后端
- `data/`：运行时数据目录
- `public/`：静态资源

## 授权

本项目基于上游 `zashboard` 二次开发。上游使用 `MIT License`，因此你可以在保留原许可声明的前提下继续修改、发布和分发。

请保留仓库中的 [LICENSE](./LICENSE) 文件。

## 致谢

- 上游项目：[zashboard](https://github.com/Zephyruso/zashboard)
- Clash / Mihomo / sing-box 生态项目与规则集作者
