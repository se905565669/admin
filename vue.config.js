const { title } = require('./src/setting');

const name = title || '后台管理'

module.exports = {
    configureWebpack: {
        name: name
    },
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = name;
            return args;
        })
    }
}
