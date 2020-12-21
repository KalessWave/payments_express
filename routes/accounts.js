var express = require('express');
var router = express.Router();
var authenticateJWT = require("../middleware")

// GET accounts list
router.get('/', authenticateJWT, function(req, res, next) {
  console.log(req.query.page)
  console.log(req.query.page_size)
  //default value
  const page = req.query.page || 0;
  const page_size = req.query.page_size || 10;

  //Check user role authorization / error 403 if forbidden
  // Fetch list of account on DB, if error fall back on general error 500
  var answer = {
    "metadata": {
      "page": 4,
      "page_size": 10,
      "page_count": 40,
      "links": {
        "first": "/accounts?page=0&page_size=10",
        "previous": "/accounts?page=3&page_size=10",
        "next": "/accounts?page=5&page_size=10",
        "last": "/accounts?page=40&page_size=10"
      }
    },
    "records": [
      {
        "id": "ACC000001",
        "number": "123456789",
        "bic": "BSUIFRPPXXX",
        "iban": "FR7242460855623343710692964",
        "details": "Current Account",
        "currency": "EUR"
      }
    ]
  };
  // return answer
  res.status(200).send(answer);
});

router.get('/:account_id', authenticateJWT, function(req, res, next) {
  //console.log(req.params) //{account_id: '22'} 
  
  //Check user role authorization / error 403 if forbidden
  // Check that account_id exists
  if (!req.params){
    res.status(404).send('This account do not exist');
    return;
  }
  // Fetch account info on DB
  var answer2 = {
    "id": "ACC000001",
    "number": "123456789",
    "bic": "BSUIFRPPXXX",
    "iban": "FR7242460855623343710692964",
    "details": "Current Account",
    "currency": "EUR"
  }
  // return answer
  res.status(200).send(answer2);
});


// GET payments
router.get('/:account_id/payments', authenticateJWT, function(req, res, next) {
  //default value
  const page = req.query.page || 0;
  const page_size = req.query.page_size || 10;
  //Check user role authorization / error 403 if forbidden
  // Check that account_id exists
  if (!req.params){
    res.status(404).send('This account do not exist');
    return;
  }
  // Fetch the list of payments related to this account on DB
  var answer3 = {
    "metadata": {
      "page": 0,
      "page_size": 10,
      "page_count": 40,
      "links": {
        "first": "/accounts/ES01820020000000005000000/payments?page=0&page_size=10",
        "previous": "/accounts/ES01820020000000005000000/payments?page=3&page_size=10",
        "next": "/accounts/ES01820020000000005000000/payments?page=5&page_size=10",
        "last": "/accounts/ES01820020000000005000000/payments?page=40&page_size=10"
      }
    },
    "records": [
      {
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
        "creation_date": "2020-12-21T09:45:42.745Z"
      }
    ]
  }
  // return answer
  res.status(200).send(answer3);
});

// GET scheduled_payments
router.get('/:account_id/scheduled_payments', authenticateJWT, function(req, res, next) {
  //default value
  const page = req.query.page || 0;
  const page_size = req.query.page_size || 10;
  //Check user role authorization / error 403 if forbidden
  // Check that account_id exists
  if (!req.params){
    res.status(404).send('This account do not exist');
    return;
  }
  // Fetch the list of scheduled_payments related to this account on DB
  var answer4 = {
    "metadata": {
      "page": 4,
      "page_size": 10,
      "page_count": 40,
      "links": {
        "first": "/accounts/ES01820020000000005000000/scheduled_payments?page=0&page_size=10",
        "previous": "/accounts/ES01820020000000005000000/scheduled_payments?page=3&page_size=10",
        "next": "/accounts/ES01820020000000005000000/scheduled_payments?page=5&page_size=10",
        "last": "/accounts/ES01820020000000005000000/scheduled_payments?page=40&page_size=10"
      }
    },
    "records": [
      {
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
        "periodicity": {
          "type": "PERIODIC",
          "start_date": "2020-12-21T09:47:10.219Z",
          "end_date": "2020-12-21T09:47:10.219Z",
          "period": {
            "type": "DAY",
            "value": 1
          }
        }
      }
    ]
  }
  // return answer
  res.status(200).send(answer4);
});

// PUT scheduled_payments
router.put('/:account_id/scheduled_payments/:scheduled_payment_id', authenticateJWT, function(req, res, next) {
  console.log(req.params) //{account_id: '22', scheduled_payment_id: '33'} 
  console.log(req.params.account_id) // '22'

  //Check user role authorization / error 403 if forbidden
  // Check that account_id exists
  if (!req.params){
    res.status(404).send('This account do not exist');
    return;
  }
  // Check that the scheduled_payments exists 
  // Change scheduled_payment properties in db
  // return the new info of scheduled_payments
  res.status(200).send('Info about the modify scheduled_payment');
});

// DELETE scheduled_payments
router.delete('/:account_id/scheduled_payments/:scheduled_payment_id', authenticateJWT, function(req, res, next) {
   //Check user role authorization / error 403 if forbidden
  // Check that account_id and scheduled_payments exist
  // Delete the scheduled_payment_id

  // return the status
  res.status(204).send('The scheduled_payment was deleted');
});


module.exports = router;
