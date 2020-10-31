// vue-cli3配置文件
const isProduction = process.env.NODE_ENV !== 'development'
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
    publicPath: './',
    // 输出文件目录
    outputDir: "dist",
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
    parallel: false,
    productionSourceMap: false,
    css: {
        extract: false,
        requireModuleExtension: true,
        sourceMap: false,
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
            // gzip压缩
            config.plugins.push(
                new CompressionWebpackPlugin({
                    test: /\.js$|\.html$|\.css/,
                    exclude: /node_modules/,
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
    lintOnSave: false,
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ]
}