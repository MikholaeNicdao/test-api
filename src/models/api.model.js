'use strict'

let dbconnect = require('../../config/database.config')
const date = new Date()

class mresQuery{

    // Create ADMIN account
    static createAdmin(userName, passWord, result){
        dbconnect.query('INSERT INTO admin (id, userName,passWord) VALUES (?,?,?)', ['', userName, passWord],(err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    // Login admin verification
    static loginAdmin(userName, result){
        dbconnect.query('SELECT * FROM admin WHERE userName=?',[userName], (err,res)=>{
            if(res.length === 0){
                result(null, err)
            }else{
                result(null, res)
            }
            
        })
    }

    // Fetching data from database
    static getSchedule(result){
        dbconnect.query('SELECT * FROM lms', (err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    static getAllFaculty(result){
        dbconnect.query('SELECT * FROM faculty', (err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    static getAllSchoolActivities(result){
        dbconnect.query('SELECT * FROM schoolactivities', (err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    static getByIdSA(id,result){
        dbconnect.query('SELECT * FROM schoolactivities WHERE id=?', [id], (err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    static getAllAnnouncements(result){
        dbconnect.query('SELECT * FROM announcements', (err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    static getByIdAnnouncements(id, result){
        dbconnect.query('SELECT * FROM announcements WHERE id=?', [id], (err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    static getAllLCP(result){
        dbconnect.query('SELECT * FROM lcp', (err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    // Uploading file and data
    static scheduleUpload(schedule, result){
        dbconnect.query('UPDATE schedules SET schedulenote=? WHERE id > 0', [schedule], (err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    static addFacultyMember(coverPhoto ,TPGL, prefix, firstName, middleInitial, lastName, category, position, result){
        dbconnect.query('INSERT INTO faculty (id, coverPhoto, teacherPerGradeLevel, prefix, firstName, middleInitial, lastName, category, position) VALUES (?,?,?,?,?,?,?,?,?)', ['', coverPhoto, TPGL, prefix, firstName, middleInitial, lastName, category, position], (err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    static schoolActivitiesUpload(coverPhoto, title, description, result){
        dbconnect.query('INSERT INTO schoolactivities (id, coverPhoto, title, description, createdAt) VALUES (?,?,?,?,?)', ['', coverPhoto, title, description, date], (err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    static announcementsUpload(coverPhoto, title, description,author, result){
        dbconnect.query('INSERT INTO announcements (id, coverPhoto, title, description, author, createdAt) VALUES (?,?,?,?,?,?)', ['', coverPhoto, title, description, author, date], (err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    static LCPUpload(coverPhoto, page, result){
        dbconnect.query('INSERT INTO lcp (id, coverPhoto, page, createdAt) VALUES (?,?,?,?)', ['', coverPhoto, page, date], (err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    // Deleting DATA's
    static deleteSchedule(result){
        dbconnect.query('DELETE FROM schedules WHERE schedulenote != "undefined"', (err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    static removeFacultyById(id, result){
        dbconnect.query('DELETE FROM faculty WHERE id=?', [id],(err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    static removeSAById(id, result){
        dbconnect.query('DELETE FROM schoolactivities WHERE id=?', [id],(err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    static removeAnnouncementsById(id, result){
        dbconnect.query('DELETE FROM announcements WHERE id=?', [id],(err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    static removeLCPById(id, result){
        dbconnect.query('DELETE FROM lcp WHERE id=?', [id],(err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    // UPDATING DATA's
    static updateSA(image,title,description,id, result){
        dbconnect.query('UPDATE schoolactivities SET coverPhoto=?, title=?, description=?, createdAt=? WHERE id=?', [image,title,description,date,id],(err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    static updateAnnouncements(image,title,description,id, result){
        dbconnect.query('UPDATE announcements SET coverPhoto=?, title=?, description=?, createdAt=? WHERE id=?', [image,title,description,date,id],(err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }
    
    static updateLCP(image,id, result){
        dbconnect.query('UPDATE lcp SET coverPhoto=?, createdAt=? WHERE id=?', [image,date,id],(err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

    static updateFaculty(coverPhoto ,TPGL, prefix, firstName, middleInitial, lastName, position, id,result){
        dbconnect.query('UPDATE faculty SET coverPhoto=?, teacherPerGradeLevel=?, prefix=?, firstName=?, middleInitial=?, lastName=?, position=? WHERE id=?', [ coverPhoto, TPGL, prefix, firstName, middleInitial, lastName, position, id], (err,res)=>{
            if(err){
                result(null, err)
            }else{
                result(null, res)
            }
        })
    }

}

module.exports = mresQuery