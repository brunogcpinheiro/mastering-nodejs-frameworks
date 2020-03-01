const restify = require("restify");
const { v4 } = require("uuid");

const app = restify.createServer();

app.use(restify.plugins.bodyParser());

let db = [];

const petsController = {
  list: (req, res, next) => {
    res.send(db);
    next();
  },
  show: (req, res, next) => {
    const pet = db.filter(f => f.id === req.params.id);
    res.send(pet);
    next();
  },
  add: (req, res, next) => {
    const newPet = {id: v4(), ...req.body};
    db.push(newPet);
    res.send(newPet)
    next();
  },
  destroy: (req, res, next) => {
    db.splice(db.indexOf(req.params.id), 1);
    res.send(`Pet with id ${req.params.id} was removed!`);
    next();
  },
}

app.get("/pets", petsController.list);
app.get("/pets/:id", petsController.show);
app.post("/pets", petsController.add);
app.del("/pets/:id", petsController.destroy);

app.listen(3000, () => console.log("server is running on port 3000..."));