const express = require("express");

const resources = require("./helpers");

const router = express.Router();

router.get("/", (req, res) => {
  resources
    .getResource()
    .then(resources => {
      res.json(resources);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Could not retrieve resources from the Server" });
    });
});

router.post("/", (req, res) => {
  const resourceBody = req.body;
  resources
    .addResource(resourceBody)
    .then(resource => {
      res.status(201).json(resource);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Could not create resource in the database" });
    });
});

module.exports = router;
