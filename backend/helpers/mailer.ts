import nodemailer from 'nodemailer';




// Configuración del transporte
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // STARTTLS
    auth: {
        user: process.env.EMAIL, // Tu correo
        pass: process.env.EMAIL_PASSWORD, // Contraseña de aplicación
    },
});

interface EmailParamns {
    to:string
    subject:string
    html:string
}
// Función para enviar correos
const sendEmail = async ({to, subject,html}:EmailParamns) => {
    try {
        const result = await transporter.sendMail({
            from: 'Company <riveraoddy95@gmail.com>', // Dirección del remitente
            to, // Dirección del destinatario
            subject, // Asunto del correo
            html, // (Opcional) Cuerpo del correo en HTML
        });

        console.log('Correo enviado:',{result});
        return {ok:true, mesagge:"mail sent successfully"};
    } catch (error) {
        console.log({error})
        return {ok:false,}
    }
};

export default sendEmail;