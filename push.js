var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BDc1rx4F_Gd2anygj7RitO2_MrQPeggmR9305YQOuKrT8kJ0yIqAuJ2oLbSyyu4E1bVmqxQCn7ifqc7ACR40ZZM",
   "privateKey": "xQuO4sMwMAILAcNhs9iA6xieG0pfsiICYnInw843daA"
};
 
 
webPush.setVapidDetails(
   'mailto:fahmi243alfath@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dxsUZvXttgw:APA91bFVkFzAOWiUonpruX0vW0hej3y7mYGpzPDYiBf9pv2fNHktZtsS08SAKfBDLvOWQUxG3o_TN5UAHHMlksIWvrGBRoEwLI1D_dmPYW8y6StBhT0to1JMwi3kXHlOQoKhGiHhQai2",
   "keys": {
       "p256dh": "BMDuTbue5g5nkA0OZDpkKcylAU4fwunS050i7ERgHBXJyn7Teq5PKu7bBzZY+ykoxC4CLhk7guN5ujC+DxMe3L8=",
       "auth": "H7icgQywy4A6aj0hxNrguA=="
   }
};
var payload = 'Congratulations! This app now can use push notifications!';
 
var options = {
   gcmAPIKey: '1013511244177',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);