const path = require('path');
// html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// clean 清理代码
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    // 减少log信息
    stats: 'errors-only',
    // 入口文件
    entry: './src/index.ts',
    // 指定打包后文件所在的目录
    output: {
        path: path.resolve(__dirname, 'dist'),
        // 打包后的文件名字
        filename: 'bundle.js',
    },
    mode: 'development',
    // 指定webpack打包时需要的模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // 指定规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                use: ['ts-loader'],
                // 排除的文件
                exclude: /node_modules/,
            },
        ],
    },
    // 配置插件
    plugins: [
        new HTMLWebpackPlugin({
            // title: '自定义的title',
            template: './public/index.html',
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        // 运行代码的目录
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 5500,
        host: 'localhost',
        open: true,
        // 热更新
        hot: true,
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
};
