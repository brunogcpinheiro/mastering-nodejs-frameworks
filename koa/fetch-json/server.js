const koa = require("koa");
const bodyparser = require("koa-bodyparser");
const Router = require("koa-router");
const axios = require("axios").default;

const app = new koa();
const router = new Router();

app.use(bodyparser());

const postsController = {
  list: async ctx => {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
    ctx.response.body = data;
  },
  show: async ctx => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${ctx.params.id}`);
    ctx.response.body = data;
  },
  add: async ctx => {
    const newPost = ctx.request.body;
    const { data } = await axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
    ctx.response.body = data;
  },
  destroy: async ctx => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${ctx.params.id}`);
    ctx.response.body = `Post deleted with id: ${ctx.params.id}`;
  }
}

router.get("/posts", postsController.list);
router.get("/posts/:id", postsController.show);
router.post("/posts", postsController.add);
router.delete("/posts/:id", postsController.destroy);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => console.log('server is running on port 3000...'))