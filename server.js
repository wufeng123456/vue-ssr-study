const Koa = require("koa");
const Router = require("koa-router");
const Static = require("koa-static");
const Vue = require('vue')
const vueServerRender = require('vue-server-renderer')
const fs = require('fs')
const path = require('path')

const vm = new Vue({
    data() {
        return {
            msg: 'hello vue-ssr'
        }
    },
    template: `<div>{{msg}}</div>`
})

const template = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf-8')
const render = vueServerRender.createRenderer({
  template: template
})
 
const app = new Koa();
const router = new Router();
 
router.get("/", async ctx => {
  ctx.body = await render.renderToString(vm)
});
 
app.use(router.routes());
 
app.listen(3000, () => {
  console.log(`node serve run at port 3000`);
})