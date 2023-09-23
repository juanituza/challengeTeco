import __dirname from "../utils.js"

export default {
  welcome: {
    subject: "¡Welcome!",
    attachments: [
      {
        filename: "banner.jpg",
        path: `${__dirname}/public/img/banner.jpg`,
        cid: "user",
      },
    ],
  },
  restore: {
    subject: "Restore Password!",
    attachments: [
      {
        filename: "banner.jpg",
        path: `${__dirname}/public/img/banner.jpg`,
        cid: "banner",
      },
    ],
  },
  deleteProduct: {
    subject: "Product removed",
    attachments: [
      {
        filename: "banner.jpg",
        path: `${__dirname}/public/img/banner.jpg`,
        cid: "banner",
      },
    ],
  },
  sendTicket: {
    subject: "Completed Purchase",
    attachments: [
      {
        filename: "banner.jpg",
        path: `${__dirname}/public/img/banner.jpg`,
        cid: "banner",
      },
    ],
  },
};