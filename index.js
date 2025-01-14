const express = require('express')
const app = express()
const web = require('./routes/web')
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config(
    {
        path:'.env'
    }
)
const con = require('./config')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json());

//for data get from api
app.use(express.json())



// Configure Nodemailer
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: false, // Use true for 465, false for other ports
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });




// // API to add a new user
// app.post('/add-user', async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ error: 'All fields are required!' });
//   }

//   try {
//     // Insert user into the database
//     const result = await con.query(
//       'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
//       [name, email, password]
//     );

//     // Send email with user details
//     const mailOptions = {
//       from: `"Super Admin" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: 'Welcome to the Platform',
//       text: `Hi ${name},\n\nYour account has been created successfully!\n\nHere are your login details:\nEmail: ${email}\nPassword: ${password}\n\nRegards,\nSuper Admin`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(201).json({
//       message: 'User added and email sent successfully!',
//       userId: result.insertId,
//     });
//   } catch (error) {
//     // console.error(error);
//     res.status(500).json({ error: 'An error occurred while adding the user.' });
//   }
// });




// // Api to add new admin
// app.post('/add-admin', async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ error: 'All fields are required!' });
//   }

//   try {
//     // Insert user into the database
//     const result = await con.query(
//       'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)',
//       [name, email, password]
//     );

//     // Send email with user details
//     const mailOptions = {
//       from: `"Super Admin" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: 'Welcome to the Platform',
//       text: `Hi ${name},\n\nYour account has been created successfully!\n\nHere are your login details:\nEmail: ${email}\nPassword: ${password}\n\nRegards,\nSuper Admin`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(201).json({
//       message: 'User added and email sent successfully!',
//       userId: result.insertId, 
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while adding the user.' });
//   }
// });

//load route
app.use('/api',web)

app.listen(process.env.PORT,(req,res)=>{
    console.log('server satrted')
}) 