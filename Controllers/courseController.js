import Courses from '../models/courseModel.js'
import Users from '../models/userSchema.js'
import {v2 as cloudinary} from 'cloudinary'
const courses=async  function(req,res,next){
 try {
    const {Name}=req.params;
    if(Name){
        const allCourses=await Courses.find({"tittle":Name})
    res.status(200).json({
        success:true,
        message:allCourses
    })
    }{
    const allCourses=await Courses.find({})
    res.status(200).json({
        success:true,
        message:allCourses
    })
}
 } catch (error) {
    return  res.status(400).json({
        success:true,
        message:"Please try again"
    })
 }
}
const courseByName=async function(req,res,next){
    try {
        const {Name}=req.params
      
        const response=await Courses.find({"tittle":Name})
    
        res.status(200).json({
            success:true,
            message:response
        })
    } catch (error) {
        console.log("error");
        return  res.status(400).json({
            success:true,
            message:"Please try again"
        })  
    }
}
const courseDetailById=async function(req,res,next){
   const courseId=req.params;
try {
    const coursDetail=await Courses.findById({courseId})
    res.status(200).json({
        success:true,
        message:coursDetail
    })
} catch (error) {
    return  res.status(400).json({
        success:true,
        message:"Please try again"
    })
}
}
const enrollCourseByUser=async function(req,res,next){
    try {
        const{courseId}=req.params
    const {_id}=req.user
    const user=await Users.findById(_id) 
    const course=await Courses.findById(courseId)
    if(user && course){
      user.enrollCourses.push({
        _id:course._id,
        tittle:course.tittle
      })
    }
    user.save()
    return res.status(200).json({
      success:true,
      message:"Enroll successfully"
  })
  } catch (error) {
    return res.status(400).json({
      success:false,
      message:"Enable to register course,try again"
  })
  }
  
  }
  const userEnrollCourses=async function(req,res,next){
    try {        
     const response=await Courses.find(
        {_id:{$in:
         req.body
            }
     })
     return res.status(200).json({
        success:true,
        message: response
       
    })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"You have not enrolled in any courses yet !"
        }) 
    }
  }
  const checkEnrollCourseForUser=async function(req,res,next){
    try {
        const {courseId}=req.params;
        const {_id}=req.user;
       
        const userEnrollCourseId=await Users.findById(_id)
       
        if(courseId!=userEnrollCourseId.enrollCourses){
            return res.status(200).json({
                success:true,
                message:"you can proceed"
            })
        }else
        return res.status(200).json({
            success:true,
            message:"You have allready enrolled"
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Please try again"
        })
    }
  }
const createCourse=async function (req,res,next){
    const {tittle,description,createBy,thumnail}=req.body;
    if(!tittle || !description || !createBy || !req.file){
        return res.status(400).json({
         success:false,
         message:"All Fields are mandatory"
        })
         } 
         const course=await Courses.create({
            tittle,
            description,
            thumnail:{
                public_id:"Public_id",
                secure_url:"secure_url"
            },
            createBy
        })   
if(!course){
    return  res.status(400).json({
        success:true,
        message:" We are unable to create course, Please try again"
    })
}  
if(req.file){
            try {
                const result=await cloudinary.uploader
                .upload(req.file.path,{
                    folder:"courses",
                    use_filename:true,
                    unique_filename:false,
                    overwrite:true,
                    width:426,
                    height:240
                }) 
               
                if(result){
                        course.thumnail.publice_id=result.public_id;
                        course.thumnail.secure_url = result.secure_url;
                        // fs.unlink(`uplods/${req.file.filename}`)
                     }
                     await course.save() 
                     res.status(200).json({
                       success:true,
                       message:'Course created successfully',course
                     })
                 } catch (error) {
                 return res.status(400).json({
                  success:false,
                  message:'Failed to upload img', error
                 })
             }         
   }
}
   const updateCourse=async function(req,res,next){
    try {
        const {tittle,description,createBy}=req.body
        let data={
            tittle:tittle,
            description:description,
            createBy:createBy
        }
        const {id}=req.params;
        
         const course= await Courses.findByIdAndUpdate(
            id,
            {$set:data},
            {runValidators:true}
            )
            console.log(req.file);
            if(req.file){
                let result=await cloudinary.uploader
                  .upload(req.file.path,{
                      folder:"courses",
                      use_filename:true,
                      unique_filename:false,
                      overwrite:true,
                      width:426,
                      height:240
                  })
                  if(result){
                      course.thumnail.publice_id=result.public_id;
                      course.thumnail.secure_url = result.secure_url;                    
                   }
                   await course.save()
              }
              await course.save()
           res.status(200).json({
            success:true,
            message:'Course update successfully'           
           })          
     } catch (error) {
          return res.status(400).json({
            success:false,
            message:' unable to update course, pleasse try again'
          })
      }
    }
   const deletCourse=async function(req,res,next){
    try {
    const {id}=req.params;
    const course=await Courses.findById(id);
    if(!course){
        return res.status(400).json({
          success:false,
          message:'Course do not exist'
        })
    }
         await course.deleteOne()      
         res.status(200).json({
          success:true,
          message:'Course deleted successfully'
         })
    } catch (error) {
      return res.status(400).json({
          success:false,
          message:' unable to delet course, pleasse try again'
        })
    }
   }
   const addLectures=async function(req,res,next){
      const {id}=req.params;   
      const {tittle,description,lecture}=req.body
      try{
       const course=await Courses.findById(id)
       if(!tittle || !description){
        return  res.status(204).json({
            success:false,
            message:"All fields are mandatory"
        })
       }
       if(!course){
        return res.status(204).json({
            success:false,
            message:"Course does not Exist"
        })
       }
       const lectureData={}
      if(req.file){
        const result= await cloudinary.uploader
        .upload(req.file.path,{
                 folder:'colud_img',
                 resource_type:"video",
                 width:426,
                 height:240
                })
                if(result){
                 lectureData.public_id=result.public_id;
                 lectureData.secure_url = result.secure_url;
                }
            }
             course.lectures.push({
                tittle,
                description,
                lecture:lectureData
             });
              course.lecturesCount=course.lectures.length;
            await course.save()
            res.status(200).json({
                success:true,
                message:"Lecture added successfully",course
             }) 
        }
        catch(error){
        return res.status(400).json({
            success:false,
            message:"unable to upload lecture"
        })
        }
   }
   const getLectures=async function(req,res,next){
    const {id}=req.params;
    try {
        const courseData=await Courses.findById(id)
        
        if(!courseData){
           res.status(400).json({
            success:false,
            message:"Course does not Exist"
           })
        }
        const lectures=courseData.lectures
        res.status(200).json({
            success:true,
            message:"Fetch Lectures data successfull",lectures
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Failed to fetch lectures",error
           })
    }
   }
export {
    courses,
    courseByName,
    courseDetailById,
    userEnrollCourses,
    enrollCourseByUser,
    checkEnrollCourseForUser,
    createCourse,
    updateCourse,
    deletCourse,
    addLectures,
    getLectures
     } 