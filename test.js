const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch({ devtools: true });
  const page = await browser.newPage();
  console.log(1111111111111);
   // 打开网站
   await page.goto('https://channels.weixin.qq.com/login.html');
  console.log(22222222);
   // 等待iframe加载完成
   await page.waitForSelector('iframe[src="https://channels.weixin.qq.com/platform/login-for-iframe?dark_mode=true&host_type=1"]');
   const frame = await page.frames().find(frame => frame.url() === 'https://channels.weixin.qq.com/platform/login-for-iframe?dark_mode=true&host_type=1');
   console.log(33333333);
   // 等待二维码DOM加载完成
   await frame.waitForSelector('.qrcode-area img');
   console.log(44444444);
   // 获取二维码的src
   const qrcodeSrc = await frame.$eval('.qrcode-area img', img => img.src);
   console.log('二维码src:', qrcodeSrc);
 
   // 将base64字符串转换为图片文件
  const base64Data = qrcodeSrc.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync('qrcode.png', base64Data, 'base64');
  console.log('二维码已保存为qrcode.png文件');
 
   // 等待用户扫码登录
   await frame.waitForNavigation({ waitUntil: 'networkidle0' });
    console.log('用户已扫码登录');
  
   // 导航到首页
   await page.goto('https://channels.weixin.qq.com/');

  // 关闭浏览器
  await browser.close();
})();
