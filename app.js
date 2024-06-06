import b from './a.js'
// import "./test.css"
// import "./test2.css"
// import ts1 from "./ts1.ts"
// import image from "./img/image.jpg"
// new Image().src = image
// // 大文件js 后面使用
// // 模拟异步加载
// setTimeout(()=>{
//     //两种方式导入：import() 与 require.ensure
//     import(/*webpackChunkName:"a"*/"./a.js").then(res=>{
//         console.log(res)
//         console.log(res.default)
//     })
//     require.ensure([],()=>{//第一个参数是后面回调要使用的依赖
//        let b =  require("./a.js")
//        console.log(b.default)
//     })
// },3000)
console.log(baseUrl)
(()=>{
let a= 23;
console.log(b);
console.log(a);
})()