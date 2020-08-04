// const { resolve } = require("path");

const base_url = "https://api.football-data.org/v2/"
const option = {headers: {
    "X-Auth-Token" : "15692ae50c274fa097125012e9609ba1"
    
}}

const fetchApi = url =>{
  return fetch(`${base_url}${url}`,{
    headers:{
      "X-Auth-Token" : "15692ae50c274fa097125012e9609ba1"
    }
  })
}

     

const URLParams = new URLSearchParams(window.location.search);
const idParam = URLParams.get("id");

let status =(response)=>{
    // console.log(response);
    if (response.status != 200){
        console.log("Error : "+response.status);
       return  Promise.reject(new Error(response.statusText));
    }else{
        return Promise.resolve(response);
    }
} 

let JSON =(response)=>{
    return response.json();
}

// let JSON = (response)=> response.json();
let error = (error) => console.error("Error : " + error)
let logo ={};

let klasemenFunc=data=>{
  console.log('mengabil data dari server')
  let KlasemenHTML ="";
  data.standings[0].table.forEach(m=>{
    KlasemenHTML += `
    <tr>
        <td>${m.position}</td>
        <td><img style="height: 25px;" src=${m.team.crestUrl}  alt="logo tim ${m.team.name}"></td>
        <td>${m.team.name}</td>
        <td>${m.points}</td>
      </tr>
        `
        logo[m.team.name.slice(0,(m.team.name.indexOf(" ")))] = m.team.crestUrl;
  })
  document.getElementById('tabel-klasemen').innerHTML= KlasemenHTML
}

let matchFunc=(data,innerId)=>{
  let MatchesHTML ="";

if(data.count===0){
   MatchesHTML= "<h6 class='center tidak-ada-match' '>Tidak Ada Match</h6>";

}
else if (data.count!==0){
  data.matches.forEach(m=>{
    if (m.score.fullTime.homeTeam===null||m.score.fullTime.awayTeam===null){
      m.score.fullTime.homeTeam=""
      m.score.fullTime.awayTeam=""
    }
    if (logo[m.homeTeam.name.slice(0,(m.homeTeam.name.indexOf(" ")))]=== undefined || logo[m.awayTeam.name.slice(0,(m.awayTeam.name.indexOf(" ")))] === undefined){
      logo[m.homeTeam.name.slice(0,(m.homeTeam.name.indexOf(" ")))] ='/img/icon/icon.png';
      logo[m.awayTeam.name.slice(0,(m.awayTeam.name.indexOf(" ")))] ='/img/icon/icon.png'
    }
    
    // console.log (logo[m.homeTeam.name.slice(0,(m.homeTeam.name.indexOf(" ")))])
      // console.log(m.id);
      MatchesHTML += `
                    
      <div class="card card-match" >
        <div class="card-content">              
            <a class="btn-floating halfway-fab match waves-effect waves-light red " onclick="saveMatch('${m.id}')"><i class="material-icons">add</i></a>
          <table >
            <tbody>
              <tr>
                <td><img style="height: 25px;" src="${logo[m.homeTeam.name.slice(0,(m.homeTeam.name.indexOf(" ")))]}" alt="logo ${m.homeTeam.name}"></td>
                <td><p><strong><a href="club-detail.html?id=${m.homeTeam.id}">${m.homeTeam.name}</a></strong></p></td>
                <td><p><strong>${m.score.fullTime.homeTeam}</strong></p></td>
                <td rowspan="3" class="center" style="border-left: 0.5px solid rgba(0,0,0,0.12);"><strong>${m.status}</strong><br>${m.utcDate.slice(0,(m.utcDate.indexOf("T")))}<br>${m.utcDate.slice((m.utcDate.indexOf("T")+1),(m.utcDate.indexOf("Z")))}</td>
              </tr>
              <tr >
                <td></td>
                <td  colspan="2">VS</td>
              </tr>
              <tr>
                <td><img style="height: 25px;" src="${logo[m.awayTeam.name.slice(0,(m.awayTeam.name.indexOf(" ")))]}" alt="logo ${m.awayTeam.name}"></td>
                <td><p><strong><a href="club-detail.html?id=${m.awayTeam.id}">${m.awayTeam.name}</a></strong></p></td>
                <td><strong>${m.score.fullTime.awayTeam}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div> 
      `

  })}
  // 'Matches-container'
  document.getElementById(innerId).innerHTML= MatchesHTML
}

