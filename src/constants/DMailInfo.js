import __dirname from "../utils.js"

export default {
    welcome :{
        subject: "¡Welcome!",
        attachments:[
            {
                filename:'banner.jpg',
                path:`${__dirname}/public/img/banner.jpg`,
                cid: "banner"
            }
        ]
    },
    restore :{
        subject: "Restore Password!",
        attachments:[
            {
                filename:'banner.jpg',
                path:`${__dirname}/public/img/banner.jpg`,
                cid: "banner"
            }
        ]
    }
}