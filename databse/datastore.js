var gcloud = require('gcloud');
var config=require('../config.json');

var ds = gcloud.datastore({
    projectId: config.GCLOUD_PROJECT
});
var kind = 'image';

function toDatastore (obj, nonIndexed) {
    nonIndexed = nonIndexed || [];
    var results = [];
    Object.keys(obj).forEach(function (k) {
        if (obj[k] === undefined) {
            return;
        }
        results.push({
            name: k,
            value: obj[k],
            excludeFromIndexes: nonIndexed.indexOf(k) !== -1
        });
    });
    return results;
}


function update (id, data, cb) {
    var key;
    if (id) {
        key = ds.key([kind, parseInt(id, 10)]);
    } else {
        key = ds.key(kind);
    }

    var entity = {
        key: key,
        data: toDatastore(data, ['description'])
    };

    ds.save(
        entity,
        function (err) {
            data.id = entity.key.id;
            cb(err, err ? null : data);
        }
    );
}

module.exports = {
    create: function (data, cb) {
        update(null, data, cb);
    },
};