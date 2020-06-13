const path = require("path");
module.exports = {
    entry: "./frontend/bug_mojo.jsx",
    output: {
        path: path.resolve(__dirname),
        filename: "./app/assets/javascripts/bundle.js"
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,  
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/env', '@babel/react', {
                            'plugins': ['@babel/plugin-proposal-class-properties']
                        }]
                    }
                }
            }, 
            {
                test: /\.css$/i, 
                use: ['style-loader', 'css-loader']
            }, 
            {
                test: /\.(png|svg|jpg|gif)$/, 
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '*']
    }
}
