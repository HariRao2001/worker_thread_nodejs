const http = require("node:http");
const { Worker } =  require("node:worker_threads");

const server = http.createServer((req, res)=>{
    if(req.url === "/"){
        res.writeHead(200, { "content-type": "text/plain" });
        res.end("Main Page");
    }
    else if(req.url === "/slow-page"){
        const worker = new Worker("./workerThread.js");
        worker.on("message", (j)=>{
            console.log(j);
            res.writeHead(200, { "content-type": "text/plain" });
            res.end(`Slow Page ${j}`);
        })
       
    }
});

server.listen(3300, ()=>{
    console.log(`Server is running at 3300 port`);
})