let teamFunc=data=>{
  let TeamHTML ="";
          data.teams.forEach(m=>{
            // console.log(`mengambil data ${m.name} dari server`)
              // console.log(m);
              let warna = (m.clubColors.slice(0,(m.clubColors.indexOf(" ")))).toLowerCase() ;
         TeamHTML += `
          <div class="col l4 m6 s12">
              <div class="card card-team  ${warna} white-text">
                  <div class="card-image">
                    <img src="${m.crestUrl}" class="image-content" alt="logo tim ${m.name}">
                    
                    <a class="btn-floating halfway-fab waves-effect waves-light red" onclick="saveTim('${m.name}',${m.id})"><i class="material-icons">add</i></a>
                  </div>
                  <div class="card-content center" >
                    <span class="card-title"><strong>${m.name}</strong></span>
                    <p>Club Inggris yang bermarkas di ${m.venue}</p>
                    <a href="./club-detail.html?id=${m.id}">Lihat Detail</a>
                  </div>
              </div>       
          </div>
              `
          })
          document.getElementById('team-list').innerHTML= TeamHTML
}

let scorersFunc= data=>{
  let no = 0 ;
  let ScorersHTML ="";
  data.scorers.forEach(m=>{
      // console.log(m);
      
 ScorersHTML += `
<tr>
 <td>${no+=1}</td>
 <td>${m.player.name}</td>
 <td>${m.numberOfGoals}</td>
</tr>
      `
  })
  document.getElementById('scorers-table').innerHTML= ScorersHTML
}

let clubByIdFunc=data=>{
  let warna = (data.clubColors.slice(0,(data.clubColors.indexOf(" ")))).toLowerCase() ;
  let detailHeaderHTML ="";
  // console.log(`mengambil data ${data.name} dari cahce`)
   detailHeaderHTML += `
   <div class="card-panel detail-card ${warna} white-text center ">
   <div class="detail-logo">
      <img src="${data.crestUrl}" class="image-content"  alt="logo tim ${data.name}">
   </div>   
   <div id="info-detail" >
    <h3>${data.name}</h3>
      
   <div class="row">
     <div class="col s12 ">
       <figure>
         <img src="/img/icon/stadium.png" style="height:20px" alt="stadium">
         <figcaption>${data.venue}</figcaption>
         </figure>
     </div>
   </div>
   </div>
        `
    
    document.getElementById('info-detail-header').innerHTML= detailHeaderHTML

   let infoHTML = `
   <h5>Info</h5>
    <p>${data.name} atau ${data.shortName} adalah sebuah club dari Inggris yang berbasis di ${data.venue}. Didirikan pada tahun ${data.founded} klub ini ber-alamat di ${data.address}. Klub ini memiliki warna khas ${data.clubColors}</p>
    <h6>Contact:</h6>
    <div class="table">
    <table>
      <tr style="border-bottom: none;">
        <th>Website:</th>
        <td>${data.website}</td>
      </tr>
      <tr style="border-bottom: none;">
        <th>Email:</th>
        <td>${data.email}</td>
      </tr>
      <tr style="border-bottom: none;"> 
        <th>Phone: </th>
        <td>${data.phone}</td>
      </tr>
    </table>  
    </div>
   `
   document.getElementById('info').innerHTML= infoHTML 

    let squadHTML =''
    data.squad.forEach(m=>{
      if (m.shirtNumber ===null){m.shirtNumber = "-"}
      if (m.position=== null){m.position="Coach"}
      squadHTML += `
      <tr>
        <td>${m.name}</td>
        <td>${m.position}</td>
        <td>${m.shirtNumber}</td>
        <td>${m.nationality}</td>
      </tr>
      `
      })

      document.getElementById('squad-table').innerHTML= squadHTML 
}

let getKlasemen=()=> {
  if ('caches' in window){
    caches.match(`${base_url}competitions/2021/standings`).then(response=>{
      if(response){
       
        response.json().then(data=>{
          klasemenFunc(data);
        })
        .catch(error);
      }
    })
  }
  fetchApi("competitions/2021/standings")
      .then(status)
      .then(JSON)
      .then((data)=> {
   
        klasemenFunc(data);
        // console.log(`${base_url}competitions/2021/standings`);
        
      }) 
      .catch(error);
}

