const base = require("./webpack.baseconfig.js");
const merge = require("webpack-merge").merge;
const webpack = require("webpack")
module.exports = merge(base,{
    mode: 'production',
     // 开发模式配置
    //  devServer: {
    //     port:1000,
    //     hot:true,
    //     proxy:{
    //         "/":{
    //             target:"http:www.xxxx.com",
    //             pathRewrite:{
    //                 "^/num1":"/api/getNum"
    //             },
    //             headers:{

    //             }
    //         }
    //     }
    // },
    plugins:[
        new webpack.DefinePlugin({
            baseUrl:"www.xxxx.com"
        })
    ]
})