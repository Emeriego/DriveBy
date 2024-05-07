import emailjs from "emailjs-com";
emailjs.init("99z3ETftj0yavMx9V");



const SendEmail = (emailParams) => {
    emailjs.send("service_vndygpg", "template_2lvalpa", emailParams)
    .then(function(response) {
        console.log("Email sent successfully", response);
    })
    .catch(function(error) {
        console.error("Email could not be sent", error);
    });
}
export default SendEmail;
