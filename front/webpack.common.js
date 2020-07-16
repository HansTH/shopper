module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			},
			{
				test: /\.(svg|png|jpg$|gif)/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[contentHash].[ext]',
						outputPath: 'img'
					}
				}
			}
		]
	}
};
