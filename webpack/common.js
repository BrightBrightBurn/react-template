const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { config } = require('dotenv')

function getEnvConfig() {
    const envConfig = config().parsed
    return Object.fromEntries(Object.keys(envConfig).map((key) => [key, JSON.stringify(process.env[key] || envConfig[key])]))
}

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            scriptLoading: 'defer'
        }),
        new webpack.DefinePlugin({
            'process.env': getEnvConfig()
        })
    ],
    resolve: {
        extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    }
}
