var express = require('express');
var router = express.Router();
var authenticateJWT = require("../middleware")

// POST payments
router.post('/',authenticateJWT, function(req, res, next) {
  //Check user role authorization / error 403 if forbidden
  console.log('Got body: ', req.body)
  // Check body content / Error 400 if not proper
  // Create payment object in DB
  var answer = {
    "id": "PAY000001",
    "origin_account": {
      "id": "ES01820020000000005000000"
    },
    "remote_account": {
      "name": "James Bond",
      "number": "ES01820020001111111111111",
      "bic": "BSUIFRPPXXX"
    },
    "value": {
      "amount": 10.07,
      "currency": "EUR"
    },
    "creation_date": "2020-12-21T09:59:03.127Z"
  }
  // Return response with the created object info
  res.status(201).send(answer);
});

// POST payments repeat
router.post('/:payment_id/repeat', function(req, res, next) {
  //Check user role authorization / error 403 if forbidden  
  // Check that payment_id exist
    if (!req.params.payment_id){
        res.status(404).send('This account do not exist');
        return;
    }
    // Create new payment object in DB with same properties as the retieved payment
    // return response
    res.status(201).send(answer);
  });


module.exports = router;
