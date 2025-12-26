const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({clientId: "bot1"}), // يحفظ تسجيل الدخول
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

    if (msg === 'اسعار') {
        message.reply('أسعار مواقع تبدأ من 500 جنيه, التطبيقات تبدأ من 400 جنيه, API تبدأ من 600 جنيه 💰');
    }

    if (msg === 'سلام') {
        message.reply('مع السلامة ❤️');
    }
});

client.initialize();
