# AGENTS.md

本文件为后续在本仓库中工作的代码代理提供项目维护说明。

## 项目概览

本仓库使用 Jekyll 和 GitHub Pages 构建张峻旗的个人学术主页。

- 线上站点：https://junqi-zhang.ourjqxd.com/
- 主页正文：`_pages/about.md`
- 站点配置与作者信息：`_config.yml`
- 顶部导航配置：`_data/navigation.yml`
- 布局与公共片段：`_layouts/`、`_includes/`
- Sass 样式：`_sass/`
- 图片与媒体资源：`images/`
- 导航跟随行为：`assets/js/mobile-nav-follow.js`

## 本地开发

优先沿用仓库现有的 Ruby/Jekyll 工作流。

```bash
gem install bundler:2.2.19
bundle _2.2.19_ install
bash run_server.sh
```

本地服务启动后访问 `http://127.0.0.1:4000/`。

如只需做一次构建验证，运行：

```bash
bundle exec jekyll build
```

在当前工作环境中，如果已有本地 bundle 缓存，可以使用：

```bash
BUNDLE_PATH=/tmp/junqi-zhang-github-io-bundle bundle exec jekyll build
```

本地构建时可能出现 GitHub Metadata 缺少 API 认证的提示。除非当前改动依赖 GitHub 元数据，否则该提示通常不是阻塞问题。

## 编辑原则

- 改动范围应尽量贴合用户请求，避免顺手重构无关代码。
- 优先复用现有 Sass 分片、布局模板和 include，不要引入不必要的新样式体系或脚本框架。
- 不要直接编辑生成目录 `_site/` 中的文件。
- 保持个人学术主页的表达风格：简洁、清晰、内容优先。
- 除非用户明确要求，不要做大规模视觉改版。
- 新增媒体资源前，先确认 `images/` 中是否已有可复用素材。

## 桌面端与移动端体验

桌面端和移动端的访问体验必须保持一致，不能只优化一端而牺牲另一端。

- 修改导航、侧栏、头像、快速链接、正文布局或出版物列表时，都应同时检查桌面端和移动端。
- 优化移动端时，要保护桌面端的阅读宽度、侧栏结构和导航可读性。
- 优化桌面端时，要保护移动端的触控体验、横向导航提示和内容换行表现。
- 顶部粘性导航在不同视口下应暴露同一套栏目结构。
- 移动端导航可以横向滚动，但必须有明确的可滑动提示，并应在页面下滑时自动跟随当前栏目。
- 桌面端导航应显示与移动端一致的当前栏目状态，但不要干扰正文阅读布局。
- 头像相关调整必须保证移动端完整显示面部，同时维持桌面端的完整人像展示。

建议的视觉检查宽度：

- 移动端：约 `390px`
- 桌面端：约 `1280px`

检查时应确认首页、顶部导航、作者信息、快速链接、正文段落和论文列表均清晰可读。

## 关键实现位置

- `_sass/_masthead.scss`：控制顶部粘性区域和移动端导航滑动提示。
- `_sass/_navigation.scss`：控制顶部导航链接、当前栏目高亮和菜单样式。
- `_sass/_sidebar.scss`：控制作者头像、简介和快速链接。
- `assets/js/mobile-nav-follow.js`：根据页面滚动位置更新当前导航栏目。保持该脚本轻量、无依赖。
- `_includes/scripts.html`：加载独立站点脚本。

## Git 与验证

- 编辑前后都检查 `git status --short --branch`。
- 不要回滚用户或他人已有的无关改动。
- 提交前运行 `git diff --check`。
- 涉及视觉或响应式体验的改动，应运行 Jekyll 构建，并在条件允许时用浏览器同时检查桌面端与移动端。
