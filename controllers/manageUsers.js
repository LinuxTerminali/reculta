const User = require('../models/user'),
      async = require('async'),
      Task = require('../models/task');

//==============================================
// Delte user Route for Admin only 
//==============================================
exports.deleteMember = async function (req, res, next) {
    try{
        if (!req.body.email){
            throw "email is required";
        }
        let findUser = await User.findOne({
            email: req.body.email
        });
        if(req.user.role === 'Admin' || req.user.email === req.body.email){
            let removeUser = await findUser.remove();
            if(removeUser.err) {
                return next(err);
            }
            return res.status(202).json({
                success: true
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
// Change user role Route for Manger and Admin 
//==============================================
exports.changeRole = async function (req, res, next) {
    try{
        if (!req.body.email || !req.body.new_role){
            throw "email and new role is required";
        }
        if((req.user.role === 'Manager' || req.user.role === 'Admin') && req.user.email != req.body.email ){
            let findUser = await User.findOne({
                email: req.body.email
            });
            findUser.role = req.body.new_role;
            let updateRole = await findUser.save();
            if(updateRole.err) {
                return next(err);
            }
            return res.status(200).json({
                success: true,
                data:findUser
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




