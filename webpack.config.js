const path = require('path');
const MODE = "development";
const enabledSourceMap = MODE === "development";
const StyleLintPlugin = require('stylelint-webpack-plugin');
const STYLELINT = ['./src/**.scss'];

module.exports = {
    mode: 'development',
    entry: `./src/index.js`,
    output: {
        path: `${__dirname}/dist`,
        filename: "main.js"
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true,
        open: true,
        compress: true,
        hot: true,
        host: '0.0.0.0',
        disableHostCheck: true,
        useLocalIp: true,
     },
    //ローダの設定
    module: {
        rules: [
            {
                test: /\.scss/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            sourceMap: enabledSourceMap,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: enabledSourceMap
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_module/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env', { modules: false }]]
                        }
                    }
                ]
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
        ]
    },
    plugins: [
        new StyleLintPlugin({
            files: STYLELINT,
            syntax: 'scss'
        }),
    ],
};