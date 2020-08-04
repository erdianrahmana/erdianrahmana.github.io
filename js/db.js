// Membuat database

let dbPromised = idb.open("PL-Point",1,upgradeDb=>{
    let timObjectStore = upgradeDb.createObjectStore("tim",{
        keyPath: "id"
    });
timObjectStore.createIndex("name","name",{unique: false});

let matchObjectStore = upgradeDb.createObjectStore("match",{
    keyPath: "id"
});

});

// operasi simpan tim

let saveForLater = (isiDb,dbname, namaTim)=>{
  if(namaTim===undefined){
    namaTim="";
  }
    dbPromised
        .then((db)=>{
            let tx= db.transaction(dbname,"readwrite");
            let store = tx.objectStore (dbname);
            console.log(isiDb);
            console.log(dbname);
            if(dbname==="match"){
            store.add(isiDb.match);
             }
             else if (dbname==="tim"){
                store.add(isiDb);
             }
            
            return tx.complete;
        })
        .then(()=>{
            M.toast({html: `${dbname} ${namaTim} berhasil disimpan`});
        })
        .catch(()=>{
            M.toast({html: `${dbname} ${namaTim}  gagal / sudah pernah disimpan`});
        })
}

// mengambil semua data indexed db

let getAll=dbName=>{
    return new Promise((resolve,reject)=>{
        dbPromised
            .then(db=>{
                let tx= db.transaction(`${dbName}`,"readonly");
                let store = tx.objectStore (`${dbName}`);
                return store.getAll();
              })
            .then(dataDb=>{
                console.log(dataDb);
                resolve(dataDb);
            })
    })
}

// mengambil berdasarkan id

let getById = id=>{
    return new Promise((resolve, reject)=> {
      dbPromised
        .then(db=>{
            
          let tx = db.transaction("tim", "readonly");
          let store = tx.objectStore("tim");
          
          let id2=Number(id);
          console.log(id2);
          return store.get(id2);
        })
        .then(tim=>{
            console.log(tim);
          resolve(tim);
        });
    });
  }
//   mengapus data
let deleteIndexedDb=(dbName,id,namaTim )=>{
  if (namaTim===undefined){
    namaTim="";
  }
dbPromised
.then(db=>{
    console.log(id);
    let tx = db.transaction(`${dbName}`, "readwrite");
    let store = tx.objectStore(`${dbName}`);
    let id2=Number(id);
    store.delete(id2);
    return tx.complete;
  }).then(()=>{
    M.toast({html: `${dbName} ${namaTim} berhasil dihapus`});
    getSavedTim();
  })
  .catch(()=>{
    M.toast({html: `${dbName} ${namaTim}  gagal / sudah pernah disimpan`});
})
}