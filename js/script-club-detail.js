// Script bagian halaman club detail 

document.addEventListener("DOMContentLoaded",()=>{

  const urlParams = new URLSearchParams(window.location.search);
  const isFromSaved = urlParams.get("saved");
  let idParam = urlParams.get("id");
  const btnSave= document.getElementById("save");
  const btnDelete =document.getElementById("delete");

  const item = getClubById();
  if (isFromSaved){
    // menyembunyikan tombol fab

    btnSave.style.display='none';
    btnDelete.style.display='block';
    getSavedTimById(idParam);
    console.log("dari save");

  //   btnDelete.onclick=()=>{
  //     btnDelete.style.display='none';
  //     btnSave.style.display='block';
  //     item
  //   .then(tim=>{
  //     deleteIndexedDb("tim",tim.id);      
  //   })
  // }
  } 
  else if(isFromSaved==null) {
    btnDelete.style.display='none';

    console.log("tidak dari save");


  }

  btnDelete.onclick=()=>{
    btnDelete.style.display='none';
    btnSave.style.display='block';
    item
  .then(tim=>{
    deleteIndexedDb("tim",tim.id);      
  })}

    btnSave.onclick=()=>{ 
      btnDelete.style.display='block';
      btnSave.style.display='none';

    item
    .then(tim=>{
      saveForLater(tim,"tim");
    })  
  }
  
  getMatch(`teams/${idParam}/matches?status=SCHEDULED`,'next-match');
  
  })

  let saveMatch=id=>{          
            let itemMatch = getMatchById(`matches/${id}`);
            itemMatch
            .then(match=>{
             saveForLater(match,"match");
      })
        }
  const info = document.querySelector('#info');
  const squad = document.querySelector('#squad');
  const nextmatch = document.querySelector('#nextmatch');
  
tabId = [info,squad,nextmatch];
tabDisplay(info);
function tabDisplay (tab){  
    for(let i=0; i<=2; i++){
      console.log(tabId[i]);
      tabId[i].style.display="none";
    }
    tab.style.display="block";
  }