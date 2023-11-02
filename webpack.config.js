const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
                },
                {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
                }
            ]
        },
        resolve: {
          extensions: ['.js'],
        },
        plugins: [
            new HtmlWebpackPlugin({
              template: './src/index.html',
            })
        ],
        optimization: {
            minimize: isProduction
        },
        devServer: {
            static: {
              directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 9000,
            client: {
              progress: true,
            },
            hot: true
        }
    }
}