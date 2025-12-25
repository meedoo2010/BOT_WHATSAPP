const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
authStrategy: new LocalAuth(), // يحفظ تسجيل الدخول
puppeteer: {
headless: true,
args: ['--no-sandbox', '--disable-setuid-sandbox']
}
});

client.on('qr', qr => {
qrcode.generate(qr, { small: true });
console.log('From WhatsApp, scan the QR code');
});

client.on('ready', () => {
console.log('✅ The bot worked successfully');
});

client.on('message', message => {
const msg = message.body.toLowerCase();

if (msg === 'مرحبا') {  
    message.reply('أهلاً بيك 👋');  
}  

if (msg === 'سعر') {  
    message.reply('الأسعار تبدأ من 100 جنيه 💰');  
}  

if (msg === 'سلام') {  
    message.reply('مع السلامة ❤️');  
}

});

client.initialize();