let getMatch = (URL,innerId)=> {
  return new Promise((resolve,reject)=>{
  if ('caches' in window){
    caches.match(base_url+URL,option).then(response=>{
      if(response){
        response.json().then(data=>{
          console.log(data.count);
          matchFunc(data,innerId);
          resolve(data);
        })
        .catch(error);
      }
    })
  }

        fetchApi(URL)
        .then(status)
        .then(JSON)
        .then((data)=> {

           matchFunc(data,innerId);
            resolve(data);
        }) 
        .catch(error);
  });
}

let getMatchById = (URL)=>{
  return new Promise((resolve,reject)=>{
    // fetch(base_url+URL,option)
    fetchApi(URL)
    .then(status)
    .then(JSON)
    .then(data=> {
      resolve(data);
    })
  })

}

let getTeam=()=> {

  if ('caches' in window){
    caches.match(`${base_url}competitions/2021/teams`).then(response=>{
      if(response){
        response.json().then(data=>{
          teamFunc(data);
        })
        .catch(error);
      }
    })

  }

  // fetch(base_url+"competitions/2021/teams",option)
  fetchApi("competitions/2021/teams")
      .then(status)
      .then(JSON)
      .then((data)=> {
          teamFunc(data);
      }) 
      .catch(error);
}

let getScorers=()=> {
  if('caches' in window){
    caches.match(`${base_url}competitions/2021/scorers`).then(response=>{
      if(response){
        response.json().then(data=>{
          scorersFunc(data);
        })
        .catch(error);
      }
    })
  }
  // fetch(`${base_url}`,option)
  fetchApi("competitions/2021/scorers")
      .then(status)
      .then(JSON)
      .then((data)=> {
        scorersFunc(data);
      }) 
      .catch(error);
}

let getClubById=(id)=>{

  return new Promise((resolve,reject)=>{
    // Ambil nilai query parameter (?id=)
    let URLParams = new URLSearchParams(window.location.search);
    let idParam = URLParams.get("id");
    if(idParam=== null){
    idParam = id;}

  if('caches' in window){
    caches.match(`${base_url}teams/${idParam}`).then(response=>{
      if(response){
        response.json()
        .then((data)=>{
          resolve(data);
          clubByIdFunc(data);
            // Kririm objek data hasil parsing json agar disimpan ke indexed db
            
          })
          .catch(error);
      }
    })
  }



// fetch(``,option)
fetchApi(`teams/${idParam}`)
      .then(status)
      .then(JSON)
      .then((data)=> {
        resolve(data);
        clubByIdFunc(data);
            
      }) 
      .catch(error);
    });

}

