var express = require('express');
var router = express.Router();
var imageHandler = require('../handlers/imageHandler');
var datastore = require('../databse/datastore');
var config=require('../config.json');

var client = require('twilio')(config.TWILIO_ACCOUNT_SID,config.TWILIO_AUTH_TOKEN);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('./image_upload/index', {});
});

router.post(
    '/upload',
    imageHandler.multer.single('ticketPhoto'),
    function (req, res, next) {
        console.log("/upload");
        imageHandler.sendUploadToGCS(req, res, function (err, data) {
            var dataR = req.body;
            if (err || req.file === null || req.file === undefined) {
              /*  res.render('./image_upload/uploadError', {
                    errorType: "File upload error",
                    err:err
                });
                */
                res.json({"response":"error"});
            }else {
                if (req.file && req.file.cloudStoragePublicUrl) {
                    dataR.imageUrl = req.file.cloudStoragePublicUrl;
                }
                /*
                datastore.create(dataR, function (err, savedData) {
                    if (err) {
                       /* res.render('./image_upload/uploadError', {
                            errorType: "Database error",
                            err:err
                        });
                        res.json({"response":"error"});
                    }
                     */
                        console.log(JSON.stringify(req.body, null, 4));
                       // res.render('./image_upload/uploadSuccessful', {});
                        res.json([{"response":req.file.originalname}]);
            }
        });
    });

router.post(
    '/sms',
    function (req,res,next) {
        console.log("SMS: "+req.body.message);
        client.sms.messages.post({
            to:'+14156919591',
            from:config.TWILIO_NUMBER,
            body:req.body.message
    },function(err, text){
            if(!err) {
                res.json([{"response" : "Works"}]);
                console.log('You sent: ' + text.body);
                console.log('Current status of this text message is: ' + text.status);
            }else{
                console.log('Error: ' + err.body);

            }
        });
    });


module.exports = router;
