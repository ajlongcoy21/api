const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Cheesecakes  = require('../database').models.Cheesecakes;
const CheesecakeTypes = require('../database').models.CheesecakeTypes;

let sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

/* Handler function to wrap each route. */
function asyncHandler(cb)
{
  return async(req, res, next) => {
    try 
    {
      await cb(req, res, next)
    } 
    catch(error) // Catch error thrown
    {
      // send error to global error handler
      next(error);
    }
  }
}

/* GET cheesecake type route will show the list of cheesecake types in the database. */
router.post('/api/send-mail', async (req, res) => 
{

  const order = req.body;
  const contactInfo = order.contactInfo;
  const cheesecakes = order.orderedCheesecakes;
  let totalCost = 0;
  let htmlText = `<html><head><title></title><link href="https://svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/css/wsc.css" rel="stylesheet" type="text/css" /></head><body aria-readonly="false"><h1>Thank you for placing your order ${contactInfo.firstName} ${contactInfo.lastName}!</h1>`;
  
  htmlText += `<h3>Customer Contact Information:</h3><hr />`;

  htmlText = htmlText + `<pre>
    First Name: ${contactInfo.firstName}
     Last Name: ${contactInfo.lastName}
         Phone: ${contactInfo.phoneNumber}
         Email: ${contactInfo.email}
       Address: ${contactInfo.address} ${contactInfo.city}, ${contactInfo.state}  ${contactInfo.zip}
 Delivery Date: ${contactInfo.deliveryDate.slice(0,10)}

    </pre><hr /><br/>`;

  htmlText += `<h3>Order Summary:</h3><hr />`;

  cheesecakes.forEach(cheesecake => 
  {
    totalCost = totalCost + (cheesecake.price * cheesecake.qty);
    htmlText = htmlText + `<pre>
    Cheesecake Type: ${cheesecake.type}
         Cheesecake: ${cheesecake.cheesecake}
              Price: $${cheesecake.price} x ${cheesecake.qty}
    &nbsp;         Total: $${cheesecake.price * cheesecake.qty}
    Special Request: ${cheesecake.request}
    </pre>`;
  });

  htmlText = htmlText + `<hr /><h3>Total: $${totalCost}&nbsp;</h3>`;

  htmlText = htmlText + `<hr /><h3>Tiffany will contact with payment options!&nbsp;</h3></body></html>`;

  console.log('trying to send mail');
  
  const msg = {
    to: contactInfo.email,
    cc: 'tastefullytiffanyscheesecakes@gmail.com',
    from: 'tastefullytiffanyscheesecakes@gmail.com',
    subject: 'Cheesecake Order',
    text: 'order',
    html: htmlText,
  };

  sgMail.send(msg);

  console.log('after sending mail');
    res.json('all is ok');
    
});

// export router

module.exports = router;