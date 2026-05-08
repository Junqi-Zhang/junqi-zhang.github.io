# 张峻旗个人主页

本仓库用于维护张峻旗的个人学术主页：

- 线上站点：<https://junqi-zhang.ourjqxd.com/>
- GitHub 仓库：<https://github.com/Junqi-Zhang/junqi-zhang.github.io>

## 本地开发

安装 Ruby、RubyGems、GCC 和 Make 后，执行：

```bash
gem install bundler:2.2.19
bundle _2.2.19_ install
bash run_server.sh
```

服务启动后打开 <http://127.0.0.1:4000>。

## 内容维护

主页正文在 `_pages/about.md` 中维护。作者信息、站点描述、SEO 和域名相关配置在 `_config.yml` 中维护。

## 致谢

本站基于 [AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io) 修改，并保留原项目对 Font Awesome、`mmistakes/minimal-mistakes` 和 `academicpages/academicpages.github.io` 的致谢。
