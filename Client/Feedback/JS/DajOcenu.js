import { Poslodavac } from "../../Poslodavac/JS/Poslodavac.js";
import { Ugovor } from "../../Ugovor/JS/Ugovor.js";
import { Zadrugar } from "../../Zadrugar/JS/Zadrugar.js";
import { Zadruga } from "../../Zadruga/JS/Zadruga.js";
import { Oglas } from "../../Oglas/JS/Oglas.js";

const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //username poslodavca  
var zadrugaUrl = urlParam.get('zadruga'); //username zadruga 
var zadrugarUrl = urlParam.get('zadrugar'); //username zadrugar
var poslodavacUrl = urlParam.get('poslodavac'); //username poslodavac

let Naslov = document.querySelector(".Naslov");
let zvezdice = document.querySelector(".zvezdice");
let Posle = document.querySelector(".PosleOcene");
let text = document.querySelector(".Komentar");
let error = document.querySelector(".error");
let stars = document.querySelectorAll(".zvezda");


stars.forEach(s=>{
    s.addEventListener("click",function(){
        let oceniDugme = document.querySelector(".oceniDugme");
        oceniDugme.style.display="block";
        oceniDugme.onmousedown=null;
        oceniDugme.addEventListener("click",function(){
            
            if(text.value===""){
                error.style.display = "block";
                text.value="";
            }
            else{   


                fetch("http://localhost:5258/Zadrugar/ValidanUsername/"+username)//proveri jel ima takav zadrugar
                .then( p=> {
                        if(p.status===200){
                            //zadrugar daje ocenu zadruzi
                            if(zadrugaUrl !== null  && poslodavacUrl==null && zadrugarUrl==null){
                                p.json().then(zadrugar =>{
                                    let poruka = `Zadrugar "${zadrugar.ime} ${zadrugar.prezime}" Vam je dao ocenu ${s.value} i ostavio komentar: ${text.value}`;
                                    fetch(`http://localhost:5258/Notifikacija/DodajNotifikacijuZaZadruguUsername/${poruka}/${zadrugaUrl}`,            
                                    {
                                        method: "POST"
                                    });
                                });
                                zadrugarOcenjujeZadrugu(s.value).then(p=> {
                                    if(p.ok){
                                        location.reload();
                                    }
                                    else
                                    {
                                        console.log("greska");
                                    }}
                                )
                                .catch(s=>console.log(s));
                            }
                            //zadrugar daje ocenu poslodavcu
                            if(zadrugaUrl == null  && poslodavacUrl!==null && zadrugarUrl==null){
                                p.json().then(zadrugar =>{
                                    let poruka = `Zadrugar "${zadrugar.ime} ${zadrugar.prezime}" Vam je dao ocenu ${s.value} i ostavio komentar: ${text.value}`;
                                    fetch(`http://localhost:5258/Notifikacija/DodajNotifikacijuZaPoslodavcaUsername/${poruka}/${poslodavacUrl}`,            
                                    {
                                        method: "POST"
                                    });
                                });
                                zadrugarOcenjujePoslodavca(s.value).then(p=> {if(p.ok){location.reload()}else{console.log("greska")}}
                                )
                                .catch(s=>console.log(s));
                            }
                        }
                        else{
                            fetch("http://localhost:5258/Zadruga/ValidanUsername/"+username)        //proveri jel ima takva zadruga
                            .then( p=> {
                                    if(p.status===200){
                                        //zadruga daje ocenu poslodavca
                                        if(zadrugaUrl == null  && poslodavacUrl!==null && zadrugarUrl==null){
                                            p.json().then(zadruga =>{
                                                let poruka = `Zadruga "${zadruga.naziv}" Vam je dala ocenu ${s.value} i ostavila komentar: ${text.value}`;
                                                fetch(`http://localhost:5258/Notifikacija/DodajNotifikacijuZaPoslodavcaUsername/${poruka}/${poslodavacUrl}`,            
                                                {
                                                    method: "POST"
                                                });
                                            });
                                            zadrugaOcenjujePoslodavca(s.value).then(p=> {if(p.ok){location.reload()}else{console.log("greska")}}
                                            )
                                            .catch(s=>console.log(s));
                                        }
                                        //zadruga daje ocenu zadrugaru
                                        if(zadrugaUrl == null  && poslodavacUrl==null && zadrugarUrl!==null){
                                            p.json().then(zadruga =>{
                                                let poruka = `Zadruga "${zadruga.naziv}" Vam je dala ocenu ${s.value} i ostavila komentar: ${text.value}`;
                                                fetch(`http://localhost:5258/Notifikacija/DodajNotifikacijuZaZadrugaraUsername/${poruka}/${zadrugarUrl}`,            
                                                {
                                                    method: "POST"
                                                });
                                            });
                                            zadrugaOcenjujeZadrugara(s.value).then(p=> {if(p.ok){location.reload()}else{console.log("greska")}}
                                            )
                                            .catch(s=>console.log(s));
                                        }
                                    }
                                    else{
                                        fetch("http://localhost:5258/Poslodavac/ValidanUsername/"+username)        //proveri jel ima takav poslodavac
                                        .then( p=> {
                                                if(p.status===200){
                                                    //poslodavac daje ocenu zadruzi
                                                    if(zadrugaUrl !== null  && poslodavacUrl==null && zadrugarUrl==null){
                                                        p.json().then(poslodavac =>{
                                                            let poruka = `Poslodavac "${poslodavac.naziv}" Vam je dao ocenu ${s.value} i ostavio komentar: ${text.value}`;
                                                            fetch(`http://localhost:5258/Notifikacija/DodajNotifikacijuZaZadruguUsername/${poruka}/${zadrugaUrl}`,            
                                                            {
                                                                method: "POST"
                                                            });
                                                        });
                                                        poslodavacOcenjujeZadrugu(s.value).then(p=> {if(p.ok){location.reload()}else{console.log("greska")}}
                                                        )
                                                        .catch(s=>console.log(s));
                                                    }
                                                    //poslodavac daje ocenu zadrugaru
                                                    if(zadrugaUrl == null  && poslodavacUrl==null && zadrugarUrl!==null){
                                                        p.json().then(poslodavac =>{
                                                            let poruka = `Poslodavac "${poslodavac.naziv}" Vam je dao ocenu ${s.value} i ostavio komentar: ${text.value}`;
                                                            fetch(`http://localhost:5258/Notifikacija/DodajNotifikacijuZaZadrugaraUsername/${poruka}/${zadrugarUrl}`,            
                                                            {
                                                                method: "POST"
                                                            });
                                                        });
                                                        poslodavacOcenjujeZadrugara(s.value).then(p=> {if(p.ok){location.reload()}else{console.log("greska")}}
                                                        )
                                                        .catch(s=>console.log(s));
                                                    }
                                                }
                                                else{
                                                   alert("grska");
                                                }
                                        })
                                    }
                            })
                        }
                })
                

                zvezdice.style.display = "none";
                Naslov.style.display = "none";
                Posle.style.display = "block";
            }
        })
    })
})


