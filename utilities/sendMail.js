import nodemailer from 'nodemailer'
 const sendMail=async function(Email,subject,resetPasswordUrl){
    console.log("Sendmail calling");
    const transporter=nodemailer.createTransport({
    host:'smtp.ethereal.email',
    port:2525,
    secure:false,
    auth:{
        Username:'pratapmunesh15@gmail.com',
        password:"EF839F5D49659BD23397C99FA3B229088C47"
    }
    })
       const optionDetail={
        from:"pratapmunesh15@gmail.com",
        to:Email,
        subject:subject,
        text:`Please click this link ${resetPasswordUrl}  to  reset your password`
       }
       await transporter.sendMail(optionDetail,(err,msg)=>{
            if(err){
               return "Failed to send mail"
            }
            console.log(msg);
         })
 }
export default sendMail