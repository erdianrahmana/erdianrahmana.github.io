document.addEventListener("DOMContentLoaded", ()=>{
    // Active sidebar nav, ketika tombol burger ditekan (bawaan materialize)
    const elems= document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);

    loadNav();

    function loadNav(){
        let xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function(){
        
            if(this.readyState===4){
                if (this.status !== 200) return;
            
            // Muat daftar tautan menu
            document.querySelectorAll(".topnav, .sidenav").forEach(function(elm){
                elm.innerHTML = xhttp.responseText;
            });

            // Daftarkan event listener untuk setiap tautan menu
            document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm){
                elm.addEventListener("click",function(event){
                    // Tutup Sidenav
                    const sidenav= document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();

                    // Muat Content halaman yang dipanggil
                    page = event.target.getAttribute("href").substr(1);
                    // console.log(page);
                    loadPage(page);

                })
            })
            }
        };
        xhttp.open("GET","nav.html",true);
        xhttp.send();
    }


    
    function tanggal (tanggal){
        let dd = tanggal.getDate();
    
        let mm = tanggal.getMonth()+1; 
        let yyyy = tanggal.getFullYear();

        if(dd<10) 
        {
            dd='0'+dd;
        } 
        
        if(mm<10) 
        {
            mm='0'+mm;
        } 
        return `${yyyy}-${mm}-${dd}`;
    }

    const inputHari = 3 //Contoh aja hehe
    let hariKedepan = new Date(new Date().getTime()+(inputHari*24*60*60*1000)); // 1000 ini buat pengkalian milisecondnya date object
    hariKedepan = tanggal(hariKedepan);
    let hariSebelum = new Date(new Date().getTime()-(inputHari*24*60*60*1000));
    hariSebelum = tanggal(hariSebelum);
    
    // console.log(hariSebelum);


    
    

    // Load Page Content
    let page = window.location.hash.substr(1);
    if (page ==="") page = "home";
    loadPage(page);

    function loadPage(page){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange= function(){
            if(this.readyState=== 4){
                const content= document.querySelector("#body-content");
                if (this.status=== 200){
                    content.innerHTML=xhttp.responseText;
                    if (page==='home'){
                        const slider = document.querySelectorAll(".slider");
                        M.Slider.init(slider);
                        getKlasemen();
                        const itemMatch = getMatch(`competitions/2021/matches?dateFrom=${hariSebelum}&dateTo=${hariKedepan}`,"Matches-container");
                        
                    }
                    else if(page==='team'){
                        getTeam();
                    }
                    else if(page==='save'){
                        getSavedTim();
                        timDisplay();    
                    }
                    else if(page==='klasemen'){
                        getKlasemen();
                        getScorers();
                        klasemenDisplay()
                    }

                }
                else if( this.status===404){
                    content.innerHTML ="<p>Halaman Tidak Ditemukan</p>";
                }
                else{
                    content.innerHTML="<p>Ups.. Halaman tidak dapat diakses</p>"
                }
            }
        }
    xhttp.open("GET",`pages/${page}.html`,true);
    xhttp.send();
    }
})