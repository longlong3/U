
var U = require('../models/U');
var md5 = require('MD5');

var insert = function(lurl,md5str,len,res,host){
  if(len>32){
    res.status(404).send("encode conflict");
    return;
  }
  var surl = md5str.substr(0,len);
  var url= new U();
  url.s=surl;
  url.l=lurl;
  url.save(function (err){
    if(err){
      if(err.code===11000){
        U.findOne({'s':surl},function(err,url){
          if(url.l===lurl){
            res.status(200).send(host+"/"+surl);
          }else{
            insert(lurl,md5str,len+1,res,host);
          }
        });
      }else{
        res.status(404).send(err);
      }
    }else{
      res.status(200).send(host+"/"+surl);
    }
  });
}

module.exports = function(app) {
  app.get("/short",function(req,res){
    var lurl=req.query.long;
    var md5str = md5(lurl);
    insert(lurl,md5str,5,res,req.get('Host'));
  });
  app.get("/:str",function(req,res){
    var ss = req.params.str;
    U.findOne({'s':ss}, function (err,url){
      if(err || !url ){
        res.status(200).send("<meta http-equiv=\"refresh\" content=\"3;url=/\">"+"No this short url.");
      }else{
        res.redirect(url.l);
      }
    });
  });
}
