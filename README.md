# 西安交通大学暑期实践后台管理

[![TeamCity CodeBetter](https://img.shields.io/teamcity/codebetter/bt428.svg)]() [![npm](https://img.shields.io/npm/dw/localeval.svg)]() [![npm](https://img.shields.io/npm/v/npm.svg)]() [![Chrome Web Store](https://img.shields.io/chrome-web-store/stars/nimelepbpejjlbmoobocpfnjhihnpked.svg)]()

**本项目是后台管理框架，集成了权限管理、登录功能、UI组件、等功能，建议直接使用。**



## Features 特性

- **👍vue-cli脚手架👍**（脚手架助你安装/卸载组件更方便）
- **👉多TAB导航**
- 面包屑导航
- **工业化UI组件**（上手即用，无需自己造轮子）
- `登录/注销`
- `权限验证`
- 404错误页面
- **表格数据直接导出xlsx**

## Preview 效果图

### 主界面

### 登录界面

## Run 开发

```bash
    # 克隆项目
    git clone https://github.com/LonelVino/shijian-admin

    # 安装依赖
    npm install
    //or 
    npm install --registry=https://registry.npm.taobao.org


    # 本地开发 开启服务
    npm run dev
```

## Build 发布
```bash
    # 发布测试环境 
    npm run build
```

## FileTree 目录结构

```shell
├── public                     // Vue接入公共资源
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 静态资源
│   ├── components             // 全局UI组件   
│   ├── icons                  // 图标
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── styles                 // 全局style管理
│   ├── utils                  // 全局公用方法
│   ├── view                   // view界面
│   │    ├── dashboard          //项目审核组件
│   │    ├── Guide              //资料上传下载组件
│   │    ├── layout             //页面整体布局
│   │    ├── login              //登录界面
│   │    ├── loginCallback      //登录回调界面
│   │    ├── ManageExamine      //项目测验界面
│   │    ├── Note               //留言审核界面
│   │    └── Notification       //公告界面
│   ├── App.vue                // 入口页面
│   ├── main.ts                // 入口 加载组件 初始化等
│   ├── permission.ts          // 权限配置
│   ├── registerServiceWorker.ts // 注册管理
│   └── store.ts                // 全局store管理
├── .env                       // 环境配置
├── .eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── babel.config.js            // babel 配置项
├── package.json               // package.json
├── README.md                  // README.md
├── tsconfig.json              // typescript Configuration
├── tslint.json                // tslint Configuration
└── vue.config.js              // 配置proxy 跨域
```

## License

MIT License

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## TODO List
- 七牛上传
- mockjs模拟: 前端调试
- hover特效
- `多环境发布`
- **表格数据直接导出csv**
- echartjs图表
- `Markdown 编辑器`
- `动态侧边栏`（支持多级路由）
- JSON展示组件
- **自适应布局**（完美适配大中小屏）
