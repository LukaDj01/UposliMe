import { Oglas } from "./Oglas.js";
import { Poslodavac } from "../../Poslodavac/JS/Poslodavac.js";
import { Zadruga } from "../../Zadruga/JS/Zadruga.js";
import { Notifikacija } from "../../Notifikacija/JS/Notifikacija.js";

const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //odredjeni parametar  
var oglasIzURL =urlParam.get('oglas'); //odredjeni parametar
let url;

//sta radi kad klikne logo
let uposlimeLogo=document.querySelector(".uposliMeIkona");
uposlimeLogo.addEventListener("click",function(){
    url="../korisnikPoslodavac/index.html?username="+username;
    location.href=url;
})

//sta radi kad klikne na pocetnu
let pocetna=document.querySelector(".pocetna");
pocetna.addEventListener("click",function(){
    url="../korisnikPoslodavac/index.html?username="+username;
    location.href=url;
})

//sta radi kad klikne na profil
let profil = document.querySelector(".profil");
profil.addEventListener("click",function(){
    url="./poslodavac-profil-podaci.html?username="+username;
    location.href=url;
})

//postavljanje linka na dugme "prijaviSmetnju"
let prijaviSmetnje=document.querySelector(".prijaviSmetnje");
prijaviSmetnje.addEventListener("click",function(){
    url="../korisnikPoslodavac/poslodavac-prijavi-smetnju.html?username="+username;
    location.href=url;
})

//postavljanje linka na dugme "obrisiProfil"
let obrisiProfil=document.querySelector(".obrisiProfil");
obrisiProfil.addEventListener("click",function(){
    location.href="../korisnikPoslodavac/poslodavac-obrisi-profil.html?username="+username;
    
})

//postavljanje linka na dugme "promeniLozinku"
let promeniLozinku=document.querySelector(".promeniLozinku");
promeniLozinku.addEventListener("click",function(){
    location.href="../../ZaboravljenaLozinka/HTML/zaboravljenaLozinka.html";
    
})

//postavljanje linka na dugme "oglasi na validaciji"
let oglasiNaValidaciji =document.querySelector(".oglasiNaValidaciji");
oglasiNaValidaciji.addEventListener("click",function(){
    location.href="../korisnikPoslodavac/poslodavac-oglasi-na-validaciji.html?username="+username;
})

//postavljanje linka na dugme "odaberiRadnike"
let odaberiRadnike=document.querySelector(".odaberiRadnike");
odaberiRadnike.addEventListener("click",function(){
    location.href="../korisnikPoslodavac/poslodavac-odaberi-radnike.html?username="+username;
})


//postavljanje linka na dugme "kreirajOglas"
let kreirajOglas=document.querySelector(".kreirajOglas");
kreirajOglas.addEventListener("click",function(){
    location.href="../korisnikPoslodavac/poslodavac-kreiraj-oglas.html?username="+username;
})


//povuci podatke iz baze o poslodavcu ciji je username prosledjen kroz url
let poslodavac;
let promPoslodavac = await fetch(`http://localhost:5258/Poslodavac/ValidanUsername/${username}`);
await promPoslodavac.json().then(z=>{
    poslodavac = new Poslodavac(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
        z.mobilniTelefon, z.naziv, z.delatnost, z.grad, z.ulica, z.brojStana, z.brojUlaza, z.informacije, 
        z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);
})


//profilnaSlika
let profilnaSlika = document.querySelector(".profilnaSlika");
if(poslodavac && poslodavac.slika!="")
    profilnaSlika.src=`../../Slike/${poslodavac.slika}`;

//postavi naziv poslodavca gore desno
let imePrezime = document.querySelector(".imePrezime");
imePrezime.innerHTML=poslodavac.naziv;


