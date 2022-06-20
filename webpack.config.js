const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') //引入 clean 插件

module.exports = {
	entry: './src/index.tsx',
	output: {//指定打包文件（打包后放在哪里）
		path: path.resolve(__dirname, 'dist'), //打包后的目录(__dirname 表示会自动拼接目录的路径名称)
		filename: 'bundle.js',// 打包后的文件名称
	},
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current',
				},
			},
		],
		'@babel/preset-typescript',
	],
	mode: 'production',//指定打包模式(development 开发模式，开发模式，production 生产模式)
	module: {
		rules: [//指定要用到的 loader，加载的规则
			{
				test: /\.ts?$/,//指定规则生效的文件(用正则表达式) 来匹配所有的 ts 或 tsx 文件
				use: [// 要使用的 loader 加载器（比如加载资源？）
					{
						loader: "babel-loader",//指定加载器
						options: {//设置 babel要兼容哪些浏览器
							presets: [//预定义的环境（来假设我们的代码要在种环境去运行）
								[
									"@babel/preset-env",//指定 @babel/preset-env 这个环境插件
								]
							]
						}
					}, 'ts-loader'], //因为加载器是从后往前执行的，所以这里先加载 ts-loader，把 ts 转为 js ，然后再用 js 去适配浏览器！
				// 指定要排除的文件（一般排除node_modules)
				exclude: /node_modules/
			},
			{
				//指定设置 less 文件的 loader
				test: /\.less$/,
				use: [ //⚠️⚠️，loader 的执行顺序是由下往上
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									"postcss-preset-env",
									{
										browers: "last 2 versions"//兼容两个版本的浏览器
									}//设置浏览器的兼容性
								]
							}
						}
					},
					"less-loader"
				]
			}
		]
	},


	//🔥🔥配置 webpack 插件
	plugins: [
		new CleanWebpackPlugin(), //每次编译前会先自动清除 dist 目录下的所有文件,
	],

	resolve: {//🔥🔥设置要解析的 ts 模块，否则 export 的 ts 没法被 import  
		extensions: ['.ts', '.js', '.jsx'], //⚡️⚡️哪些文件能被 export 【很关键！】
	}
}