const CACHE_NAME = 'my-site-cache-v1';
// ضع هنا مسارات جميع الملفات التي تريد تشغيلها بدون إنترنت
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css', // تأكد من تعديل المسار حسب مجلداتك
  '/js/main.js',    // تأكد من تعديل المسار حسب مجلداتك
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// 1. مرحلة التثبيت: تخزين الملفات الأساسية في الكاش
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('جاري تخزين الملفات في الكاش...');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. مرحلة جلب البيانات: عرض الملفات من الكاش في حال انقطاع الإنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا كان الملف موجوداً في الكاش، قم بعرضه، وإلا اجلبه من الإنترنت
        return response || fetch(event.request);
      })
  );
});