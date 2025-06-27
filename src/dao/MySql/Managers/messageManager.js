import messageModel from "../../MySql/models/message.js";



export default class MessagesManager {
    getMessages = (params) => {
        return messageModel.find(params).lean();
    }

    createMessages = (message) => {
        return messageModel.create(message);
    }

}