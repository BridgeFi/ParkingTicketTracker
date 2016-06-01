'use strict';
/*
 * Script that handle image uploads to bucket on gcloud
 */
var config = require('../config.json');

var CLOUD_PROJ = config.GCLOUD_PROJECT;
var CLOUD_BUCKET = config.GCLOUD_BUCKET;

var gcloud = require('gcloud');
var storage = gcloud.storage({
    projectId: CLOUD_PROJ
});

var bucket = storage.bucket(CLOUD_BUCKET);

function getPublicUrl(filename) {
    return 'https://storage.googleapis.com/' + CLOUD_BUCKET + '/' + filename;
}

function sendUploadToGCS(req, res, next) {
    if (req.file === null || req.file === undefined) {
        return next();
    }
    console.log("file: " + req.file.originalname);

    var gcsname = Date.now() + req.file.originalname;
    var file = bucket.file(gcsname);
    var stream = file.createWriteStream();
    //if bucket does not exist or other errors
    stream.on('error', function (err) {
        req.file.cloudStorageError = err;

        next(err);
    });
    //if file was uploaded
    stream.on('finish', function () {
        req.file.cloudStorageObject = gcsname;
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);

        next();
    });

    stream.end(req.file.buffer);
}

var multer = require('multer')({
    inMemory: true,	//save in temp memory
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
    rename: function (fieldname, filename) {
        // generate a unique filename
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
    }
});

module.exports = {
    getPublicUrl: getPublicUrl,
    sendUploadToGCS: sendUploadToGCS,
    multer: multer
};
