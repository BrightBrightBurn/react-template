const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production ';
const isDev = !isProduction;

const tsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react']
            }
        },
    ];

    if (isDev) {
        loaders.push({
            options: {
                eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
        });
    }
    return loaders;
};

module.exports = {
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src/index.tsx')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            modules: true
                        }
                    }
                ],
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: tsLoaders()
            },
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            title: 'React frontend template',
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
        extensions: ['.jsx', '.js', '.css', '.tsx', '.ts', '.less', '.json'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },

    }
};