'use strict'

const express = require('express')
const multer = require('multer')
const router = express.Router()
const apiController = require('../controllers/api.controller')

// multer setup for file uploading
const upload = multer({storage:multer.memoryStorage()})

// Create Admin account
router.post('/create/admin/account', apiController.createAdmin)
router.post('/login/admin', apiController.loginAdmin)

// GET routers for static page
router.get('/', apiController.getSchedule)
router.get('/Faculty', apiController.getAllFaculty)
router.get('/SchoolActivities', apiController.getAllSchoolActivities)
router.get('/SchoolActivities/:id', apiController.getByIdSA)
router.get('/Announcements', apiController.getAllSchoolAnnouncements)
router.get('/Announcements/:id', apiController.getByIdAnnouncements)
router.get('/LearningContinuityPlan', apiController.getAllLCP)

// ADMIN POST API's
router.post('/Faculty/add/member', upload.single('coverPhoto'), apiController.addFacultyMember)
router.post('/SchoolActivities/add', upload.single('coverPhoto'), apiController.schoolActivitiesUpload)
router.post('/Announcements/add', upload.single('coverPhoto'), apiController.announcementsUpload)
router.post('/LearningContinuityPlan/add', upload.single('coverPhoto'), apiController.LCPUpload)

// ADMIN UPDATE API's
router.put('/Schedule/update', apiController.scheduleUpload)
router.put('/SchoolActivities/update/:id', upload.single('coverPhoto'),apiController.updateSA)
router.put('/Announcements/update/:id', upload.single('coverPhoto'),apiController.updateAnnouncements)
router.put('/LearningContinuityPlan/update/:id', upload.single('coverPhoto'), apiController.updateLCP)
router.put('/Faculty/update/member/:id', upload.single('coverPhoto'), apiController.updateFaculty)

// ADMIN DELETE API's
router.delete('/Schedule/remove', apiController.deleteSchedule)
router.delete('/Faculty/remove/:id', apiController.removeFacultyById)
router.delete('/SchoolActivities/remove/:id', apiController.removeSAById)
router.delete('/Announcements/remove/:id', apiController.removeAnnouncementsById)
router.delete('/LearningContinuityPlan/remove/:id', apiController.removeLCPById)

module.exports = router