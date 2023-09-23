import nodemailer from "nodemailer";
import config from "../config.js";
import DMailInfo from "../constants/DMailInfo.js";
import {generateMailTemplate} from "../utils.js";

export default class MailingService {
  constructor() {
    this.mailer = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: config.mailer.USER,
        pass: config.mailer.PASS
      }
    })
  }
   processEmailTemplate =  (template, data) =>{
    // Utiliza una expresión regular para buscar y reemplazar todas las instancias de {{key}} en la plantilla.
    return template.replace(/{{(\w+)}}/g, (match, key) => {
        // Encuentra la propiedad correspondiente en el objeto de datos y la devuelve.
        return data[key] || match; // Si la propiedad no existe, mantiene la variable sin cambios.
    });
}


  sendMail = async (emails, template, payload) => {
    const mailInfo = DMailInfo[template];
    const html = await generateMailTemplate(template, payload);
    // Utiliza la función processEmailTemplate para procesar la plantilla antes de enviar el correo.
    const processedHtml = this.processEmailTemplate(html, payload);
    const result = await this.mailer.sendMail({
      from: "MK Rock - <juanituza85@gmail.com>",
      to: emails,
      html: processedHtml,
      ...mailInfo,
    });
    return result;
  };
}
