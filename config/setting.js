//获取本机ip

//排除是生产和测试环境
if(['production','testing'].includes(process.env.NODE_ENV)) {
  module.exports = function () {}
  return
}
//导入os系统
const os = require('os')
module.exports= function () {
 const nifs = os.networkInterfaces({ all: true }) || []; // 获取网卡信息
  const nifsAdress = ['以太网', '本地连接', 'en0'];
  const key = nifsAdress.find(v => Object.keys(nifs).includes(v));
  const nifsC = nifs[key];
  // const localInfo = nifsC.find(v => v.family === 'IPv4');
  const localIp = 'localhost';
  return localIp;
}