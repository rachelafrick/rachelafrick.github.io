const fs = require('fs');
const ejs = require('ejs');

let blogposts= fs.readFileSync('data/content.json', 'utf8');
blogposts = JSON.parse(blogposts)

//generate index
let index_template = fs.readFileSync('views/index.ejs', 'utf8');
index_html = ejs.render(index_template, {
  filename: __dirname + '/views/index.ejs',
  data: blogposts

});
fs.writeFileSync("build/index.html", index_html, 'utf8');

//generate about
let about_template = fs.readFileSync('views/about.ejs', 'utf8');
about_html = ejs.render(about_template, {
  filename: __dirname + '/views/about.ejs',
  data: blogposts

});
fs.writeFileSync("build/about.html", about_html, 'utf8');
//generate blogposts
let blog_template = fs.readFileSync('views/blogpost.ejs', 'utf8');

for (let i=1; i<blogposts.length; i++ ){
let title = blogposts[i]["title"].trim().replace(/ /g, "_")+".html";
blog_html = ejs.render(blog_template, {
  filename: __dirname + '/views/blogpost.ejs',
  data: blogposts[i]

});
fs.writeFileSync(`build/${title}`, blog_html, 'utf8');
}
