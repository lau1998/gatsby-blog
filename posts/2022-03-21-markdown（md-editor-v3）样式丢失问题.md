---
layout: post
title: markdown（md-editor-v3）如何在页面显示，以及样式丢失问题
description: markdown（md-editor-v3）如何在页面显示，以及样式丢失问题的一个记录。
date: 2022-03-21 09:18:42
category: Vue
background: "#f7a5a6" 
---
之前在一个Vue3的项目中需要使用到markdown富文本框，于是乎就在网上查了一下支持Vue3的富文本框插件，最后感觉md-editor-v3很不错，而且还支持react，于是乎就选择它了，但是在使用他的时候出现了一些"小插曲"，最终凭我惊人的毅力💪，花费了3天😩，终于能友好的使用它了🤑。

下面就将这些"小插曲"记录下来😎。

首先介绍一下它怎么使用的：

###  功能

1. 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等；
2. 内置的白色主题和暗黑主题，支持绑定切换；
3. 支持快捷键插入内容；
4. 支持使用 prettier 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）；
5. 支持多语言，支持自行扩展语言；
6. 支持复制粘贴上传图片，图片裁剪上传；
7. 支持仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）
8. ...

### 预览例图
![md-editor-v3](/assets/img/md-editor-v3.png)

### Demo示例代码

```vue
<template>
    <el-row :gutter="20" style="margin-bottom: 10px">
        <el-col :span="6">
            <el-input v-model="inputTitle" placeholder="文章标题" />
        </el-col>
        <el-col :span="10">
            <el-input v-model="inputIntroduce" placeholder="文章简介" />
        </el-col>
        <el-col :span="6">
            <el-input v-model="coverImg" placeholder="封面图地址">
                <template #prepend>URL:</template>
            </el-input>
        </el-col>
        <el-col :span="1">
            <el-button type="primary" :disabled="isNull" @click="bindArticle"><i class="bi bi-send"></i>&nbsp;发布</el-button>
        </el-col>
    </el-row>
    <md-editor ref="editorRef" v-model="valueText" @onChange="updateMarkdown" @onHtmlChanged="updateHtml"
        :toolbarsExclude="['github']" @onUploadImg="onUploadImg" @onSave="codeSave" :footers="footers"
        placeholder="请在这里进行编辑！">
        <template #defFooters>
            <span>左边Tips</span>
            <span>右边Tips</span>
        </template>
    </md-editor>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
// 自选代码高亮样式
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import sanitizeHtml from 'sanitize-html'
import { ElMessage } from 'element-plus'
import { RequestUploadImg, RequestArticleConetnt } from '@/api'
import type { ExposeParam } from 'md-editor-v3'
import { useUserStore } from '@/stores/user'
const editorRef = ref<ExposeParam>()
const footers: any = ['markdownTotal', 0, '=', 1, 'scrollSwitch']
const sanitize = (html: any) => sanitizeHtml(html) //:sanitize="sanitize"开发阶段 暂时关闭

onMounted(() => {
    editorRef.value?.focus()
})
const inputTitle = ref('') //文章标题
const inputIntroduce = ref('') // 文章简介
const coverImg = ref('') // 封面图地址
// 【接口】接受传参字段
interface IProps {
    text: string
}
// 初始化默认参数
const props = withDefaults(defineProps<IProps>(), {
    text: '',
})
const valueText: any = ref(props.text)
let mdStr = ref('')
const updateMarkdown = (md: string) => {
    mdStr.value = md
}
let htmlStr = ref('')
const updateHtml = (html: string) => {
    htmlStr.value = html
}
// 图片上传事件
const imageFile: any = ref('') //上传图片文件
const imageUrl = ref('') //图片预览地址
// submitForm为提交表单事件
const onUploadImg = async (
    rawFile: Array<File>,
    callback: (urls: Array<string>) => void
) => {
    const rawFiles = rawFile[0]
    const arr = ['image/jpeg', 'image/png', 'image/jpg']
    console.log('图片格式-->', rawFiles.type)
    // 图片格式验证
    if (!arr.includes(rawFiles.type)) {
        ElMessage({
            message: '上传图片格式不正确！!',
            type: 'error',
        })
        return false
    }
    // 图片大小验证
    if (rawFiles.size / 1024 / 1024 > 2) {
        ElMessage({
            message: '上传图片大小不能超过2M!',
            type: 'error',
        })
        return false
    }
    // 图片预览
    //1. 选中的本地图片转成Base64编码 赋值给 imageUrl
    //2. FileReader 读文件
    imageUrl.value = URL.createObjectURL(rawFiles)
    // 上传图片
    imageFile.value = rawFiles
    const formData = new FormData()
    let fileBackInfo = await RequestUploadImg(imageFile.value) // 单文件上传
    if (fileBackInfo.resultCode === 1) {
        formData.append('url', fileBackInfo.resultInfo) // 传图片地址
    } else if (fileBackInfo.resultCode === -1) {
        ElMessage({
            message: '图片上传失败！',
            type: 'error',
        })
        return false
    }
    callback([fileBackInfo.resultInfo])
}
// 保存代码
const codeSave = (v: string): void => {
    ElMessage.success('已保存')
    localStorage.setItem('MdCodeSave', v)
    localStorage.setItem('MdHtml', htmlStr.value)
}
onMounted(() => {
    // 挂载后获取之前保存的数据
    if (localStorage.getItem('MdCodeSave')) {
        valueText.value = localStorage.getItem('MdCodeSave')
    }
})
</script>

<style scoped>
.md-editor {
    height: 735px;
}
</style>

```

### 效果图

![md-editor-demo效果图](/assets/img/md-editor-v3.png)

### 遇到的难题

1. 如何在页面上显示md转成的html内容呢？

   你需要拿到转换成html的数据，然后将他绑定到v-html中。

2. 样式丢失怎么办？

   就是在v-html元素上添加一个class="md-editor"的类名就行，但是还需在js里面导入样式

   ```js
   import 'md-editor-v3/lib/style.css'
   
   import '@/assets/css/atom-one-dark.min.css'
   ```

   ![代码](/assets/img/Snipaste_2020.01.01.png)

   然后，就完美解决样式丢失问题啦！

   好了，散会😎
   
   
