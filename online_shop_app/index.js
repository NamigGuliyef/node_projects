import { createServer } from "http"
import { readFile } from "fs"
import url from "url"


createServer((req, res) => {
    const pageName = url.parse(req.url).pathname
    let fileName = `pages/${pageName}`

    if (!pageName.endsWith(".html")) {
        fileName += ".html"
    }

    if (pageName === "/") {
        fileName = "pages/allproduct.html"
    }

    if (pageName === "/icon.png") {
        readFile('pages/icon.png', (err, buffer) => {
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
}).listen(5000)