//preuzmemo prosledjen oglas iz baze
let preuzetOglas;
let promOglas = await fetch(`http://localhost:5258/Oglas/PreuzmiOglas/${oglasIzURL}`);
await promOglas.json().then(oglas=>{
    preuzetOglas = new Oglas(oglas.id, oglas.naziv, oglas.opis, oglas.brojPotrebnihRadnika, oglas.grad, oglas.ulica, oglas.brojStana, oglas.brojUlaza,
        oglas.rokZaPrijavu, oglas.datumPostavljanja, oglas.datumIzvrsavanjaPosla, oglas.tip, oglas.novac, oglas.nacinPlacanja,
        oglas.odobren, oglas.odabraniRadnici, oglas.napravljenUgovor,  oglas.aktuelan, oglas.oglasiZadrugari, oglas.zadruga, oglas.poslodavac);
});


//postavimo pocetne informacije oglasa
//naziv
var naziv = document.querySelector(".naziv");
naziv.value=preuzetOglas.naziv;

//brPotRadnika
var brPotRadnika = document.querySelector(".brojPotrebnihRadnika");
brPotRadnika.value=preuzetOglas.brojPotrebnihRadnika;

//rokZaPrijavu
var rokZaPrijavu= document.querySelector(".rokZaPrijavu");
rokZaPrijavu.value=preuzetOglas.rokZaPrijavu;

//datumIzvrsavanjaPosla
var datumIzvrsavanjaPosla= document.querySelector(".datumIzvrsavanjaPosla");
datumIzvrsavanjaPosla.value=preuzetOglas.datumIzvrsavanjaPosla;

//novac
var novac = document.querySelector(".novac");
novac.value=preuzetOglas.novac;

//nacinPlacanja
var nacinPlacanja  = document.querySelector(".nacinPlacanja");
nacinPlacanja.value=preuzetOglas.nacinPlacanja;

//zadruga
var zadruga  = document.querySelector(".zadruga");
zadruga.value=preuzetOglas.zadruga.naziv;

//tip
var tip = document.querySelector(".tip");
tip.value=preuzetOglas.tip;


//grad
var grad = document.querySelector(".grad");
grad.value=preuzetOglas.grad;

//ulica
var ulica = document.querySelector(".ulica");
ulica.value=preuzetOglas.ulica;

//brojUlaza
var brUlaza = document.querySelector(".brojUlaza");
brUlaza.value=preuzetOglas.brojUlaza;

//brojStana
var brStana = document.querySelector(".brojStana");
brStana.value=preuzetOglas.brojStana;

//opis
let opis = document.querySelector(".opis");
opis.value=preuzetOglas.opis;



//naziv
var errorNaziv = document.querySelector(".errorNaziv");
    var addErrorUnesiNaziv = function(){
        naziv.classList.add('error');
        errorNaziv.classList.add('error');
    };
var errorNevalidanNaziv = document.querySelector(".errorNevalidanNaziv");
    var addErrorNevalidanNaziv = function(){
        naziv.classList.add('error');
        errorNevalidanNaziv.classList.add('error');
    };

//brPotRadnika
var errorBrojPotrebnihRadnika = document.querySelector(".errorBrojPotrebnihRadnika");
    var addErrorBrojPotrebnihRadnika = function(){
        brPotRadnika.classList.add('error');
        errorBrojPotrebnihRadnika.classList.add('error');
    };
var errorNevalidanBrojPotrebnihRadnika = document.querySelector(".errorNevalidanBrojPotrebnihRadnika");
    var addErrorNevalidanBrojPotrebnihRadnika = function(){
        brPotRadnika.classList.add('error');
        errorNevalidanBrojPotrebnihRadnika.classList.add('error');
    };

//rokZaPrijavu
var errorRokZaPrijavu= document.querySelector(".errorRokZaPrijavu");
    var addErrorRokZaPrijavu = function(){
        rokZaPrijavu.classList.add('error');
        errorRokZaPrijavu.classList.add('error');
    };
var errorNevalidanRokZaPrijavu= document.querySelector(".errorNevalidanRokZaPrijavu");
    var addErrorNevalidanRokZaPrijavu = function(){
        rokZaPrijavu.classList.add('error');
        errorNevalidanRokZaPrijavu.classList.add('error');
    };

