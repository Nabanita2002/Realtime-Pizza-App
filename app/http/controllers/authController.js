
const passport = require('passport');
const User = require('../../models/user')

const bcrypt = require('bcrypt')

function authController() {
   return {
      login(req, res) {
         res.render('auth/login');
      },

      postLogin(req, res, next) {
         passport.authenticate('local', (err, user, info) => {
            if (err) {
               req.flash('error', info.message)
               return next(err)
            }

            if (!user) {
               req.flash('error', info.message)
               return res.redirect('/login')
            }

            req.logIn(user, (err) => {
               if (err) {
                  req.flash('error', info.message)
                  return next(err)
               }

               return res.redirect('/')
            })
         })(req,res,next)
      },

      register(req, res) {
         res.render('auth/register');
      },

      async postRegister(req, res) {
         const { name, email, password } = req.body
         //validate request

         // if (!name || !email || !password) {
         //    req.flash('error', 'All fields are required')
         //    return res.redirect('/register')
         // }

         //check if email exists

         // User.exists({ email: email }, (err, result) => {
         //    if (result) {
         //       req.flash('error', 'Email already exists')
         //       return res.redirect('/register')
         //    }
         // })


         //hash password



         //create a user
         const hashedPassword = await bcrypt.hash(password, 10)

         const user = new User({
            name: name,
            email: email,
            password: hashedPassword
         })

         user.save().then((user) => {


            return res.redirect('/')

         }).catch(err => {

            req.flash('error', 'Something went wrong!')
            return res.redirect('/register')


         })

      },

      logout(req,res){
          req.logout()

          return res.redirect('/login');
      }



   }

}


module.exports = authController