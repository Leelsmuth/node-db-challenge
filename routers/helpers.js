const db = require("../data/db-config");

module.exports = {
  getProjects,
  getProjectsById,
  addProjects,
  getTasks,
  addTask,
  getResource,
  addResource,
  getResourceById,
  getTasksById
};

// get projects
function getProjects() {
  return db("projects").then(project => {
    return project.map(project => body(project));
  });
}
// get project by id
function getProjectsById(id) {
  return db("projects")
    .where("id", id)
    .first();
}

//add project
function addProjects(project) {
  return db("projects")
    .insert(project)
    .then(id => {
      return getProjectsById(id[0]);
    });
}

// get tasks
function getTasks() {
  return db("tasks as t ")
    .join("projects as p ", "t.project_id", "=", "p.id")
    .select(
      "t.id",
      "p.project_name",
      "p.project_description",
      "t.task_description",
      "t.task_notes",
      "t.complete"
    )
    .then(task => {
      return task.map(task => body(task));
    });
}

//get task by id
function getTasksById(id) {
  return db("task")
    .where("id", id)
    .first();
}

// add task
function addTask(tasks) {
  return db("task")
    .insert(tasks)
    .then(id => {
      return getTasksById(id[0]);
    });
}

// get resources
function getResource() {
  return db("resources");
}

//get resource by id

function getResourceById(id) {
  return db("resources")
    .where("id", id)
    .first();
}

//add resource
function addResource(resource) {
  return db("resources")
    .insert(resource)
    .then(id => {
      return getResourceById(id[0]);
    });
}

function trueOrFalse(tf) {
  return tf === 1 ? true : false;
}
function body(item) {
  return { ...item, complete: trueOrFalse(item.complete) };
}