//datumIzvrsavanjaPosla
var errorDatumIzvrsavanjaPosla= document.querySelector(".errorDatumIzvrsavanjaPosla");
    var addErrorDatumIzvrsavanjaPosla = function(){
        datumIzvrsavanjaPosla.classList.add('error');
        errorDatumIzvrsavanjaPosla.classList.add('error');
    };
var errorNevalidanDatumIzvrsavanjaPosla= document.querySelector(".errorNevalidanDatumIzvrsavanjaPosla");
    var addErrorNevalidanDatumIzvrsavanjaPosla = function(){
        datumIzvrsavanjaPosla.classList.add('error');
        errorNevalidanDatumIzvrsavanjaPosla.classList.add('error');
    };

//novac
var errorNovac = document.querySelector(".errorNovac");
    var addErrorNovac = function(){
        novac.classList.add('error');
        errorNovac.classList.add('error');
    };
var errorNevalidanNovac = document.querySelector(".errorNevalidanNovac");
    var addErrorNevalidanNovac = function(){
        novac.classList.add('error');
        errorNevalidanNovac.classList.add('error');
    };

//nacinPlacanja
var errorNacinPlacanja = document.querySelector(".errorNacinPlacanja");
    var addErrorNacinPlacanja = function(){
        nacinPlacanja.classList.add('error');
        errorNacinPlacanja.classList.add('error');
    };


//zadruga
var errorZadruga = document.querySelector(".errorZadruga");
    var addErrorZadruga = function(){
        zadruga.classList.add('error');
        errorZadruga.classList.add('error');
    };


//tip
var errorTip = document.querySelector(".errorTip");
    var addErrorTip = function(){
        tip.classList.add('error');
        errorTip.classList.add('error');
    };


//grad
var errorGrad = document.querySelector(".errorGrad");
    var addErrorUnesiGrad = function(){
        grad.classList.add('error');
        errorGrad.classList.add('error');
    };

//ulica
var errorUlica = document.querySelector(".errorUlica");
    var addErrorUnesiUlicu = function(){
        ulica.classList.add('error');
        errorUlica.classList.add('error');
    };
var errorNevalidnaUlica = document.querySelector(".errorNevalidnaUlica");
    var addErrorNevalidnaUlicu = function(){
        ulica.classList.add('error');
        errorNevalidnaUlica.classList.add('error');
    };

//brojUlaza
var errorNevalidanBrojUlaza = document.querySelector(".errorNevalidanBrojUlaza");
    var addErrorNevalidanBrojUlaza = function(){
        brUlaza.classList.add('error');
        errorNevalidanBrojUlaza.classList.add('error');
    };

//brojStana
var errorNevalidanBrojStana = document.querySelector(".errorNevalidanBrojStana");
    var addErrorNevalidanBrojStana = function(){
        brStana.classList.add('error');
        errorNevalidanBrojStana.classList.add('error');
    };


//opis
let errorUnesiOpis = document.querySelector(".errorUnesiOpis");
    var addErrorUnesiOpis = function(){
        opis.classList.add('error');
        errorUnesiOpis.classList.add('error');
    }



async function izmeniOglasBody(){
    return new Promise((resolve,reject)=>{
        resolve(fetch("http://localhost:5258/Oglas/IzmeniOglas/"+oglasIzURL+"/"+zadruga.options[zadruga.selectedIndex].value,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                naziv:naziv.value,
                opis:opis.value,
                brojPotrebnihRadnika:brPotRadnika.value,
                grad:grad.options[grad.selectedIndex].value,
                ulica:ulica.value,
                brojStana: brStana.value,
                brojUlaza: brUlaza.value,
                rokZaPrijavu: rokZaPrijavu.value,
                datumIzvrsavanjaPosla:datumIzvrsavanjaPosla.value,
                tip:tip.options[tip.selectedIndex].value,
                novac:novac.value,
                nacinPlacanja: nacinPlacanja.options[nacinPlacanja.selectedIndex].value,
                odobren:false,
                aktuelan:false
               
            })
        }));
    })
}

