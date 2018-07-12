const nodeoutlook = require('nodejs-nodemailer-outlook');
module.exports = (app) => {


	app.post('/contactsend',function(req, res){
		res.setHeader('Content-Type', 'application/json');

		let json_mail = {
            auth: {
                user: "arcorito@newtech.com.ar",
                pass: "Passw0rd"
            }, 
            from: 'Bot Arcorito <arcorito@newtech.com.ar>',
            to: '',
            subject: 'Contacto desde la web newtech.com.ar!',
            html: ''
        };

        
        json_mail.to='diego.ceraso@newtech.com.ar'; 
        
       
		json_mail.html=("Hola <strong>Info!</strong><br /><br />Los datos y consulta desde la web son: <br /><br />Nombre: <strong>"+req.body.nombre+"</strong><br /><br />Email: <strong>"+req.body.email+"</strong><br /><br />Asunto: <strong>"+req.body.asunto+"</strong><br /><br />Consulta: <strong>"+req.body.desc+"</strong><br /><br />Saludos.");

		nodeoutlook.sendEmail(json_mail);
		
	
		console.log(req.body);	
		//mimic a slow network connection
		 setTimeout(function(){
	
			res.send(JSON.stringify({
				nombre: req.body.nombre || null,
				email: req.body.email || null
			}));
	
		}, 1000)

		//debugging output for the terminal
		console.log('you posted: First Name: ' + req.body.nombre + ', Last Name: ' + req.body.email);
	});
   

};