//funkcije  zadrugar-zadrugar i zadrugar-poslodavac
async function zadrugarOcenjujeZadrugu(ocenaVrednost){
    return new Promise((resolve,reject)=>{
        resolve(fetch("http://localhost:5258/Feedback/DodajFeedbackZadrugarZadruga/"+username+"/"+zadrugaUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        ocena: parseInt(ocenaVrednost),
        komentar: text.value
    })
}));
})
}


async function zadrugarOcenjujePoslodavca(ocenaVrednost){
    return new Promise((resolve,reject)=>{
        resolve(fetch("http://localhost:5258/Feedback/DodajFeedbackZadrugarPoslodavac/"+username+"/"+poslodavacUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        ocena: parseInt(ocenaVrednost),
        komentar: text.value
    })
}));
})
}


//funkcije zadruga-poslodavac i zadruga-zadrugar
async function zadrugaOcenjujePoslodavca(ocenaVrednost){
    return new Promise((resolve,reject)=>{
        resolve(fetch("http://localhost:5258/Feedback/DodajFeedbackZadrugaPoslodavac/"+username+"/"+poslodavacUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        ocena: parseInt(ocenaVrednost),
        komentar: text.value
    })
}));
})
}


async function zadrugaOcenjujeZadrugara(ocenaVrednost){
    return new Promise((resolve,reject)=>{
        resolve(fetch("http://localhost:5258/Feedback/DodajFeedbackZadrugaZadrugar/"+username+"/"+zadrugarUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        ocena: parseInt(ocenaVrednost),
        komentar: text.value
    })
}));
})
}


//funkcije poslodavac-zadruga i poslodavac-zadrugar
async function poslodavacOcenjujeZadrugu(ocenaVrednost){
        return new Promise((resolve,reject)=>{
            resolve(fetch("http://localhost:5258/Feedback/DodajFeedbackPoslodavacZadruga/"+username+"/"+zadrugaUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ocena: parseInt(ocenaVrednost),
            komentar: text.value
        })
    }));
    })
}

async function poslodavacOcenjujeZadrugara(ocenaVrednost){
        return new Promise((resolve,reject)=>{
            resolve(fetch("http://localhost:5258/Feedback/DodajFeedbackPoslodavacZadrugar/"+username+"/"+zadrugarUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ocena: parseInt(ocenaVrednost),
            komentar: text.value
        })
    }));
    })
}

