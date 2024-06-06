const base = require("./webpack.baseconfig.js");
const merge = require("webpack-merge").merge;
console.log(process.env)
module.exports = merge(base, {
    mode: 'development',
    devtool: "eval-cheap-source-map",
    // 开发模式配置
    devServer: {
        port: 1000,
        hot: true,
        proxy: [
            {

                context: ["/"],
                target: "http:www.xxxx.com",
                pathRewrite: {
                    "^/num1": "/api/getNum"
                },
                headers: {

                }

            }
        ]
    },
})