let otkaziIzmenu = document.querySelector(".otkaziIzmenu");
otkaziIzmenu.addEventListener("click", function(){
    history.back();
})

let izmeniOglas = document.querySelector(".izmeniOglas");

izmeniOglas.addEventListener("click", function(){
    if(naziv.value!="" && brPotRadnika.value!="" && rokZaPrijavu.value!="" && datumIzvrsavanjaPosla.value!="" && novac.value!=""  && nacinPlacanja.options[nacinPlacanja.selectedIndex].value!=="Izaberi način plaćanja" && zadruga.options[zadruga.selectedIndex].value!=="Izaberi zadrugu" && tip.options[tip.selectedIndex].value!=="Izaberi tip" && grad.options[grad.selectedIndex].value!=="Izaberi grad" && ulica.value!==""){
      
        if(naziv.value.length>50  || isNaN(naziv.value)===false){
            addErrorNevalidanNaziv();
        }
        else {
            if(brPotRadnika.value<1 || brPotRadnika.value>999 || isNaN(brPotRadnika.value)===true){
                addErrorNevalidanBrojPotrebnihRadnika();
            }
            else {
            
                if(isNaN(novac.value)===true || novac.value<1 ||/[1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9]/.test(novac.value)===false){
                    addErrorNevalidanNovac();
                }
                else {
                                    let trenutniDatum = new Date();                         //trenutni datum
                                    let datumRok = new Date(rokZaPrijavu.value);            //datum roka apliciranja
                                    let datumIzvr = new Date(datumIzvrsavanjaPosla.value);  //datum roka izvrsenja

                                    if(trenutniDatum>datumRok ){
                                        addErrorNevalidanRokZaPrijavu();
                                    }
                                    else{    
                                            if(trenutniDatum>datumIzvr ){
                                                addErrorNevalidanDatumIzvrsavanjaPosla();
                                            }
                                            else{
                                                    if(datumRok>datumIzvr ){
                                                        addErrorNevalidanRokZaPrijavu();
                                                        addErrorNevalidanDatumIzvrsavanjaPosla();
                                                    }
                                                    else{
                                              
                                                        if(/^[A-Za-z0-9\s]*$/.test(ulica.value)===false){
                                                            addErrorNevalidnaUlicu();
                                                        }                            
                                                        else{
                                                            if(brUlaza.value===""){
                                                                brUlaza.value="BB";
                                                            }
                                                            if(brStana.value===""){
                                                                brStana.value="BB";
                                                            }
                                                            
                                                            if(brUlaza.value=="BB" || /[1-9]|[1-9][0-9]|[1-9][0-9][0-9]/.test(brUlaza.value)===true){
                                                               
                                                                if(brStana.value=="BB" || /[1-9]|[1-9][0-9]|[1-9][0-9][0-9]/.test(brStana.value)===true){
                                                                    izmeniOglasBody().then(p=> {
                                                                        if(p.ok)
                                                                        {
                                                                            let poruka = `Stigao je novi oglas za validiranje pod nazivom "${naziv.value}" od strane poslodavca "${poslodavac.naziv}".`;
                                                                            fetch(`http://localhost:5258/Notifikacija/DodajNotifikacijuZaZadruguNaziv/${poruka}/${zadruga.options[zadruga.selectedIndex].value}`, 
                                                                            {
                                                                                method: "POST"
                                                                            }).then(p=>{
                                                                                if(p.ok){   
                                                                                    history.back();
                                                                                }
                                                                            });
                                                                        }
                                                                        else
                                                                        {
                                                                            console.log("greska")
                                                                        }
                                                                    }).catch(s=>console.log(s));
                                                                    
                                                                }
                                                                else {
                                                                        addErrorNevalidanBrojStana();
                                                                }
                                                            }
                                                            else {
                                                                    addErrorNevalidanBrojUlaza();
                                                            }
                                                        }
                                                        
                                                    }
                                            
                                        
                                }
                        }
                    }
                }
        }
    }
    else{
        if(naziv.value===""){
            addErrorUnesiNaziv();
        }
        if(brPotRadnika.value===""){
            addErrorBrojPotrebnihRadnika();
        }
        if(rokZaPrijavu.value===""){
            addErrorRokZaPrijavu();
        }
        if(datumIzvrsavanjaPosla.value===""){
            addErrorDatumIzvrsavanjaPosla();
        }
        if(novac.value===""){
            addErrorNovac();
        }
        if(nacinPlacanja.options[nacinPlacanja.selectedIndex].value==="Izaberi način plaćanja"){
            addErrorNacinPlacanja();
        }
        if(zadruga.options[zadruga.selectedIndex].value==="Izaberi zadrugu"){
            addErrorZadruga();
        }
        if(tip.options[tip.selectedIndex].value==="Izaberi tip"){
            addErrorTip();
        }
        if(grad.options[grad.selectedIndex].value==="Izaberi grad"){
            addErrorUnesiGrad();
        }
        if(ulica.value===""){
            addErrorUnesiUlicu();
        }
        if(opis.value===""){
            addErrorUnesiOpis();
        }
    }
})

