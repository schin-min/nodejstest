const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    roles:[{type:Schema.Types.ObjectId,'ref':'role'}],
    permits: [{type:Schema.Types.ObjectId,'ref':'permit'}],
    created: {type:Date, default:Date.now},
});

const User = mongoose.model('user',UserSchema);

module.exports = User;

