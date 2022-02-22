let proxyObj = {}
proxyObj['/'] = {
    // ws=>websocket
    ws: false,
    target: 'http://localhost:8081',
    // 发送请求头host会被设置成target
    changeOrigin: true,
    // 不重写请求路径
    PathRewrite: {
        '^/': '/'
    }
}


module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    },
    lintOnSave: false, // 关闭 eslint 检查 
}
