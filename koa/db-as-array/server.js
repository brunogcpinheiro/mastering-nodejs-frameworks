const koa = require("koa");
const bodyparser = require("koa-bodyparser");
const Router = require("koa-router");
const { v4 } = require("uuid");

const app = new koa();
const router = new Router();

app.use(bodyparser());

let db = [];

const petsController = {
  list: ctx => {
    ctx.response.body = db;
  },
  show: ctx => {
    const pet = db.filter(f => f.id === ctx.params.id);
    ctx.response.body = pet;
  },
  add: ctx => {
    const pet = ctx.request.body;
    db.push({ id: v4(), ...pet });
    ctx.response.body = `Pet added with name: ${pet.name} and specie ${pet.species}`;
  },
  destroy: ctx => {
    db.splice(db.indexOf(ctx.params.id), 1);
    ctx.response.body = `Pet with id ${ctx.params.id} was removed!`;
  }
}

router.get("/pets", petsController.list);
router.get("/pets/:id", petsController.show);
router.post("/pets", petsController.add);
router.delete("/pets/:id", petsController.destroy);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => console.log("server is running on port 3000..."));