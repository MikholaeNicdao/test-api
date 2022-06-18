'use strict'

const apiModel = require('../models/api.model')
const bcrypt = require('bcryptjs')
const { json } = require('body-parser')

// Create admin account
exports.createAdmin = async (req,res)=>{
    let userName = req.body.userName
    let passWord = req.body.passWord

    const salt = await bcrypt.genSalt(12)
    const hashPassWord = await bcrypt.hash(passWord, salt)
    
    apiModel.createAdmin(userName, hashPassWord, (err,data)=>{
        if(err){
            res.status(403).json({success: false, description: data})
        }else{
            res.status(200).json({success: true, description: data})
        }
    })
}

// Verify login
exports.loginAdmin = (req,res)=>{
    let userName = req.body.userName
    let passWord = req.body.passWord

    apiModel.loginAdmin(userName, async (err,data)=>{
        if(err || data == null){
            res.status(403).json({success: false})
        }else{
            const dataParse = JSON.parse(JSON.stringify(data).replace('[','').replace(']',''))
            const isVerified = comparePassword(passWord,dataParse.passWord)
            function comparePassword(password,hashpassword){
                return bcrypt.compareSync(password, hashpassword)
            }

            if(isVerified){
                res.status(200).json({success: true, description: data})
            }else{
                res.status(403).json({success: false})
            }
        }
    })
}

// Get information
exports.getSchedule = (req,res)=>{
    res.json({sample: "HAHAHAHA"})
    /*apiModel.getSchedule((err,data)=>{
        if(err){
            res.status(404).json({success: false, description: data})
        }else{
            res.status(200).json({success: true, description: data})
        }
    })*/
}

exports.getAllFaculty = (req,res)=>{
    apiModel.getAllFaculty((err,data)=>{
        if(err){
            res.status(404).json({success: false, description: data})
        }else{
            res.status(200).json({success: true, description: data})
        }
    })
}

exports.getAllSchoolActivities = (req,res)=>{
    apiModel.getAllSchoolActivities((err,data)=>{
        if(err){
            res.status(404).json({success: false, description: data})
        }else{
            res.status(200).json({success: true, description: data})
        }
    })
}

exports.getByIdSA = (req,res)=>{
    apiModel.getByIdSA(req.params.id, (err,data)=>{
        if(err){
            res.status(404).json({success: false, description: data})
        }else{
            res.status(200).json({success: true, description: data})
        }
    })
}

exports.getAllSchoolAnnouncements = (req,res)=>{
    apiModel.getAllAnnouncements((err,data)=>{
        if(err){
            res.status(404).json({success: false, description: data})
        }else{
            res.status(200).json({success: true, description: data})
        }
    })
}

exports.getByIdAnnouncements = (req,res)=>{
    apiModel.getByIdAnnouncements(req.params.id, (err,data)=>{
        if(err){
            res.status(404).json({success: false, description: data})
        }else{
            res.status(200).json({success: true, description: data})
        }
    })
}

exports.getAllLCP = (req,res)=>{
    apiModel.getAllLCP((err,data)=>{
        if(err){
            res.status(404).json({success: false, description: data})
        }else{
            res.status(200).json({success: true, description: data})
        }
    })
}

// Sending Data and File Uploading
exports.scheduleUpload = (req,res)=>{
    apiModel.scheduleUpload(req.body.schedule, (err,result)=>{
        if(err){
            res.status(404).json({success: false, description: result})
        }else{
            res.status(200).json({success: true, description: result})
        }
    })
}

exports.addFacultyMember = (req,res)=>{
    let image = req.file.buffer.toString('base64')
    let teacherPerGradeLevel = req.body.teacherPerGradeLevel
    let prefix = req.body.prefix
    let firstName = req.body.firstName
    let middleInitial = req.body.middleInitial
    let lastName = req.body.lastName
    let category = req.body.category
    let position = req.body.position

    apiModel.addFacultyMember(image,teacherPerGradeLevel,prefix, firstName, middleInitial, lastName, category, position, (err,result)=>{
        if(err){
            res.status(404).json({success: false, description: result})
        }else{
            res.status(200).json({success: true, description: result})
        }
    })
}

