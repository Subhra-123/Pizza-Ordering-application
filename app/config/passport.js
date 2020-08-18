const passport = require('passport')

const LocalStratergy=require('passport-local').Strategy
const User=require('../models/user')
const bcrypt=require('bcrypt')
function init(){
   passport.use(new LocalStratergy({usernameField:'email' }, async (email, password,done)=>{
       const user=await User.findOne({email:email})
       if(!user)
       {
           return done(null,false,{message:'No User with this email'})
       }
       
       bcrypt.compare(password,user.password).then(match=>{
           if(match)
           {
               return done(null,user,{message:'Logged In Succesfully'})
           }
       
       return done(null,false,{message:'Wrong Username or password'})

    }).catch(err=>{
        return done(null,false,{message:'Something Went Wrong'})
    })
   }))


   passport.serializeUser((user,done)=>{
     done(null,user._id)
   })

   passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
      done(err,user)
    })

  })

  

}
module.exports=init