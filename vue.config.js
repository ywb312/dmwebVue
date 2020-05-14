// vue-cli3配置文件
const isProduction = process.env.NODE_ENV !== 'development'
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
    publicPath: './',
    devServer: {
        port: 8081,
        open: true,
        proxy: {
            '/dmweb': { //代理api
                target: "http://localhost:8080/dmweb", //服务器api地址
                changeOrigin: true, //是否跨域
                ws: true, // proxy websockets
                pathRewrite: { //重写路径
                    "^/dmweb": '/'
                }
            }
        },
    },
    productionSourceMap: false,
    css: {
        extract: false,
        modules: false,
        sourceMap: IS_DEV,
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 37.5,
                        propList: ['*']
                    })
                ]
            }
        },
        // extract: false,
    },
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
        // 压缩图片
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({
                bypassOnDebug: true
            })
            .end()
    },
    configureWebpack: config => {
        if (isProduction) {
            // 代码压缩
            config.plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        //生产环境自动删除console
                        compress: {
                            // 去除所有debugger
                            drop_debugger: true,
                            // 去除所有console.*
                            drop_console: true,
                            // 去除未用到的变量后 存在遗留的console.log则删除
                            pure_funcs: ['console.log']
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            )
            // gzip压缩
            config.plugins.push(
                new CompressionWebpackPlugin({
                    test: /\.js$|\.html$|\.css/,
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                    deleteOriginalAssets: false // 删除原文件
                })
            )
            // 公共代码抽离
            config.optimization = {
                splitChunks: {
                    cacheGroups: {
                        vendor: {
                            chunks: 'all',
                            test: /node_modules/,
                            name: 'vendor',
                            minChunks: 1,
                            maxInitialRequests: 5,
                            minSize: 0,
                            priority: 100
                        },
                        common: {
                            chunks: 'all',
                            test: /[\\/]src[\\/]js[\\/]/,
                            name: 'common',
                            minChunks: 2,
                            maxInitialRequests: 5,
                            minSize: 0,
                            priority: 60
                        },
                        styles: {
                            name: 'styles',
                            test: /\.(sa|sc|c)ss$/,
                            chunks: 'all',
                            enforce: true
                        },
                        runtimeChunk: {
                            name: 'manifest'
                        }
                    }
                }
            }
        }
    },
    lintOnSave: false
}