let getSavedTim=()=>{
  getAll("tim")
  .then(tim=>{
    console.log(tim[0]);
    let timHTML="";
    if(tim[0]===undefined){
    timHTML="Tidak Ada Tim Yang Anda Simpan"
    }
    // console.log(tim);
    // Menyusun Komponen Card
    else{
    tim.forEach(m=>{
      let warna = (m.clubColors.slice(0,(m.clubColors.indexOf(" ")))).toLowerCase() ;
      timHTML += `
        <div class="col l4 m6 s12">
            <div class="card card-team  ${warna} white-text">
                <div class="card-image">
                  <img src="${m.crestUrl}" class="image-content"  alt="logo tim ${m.name}">
                  
                  <a class="btn-floating halfway-fab waves-effect waves-light red" onclick="deleteTim('${m.name}',${m.id})"><i class="material-icons">delete</i></a>
                </div>
                <div class="card-content center" >
                  <span class="card-title"><strong>${m.name}</strong></span>
                  <p>Club Inggris yang bermarkas di ${m.venue}</p>
                  <a href="./club-detail.html?id=${m.id}&saved=true">Lihat Detail</a>
                </div>
            </div>       
        </div>
            `
    });}
    document.getElementById('team-list-save').innerHTML= timHTML;
  })
  .catch(error);

  getAll("match")
  .then(match=>{
    let matchHTML="";
    console.log(match[0])
    if(match[0]===undefined){
      matchHTML="Tidak Ada Match Yang Anda Simpan"
      }
    else{
    match.forEach(m=>{
      if (m.score.fullTime.homeTeam===null||m.score.fullTime.awayTeam===null){
        m.score.fullTime.homeTeam=""
        m.score.fullTime.awayTeam=""
      }
      if (logo[m.homeTeam.name.slice(0,(m.homeTeam.name.indexOf(" ")))]=== undefined || logo[m.awayTeam.name.slice(0,(m.awayTeam.name.indexOf(" ")))] === undefined){
        logo[m.homeTeam.name.slice(0,(m.homeTeam.name.indexOf(" ")))] ='/img/icon/icon.png';
        logo[m.awayTeam.name.slice(0,(m.awayTeam.name.indexOf(" ")))] ='/img/icon/icon.png'
      }
      matchHTML += `
      <div class="card card-match" >
      <div class="card-content">              
          <a class="btn-floating halfway-fab match waves-effect waves-light red " onclick="deleteMatch(${m.id})"><i class="material-icons">delete</i></a>
        <table >
          <tbody>
            <tr>
              <td><img style="height: 25px;" src="${logo[m.homeTeam.name.slice(0,(m.homeTeam.name.indexOf(" ")))]}" alt="logo ${m.homeTeam.name}"></td>
              <td><p><strong><a href="club-detail.html?id=${m.homeTeam.id}">${m.homeTeam.name}</a></strong></p></td>
              <td><p><strong>${m.score.fullTime.homeTeam}</strong></p></td>
              <td rowspan="3" class="center" style="border-left: 0.5px solid rgba(0,0,0,0.12);"><strong>${m.status}</strong><br>${m.utcDate.slice(0,(m.utcDate.indexOf("T")))}<br>${m.utcDate.slice((m.utcDate.indexOf("T")+1),(m.utcDate.indexOf("Z")))}</td>
            </tr>
            <tr >
              <td></td>
              <td  colspan="2">VS</td>
            </tr>
            <tr>
              <td><img style="height: 25px;" src="${logo[m.awayTeam.name.slice(0,(m.awayTeam.name.indexOf(" ")))]}" alt="logo ${m.awayTeam.name}"></td>
              <td><p><strong><a href="club-detail.html?id=${m.awayTeam.id}">${m.awayTeam.name}</a></strong></p></td>
              <td><strong>${m.score.fullTime.awayTeam}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div> 
    `
    })}
    document.getElementById("match-save").innerHTML= matchHTML
  })

}

let getSavedTimById=(id)=>{
  let urlParams = new URLSearchParams(window.location.search);
  // let idParam = urlParams.get("id");
  // console.log(id);

  getById(id,"tim")
  .then(data=>{
    // console.log(data);
    let warna = (data.clubColors.slice(0,(data.clubColors.indexOf(" ")))).toLowerCase() ;

    let detailHeaderHTML ="";
    // console.log(`mengambil data ${data.name} dari cahce`)
     detailHeaderHTML += `
     <div class="card-panel detail-card ${warna} white-text center ">
     <div class="detail-logo">
        <img src="${data.crestUrl}" class="image-content"  alt="logo tim ${data.name}">
     </div>   
     <div id="info-detail" >
      <h3>${data.name}</h3>
        
     <div class="row">
       <div class="col s12 ">
         <figure>
           <img src="/img/icon/stadium.png" style="height:20px" alt="stadium">
           <figcaption>${data.venue}</figcaption>
           </figure>
       </div>
     </div>
     </div>
          `
      
      document.getElementById('info-detail-header').innerHTML= detailHeaderHTML

      let infoHTML = `
         <h5>Info</h5>
          <p>${data.name} atau ${data.shortName} adalah sebuah club dari Inggris yang berbasis di ${data.venue}. Didirikan pada tahun ${data.founded} klub ini ber-alamat di ${data.address}. Klub ini memiliki warna khas ${data.clubColors}</p>
          <h6>Contact:</h6>
          <div class="table">
          <table>
            <tr style="border-bottom: none;">
              <th>Website:</th>
              <td>${data.website}</td>
            </tr>
            <tr style="border-bottom: none;">
              <th>Email:</th>
              <td>${data.email}</td>
            </tr>
            <tr style="border-bottom: none;"> 
              <th>Phone: </th>
              <td>${data.phone}</td>
            </tr>
          </table>  
          </div>
         `
         document.getElementById('info').innerHTML= infoHTML 

         let squadHTML =''
          data.squad.forEach(m=>{
            if (m.shirtNumber ===null){m.shirtNumber = "-"}
            if (m.position=== null){m.position="Coach"}
            squadHTML += `
            <tr>
              <td>${m.name}</td>
              <td>${m.position}</td>
              <td>${m.shirtNumber}</td>
              <td>${m.nationality}</td>
            </tr>
            `
            })

            document.getElementById('squad-table').innerHTML= squadHTML 

           


  })
}

