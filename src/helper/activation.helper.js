const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  requireTLS: true,
  auth: {
    user: "brndnwjy8@gmail.com",
    pass: process.env.GMAIL_APP_PASS,
  },
});

const emailActivation = async (data) => {
  const token = jwt.sign(data, process.env.SECRET_KEY_JWT, {
    expiresIn: "1h",
  });

  const letter = await transporter.sendMail({
    from: `"Mamarecipe" <brndnwjy8@gmail.com>`,
    to: data.email,
    subject: "Account Activation",
    text: "Activation",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            body {
                background: linear-gradient(#f1ece3, #f8b4a2);
                background-repeat: no-repeat;
            }
            #clickhere {
                font-style: normal;
                text-decoration: none;
                margin:1em;
                border-radius: 50%;
            }
            h1 {
                background-color: #DB3022;
                color:aliceblue;
                border-radius: 5px;
                margin:auto;
                justify-content: center;
                display:flex
            }
        </style>
    </head>
    <body>
        <div id='container'>
            <div id="header">
                <h1>Mamarecipe</h1>
            </div>
            <div id="content">
                <h2>Welcome to Mamarecipe</h2>
            <br>
            <p>only 1 step left for your account registration. <a id='clickhere' href="https://zany-tan-beetle-kit.cyclic.app/v1/user/activate/${token}/${data.user_id}">click here</a> to activate your account </p>
            </div>
        </div>
    </body>
    </html>`,
  });

  console.log("Message sent: %s", letter.messageId);

};

// const sendEmail = {
//   accActivation: async (data) => {
//     const token = jwt.sign(data, process.env.SECRET_KEY_JWT, {
//       expiresIn: "6h",
//     });

//     const info = await transporter.sendMail({
//       from: '"Mamarecipe" <youremailhere@gmail.com>', // sender address
//       to: data.email, // list of receivers
//       subject: "User Activation", // Subject line
//       text: "Hello world?", // plain text body
//       html: `<!DOCTYPE html>
//       <html lang="en">
//       <head>
//           <meta charset="UTF-8">
//           <meta http-equiv="X-UA-Compatible" content="IE=edge">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Document</title>
//           <style>
//               body {
//                   background: linear-gradient(#f1ece3, #f8b4a2);
//                   background-repeat: no-repeat;
//               }
//               #clickhere {
//                   font-style: normal;
//                   text-decoration: none;
//                   margin:1em;
//                   border-radius: 50%;
//               }
//               h1 {
//                   background-color: #DB3022;
//                   color:aliceblue;
//                   border-radius: 5px;
//                   margin:auto;
//                   justify-content: center;
//                   display:flex
//               }
//           </style>
//       </head>
//       <body>
//           <div id='container'>
//               <div id="header">
//                   <h1>Pijar Blanja</h1>
//               </div>
//               <div id="content">
//                   <h2>Welcome to Pijar Blanja</h2>
//               <br>
//               <p>only 1 step left for your account registration. <a id='clickhere' href="http://localhost:4000/v1/users/activate/${token}/${data.id}">click here</a> to activate your account </p>
//               </div>
//           </div>
//       </body>
//       </html>`,
//     });

//     console.log("Message sent: %s", info.messageId);
//   },
// };

module.exports = emailActivation;
