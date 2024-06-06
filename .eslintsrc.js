
module.exports={
    // 环境配置
    env:{
        browser:true,//浏览器环境 
        node:true,
        es6:true,
    },
    // 继承现有的eslint 规范
    // 例如 eslint-config-standard
    // eslint-config-airbnb
    extends:[
        "standard"
    ],
    // 安装vue规范插件
    // 安装TypeScript规范插件
    plugins:[

    ],
    parserOptions:{
        ecmaVerison:6,
        sourceType:"module",
        ecmaFeature:{
            jsx:true
        }
    },
    // https://eslint.nodejs.cn/docs/latest/rules/ 可参考配置项目文档
    rules:{
        "no-console":1 //0-off 关闭 1-warn 警告 2-error 报错
    }
}