var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

console.log('========================\n      Server Started     \n========================');

function templateHTML(title, list, body, control) {
    return `
            <!doctype html>
            <html>
            <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                <link rel="stylesheet" type="text/css" href="common.css">                  
            </head>
            <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                ${control}
                ${body}
            </body>
            </html>
           `;
}

function templateList(filelist) {
    var list = '<ul>';
            var i = 0;
            while (i < filelist.length) {
                list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                i = i + 1;
            }
            list = list + '</ul>';
            return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    
    if (pathname === '/') {
        if (queryData.id === undefined) {

            fs.readdir('./data', function(error, filelist) {
                var title = 'Welcome';
                var list = templateList(filelist);
                var queryData = 'Welcome'

                fs.readFile(`data/${queryData}`, 'utf8', function(err, description){
                    var template = templateHTML(title, list, 
                    `<h2>${title}</h2> <p>${description}</p>`,
                    `<a href="/create">create</a>` 
                    );
                    response.writeHead(200);
                    response.end(template);
                });
            });

        } else {
            fs.readdir('./data', function(error, filelist) {
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                    var title = queryData.id;
                    var list = templateList(filelist);
                    var template = templateHTML(title, list, 
                    `<h2>${title}</h2><p>${description}</p>`,
                    `<a href="/create">create</a>  
                    <a href="/update?id=${title}">update</a> 
                    <form action="delete_process" method="post" onsubmit="return confirm('해당 게시물을 삭제하시겠습니까?')">
                    <input type="hidden" name="id" value=${title}>
                    <input type="submit" value="delete">
                    </form>`
                    );
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    } 
    //신규 UI
    else if (pathname === '/create') {
        fs.readdir('./data', function(error, filelist) {
            var title = 'WEB - create';
            var list = templateList(filelist);
            var queryData = 'create'

            fs.readFile(`data/${queryData}`, 'utf8', function(err, description){
                var template = templateHTML(title, list, 
                `  
                <form method="POST" name="Cfrm" action="/create_process">
                <p><input type="text" name="title" placeholder="제목을 작성하세요"></p>
                <p>
                <textarea name="description" placeholder="내용을 작상하세요"></textarea>
                </p>
                <p><input type="submit" value="저장"></p>
                </form>
                `
                , '');
                response.writeHead(200);
                response.end(template);
            });
        });
    } 
    //신규처리 프로세스
    else if (pathname === '/create_process') {
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end();
            })            
        });
    }
    //업데이트 UI
    else if (pathname === '/update') {
        fs.readdir('./data', function(error, filelist) {
            fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                var title = queryData.id;
                var list = templateList(filelist);
                var template = templateHTML(title, list, 
                `
                <form method="POST" ame="Ufrm" action="/update_process" onsubmit="return confirm('해당 게시물을 수정하시겠습니까?')">
                <input type="hidden" name="id" value=${title}>
                <p><input type="text" name="title" value=${title}></p>
                <p>
                <textarea name="description">${description}</textarea>
                </p>
                <p><input type="submit" value="수정"></p>
                </form>
                `,
                `
                <a href="/create">create</a>  
                <a href="/update?id=${title}">update</a>
                `
                );
                response.writeHead(200);
                response.end(template);
            });
        });
    }
    //업데이트 프로세스
    else if (pathname === '/update_process') {
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            var id = post.id;
            fs.rename(`data/${id}`,`data/${title}`,function(err){
                fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end();
                })            
            })
        });
    }
    //삭제 프로세스
    else if (pathname === '/delete_process') {
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            fs.unlink(`data/${id}`,function(err){
                response.writeHead(302, {Location: `/`});
                response.end();
            });
        });
    }
    else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);