**使用 TS 和 React 实现仿 Jira 开发**

**IDE:WebStorm (还是喜欢 VSCode，但是写 TS WebStorm 真的顺!)**

**技术栈:Antd CSS in JS Emotion react-redux react-query CRACO Why Did Render**

一。初步开发阶段：使用 json-server 模拟 mock 数据，辅助开发（30s 就可以部署后端真不是吹得呀)
后期废除，使用本地后端，插件公开，本地的 mock 数据集，localStorage，以及 react-query.

二。基础开发：

            基础必须夯实，自定义 context hook 管理全局登录状态(本项目主阶段不用 Redux)

            useHttp 封装好token的携带问题，使得用户可以维持登录状态

            useAsync模拟react-query官方写法，我们这里使用useAsync来返回loading和error状态,在写入到useAuth到context全局状态，便于所有组件树下的组件使用

            错误边界自己封装好错误边界函数调用（这里有个异步的坑 try catch 在处理异步函数 我们catch的调用时机再想想）

            id类型在select组件的难题，自己封装好，解决id类型难题

            useMemo 和 useCallback的hook应用（！important）



