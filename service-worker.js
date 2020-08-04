importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
console.log(`Workbox berhasil dimuat`);
else
console.log(`Workbox gagal dimuat`);


workbox.precaching.precacheAndRoute([
    {url:'/index.html',revision: '1'},
    {url:'/nav.html',revision: '1'},
    {url:'/css/materialize.min.css',revision: '1'},
    {url:'/css/style.css',revision: '1'},
    {url:'/js/db.js',revision: '1'},
    {url:'/js/idb.js',revision: '1'},
    {url:'/js/materialize.min.js',revision: '1'},
    {url:'/js/materialize.min.js',revision: '1'},
    {url:'/js/script.js',revision: '1'},
    {url:'/js/script-club-detail.js',revision: '1'},
    {url:'/manifest.json',revision: '1'},
    {url:'/club-detail.html',revision: '1'},
    {url:'/img/icon/logo.png',revision: '1'},
    {url:'/img/icon/icon.png',revision: '1'},
    {url:'/img/icon/stadium.png"',revision: '1'},
    
],{

ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'api-football'
    })
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'image',
        plugins:[
            new workbox.cacheableResponse.Plugin({
                statuses:[0,200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60*60*24*30,
                maxEntries: 100,
            })
        ]
    })   
    );

workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'js-css',
    })
)


self.addEventListener('push',function(event){
    let body;
    if (event.data){
        body = event.data.text();
    } 
    else {
        body = "Push Massage No PayLoad";
    }
    let options = {
        body : body,
        icon : 'img/icon/icon.png',
        vibrate : [100,50,100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey : 1
        } 
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    )
})