exports.schoolActivitiesUpload = (req,res)=>{
    let image = req.file.buffer.toString('base64')
    let title = req.body.title
    let description = req.body.description

    apiModel.schoolActivitiesUpload(image,title,description,(err,result)=>{
        if(err){
            res.status(404).json({success: false, description: result})
        }else{
            res.status(200).json({success: true, description: result})
        }
    })
}

exports.announcementsUpload = (req,res)=>{
    let image = req.file.buffer.toString('base64')
    let title = req.body.title
    let description = req.body.description
    let author = req.body.author

    apiModel.announcementsUpload(image,title,description,author,(err,result)=>{
        if(err){
            res.status(404).json({success: false, description: result})
        }else{
            res.status(200).json({success: true, description: result})
        }
    })
}

exports.LCPUpload = (req,res)=>{
    let image = req.file.buffer.toString('base64')
    let page = req.body.page

    apiModel.LCPUpload(image,page,(err,result)=>{
        if(err){
            res.status(404).json({success: false, description: result})
        }else{
            res.status(200).json({success: true, description: result})
        }
    })
}

// Delete Data from database

exports.deleteSchedule = (req,res)=>{
    apiModel.deleteSchedule((err, result)=>{
        if(err){
            res.status(404).json({success: false, description: result})
        }else{
            res.status(200).json({success: true, description: result})
        }
    })
}

exports.removeFacultyById = (req,res)=>{
    apiModel.removeFacultyById(req.params.id, (err, result)=>{
        if(err){
            res.status(404).json({success: false, description: result})
        }else{
            res.status(200).json({success: true, description: result})
        }
    })
}

exports.removeSAById = (req,res)=>{
    apiModel.removeSAById(req.params.id, (err, result)=>{
        if(err){
            res.status(404).json({success: false, description: result})
        }else{
            res.status(200).json({success: true, description: result})
        }
    })
}

exports.removeAnnouncementsById = (req,res)=>{
    apiModel.removeAnnouncementsById(req.params.id, (err, result)=>{
        if(err){
            res.status(404).json({success: false, description: result})
        }else{
            res.status(200).json({success: true, description: result})
        }
    })
}

exports.removeLCPById = (req,res)=>{
    apiModel.removeLCPById(req.params.id, (err, result)=>{
        if(err){
            res.status(404).json({success: false, description: result})
        }else{
            res.status(200).json({success: true, description: result})
        }
    })
}


// UPDATING DATA
exports.updateSA = (req,res)=>{
    let image = req.file.buffer.toString('base64')
    let title = req.body.title
    let description = req.body.description

    apiModel.updateSA(image,title,description,req.params.id,(err,result)=>{
        if(err){
            res.status(404).json({success: false, description: result})
        }else{
            res.status(200).json({success: true, description: result})
        }
    })
}

exports.updateAnnouncements = (req,res)=>{
    let image = req.file.buffer.toString('base64')
    let title = req.body.title
    let description = req.body.description

    apiModel.updateAnnouncements(image,title,description,req.params.id,(err,result)=>{
        if(err){
            res.status(404).json({success: false, description: result})
        }else{
            res.status(200).json({success: true, description: result})
        }
    })
}

exports.updateLCP = (req,res)=>{
    let image = req.file.buffer.toString('base64')

    apiModel.updateAnnouncements(image,req.params.id,(err,result)=>{
        if(err){
            res.status(404).json({success: false, description: result})
        }else{
            res.status(200).json({success: true, description: result})
        }
    })
}

exports.updateFaculty = (req,res)=>{
    let image = req.file.buffer.toString('base64')
    let teacherPerGradeLevel = req.body.teacherPerGradeLevel
    let prefix = req.body.prefix
    let firstName = req.body.firstName
    let middleInitial = req.body.middleInitial
    let lastName = req.body.lastName
    let position = req.body.position

    apiModel.updateFaculty(image,teacherPerGradeLevel,prefix, firstName, middleInitial, lastName, position, req.params.id,(err,result)=>{
        if(err){
            res.status(404).json({success: false, description: result})
        }else{
            res.status(200).json({success: true, description: result})
        }
    })
}