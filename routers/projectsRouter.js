const express = require("express");

const projects = require("./helpers");

const router = express.Router();

router.get("/", (req, res) => {
  projects
    .getProjects()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get projects" + err.message });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  projects
    .getProjectsById()
    .then(project => {
      if (project) {
        res.json(project);
      } else {
        res
          .status(400)
          .json({ error: "The project with the id provided does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "Could not retrieve Project from the server" + err.message
      });
    });
});

router.post("/", (req, res) => {
  const projectBody = req.body;
  projects
    .addProjects(projectBody)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({
        error: "Failed to create the new project on the server " + err.message
      });
    });
});

module.exports = router;
