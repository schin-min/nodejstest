const DB = require('../models/permit');
const Helper = require('../utils/helper');


const all = async (req,res,next)=> {

    let permits = await DB.find().select('-__v');

    Helper.fmsg(res,"All permits",permits);
}

const get = async (req,res,next)=> {
    let permit = await DB.findById(req.params.id).select('-__v');
    if(permit){
        Helper.fmsg(res,"Single permit Getting",permit);
    }else{
        next(new Error("Not found this permit"));
    }
    
}

const add =async (req,res,next)=>{
    let dbPermit = await DB.findOne({name:req.body.name});
    if(dbPermit){
        next(new Error("Permission Name is already in here"));
    }else{
        let result = await new DB(req.body).save();
        Helper.fmsg(res,"New Permit added",result);
    }
}

const patch = async (req,res,next)=> {

    let dbPermit = await DB.findById(req.params.id);
    if(dbPermit){
        await DB.findByIdAndUpdate(dbPermit._id,req.body);
        let result = await DB.findById(dbPermit._id);
        if(result){
            Helper.fmsg(res,"Permit have been updated",result);

        }else{
            next(new Error("Not found with that id(database)"));
        }
    }else{
        next(new Error("Not found with that id (params)"))
    }
}

const drop =async (req,res,next)=> {
    let permit = await DB.findById(req.params.id);
    if(permit){
        await DB.findByIdAndDelete(permit._id);
        Helper.fmsg(res,"Deleted");
    }else{
        next(new Error("Not found with that id to delete"));
    }
}




module.exports = {
    all,
    get,
    add,
    patch,
    drop,
}