const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode'); // استخدم مكتبة qrcode
const { MessageMedia } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

client.on('qr', qr => {
    // توليد QR بحجم أصغر
    qrcode.toString(qr, {
        type: 'terminal',
        width: 100, // تحديد العرض هنا
        margin: 1
    }, (err, output) => {
        if (err) throw err;
        console.log(output); // عرض QR في التيرمنال بحجم صغير
    });
    console.log('From WhatsApp, scan the QR code');
});

client.on('ready', () => console.log('✅ The bot worked successfully'));

client.on('message', message => {
    const responses = {
        'مرحبا': 'أهلاً بيك 👋',
        'سعر': 'تبدأ من 300 جنيه API ,أسعار مواقع تبدأ من 200 جنيه, التطبيقات تبدأ من 150 جنيه 💰',
        'سلام': 'مع السلامة ❤️'
    };

    message.reply(responses[message.body.toLowerCase()] || 'سيتم التواصل معك في اقرب وقت 🕟');
});

client.initialize();
