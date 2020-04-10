module.exports = {
    publicPath: './',
    devServer: {
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
        }
    },
    lintOnSave: false
}