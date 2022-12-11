var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name:String,
   latitude:Number,
   longitude:Number
});
module.exports = mongoose.models.users || mongoose.model('users', userSchema);
