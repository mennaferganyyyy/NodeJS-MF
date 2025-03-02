require('dotenv').config({ path: './config.env' });

const express = require('express');
const morgan = require('morgan');

const dbConnection = require('./config/database');
const categoryRoutes = require('./routes/categoryRout'); // ✅ تصحيح التسمية

// اتصال بقاعدة البيانات
dbConnection();

// تأكيد قراءة DB_URI
console.log("DB_URI from env file:", process.env.DB_URI);

if (!process.env.DB_URI) {
    console.error("❌ Database URI is missing. Make sure config.env is loaded correctly.");
    process.exit(1);
}

// إنشاء التطبيق
const app = express();

// ✅ الـ Middlewares
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`🚀 Running in mode: ${process.env.NODE_ENV}`);
}

// ✅ تصحيح استدعاء الراوت
app.use('/api/v1/categories', categoryRoutes);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`🔥 App running on port ${PORT}`);
});
