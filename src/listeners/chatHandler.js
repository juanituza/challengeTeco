import MessagesManager from "../dao/MySql/Managers/messageManager.js";

const messageServ = new MessagesManager();

const registerChathandler = (io,socket) =>{

    const saveMessage = async (message) => {
        await messageServ.createMessages(message);
        const messageLogs = await messageServ.getMessages();

        io.emit('chat:messageLogs',messageLogs);
    }
    const newParticipant = async (user) => {
        socket.broadcast.emit('chat:newConnection')
    }

    socket.on('chat:message', saveMessage);
    socket.on('chat:newParticipant',newParticipant);

}
export default registerChathandler;