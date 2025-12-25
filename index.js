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
    console.log('امسح QR من واتساب');
});

client.on('ready', () => {
    console.log('✅ البوت اشتغل بنجاح');
});

client.on('message', message => {
    const msg = message.body.toLowerCase();

    if (msg === 'مرحبا') {
        message.reply('أهلاً بيك 👋');
    }
    else if (msg === 'سعر') {
        message.reply('تبدأ من 300 جنيه API ,أسعار مواقع تبدأ من 200 جنيه, التطبيقات تبدأ من 150 جنيه 💰');
    }
    else if (msg === 'سلام') {
        message.reply('مع السلامة ❤️');
    }
    else {
        message.reply('سيتم التواصل معك في اقرب وقت 🕟');
    }
});

client.initialize();
