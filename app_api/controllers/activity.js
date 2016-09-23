var mongoose = require('mongoose');
var schoolinfo = mongoose.model('degreeprograms');

var sendJSONresponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

module.exports.getProgramInfo = function(req, res) {
    schoolinfo.find()
        .exec(function(err, schools){
           console.log("Prgoram Find complete");
           //console.log(schools);
           var programList = [];
           for (var i=0; i < schools.length; i++) {
               programList.push(schools[i].Program);
           }
           sendJSONresponse(res, 200, {
               schoollist: programList
           });
        });
};

