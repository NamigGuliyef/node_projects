
import { createServer } from "http";
import url from 'url'
import { readFile } from "fs";
import process from 'node:process'

const [, , ...args] = process.argv;
const portIndex = args[1]

createServer((req, res) => {
    const pageName = url.parse(req.url).pathname    
    let fileName = `pages/${pageName}`   
    if (!pageName.endsWith('.html')) {
        fileName += '.html'
    }

    if (pageName === "/") {
        fileName = "pages/index.html"
    }

    if (pageName === '/caricon.png') {
        readFile('pages/caricon.png', (err, buffer) => {
            if (err) {
                console.log(err)
            }
            res.end(buffer)
        })
    } else {
        readFile(fileName, (err, data) => {
            if (err) {
                console.log(err)
            }
            res.end(data)
        })
    }
}).listen(portIndex)
