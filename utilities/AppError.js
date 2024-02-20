function AppError(status,message,req,res){
    return res.status(status).json({
        success:false,
        message:message
    })
}
export default AppError