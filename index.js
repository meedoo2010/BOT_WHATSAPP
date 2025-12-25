const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode'); // مكتبة qrcode لإنشاء كود QR كـ URL

const client = new Client({
    authStrategy: new LocalAuth(), // يحفظ تسجيل الدخول
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', qr => {
    // توليد كود QR وتحويله إلى رابط قابل للنسخ
    qrcode.toDataURL(qr, (err, url) => {
        if (err) {
            console.log('Error generating QR:', err);
            return;
        }
        console.log('From WhatsApp, scan the following URL:');
        console.log(url); // عرض رابط QR قابل للنسخ
    });
});

client.on('ready', () => {
    console.log('✅ The bot worked successfully');
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
