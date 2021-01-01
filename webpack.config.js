const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production ';
const isDev = !isProduction;

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react']
                    }
                },
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            minify: {
                collapseWhitespace: isProduction
            }
        }),
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'dist'),
        hot: isDev,
        open: true,
        port: 9000
    },
    devtool: isDev ? 'source-map' : false,
    resolve: {
        extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },

    }
};
