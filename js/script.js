let saveMatch = id=>{
    let itemMatch = getMatchById(`matches/${id}`);
    itemMatch
    .then(match=>{
     saveForLater(match,"match");
})
}

let saveTim=(name,id,)=>{
    let itemTim = getClubById(id);
    itemTim
    .then(tim=>{
        
     saveForLater(tim,"tim",name);
})
}

let deleteTim= (name,id)=>{
    deleteIndexedDb("tim",id,name);
}

let deleteMatch=(id)=>{
    deleteIndexedDb("match",id);
}
let timDisplay = ()=>{  
 tim.style.display="block";
 match.style.display="none";
}                
let  matchDisplay= ()=>{  
tim.style.display="none";
match.style.display="block";
}

let klasemenDisplay=()=>{
klasemen.style.display="block";
topScore.style.display="none";
}
let topScoreDisplay=()=>{
klasemen.style.display="none";
topScore.style.display="block";
}

