const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
const cleanPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, 'src'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8000,
        historyApiFallback: true
    },
    resolve: {
        alias: {
            Images: path.resolve(__dirname, './src/assets/images'),
            Styles: path.resolve(__dirname, './src/assets/styles')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new htmlPlugin({
            title: 'Time React',
            template: './src/index.html'
        }),
        new cleanPlugin()
    ]
}