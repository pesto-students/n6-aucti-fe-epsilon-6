const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "auctiapp@gmail.com",
		pass: "epsilon@pesto",
	},
});

// let mailDetails = {
// 	from: "xyz@gmail.com",
// 	to: "abc@gmail.com",
// 	subject: "Test mail",
// 	text: "Node.js testing mail for GeeksforGeeks",
// };

// mailTransporter.sendMail(mailDetails, function (err, data) {
// 	if (err) {
// 		console.log("Error Occurs");
// 	} else {
// 		console.log("Email sent successfully");
// 	}
// });
module.exports = { mailTransporter };
