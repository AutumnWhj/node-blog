// 输入输出流
// process.stdin.pipe(process.stdout)

// const http = require('http')

// const server = http.createServer((req, res) => {
//     if (req.method === 'POST') {
//         req.pipe(res) // 将req的数据流pipe到res
//     }
// })

// server.listen(8000) // 监听8000端口

// 复制文件
// const fs = require('fs')
// const path = require('path')

// const fileName1 = path.resolve(__dirname, 'data.txt')
// const fileName2 = path.resolve(__dirname, 'data-bak.txt')

// const readStream = fs.createReadStream(fileName1)
// const writeStream = fs.createWriteStream(fileName2)

// readStream.pipe(writeStream)

// readStream.on('data', chunk => {
//     console.log(chunk.toString())
// })

// readStream.on('end', () => {
//     console.log('copy done')
// })

// 简单实现一个http服务
const http = require('http')
const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        const readStream = fs
            .createReadStream(fileName
            ) // 创建一个读取流
        readStream.pipe(res) // 将读取流pipe到res
    } else {
        res.end('Not Found')
    }
})
server.listen(3001) // 监听3001端口