const express = require('express');
const paypal = require('paypal-rest-sdk');
const router = express.Router();




paypal.configure({
  'mode': 'sandbox', // sandbox or live
  'client_id':
  'Ac8HfMToW58E34QFXcd-L--0IBn27xV-W7uvXRkfnq5v9SwAQ4IC9eh9keePabyNf21JjJGDYKMJ2gGG',
  'client_secret':
  'EGord8dNE-nboP5Dw5cWqV8Aov37ZJ_UzQhv-VjsL2x0jvYwxBiGeN3EBvEb6xBzO8Whe32BGHFpiMne',
});


router.post("/pay", (req,res)=>{
  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
    "return_url": "http://localhost:3000/api/paypal/success",
    "cancel_url": "http://localhost:3000/api/paypal/fail"
    },
    "transactions":[{
    "item_list":{
    "items":[{
      "name":req.body.ProdName,
      "sku": "001",
      "price": req.body.ProdPrice,
      "currency": "USD",
      "quantity": req.body.Amount
    }]
    },
    "amount": {
    "currency": "USD",
    "total": req.body.ProdPrice * req.body.Amount
    },
      "description": "this is the payment description."
    }]
};

  paypal.payment.create(create_payment_json, function(error,payment){
    if(error){
      throw error;
    } else {
      for(let i =0; i<payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          req.body.url = "" + payment.links[i].href
          res.send(req.body);

        }
      }

    }
  });
});

router.get("/success", (req,res)=>{
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
  "payer_id": payerId,
  "transaction": [{
    "amount": {
      "currency": "USD",
      "total": req.body.ProdPrice * req.body.Amount
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function(error,payment){
    if(error){
      console.log(error.response);
      throw error;
    } else {
      console.log(JSON.stringify(payment));
      res.send("success");
    }
  });
});

  router.get("/fail", (req,res)=> {console.log('fail to make transfer');});

  module.exports = router;
