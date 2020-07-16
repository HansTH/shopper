const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
	mode: 'development',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},

	devServer: {
		open: true,
		historyApiFallback: true,
		proxy: { '/api/*': 'http://localhost:5000' }
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			favicon: './public/icon114.png'
		})
	]
});
