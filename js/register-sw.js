if ("serviceWorker" in navigator){
    window.addEventListener("load",()=>{
        navigator.serviceWorker
        .register("service-worker.js")
        .then(()=>{
            console.log("Pendaftaran ServiceWroker berhasil");
        })
        .catch(error=>{
            console.error("Pendaftaran ServiceWorker Gagal",error);
        })
    });
}
else {
    console.log("ServiceWorker belum didukung di browser ini.");
}

// Request permission notifikasi

    if ('Notification' in window){
        Notification.requestPermission()
        .then(result=>{
            if(result==="denied"){
                console.log("Fitur notifikasi tidak diijinkan");
                return;
            } else if (result==="default"){
                console.log.error("Pengguna menutup kotak permintaan");
                return;
            }
            if (('PushManager' in window)){
                navigator.serviceWorker.getRegistration()
                .then(registration=>
                {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BMY2H-PhWtodtUDeEeH-dYeOGV1iQFtdnfZRBOugiXyHwKephyHz1tHkWZVl3o9UphnoyPf0iJNYBVxbS491XEY")
                    })
                    .then(subscribe=>{
                        console.log('Berhasil Melakukan Subscribe dengan endpoint: ', subscribe.endpoint);
                        console.log('Berhasi Melakukan Subscribe dengan p256dh key: ',btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log('Berhasil Melakukan Subscribe dengan Auth Key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('auth')))));
                    }).catch(e=>{
                        console.error('Tidak dapat melakukan subscribe ', e.message);
                    });
                });
            }

            navigator.serviceWorker.getRegistration()
            .then(reg=>{
                reg.showNotification("Notifikasi Diijinkan");
            });
        });
    }

    function urlBase64ToUint8Array(base64String){
        const padding = '='.repeat((4-base64String.length % 4)% 4)
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array (rawData.length);
        for (let i = 0; i< rawData.length; i++){
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }


    
