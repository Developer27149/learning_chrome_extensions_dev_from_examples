### 关于

我在学习开发 chrome extension 的过程中，学习了这里的所有(除了app)内容，一遍遍临摹，编写注释。

[orbitbot/chrome-extensions-examples: All Chrome Extension examples collected into one repository](https://github.com/orbitbot/chrome-extensions-examples)

并且阅读了官方文档，同时也找到了翻译时间比较靠近现在的这个仓库：

[facert/chrome-extension-guide: Chrome 扩展(插件) 开发官方文档中文版翻译](https://github.com/facert/chrome-extension-guide)

> 本文基于 v3 版本

### 目录

- demo1：谷歌分析扩展，从这里学习到`v3` 版本的`url`匹配权限使用单独的`host_permissions` 定义，并且看文档发现以后不推荐像这个扩展这样引用外部脚本，使用的所有脚本都应该是本地的。
- demo2:

### 总结

#### manifest.json

权限知识：

> 在扩展中如果需要使用某些浏览器api，则需要提前在 manifest 中指明需要的权限

在配置文件中的字段为：`permissions`，可用的权限申明如下：

- storage：本地存储
- privacy：隐私内容，例如 cookie


### 其他

大量使用 `回调函数`
