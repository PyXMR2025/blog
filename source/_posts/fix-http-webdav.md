---
title: 解决 Windows 无法挂载 HTTP WebDAV（AList,OpenList）的问题
date: 2025-12-18 02:01:03
updated: 2025-12-18 02:01:03
tags: 
- WebDav
- DNS泄露
- 安全
- IT
- 漏洞
- VPN
category: 系统知识
---

# 解决 Windows 无法挂载 HTTP WebDAV 的问题

当前市面上大多数网盘都可以挂载到 AList（或 OpenList）中。AList 支持 WebDAV 协议，这意味着我们可以通过 AList 提供的 WebDAV 服务，将网盘像本地磁盘一样挂载到系统中，实现文件的直接读写。

然而，在 Windows 系统中尝试挂载时，可能会遇到如下错误：

![网络位置](https://jackie.openenet.cn/png/fix-http-webdav/1.png)

![挂载](https://jackie.openenet.cn/png/fix-http-webdav/2.png)

---

## 问题原因

出现该问题的原因是 Windows 默认的 WebClient 服务仅支持 HTTPS 协议，而本地搭建的 WebDAV 服务通常基于 HTTP 协议，因此导致挂载失败。

对于部分用户来说，将 WebDAV 升级为 HTTPS 是更安全的选择，但对于仅在内网使用、对安全性要求不高的场景来说，启用 Windows 对 HTTP 协议的支持可能是更快捷的解决方案。

---

## 解决方案

### 步骤 1：修改注册表

1. 按下 `Win + R`，打开“运行”窗口，输入 `regedit`，打开注册表编辑器。
2. 导航到以下路径：

   ```
   计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WebClient\Parameters
   ```

3. 找到 `BasicAuthLevel` 条目，双击并将数值数据修改为 **2**，点击“确定”。

![注册表](https://jackie.openenet.cn/png/fix-http-webdav/3.png)

### 步骤 2：重启 WebClient 服务

1. 再次按下 `Win + R`，输入 `services.msc`，打开“服务”窗口。
2. 找到 **WebClient** 服务，右键选择“重新启动”。

![服务](https://jackie.openenet.cn/png/fix-http-webdav/4.png)

3. 等待服务重启完成，或直接重启计算机。


![成功挂载](https://jackie.openenet.cn/png/fix-http-webdav/5.png)


---

> 旧评论：我改了注册表还是没用，在服务里看到WebClient被禁用，启动服务就能连上了。但是使用体验并不好，我试了复制几个100多M的文件到电脑，根本复制不过来，还是得到网页里下载。——来自[refrain1128](https://home.cnblogs.com/u/3571998)的评论

---
## 结语

通过以上步骤，Windows 便可以支持基于 HTTP 协议的 WebDAV 挂载，使内网环境下的网盘访问更加便捷。如果你有更高的安全需求，仍建议配置 HTTPS 以保障数据传输安全。