// pribavljanje notifikacija vezanih za datog poslodavca
let notifikacijeDiv = document.querySelector(".notifikacijeDiv");
let notifikacije = [];
let brNeprocitanih;
let promNotifikacije = await fetch(`http://localhost:5258/Notifikacija/PreuzmiNotifikacijePoslodavacProzorce/${poslodavac.id}`);
await promNotifikacije.json().then(notifLista=>{
    brNeprocitanih = notifLista.brojNeprocitanih;
    notifLista.neprocitane.forEach(notif => {
        const n = new Notifikacija(notif.id, notif.procitana, notif.poslodavac, notif.notifikacija, notifikacijeDiv);
        notifikacije.push(n);
    });
    if (brNeprocitanih < 5)
    {
        notifLista.procitane.forEach(notif => {
            const n = new Notifikacija(notif.id, notif.procitana, notif.poslodavac, notif.notifikacija, notifikacijeDiv);
            notifikacije.push(n);
        });
    }
}).catch(s=>console.log("Greska kod preuzimanja notifikacija: ", s));

// iscrtavanje notifikacija u odgovarajucem prozorcetu
function prikazNotifikacija() {
    notifikacije.forEach(notif=>{
        notif.crtajNotifikacijuProzorce();
    })

    // dugme za prikaz svih notifikacija
    let prikaziSveNotif = document.createElement("a");
    prikaziSveNotif.className="prikaziSveNotif dropdown-item text-center small text-gray-500";
    prikaziSveNotif.innerHTML="Prikaži sve notifikacije";
    prikaziSveNotif.addEventListener("click", function () {
        location.href="./poslodavac-notifikacije.html?username="+username;
    })
    notifikacijeDiv.appendChild(prikaziSveNotif);
}
prikazNotifikacija();

// postavljanje broja neprocitanih notifikacija
let brNeprocNotif = document.querySelector(".brNeprocNotif");
if (brNeprocitanih > 5)
    brNeprocNotif.innerHTML = `5+`;
else if (brNeprocitanih != 0)
    brNeprocNotif.innerHTML = brNeprocitanih;

//funkcionalnost klika na notifikaciju
function omoguciNotifClick() {
    let notifClick = document.querySelectorAll(".notifikacija");
    notifClick.forEach(nc=>{
        nc.addEventListener("click", function () {
            location.href="../korisnikPoslodavac/poslodavac-pregled-notifikacije.html?username="+username+"&notifikacija="+nc.id;
        })
    })
}
omoguciNotifClick();