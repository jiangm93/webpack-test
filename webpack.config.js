const EslintPlugin = require("eslint-webpack-plugin")
const MiniCssPlugin = require("mini-css-extract-plugin")
const Minimizer = require("css-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")


// common.js 规范
module.exports = {

    // mode: 'production',
    mode: 'development',
    devtool:"eval-cheap-source-map",
    // 代码优化配置，压缩配置
    optimization: {
        splitChunks:{
            chunks: 'all', // 表示对同步和异步代码都进行分割  
            minSize: 30000, // 最小分割大小，单位为字节，默认值是 30000（30kb）  
            maxSize: 0, // 最大分割大小，单位为字节，如果设置为 0，则没有限制  
            minChunks: 1, // 最小被引用次数，表示只有被引用1次以上的模块才会被分割  
            maxAsyncRequests: 30, // 异步加载时并行请求的最大数量  
            maxInitialRequests: 30, // 入口点并行请求的最大数量  
            automaticNameDelimiter: '~', // 当分割出的 chunk 名称过长时，使用此字符作为分隔符  
            cacheGroups: {  
              vendors: {  
                test: /[\\/]node_modules[\\/]/, // 匹配 node_modules 中的模块  
                priority: -10, // 优先级为负，表示比默认优先级低  
                reuseExistingChunk: true, // 如果已经存在符合规则的 chunk，则复用，不再创建新的  
              },  
              default: {  
                minChunks: 2, // 默认组，表示被引用2次以上的模块才会被分割  
                priority: -20, // 优先级更低  
                reuseExistingChunk: true,  
              },  
            },  

        }
    },

    // entry:["./app.js","./app2.js"]
    entry: {
        app: './app.js',
        app2:'./app2.js'
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].[hash:4].bundle.js",
        publicPath:"www.xxxx.com"//CDN资源地址
    },
    // 开发模式配置
    devServer: {
        port:1000,
        hot:true,
        proxy:{
            "/":{
                target:"http:www.xxxx.com",
                pathRewrite:{
                    "^/num1":"/api/getNum"
                },
                headers:{

                }
            }
        }
    },
    // 配置规则 快速查找
    resolve: {
        alias:{
            "@css":"/css",//使用@css 代替 文件路径/css
        },
        extensions:[".js",".css",".json"],//引入时可以不写文件后缀
    },
    // loader
    module: {
        rules: [
            {
                test: /\.tsx?$/, 
                use:{
                    loader:"ts-loader",
                    options:{

                    }
                } 
            },
            {
                test: /\.js$/,//定义正则
                // loader:"babel-loader",//使用loader只能使用字符串，无法对loader进行配置
                // use:["babel-loader","xxx-loader"],//使用use后面可以使用数组添加多个loader
                use: {//对loader进行option配置，使用对象形式
                    loader: "babel-loader",
                    // 定义转换规范
                    // preset ->@babel/preset-env
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {//编译目标
                                        // 以浏览器作为编译目标
                                        browsers: [
                                            ">1%",//占有率
                                            "last 2 versions",//浏览器最后两个版本
                                            "not ie<=8"//不需要支持IE8以下
                                        ]
                                    }

                                }
                            ],
                        ]

                    }
                }
            },
            {
                test: /\.css/,
                use: [MiniCssPlugin.loader, "css-loader","./mycss-loader"]
            },
            // {
            //     test:/\.(jpg|jpeg|png|gif|svg)$/,
            //     loader:"url-loader",
            //     options:{
            //         limit:5000,//转换条件 图片大小
            //         name:"[name].[hash].[ext]"
            //     }

            // },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                type: "asset",//asset/inline所有图片都转成base64  asset/resource所有图片都是独立的文件
                parser: {
                    dataUrlCondition: {
                        maxSize: 5000
                    }
                },
                generator: {
                    filename: "[name].[hash][ext]"
                }
            }
        ]
    },
    // 插件
    plugins: [
        // new EslintPlugin()
        new MiniCssPlugin({
            filename: "test.bundle.css",//配置打包后的文件名
        }),
        new Minimizer(),
        new HtmlWebpackPlugin({
            template:"./index.html",
            filename:"index.html",
            chunks:["app"],
            title:"webpack-test",
            minify:{//压缩相关配置
                collapseWhitespace:false,//是否移除换行
                removeComments:false,//是否移除注释
                removeAttributeQuotes:false,//是否移除属性之间的空格
            },
            inject:"body",//配置入口js引用位置， body | true ：加入到body ,head ：加入到head,false ：不加入
        }),
        new HtmlWebpackPlugin({
            template:"./index.html",
            filename:"index2.html",
            chunks:["app2"],
            title:"webpack-test",
        })
    ]


}