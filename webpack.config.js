// nodejs 的一个模块
const path = require("path");

const htmlWebpackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");

// webpack所有配置项
module.exports = {
    // 入口文件
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        //告诉webpack 不使用箭头函数
        environment: {
            arrowFunction: false
        }
    },

    // 指定webpack打包时要使用的模块
    module: {
        rules: [{
            test: /\.ts$/, // test指定规则生效文件
            // 要使用的loader 先后面执行，所以要先转成js ts-loader放在最下面
            use: [{
                    loader: 'babel-loader',
                    // 设置babel
                    options: {
                        // 设置预定义环境
                        presets: [
                            [
                                // 指定环境插件
                                "@babel/preset-env",
                                // 配置信息
                                {
                                    // 要兼容的目标浏览器
                                    targets: {
                                        "chrome": "88",
                                        "ie": "11",
                                    },
                                    // 指定corejs版本
                                    "corejs": "3",
                                    // 使用corejs 方式, "usage"表示按需加载
                                    "useBuiltIns": "usage"
                                }
                            ]
                        ]
                    }
                },
                'ts-loader'
            ],
            exclude: /node-modules/ //要排除的文件
        }]
    },

    // 配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            title: "webpack-test",
            template: "./src/index.html"
        }),
    ],

    // 用来设置应用的模块
    resolve: {
        extensions: ['.ts', '.js']
    }
};