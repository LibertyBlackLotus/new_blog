const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
	productionSourceMap: false,
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			return {
				plugins: [new CompressionPlugin({
					test: /\.js(\?.*)?$|.css(\?.*)?$/i,
					deleteOriginalAssets: false,
				})],
				externals: {
					'vue': 'Vue',
					// 'vue-router': 'VueRouter',
					// 'vuex': 'Vuex',
					'axios': 'axios',
					'view-design': 'iview'
				}
			}
		}
	},

}