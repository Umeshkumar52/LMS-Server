import Router from "express";
import upload from "../midilewars/multerMiddilerware.js";
import authorisedRole from "../midilewars/authorisedRoles.js";
import isLogined from "../midilewars/isLogined.js";
import {courseByName, getLectures, userEnrollCourses } from "../Controllers/courseController.js";
import { courses, courseDetailById,checkEnrollCourseForUser,enrollCourseByUser,createCourse,updateCourse,deletCourse,addLectures} from "../Controllers/courseController.js";
const router=Router()
router.route('/')
.get(courses)
.post(upload.single('thumnail'),createCourse)
router.route('/userCourses')
.post(userEnrollCourses)
router.route('/:id')
.get(courseDetailById)
.put(upload.single('thumnail'),updateCourse)
.delete(isLogined,authorisedRole,deletCourse)
.post(isLogined,upload.single('lecture'),addLectures)
 router.route('/lectures/:id')
 .get(getLectures)
 router.route('/enrollCourse/:courseId')
 .post(isLogined,enrollCourseByUser)
 router.route('/checkEnrollCourseForuser/:courseId')
 .get(checkEnrollCourseForUser)
 router.route('/byName/:Name')
.get(courseByName)
export default router;
