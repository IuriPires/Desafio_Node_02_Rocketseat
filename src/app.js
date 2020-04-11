const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.send(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const id = uuid();
  
  const repository = {
    title,
    url,
    techs,
    id,
    likes: 0
  };
  repositories.push(repository);

  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);

  if(index != -1) {
    repositories[index].title = title;
    repositories[index].url = url;  
    repositories[index].techs = techs;  

    return response.status(200).json(repositories[index]);
  }
  return response.status(400).json(repositories[index]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);

  if(index != -1) {
    repositories.splice(index, 1);
    return response.send(204);
  }
  return response.status(400).json({ 'error': 'Project ID not found' });
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);

  if(index != -1) {
    repositories[index].likes += 1;
    return response.status(200).json(repositories[index]);
  }
  return response.status(400).json({ error: 'Project ID not found'});
});

module.exports = app;
