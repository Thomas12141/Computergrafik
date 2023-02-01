const path = require('path');

//< create entry file list
const glob = require('glob');
let files = glob.sync('./src/**/index.ts');
files.push(path.resolve(__dirname, './src/index.html'),);
//>

module.exports = {
    entry: files,
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
            // load html and asset files (mainly index.html and textures)
            {
                test: /\.(html|jpe?g|png|svg)$/,
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