var express = require('express');
var router = express.Router();
var imageHandler=require('../handlers/imageHandler');
var datastore=require('../databse/datastore');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./image_upload/index', {
    title: 'Express'
  });
});

router.post(
    '/upload',
    imageHandler.multer.single('ticketPhoto'),
        function(req, res, next) {

            imageHandler.sendUploadToGCS(req, res, function(err, data) {
                var dataR = req.body;
                if (err || req.file === null || req.file === undefined ) {
                    res.render('./image_upload/uploadError', {
                        errorType : "File upload error"

                    });
                }
                if(req.file.cloudStoragePublicUrl){
                    dataR.imageUrl = req.file.cloudStoragePublicUrl;
                }

                datastore.create(dataR, function(err, savedData){
                    if(err) {
                        res.render('./image_upload/uploadError', {
                            errorType: "Database error"
                        });
                    }

                    console.log(JSON.stringify(req.body, null, 4));

                    res.render('./image_upload/uploadSuccessful', {

                });

                });


            });
});

module.exports = router;
