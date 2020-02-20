# reactNativeApp
react-native 项目 创建app

## run
```
安卓: npm run android
IOS: npm run ios
```
## 使用：
创建react-native 项目： `react-native init 'Native_Good'`
iOS下运行： `react-native run-ios`  
Android运行: `react-native run-android` （cmd + m 调起模拟器调试页面）
### 插件下载
- 动画库介绍 ：（http://maliquankai.com/2019/07/23/2019-07-23-lottie-animation/index.html）

- 路由下载： npm install react-navigation react-navigation-tabs  
这里路由下载遇到问题
    yarn 下载会卡住 改成npm 就没问题了
- 图标库下载： npm install react-native-vector-icons   
版本react-native > 0.59  的会自动link 不需要做多余的操作
     - Android  
编辑 android/app/build.gradle ( NOT android/build.gradle ) 并添加下面的代码: apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
     - IOS  
字体选项导入：info.plist
制定字体路径：pod 'RNVectorIcons', :path => '../node_modules/react-native-vector-icons'
 https://segmentfault.com/q/1010000012524890  
https://github.com/oblador/react-native-vector-icons
 - 动画库 react-native-pose  
下载 npm install react-native-pose  
包地址：https://www.npmjs.com/package/react-native-pose  
使用地方： src/navigator/AppNavigatiors.js （实现底部导航点击缩放动画）  
- 动画 lottie-react-native：
设计师只需要在 After Effects 设计出想要的动画，然后导出成 JSON文件交给开发工程师  
动画包 ： https://lottiefiles.com/  
介绍：http://www.ui.cn/detail/199429.html  
github : https://github.com/react-native-community/lottie-react-native  
官网： https://airbnb.io/lottie/#/react-native  
    - IOS  
解决添加插件后的打包问题
https://stackoverflow.com/questions/52536380/why-linker-link-static-libraries-with-errors-ios
    1) File -> New -> File 2) Select Swift File 3) Confirm Create Bridging Header 4) Go to Build Settings and set Always Embed Swift Standard Libraries to YES
    - Android  
暂时没出现问题    
### 功能
- 创建欢迎页  
通过createSwitchNavigator 一次只显示一个页面。作用： 将欢迎页和首页联系起来 （navigator/AppNavigators）  
- 底部导航点击的效果  
    - 修改tab选中颜色：`navigator/DynamicNavigators`  
     通过页面中的参数动态修改tab的选中颜色
    - react-native-pose动画  `navigator/AppNavigators`  
     实现点击后按钮变大的效果 （较优） 
    - lottie-react-native：  
 ** 👌 navigator/LottieNavigators： 实现点击后的动画效果（优）  
- 顶部导航效果  
    - 原生实现：page/Home/HomePage.js   
    -- 通过createMaterialTopTabNavigator 原生方法实现
        - 缺点:
            1. 没找到一个合适的方式实现跟 tab、底部指示器 样式的宽度的自适应
    - ScrollView实现：page/Home/HomeTabPage.js -- 通过ScrollView 实现点击跳转以及滑动跳转
        - 缺点：
            1. 有时候打包无法使用 （暂未解决）
            2. 交互还可以再优化一下  
    - 可滚动tab切换（底部下划线根据文本长度变化及tab自动居中）page/Home/HomeTabViewPage.js  
            `npm install react-native-scrollable-tab-view --save  `  
安卓需要另外添加依赖包 ( RN 0.61.5)
`npm install @react-native-community/viewpager`  
    - 参考 ** 👌  
tab 下划线 根据文本宽度 伸缩效果  
https://blog.csdn.net/qq_37049251/article/details/80682043
react-native-tabs-top：tab 自动调整位置居中  
https://segmentfault.com/a/1190000015551664
（仓库地址）https://github.com/cuo9958/react-native-tabs-top/blob/master/src/index.js
tab自适应屏幕宽度（不可滚动）-- 底部下划线可设置长度 && tab自动居中
- page/Home/HomeTabFitPage.js  
离线缓存策略  
优先从本地获取数据，如果数据过时或者不存在 则从服务器获取数据并更新本地数据库

### 待优化

封装fetch请求方法  
无数据时的占位符  
数据 Redux  
特点：单向数据流，store是唯一数据源
  
安装  
`npm install --save redux`  
`npm install --save react-redux`
  
示例  
- （simplest-redux-example） https://github.com/jackielii/simplest-redux-example/blob/master/index.js  
** 通过dispatch将action 发送到store，store将action分发给reducer，reducer会创建当前的state的副本，然后修改该副本并返回一个新的state。 将 reducer 函数 拆分成多个单独的函数  
combineReducers :https://www.redux.org.cn/docs/api/combineReducers.html
- react-navigation-redux-helpers  
下载：`npm install --save react-navigation-redux-helpers`  
可以处理物理键盘的返回，跟路由的关系（不至于点击返回物理键就推出应用）：`page/Detail/Detail.js（示例）`
https://github.com/react-navigation/redux-helpers
- 中间件 middleware
page/store/index.js（示例）
https://www.redux.org.cn/docs/api/applyMiddleware.html
- github 搜索接口
https://developer.github.com/v3/search/#search-repositories
- 有空看看  
react-native 的一些app操作：https://segmentfault.com/a/1190000015308197

### 报错
- 命令行执行adb命令报错“zsh: command not found: adb”  
https://www.jianshu.com/p/42b7ff51d7c4
升级mac 系统后 (巨坑，找半天，还以为什么鬼问题)， 使用zsh shell ，而没有在 .zshrc 中配置相关android tool的环境变量
vim  .zshrc 编辑 .bash_profile中已经配置过的环境变量 ，source .zshrc
就能够识别环境变量了 (adb )
- React 16 新特性  
⚠️警告：componentWillReceiveProps has been renamed  
componentWillReceiveProps → UNSAFE_componentWillReceiveProps
https://blog.csdn.net/lunahaijiao/article/details/99619460
- 安卓模拟器连接不上网络   
进入安卓sdk文件目录，Library/Android/sdk/emulator  
打开emulator下的命令窗口    
查看模拟器的名字： emulator -list-avds  
设置模拟器的网络： emulator @Pixel_2_API_29 -dns-server 8.8.8.8,114.114.114.11  
参考（方案二）： https://blog.csdn.net/qq_33945246/article/details/79908298
- Async Storage has been extracted from react-native core and will be removed in a future release.  
下载：npm i --save @react-native-community/async-storage  
使用：import AsyncStorage from '@react-native-community/async-storage';  
cd ios/ => pod install    
新版本缓存AsyncStorage 将不在react-native 中查看react源码中的错误信息
/node_modules/react-native/Libraries/Core/ExceptionsManager.js
