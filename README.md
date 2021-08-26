# RichText

富文本编辑器

## 简介

不依赖与浏览器的execCommand对用户命令进行处理,自定义数据层和UI层逻辑,建立一个数据中心接口,所有的数据修改经过数据中心,数据中心对操作堆栈作为一个管理,是数据层和UI层的桥梁,且是单向数据通道。数据中心支持用户的回滚和重做。UI层交互->数据层修改->数据通道->UI层渲染。数据层修改的发生的情况只有两种,UI层交互导致数据层修改,数据通道栈修改导致数据层修改。
由于拥有自定义数据层逻辑,RichText编辑器支持两种导出模式：html和元数据,元数据可以进行跨平台使用。对各个平台定义一个解析元数据模块即可,而不需要使用一些html模块对html进行解析。

## 数据层定义

BaseBuild 数据层基类

RichTextBuild 顶层数据层管理器

TextRowBuild 文本行数据层,用于管理文本行条目,每一行都是一个单独的管理器,也可以说是独占一行的元素数据层

TextItemBuild 文本行条目,被包含在TextRowBuild下面,可能是TextRowBuild的子代也可能是它的后代。TextItemBuild之间属于一个多叉树的关系

```
                        TextRowBuild

        TextItemBuild                 TextItemBuild

TextItemBuild TextItemBuild   TextItemBuild TextItemBuild
......
```
