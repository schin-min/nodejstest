
const DB = require('../models/role');
const permitDb = require('../models/permit');
const Helper = require('../utils/helper');



const add = async(req,res,next)=> {
    let dbRole = await DB.findOne({name:req.body.name});
    if(dbRole){
        next(new Error("This role name is already in db"));

    }else{
   let data =await new DB(req.body).save();
   Helper.fmsg(res,"New Role Added",data);
    }
}

const all = async (req,res,next)=> {
    let roles = await DB.find().populate('permits').select('-__v');
    Helper.fmsg(res,"All roles",roles)
}

const get = async (req,res,next)=> {
    let role = await DB.findById(req.params.id).select('-__v');
    if(role){
        Helper.fmsg(res,"Single Role",role);

    }else{
        next(new Error("No found role with that id"));

    }
}


const patch = async (req,res,next)=> {
    let role = await DB.findById(req.params.id);
    if(role){
       await DB.findByIdAndUpdate(role._id,req.body);
        let result = await DB.findById(role._id).select('-__v');
        Helper.fmsg(res,"This role updated",result);
    }else{
        next(new Error("Not found to patch this id role"))
    }
}



const drop = async (req,res,next)=> {
    let role = await DB.findById(req.params.id);
    if(role){
       await DB.findByIdAndDelete(role._id);
        let result = await DB.findById(role._id).select('-__v');
        Helper.fmsg(res,"This role updated",result);
    }else{
        next(new Error("Not found to patch this id role"))
    }
}

const roleAddPermit = async (req,res,next)=> {
    let dbRole = await DB.findById(req.body.roleId);
    let dbPermit = await permitDb.findById(req.body.permitId);

    if(dbRole && dbPermit){
       await DB.findByIdAndUpdate(dbRole._id,{$push:{permits:dbPermit._id}});
       let result = await DB.findById(dbRole._id);
        Helper.fmsg(res,"Permit added in role ",result);
    }else {
        next(new Error('Not found with that role'))
    }

}

const roleRemovePermit = async (req,res,next)=> {
    let dbRole = await DB.findById(req.body.roleId);
    let dbPermit = await permitDb.findById(req.body.permitId);

    if(dbRole && dbPermit){
       let result = await DB.findByIdAndUpdate(dbRole._id,{$pull:{permits:dbPermit._id}});
        Helper.fmsg(res,"Permit remove in role ",result);
    }else {
        next(new Error('Not found with that role'))
    }

}

module.exports = {
    add,
    all,
    get,
    patch,
    drop,
    roleAddPermit,
    roleRemovePermit,
}