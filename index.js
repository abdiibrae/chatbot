const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
require('dotenv').config();
// Initialize the client with LocalAuth to save the session data
const client = new Client({
    authStrategy: new LocalAuth(),
    dataPath: process.env.LOCAL_AUTH_PATH || './.wwebjs_auth'
});

client.on('qr', qr => {
    // Generate and display the QR code in the terminal
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message_create', message => {
    console.log(message.body);
    if (message.isGroupMsg){
        return;
    }
     if (!message.fromMe) {
        if (message.body.toLowerCase().startsWith('h')) {
            client.sendMessage(message.from, "Don't hi me, please speak.");
        } else {
            client.sendMessage(message.from, 'Hello! You have reached Breezy. I\'m his assistant bot. Kindly leave a message, and don\'t say hi.');
        }
    }
});

client.initialize();
