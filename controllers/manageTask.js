const async = require('async'),
      Task = require('../models/task');

//==============================================
// Create new task Route for team lead and Admin 
//==============================================
exports.createTasks = async function (req, res, next) {
    try{
        if (!req.body.name){
            throw "task name is required";
        }
        if(req.user.role === 'TeamLead' || req.user.role === 'Admin'){
            let createTasks = await new Task({
                name:req.body.name
            })
            let createTask = await createTasks.save();
            if(createTask.err) {
                return next(err);
            }
            return res.status(200).json({
                success: true,
                data:createTasks
            });
        }else{
            throw "Not Authorized"
        }

    }catch(err){
        return res.status(420).send({
            success: false,
            error: err
        });
    }

}

//==============================================
// Change task status Route for member and Admin 
//==============================================
exports.taskStatus = async function (req, res, next) {
    try{
        if (!req.body.name || !req.body.status){
            throw "Task name and new status is required";
        }
        if(req.user.role === 'Member' || req.user.role === 'Admin'){
            let taskStatus = await Task.findOne({
                name: req.body.name
            });
            taskStatus.status = req.body.status;
            let changeStatus =  await taskStatus.save();
            if(changeStatus.err) {
                return next(err);
            }
            return res.status(200).json({
                success: true,
                data:changeStatus
            });
        }else{
            throw "Not Authorized"
        }

    }catch(err){
        return res.status(420).send({
            success: false,
            error: err
        });
    }

}