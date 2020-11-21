const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './app/index.html',
    filename: './index.html',
});

const cssPlugin = new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename: '[name].css',
});

const copyPlugin = new CopyPlugin([
    { from: 'app/assets/images', to: 'assets/images' },
]);

const getConfigBasedOnEnv = () => {
    switch (process.env.NODE_ENV) {
        case 'dev':
            return path.join(__dirname, '/../app/config/dev.js');
        default:
            return path.join(__dirname, '/../app/config/dev.js');
    }
};

module.exports = {
    entry: ['babel-polyfill', './app/'],
    output: {
        path: path.join(__dirname, '/../dist'),
        publicPath: '/',
        filename: 'bundle.[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000&mimetype=image/svg+xml&name=/images/[name].[ext]',
            },
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, 'css-hot-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader?name=fonts/[name].[ext]',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                loader: 'file-loader',
                options: { outputPath: 'assets/images' },
            },
        ],
    },
    plugins: [htmlPlugin, cssPlugin, copyPlugin],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss'],
        alias: {
            appConfig: getConfigBasedOnEnv(),
        },
    },
};
