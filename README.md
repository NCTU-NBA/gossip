# Gossip 1.0

![WX20200326-130239@2x.png](https://i.loli.net/2020/03/26/uFrys8ReZdghXL3.png)

![WX20200326-130122@2x.png](https://i.loli.net/2020/03/26/YzhWKcCUMvH8m9D.png)

## 缘起

这个项目最初的灵感是来自于 [impress.js](https://github.com/impress/impress.js)，但它使用起来很麻烦（毕竟为了做 PPT 而写代码有点......)，同时现有的一些制作幻灯片的软件使用起来不尽人意。

一方面，现有的软件让演讲者在制作 PPT 的过程中过多地关注幻灯片的图形化设计，而忽略了每一页幻灯片传递信息的效率和 PPT 整体的逻辑结构。另一方面，在演示 PPT 的过程中不能给听众提供更多的上下文信息：前后两张幻灯片的关系、当前讲到哪一张、还有多少张没有讲......

《人类简史》中有一个观点，人类之所以强于其他动物就是因为人类会讲故事：故事让我们能相信陌生人，从而能有效地大规模合作。PPT 不失为一种好的讲故事的方式，而 Gossip（八卦）是一种我们随时随地都在、也是人们最喜欢讲的故事，所以我将该软件取名为 Gossip，旨在打造一个通过 PPT 高效编故事、讲故事的工具。

你的下一份 PPT，未必是一份 PPT。🔥

[直接体验](https://pearmini.github.io/gossip/)

## 说在前面

当前版本的 Gossip 1.0 是一门课程的课程项目，只实现了一些最初的设想，所以使用起来仍然还不是特别方便。无论是从功能还是代码上讲，都不是特别优雅，还有很大的改进空间。

现在我将它作为我的毕业设计。希望大家使用后多多提意见，将不放方便的地方和期望的功能告诉我，最后会在我毕业设计的成果（Gossip 2.0）中体现。

## 特色

- 约定式大纲。
- 只需要少量拖拽和对齐操作的布局。
- 更加自由和方便的修改样式。
- 拥有有和 impress.js 相似的切换动画和 overview 模式，但是这里的布局和动画都是一键生成，不需要你写代码一张张的调整......
  
## 开始使用

下面的教程会花10到20分钟，教大家用 Gossip 从0到1完成一个简单的 PPT 案例。涉及 Gossip 使用技巧的方方面面，让你从此开启制作幻灯片的新方式。

教程制作的 PPT 的主题是如何实现下图的效果，当然也可以先[在线体验](https://www.openprocessing.org/sketch/862903)一下。

![Mar-25-2020 11-03-29.gif](https://i.loli.net/2020/03/25/MGnariKg3pD5QEL.gif)

[中文教程](./tutorials.md)

## 存在问题

当前版本的 Gossip 还存在下面的一些问题，目前这些问题大多数都有了解决方案。

- 布局方式仍然不方便。
- 不支持动画。
- 不支持模版。
- 没有丰富的快捷键。
- 没有撤销功能。
- 词云模式布局存在一些问题。
- 演示过程中提供的上下文信息还不够。
- 大纲不够灵活。

## 技术栈

umi + antd
  