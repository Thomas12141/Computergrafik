const path = require('path');

module.exports = {
    entry: ['./src/index.ts',
        './src/index.html',
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/, /\.d\.ts/],
            },
            // load html files, mainly index.html (copies html to dist during build)
            {
                test: /\.html/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            // load glsl files to string
            {
                test: /\.glsl/,
                loader: 'raw-loader'
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    // webpack-dev-server configurations
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    }
};