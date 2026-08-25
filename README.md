# xTool M2 交互式使用指南 Demo

这是在原 Demo 基础上整理的 PDF 原图素材版，不需要安装依赖即可运行。

## 本地打开

解压后双击 `index.html`。所有页面跳转均使用相对链接，可直接从本地文件打开。

## 页面结构

- `index.html`：选择套装
- `single.html`、`color.html`、`deluxe.html`：选择教程方式
- `guide-*.html`：连续滚动在线指引
- `video-*.html`：开箱视频
- `downloads-*.html`：按套装提供 PDF
- `assets/`：共用样式、交互脚本与图片
- `assets/images/pdf-originals/`：从三份说明书提取的嵌入原图，以及按 300 DPI 渲染的矢量页面素材
- `qa/extract_pdf_assets.py`：素材提取脚本与来源清单生成器

在线指引中的步骤图优先使用 `assets/images/` 下的高清裁剪素材，其余步骤引用 `assets/images/pdf-originals/` 下的 PDF 来源素材；点击图片可打开高清原图。

物料清单区按套装使用裁剪图：单机套装 1 张、多彩套装 2 张、豪华套装 3 张；物料清单后新增“认识机器”步骤，使用 `assets/images/machine-1.png`、`machine-2.png`。步骤区采用单列大图排版，说明书入口统一放在页面左上角标题旁。

在线指引目录按主机、喷墨模组、RA3 Lite 模组分级；主机、喷墨和旋转附件下继续细分安装与加工步骤。

主机的连接电源、连接电脑和指示灯步骤使用 `power-*.png`、`computer-*.png`、`indicator-*.png` 素材。

## 发布到 GitHub Pages

将本目录中的全部文件放到仓库发布目录，并把 `index.html` 保持在该目录根部。启用 GitHub Pages 后即可访问；无需构建命令。
