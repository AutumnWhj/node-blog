const crypto = require('crypto');

//  密钥
const SECRET_KEY =  'WJiol_8776#';

// md5 加密
function md5(content){
    let md5 = crypto.createHash(content);
    return md5
}

// 加密函数
function genPassword(password){
    const str = `password=${password}&key=${SECRET_KEY}`;
    return md5(str);
}

module.exports = {
    genPassword
}