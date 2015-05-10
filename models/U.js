var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UrlSchema = new Schema({
  s:  String,
  l:  String,
  date: { type: Date, default: Date.now },
});
UrlSchema.index({ s : 1 },{ unique: true });
module.exports = mongoose.model('Url', UrlSchema)

