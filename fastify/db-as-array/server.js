const fastify = require("fastify")();

const { v4 } = require("uuid");

let db = [];

const petsController = {
  list: (request, reply) => {
    reply.send(db);
  },
  show: (request, reply) => {
    const pet = db.filter(f => f.id === request.params.id);
    reply.send(pet);
  },
  add: (request, reply) => {
    const newPet = {id: v4(), ...request.body};
    db.push(newPet);
    reply.send(newPet);
  },
  destroy: (request, reply) => {
    db.splice(db.findIndex(i => {
      return i.id === request.params.id;
    }), 1);
    
    reply.send(`Pet with id ${request.params.id} was removed!`);
  }
}

fastify.get("/pets", petsController.list);
fastify.get("/pets/:id", petsController.show);
fastify.post("/pets", petsController.add);
fastify.delete("/pets/:id", petsController.destroy);

fastify.listen(3000, () => console.log("server is running on port 3000..."));