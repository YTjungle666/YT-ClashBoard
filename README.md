# YT-ClashBoard

这是按 YT 本地需求整理后的源码副本。

## 已调整

- 项目名、包名与界面品牌统一改为 `YT-ClashBoard`
- 默认端口改为 `80`
- 去掉原作者相关宣传与外链露出
- 服务端代理增加 `ALLOWED_TARGETS` 白名单限制，避免任意目标转发

## 运行时环境变量

### `PORT`

默认端口，默认值：`80`

### `ALLOWED_TARGETS`

允许服务端代理访问的 Clash / Mihomo / OpenClash 控制器 base URL 列表，使用逗号分隔。

示例：

```bash
ALLOWED_TARGETS=http://127.0.0.1:9090,http://10.10.10.254:9090
```

规则：
- 必须写完整 base URL，包含协议、主机、端口
- 只支持 `http://` 和 `https://`
- 多个目标用英文逗号分隔
- 不在 `ALLOWED_TARGETS` 里的目标会被服务端拒绝代理
- 如果 `ALLOWED_TARGETS` 为空，服务端代理默认禁用

部署时建议至少填写一个你明确要连接的控制器地址。

## 说明

- 这里只保留源码，不包含部署动作
- 许可证文件 `LICENSE` 仍保留
