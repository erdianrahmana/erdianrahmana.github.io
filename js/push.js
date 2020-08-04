const webPush = require('web-push');
const vapidKeys = {
    "publicKey":"BMY2H-PhWtodtUDeEeH-dYeOGV1iQFtdnfZRBOugiXyHwKephyHz1tHkWZVl3o9UphnoyPf0iJNYBVxbS491XEY",
    "privateKey": "mYeirOHkPavoLBryo20hTedPhM9FpNi9I9iz3tS1mN8"
};

webPush.setVapidDetails(
    'mailto: rahmana502@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription={
    "endpoint" : " https://fcm.googleapis.com/fcm/send/cQJraBlRYxg:APA91bEwG04wYW69rLLI7WL0VNvtF5ueAikawDuhP5vTY6-DsNiZ905TdEATVumXKeuLWFzYOHMBNhcC726iUuCJb1EHsoe4vehI0UudTAvh2BrqZqDm-l9ofy6E-QMGRlGOLgChoyen",
    "keys": {
        "p256dh" : "BML1Hh9Bfjru/JZNUSSSauRo/GT8hnYjbhuAeV6rNt4O9mpJO5b6LLRdfRxXP35GNf7rFnZO9e2ihSjIn4seVJw=",
        "auth" : "Awn+qA3A40OFmfvezKBnCA=="
    }
};

let payload = "Premier League Point - PWA, By Erdian";

let options ={
    gcmAPIKey : '278440300519',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
)