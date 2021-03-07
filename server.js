const Koa = require("koa");
const Router = require("koa-router");
const Static = require("koa-static");
const Vue = require('vue')
const vueServerRender = require('vue-server-renderer')
const fs = require('fs')
const path = require('path');

// const vm = new Vue({
//     data() {
//         return {
//             msg: 'hello vue-ssr'
//         }
//     },
//     template: `<div>{{msg}}</div>`
// })

const template = fs.readFileSync(path.resolve(__dirname, './dist/index.ssr.html'), 'utf-8')
const serverBundle = require(path.resolve(__dirname, './dist/vue-ssr-server-bundle.json'))
const clientManifest = require(path.resolve(__dirname, './dist/vue-ssr-client-manifest.json'))
const render = vueServerRender.createBundleRenderer(serverBundle, {
  template,
  clientManifest
})
 
const app = new Koa();
const router = new Router();
router.get("/", async ctx => {
  // css样式只能通过回调，同步的话会有问题
  ctx.body = await new Promise((resolve, reject) => {
    render.renderToString({ url: "/" }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
});
app.use(router.routes());
app.use(Static(path.resolve(__dirname, "dist")));
app.use(async ctx => {
  try {
    ctx.body = await new Promise((resolve, reject) => {
      render.renderToString({ url: ctx.path }, (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  } catch (error) {
    ctx.body = error.code
  }
});

app.listen(3000, () => {
  console.log(`node serve run at port 3000`);
})