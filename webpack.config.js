const path = require('path');
const dist = process.env.dist;
module.exports = {
    mode: 'development',
    //entry
    entry: `./src/index.js`,
    //ファイルの出力
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
        useLocalIp: true
     },
    //ローダの設定
    module: {
        rules: [
            {
                //ローダの処理対象ファイル
                test: /\.js$/,
                //ローダの処理対象から外すディレクトリ
                exclude: /node_module/,
                use: [
                    {
                        //利用するローダ
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env', { modules: false }]]
                        }
                    }
                ]
            },
            {
                // enforce: 'pre'を指定することによって
                // enforce: 'pre'がついていないローダーより早く処理が実行される
                // 今回はbabel-loaderで変換する前にコードを検証したいため、指定が必要
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
        ]
    },
};