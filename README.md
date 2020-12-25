# vue-elm-copy

# By 鲸落

## 项目运行
 ``` bash

# 安装依赖
npm install

# 开启本地服务器localhost:8080
npm run dev

# 发布环境
npm run build
```


## 项目布局
```
.
|-- build                            // webpack配置文件
|-- config                           // 项目打包路径
|-- elm                           	 // 上线项目文件，放在服务器即可正常访问
|
|-- src                              // 源码目录
|   |-- components                   // 组件
|       |-- common                   // 公共组件
|       |-- footer                   // 底部公共组件
|       |-- header                 	 // 头部公共组件
|
|   |-- config                       // 基本配置
|       |-- env.js                   // 环境切换配置
|       |-- fetch.js                 // 获取数据
|       |-- rem.js                   // px转换rem
|
|   |-- images                       // 公共图片
|
|   |-- pages                        // 页面组件
|       |-- checkout                 // 确认订单页
|       |-- city                     // 当前城市页
|       |-- forget                   // 忘记密码，修改密码页
|       |-- home                     // 首页
|       |-- login                    // 登陆注册页
|       |-- msite                    // 商铺列表页
|       |-- order                    // 订单列表页
|       |-- profile                  // 个人中心
|       |-- search                   // 搜索页
|       |-- shop                     // 商铺详情页
|       |-- vipcard                  // vip卡办理页
|
|   |-- plugins                      // 引用的插件
|
|   |-- router                       // 路由配置
|
|   |-- service                      // 数据交互统一调配
|
|   |-- store                        // vuex的状态管理
|       |-- modules                  // 加载各种store模块
|       |-- action.js                // 配置根actions
|       |-- getters.js               // 配置根getters
|       |-- index.js                 // 引用vuex，创建store
|       |-- mutation-types.js        // 定义常量muations名
|       |-- mutations.js             // 配置根mutations
|
|   |-- style                        // 各种样式文件
|       |-- common.scss              // 公共样式文件
|
|   |-- App.vue                      // 页面入口文件
|
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 代码编写规格
|-- .gitignore                       // 忽略的文件
|-- favicon.ico                      // 页面左上角小图标
|-- index.html                       // 入口html文件
|-- package.json                     // 项目及工具的依赖配置文件
|-- README.md                        // 说明
.
```