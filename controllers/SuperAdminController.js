const nodemailer = require('nodemailer');
const con = require('../config')
const dotenv = require('dotenv')
dotenv.config(
    {
        path:'.env'
    }
)


// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // Use true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

class SuperAdminController{
    static insertuser = async(req,res)=>{ 
        const { name, email, password } = req.body;
      
        if (!name || !email || !password) {
          return res.status(400).json({ error: 'All fields are required!' });
        }
       
        try {
            // Insert user into the database
            const result = await con.query(
              'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
              [name, email, password]
            );
        
            // Send email with user details
            const mailOptions = {
              from: `"Super Admin" <${process.env.EMAIL_USER}>`,
              to: email,
              subject: 'Welcome to the Platform',
              text: `Hi ${name},\n\nYour account has been created successfully!\n\nHere are your login details:\nEmail: ${email}\nPassword: ${password}\n\nRegards,\nSuper Admin`,
            };
        
            await transporter.sendMail(mailOptions);
        
            res.status(201).json({
              message: 'User added and email sent successfully!',
              userId: result.insertId,
            });
          } catch (error) {
            // console.error(error);
            res.status(500).json({ error: 'An error occurred while adding the user.' });
          }
        }


     static insertadmin = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input fields
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  try {
    // Check if the email already exists in the database
    const [existingAdmin] = await con.query(
      'SELECT email FROM admins WHERE email = ?',
      [email]
    );

    if (existingAdmin.length > 0) {
      return res.status(409).json({ error: 'Email already exists!' }); // 409 Conflict
    }

    // Insert user into the database
    const result = await con.query(
      'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );

    // Send email with user details
    const mailOptions = {
      from: `"Super Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to the Platform',
      text: `Hi ${name},\n\nYour account has been created successfully!\n\nHere are your login details:\nEmail: ${email}\nPassword: ${password}\n\nRegards,\nSuper Admin`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: 'Admin added and email sent successfully!',
      userId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the user.' });
  }
};

    }
    
       
       
         
      
      

module.exports = SuperAdminController