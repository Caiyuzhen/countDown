const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') //引入 clean 插件
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
	entry:{
		app:path.join(__dirname, './src/index.tsx')
	},
	output: {//指定打包文件（打包后放在哪里）
		path: path.join(__dirname, 'dist'), //打包后的目录(__dirname 表示会自动拼接目录的路径名称)
		filename: 'bundle.js',// 打包后的文件名称
	},

	//在本地查看效果
	// devServer: {
	// 	static: { // 默认是把/dist目录当作web服务的根目录
  //     directory: path.join(__dirname, 'public'),
  //   },
	// 	hot:true,				//热更新
	// 	host:'0,0,0,0', //可以在 localHost、也可以在局域网内访问
	// 	port:'3000'	//端口
	// 	// overlay:true 	//有报错时会全屏打印报错提示
	// },

	// mode: 'production',//指定打包模式(development 开发模式，开发模式，production 生产模式)
	mode:'development',
	module: {
		rules: [//rules 是一个数组，包含对个对象，每个对象指定要用到的 loader 的加载规则

			//指定 tsx 的 loader
			{
				test: /\.(tsx|ts|js|jsx)$/,//指定规则生效的文件(用正则表达式) 来匹配所有的 ts 或 tsx 文件
				// 指定要排除的文件（一般排除node_modules)
				exclude: path.join(__dirname,'node_modules'),
				use: [{loader: "babel-loader",//指定加载器
							}, 'ts-loader'
						], //因为加载器是从后往前执行的，所以这里先加载 ts-loader，把 ts 转为 js
			},

			//指定设置 less 文件的 loader
			{
				test: /\.less$/,
				use: [ //注意：loader 的执行顺序是由下往上
					{loader:"style-loader"},
					{loader:"css-loader"},
					{loader:"less-loader"}
				]
			}
		]
	},


	//🔥🔥配置 webpack 插件
	plugins: [
		new CleanWebpackPlugin(), //每次编译前会先自动清除 dist 目录下的所有文件,
		new HtmlPlugin({
			filename: 'index.html',
			template: path.join(__dirname,'src/index.html')//从哪个 html 来打包
		})
	],

	resolve: {//🔥🔥设置要解析的 ts 模块，否则 export 的 ts 没法被 import  
		extensions: ['.ts', '.tsx', '.js', '.jsx'], //⚡️⚡️哪些文件能被 export 【很关键！】
	}
}