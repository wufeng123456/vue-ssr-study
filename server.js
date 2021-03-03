const Koa = require("koa");
const Router = require("koa-router");
const Static = require("koa-static");
const Vue = require('vue')
const vueServerRender = require('vue-server-renderer')
const fs = require('fs')
const path = require('path');

const vm = new Vue({
    data() {
        return {
            msg: 'hello vue-ssr'
        }
    },
    template: `<div>{{msg}}</div>`
})

const template = fs.readFileSync(path.resolve(__dirname, './dist/index.ssr.html'), 'utf-8')
const serverBundle = fs.readFileSync(path.resolve(__dirname, './dist/server.bundle.js'), 'utf-8')
const render = vueServerRender.createBundleRenderer(serverBundle, {
  template: template
})
 
const app = new Koa();
const router = new Router();
 
router.get("/", async ctx => {
  ctx.body = await new Promise((resolve, reject) => {
    render.renderToString((err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
});

app.use(Static(path.resolve(__dirname, "dist")));
app.use(router.routes());
 
app.listen(3000, () => {
  console.log(`node serve run at port 3000`);
})