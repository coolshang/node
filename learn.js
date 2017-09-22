
//当前文件的路径
console.log(__filename);
//当前文件的目录
console.log(__dirname);
//process对象 node进程工作目录
console.log(process.cwd());

/**
 * node模块
 * 1.怎么引用 : require('./learn.js');
 *  (1)后缀可以省略
 *  (2)如果 引入模块 是 模块的名字  核心模块(1.安装好node就有的一些模块,2.node_modules这个文件夹下面的模块)
 *  (3)引入的路径  如果是自己定义的模块最好是 ./或 ../ 来引入(./代表当前目录 ../引用)
 *  (4)模块的加载机制: 文件名  > 文件名.js > 文件名.json > 文件名文件名.node
 *  模块之间如何使用
 *
 */
/**
 * nonde目录的配置
 * 1.配置文件 package.json
 *   {
 *      'name': 项目名称
 *      'version': 项目版本
 *      'dependencies': 当前项目所使用到的模块
 *   }
 *   安装方式: npm install 自动读取package.json自动安装
 * 2.router目录 用来存放路由文件
 * 3.views目录 用来存放html模板文件
 * 4.module目录 自己写的一些模块
 */