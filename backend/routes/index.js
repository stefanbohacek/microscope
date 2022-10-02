const express = require('express');
const router = express.Router();
const getRepresentativeDetails = require("../modules/getRepresentativeDetails.js");
const getContributors = require("../modules/getContributors.js");


router.all('/', (req, res) => {
    const username = req.query.username;
    const service = req.query.service;
    getRepresentativeDetails(username, service).then(representative => {
        getContributors(representative).then(contributors => {
            res.json({
                representative,
                contributors
            });
        });
    });

});

module.exports = router;
