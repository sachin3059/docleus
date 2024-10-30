import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'
import nodemailer from 'nodemailer'


// API to register user:
const registerUser = async (req, res) => {
    try {
        const {name, email, password } = req.body

        if(!name || !email || !password){
            return res.json({
                success: false,
                message: 'All fields are compulsary'
            })
        }

        // validating email format
        if(!validator.isEmail(email)){
            return res.json({
                success: false,
                message: 'please give correct email'
            })
        }

        //validating strong password
        if(password.length< 8){
            return res.json({
                success: false,
                message: 'Enter a strong password atleat 8 digit'
            })
        }


        // hasing user password:
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }


        const newUser = new userModel(userData)

        const user = await newUser.save()
        

        // now create a token so that user can able to login
        // this can be using _id of newUser 

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET )

        res.json({
            success: true,
            token
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
        
    }
}


// API for user login
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({
                success: false,
                message: 'user does not exits'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch)

        if(!isMatch){
            return res.json({
                success: false,
                message: 'invalid credentials'
            })
        }
        else{
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            res.json({
                success: true,
                token
            })
        }
        
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
        
    }
}



// API to get user profile data
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')
        res.json({
            success: true,
            userData
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
        
    }
}


//API to update user profile:
const updateProfile = async (req, res) => {
    try {
        const  {userId, name, phone, address, dob, gender} = req.body
        const imageFile = req.file
        if(!name || !phone || !dob || !gender){
            return res.json({
                success: false,
                message: 'All fields are compulsory'
            })
        }

        await userModel.findByIdAndUpdate(userId, {name, phone, address:JSON.parse(address) ,dob, gender})

        if(imageFile){
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, {image:imageURL})
        }

        res.json({
            success: true,
            message: 'Profile updated successfully'
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
        
    }
}



// API to book appointment:
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if(!docData.available){
            return res.json({
                success: false,
                message: 'doctor not available'
            })
        }

        let slots_booked = docData.slots_booked

        // checking for slots availability:
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({
                    success: false,
                    message: 'slot not available'
                })
            }
            else{
                slots_booked[slotDate].push(slotTime)
            }
        }
        else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')
        delete docData.slots_booked

        const appointmentData = {
            userId, 
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in doctors data
        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({
            success: true,
            message: 'appointment booked successfully'
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })  
    }
}


// API to get user appointments for frontend my-appointment page:

const listAppointment = async (req, res) => {
    try {
        
        const {userId} = req.body
        const appointments = await appointmentModel.find({userId})

        res.json({
            success: true,
            appointments
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
        
    }
}


// API to cancel appointments:
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        
        // verify appointment user:
        if(appointmentData.userId !== userId){
            return res.json({
                success : false,
                message : 'Unauthorized action'
            })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId , {cancelled: true})

        // releasing doctor slot:
        const {docId, slotDate, slotTime} = appointmentData
        const doctorData = await doctorModel.findById(docId)
        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e!== slotTime)

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({
            success: true,
            message: 'Appointment cancelled!'
        })

        
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}





// API to make payment of appointment using razorpay

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})



const paymentRazorpay = async (req, res) => {

    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        //console.log(appointmentData)

        if(!appointmentData || appointmentData.cancelAppointment){
            return res.json({
                success: false,
                message:'appointment cancelled or not found'
            })
        }

        // creating options for razorpay payment:
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        // creation of an order
        const order = await razorpayInstance.orders.create(options)
        //console.log(order)
        res.json({
            success:true,
            order
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        }) 
    }
    
}




// API to verify payment of razorpay

const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        console.log(orderInfo)
        if(orderInfo.status === 'paid' || orderInfo.status === 'created'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment: true})
            res.json({
                success: true,
                message: "Payment successful!"
            })
        }
        else{
            res.json({
                success: false,
                message: "Payment failed"
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
        
    }
}




// API for sending email to admin for query/contact:

const contact = async (req, res) => {
    const { name, email, message } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL, 
        pass: process.env.ADMIN_PASSWORD 
      }
    })
  
    const mailOptions = {
      from: email,
      to: process.env.ADMIN_EMAIL, 
      subject: `Contact from ${name}`,
      text: message,
    }
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      res.json({
        success: true,
        message: 'Email sent successfully'
      })
    } 
    catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        }) 
    }
  }



export { 
    registerUser ,
    loginUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
    paymentRazorpay,
    verifyRazorpay,
    contact
}