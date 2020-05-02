// vue-cli3配置文件
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
    lintOnSave: false
}