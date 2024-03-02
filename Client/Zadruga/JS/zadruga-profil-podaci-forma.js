import {Zadruga} from '../../Zadruga/JS/Zadruga.js'
import { Notifikacija } from "../../Notifikacija/JS/Notifikacija.js";
var slikaprom;
var izmeniPodatke = document.querySelector(".izmeniPodatke");
var otkazi = document.querySelector(".otkazi");
var sacuvaj = document.querySelector(".sacuvaj");
var ukloniSliku=document.querySelector(".ukloniSliku");
var dodajSliku=document.querySelector(".dodajSliku");

var slika = document.querySelector(".slika");
var slikaInput = document.querySelector(".slikaInput");
//username
const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //odredjeni parametar
var zadrugaUrl = urlParam.get('zadruga'); //odredjeni parametar


if(zadrugaUrl!=null){
    username=zadrugaUrl;
    document.querySelector(".izmeniPodatke").style.display="none";
}


//naziv
var naziv = document.querySelector(".naziv");
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


//pib
var pib = document.querySelector(".pib")
var errorNevalidanPIB = document.querySelector(".errorNevalidanPIB");
    var addErrorNevalidanPIB = function(){ 
        pib.classList.add('error');
        errorNevalidanPIB.classList.add('error');
    };
var errorPIB= document.querySelector(".errorPIB");
    var addErrorUnesitePIB = function(){ 
        pib.classList.add('error');
        errorPIB.classList.add('error');
    };


//maticni broj
var maticniBroj = document.querySelector(".maticniBroj");
var errorNevalidanMaticniBroj = document.querySelector(".errorNevalidanMaticniBroj");
    var addErrorNevalidanMaticniBroj = function(){ 
        errorNevalidanMaticniBroj.classList.add('error');
        maticniBroj.classList.add('error');
    };
var errorMaticniBroj = document.querySelector(".errorMaticniBroj");
    var addErrorUnesiteMaticniBroj = function(){ 
        errorMaticniBroj.classList.add('error');
        maticniBroj.classList.add('error');
    };

//email
var email = document.querySelector(".email");


//fiksni telefon
var fiksniTelefon = document.querySelector(".fiksniTelefon");
var errorFiksniTelefon = document.querySelector(".errorFiksniTelefon");
    var addErrorUnesiFiksniTelefon = function(){
        fiksniTelefon.classList.add('error');
        errorFiksniTelefon.classList.add('error');  
    };
var errorNevalidanFiksniTelefon = document.querySelector(".errorNevalidanFiksniTelefon");
    var addErrorNevalidanFiksniTelefon = function(){
        fiksniTelefon.classList.add('error');
        errorNevalidanFiksniTelefon.classList.add('error');  
    };


//mobilni telefon
var mobilniTelefon = document.querySelector(".mobilniTelefon");
var errorMobilniTelefon = document.querySelector(".errorMobilniTelefon");
    var addErrorUnesiMobilniTelefon = function(){
        mobilniTelefon.classList.add('error');
        errorMobilniTelefon.classList.add('error');  
    };
var errorNevalidanMobilniTelefon = document.querySelector(".errorNevalidanMobilniTelefon");
    var addErrorNevalidanMobilniTelefon = function(){
        mobilniTelefon.classList.add('error');
        errorNevalidanMobilniTelefon.classList.add('error');  
    };


//brojRacuna
var brRacuna = document.querySelector(".brojRacuna");
var errorBrojRacuna = document.querySelector(".errorBrojRacuna");
    var addErrorUnesiBrojRacuna = function(){
        brRacuna.classList.add('error');
        errorBrojRacuna.classList.add('error');
    };
    var errorNevalidanBrojRacuna = document.querySelector(".errorNevalidanBrojRacuna");
    var addErrorNevalidanBrojRacuna = function(){
        brRacuna.classList.add('error');
        errorNevalidanBrojRacuna.classList.add('error');
    };

//grad
var grad = document.querySelector(".grad");
var errorGrad = document.querySelector(".errorGrad");
    var addErrorUnesiGrad = function(){
        grad.classList.add('error');
        errorGrad.classList.add('error');
    };
var errorNevalidanGrad = document.querySelector(".errorNevalidanGrad");
    var addErrorNevalidanGrad = function(){
        grad.classList.add('error');
        errorNevalidanGrad.classList.add('error');
    };

//ulica
var ulica = document.querySelector(".ulica");
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


//brojStana
var brStana = document.querySelector(".brojStana");
var errorNevalidanBrojStana = document.querySelector(".errorNevalidanBrojStana");
    var addErrorNevalidanBrojStana = function(){
        brStana.classList.add('error');
        errorNevalidanBrojStana.classList.add('error');
    };


//brojUlaza
var brUlaza = document.querySelector(".brojUlaza");
var errorNevalidanBrojUlaza = document.querySelector(".errorNevalidanBrojUlaza");
    var addErrorNevalidanBrojUlaza = function(){
        brUlaza.classList.add('error');
        errorNevalidanBrojUlaza.classList.add('error');
    };



//informacije
var informacije = document.querySelector(".informacije");

var pom;
var zadruga;
//proveri jel postoji zadruga sa zadatim usernamom i ucitaj njene podatke
var ucitajPodatkeZadruga = function() {
    fetch("http://localhost:5258/Zadruga/ValidanUsername/"+username)        //proveri jel ima takva zadruga
    .then( p=> {
                    p.json().then(z=>{
                        zadruga=new Zadruga(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
                            z.mobilniTelefon, z.naziv, z.brojRacuna, z.grad, z.ulica, z.brojStana, z.brojUlaza, 
                            z.informacije,z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);

                if(zadrugaUrl==null){
                            //postavljamo sliku gore desno
                            let profilnaSlika = document.querySelector(".profilnaSlika");
                            if(zadruga && zadruga.slika!="")
                                profilnaSlika.src=`../../Slike/${zadruga.slika}`;
                            
                            //prikazemo naziv zadruge gore desno
                            let imePrezime = document.querySelector(".imePrezime");
                            imePrezime.innerHTML=zadruga.naziv;
                }
                        if(zadruga.slika!=="" && zadruga.slika!==undefined){//ako zadruga ima svoju sliku, ucitaj je u formu
                            slika.style.backgroundImage="url('../../Slike/"+zadruga.slika+"')";
                            slikaprom=zadruga.slika;
                        }
                        if(zadruga.slika===""){//ako je slika przna, ucitaj difoltnu u formu
                            slika.style.backgroundImage="url('../../Slike/brRadnika.png')";
                            slikaprom="brRadnika.png";
                        }
                
                        //u divove prikazujemo zadrugine informacije
                        naziv.value=zadruga.naziv;
                        pib.value=zadruga.pib;
                        maticniBroj.value=zadruga.maticniBroj;
                        email.value=zadruga.email;
                        fiksniTelefon.value=zadruga.fiksniTelefon;
                        mobilniTelefon.value=zadruga.mobilniTelefon;
                        brRacuna.value=zadruga.brojRacuna;
                        grad.value=zadruga.grad;
                        ulica.value=zadruga.ulica;
                        brStana.value=zadruga.brojStana;
                        brUlaza.value=zadruga.brojUlaza;
                        informacije.value=zadruga.informacije;

                        if(zadrugaUrl==null){
                            // pribavljanje notifikacija vezanih za datu zadrugu
                            let notifikacijeDiv = document.querySelector(".notifikacijeDiv");
                            let notifikacije = [];
                            let brNeprocitanih;
                            fetch(`http://localhost:5258/Notifikacija/PreuzmiNotifikacijeZadrugaProzorce/${zadruga.id}`)
                            .then(p=>p.json().then(notifLista=>{
                                brNeprocitanih = notifLista.brojNeprocitanih;
                                notifLista.neprocitane.forEach(notif => {
                                    const n = new Notifikacija(notif.id, notif.procitana, notif.zadruga, notif.notifikacija, notifikacijeDiv);
                                    notifikacije.push(n);
                                });
                                if (brNeprocitanih < 5)
                                {
                                    notifLista.procitane.forEach(notif => {
                                        const n = new Notifikacija(notif.id, notif.procitana, notif.zadruga, notif.notifikacija, notifikacijeDiv);
                                        notifikacije.push(n);
                                    });
                                }
                                prikazNotifikacija();
                                omoguciNotifClick();

                                // postavljanje broja neprocitanih notifikacija
                                let brNeprocNotif = document.querySelector(".brNeprocNotif");
                                if (brNeprocitanih > 5)
                                    brNeprocNotif.innerHTML = `5+`;
                                else if (brNeprocitanih != 0)
                                    brNeprocNotif.innerHTML = brNeprocitanih;
                            })).catch(s=>console.log("Greska kod preuzimanja notifikacija: ", s));

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
                                    location.href="./zadruga-notifikacije.html?username="+username;
                                })
                                notifikacijeDiv.appendChild(prikaziSveNotif);
                            }

                            //funkcionalnost klika na notifikaciju
                            function omoguciNotifClick() {
                                let notifClick = document.querySelectorAll(".notifikacija");
                                notifClick.forEach(nc=>{
                                    nc.addEventListener("click", function () {
                                        location.href="../korisnikZadruga/zadruga-pregled-notifikacije.html?username="+username+"&notifikacija="+nc.id;
                                    })
                                })
                            }
                        }
                    })                                                    
    })
}

//omoguci izmenu sadrzaja, skloni dugme izmeniPodatke i dodaj dugme otkazi i sacuvaj
var dozvoliUnosPromeniDugmad =function(){
    slika.disabled=false;
    naziv.disabled=false;
    pib.disabled=false;
    maticniBroj.disabled=false;
    fiksniTelefon.disabled=false;
    mobilniTelefon.disabled=false;
    brRacuna.disabled=false;
    grad.disabled=false;
    ulica.disabled=false;
    brStana.disabled=false;
    brUlaza.disabled=false;
    informacije.disabled=false;
    slika.classList.add('prikazi');
    izmeniPodatke.classList.add('blokiraj');
    ukloniSliku.classList.add('enable');
    dodajSliku.classList.add('enable');
    otkazi.classList.add('enable');
    sacuvaj.classList.add('enable');
}

//onemoguci izmenu sadrzaja, skloni dugme otkazi i sacuvaj, a dodaj dugme izmeniPodatke
var onemoguciUnosPromeniDugmad = function(){
    slika.disabled=true;
    naziv.disabled=true;
    pib.disabled=true;
    maticniBroj.disabled=true;
    fiksniTelefon.disabled=true;
    mobilniTelefon.disabled=true;
    brRacuna.disabled=true;
    grad.disabled=true;
    ulica.disabled=true;
    brStana.disabled=true;
    brUlaza.disabled=true;
    informacije.disabled=true;
    slika.classList.remove('prikazi');
    izmeniPodatke.classList.remove('blokiraj');
    ukloniSliku.classList.remove('enable');
    dodajSliku.classList.remove('enable');
    otkazi.classList.remove('enable');
    sacuvaj.classList.remove('enable');
}

//kad se refresuje strana, ucitaj podatke, onemoguci unos, postavi dugme izmeniPodatke,a ukloni otkazi i sacuvaj
window.onload=ucitajPodatkeZadruga(),onemoguciUnosPromeniDugmad();

//pritiskom na dugme otkazi, vrati dugme izmeniPodatke i ucitaj podatke
otkazi.addEventListener("click",function(){
    onemoguciUnosPromeniDugmad();
    ucitajPodatkeZadruga();
})

//pritiskom na dugme izmeniPodatke, omoguci izmenu sadrzaja, skloni dugme izmeniPodatke i dodaj dugme otkazi i sacuvaj
izmeniPodatke.addEventListener("click",dozvoliUnosPromeniDugmad);


//ukloni sliku, izbrisi sadrzaj i postavi podrazumevanu sliku
ukloniSliku.addEventListener("click",function(){
    slikaprom="brRadnika.png";
    slika.style.backgroundImage="url('../../Slike/brRadnika.png')";
})

//dodaj sliku, na klik dugmeta, pokreni eventListener tako da cim se promeni sadrzaj inputa za sliku, on taj sadrzaj isece samo na naziv slike i prikaze
dodajSliku.addEventListener("click",function(){
    slikaInput.addEventListener("change",function(){
        slika.style.backgroundImage="url('../../Slike/"+slikaInput.value.replace(/^.*[\\\/]/, '')+"')";
        slikaprom=slikaInput.value.replace(/^.*[\\\/]/, '');
    })
   
})

function IzmeniPodatkeZadruge(){
    fetch("http://localhost:5258/Zadruga/IzmeniPodatkeZadruge/"+username    
                                                                            +"/"+slikaprom
                                                                            +"/"+naziv.value
                                                                            +"/"+pib.value
                                                                            +"/"+maticniBroj.value
                                                                            +"/"+fiksniTelefon.value
                                                                            +"/"+mobilniTelefon.value
                                                                            +"/"+brRacuna.value
                                                                            +"/"+grad.value
                                                                            +"/"+ulica.value
                                                                            +"/"+brStana.value
                                                                            +"/"+brUlaza.value
                                                                            +"/"+((informacije.value==="")? "null":informacije.value),
        
        {
            method: 'PUT',
        }).then(p=>{
            if(p.ok){
                location.reload();
            }  
        })}

sacuvaj.addEventListener("click", function(){


    if(naziv.value!=="" && pib.value!=="" && maticniBroj.value!=="" && fiksniTelefon.value!=="" && mobilniTelefon.value!=="" && brRacuna.value!=="" && grad.value!=="" && ulica.value!==""){
        
        if(naziv.length>50 || isNaN(naziv.value)!==true){
            addErrorNevalidanNaziv();
        }
            else{
                    if(pib.value.length<9 || pib.value.length>9 || isNaN(pib.value)===true){
                        addErrorNevalidanPIB();
                    }
                    else{
                            if(maticniBroj.value.length<8 || maticniBroj.value.length>8 || isNaN(maticniBroj.value)===true){
                                addErrorNevalidanMaticniBroj();
                            }
                            else{
                                    if(isNaN(fiksniTelefon.value)===true || fiksniTelefon.length<6){
                                        addErrorNevalidanFiksniTelefon();
                                    }                            
                                    else{ 
                                            if(isNaN(mobilniTelefon.value)===true || mobilniTelefon.length<8){
                                                addErrorNevalidanMobilniTelefon();
                                            }                            
                                            else{
                                                    if(isNaN(brRacuna.value)===true){
                                                        addErrorNevalidanBrojRacuna();
                                                    }                            
                                                    else{
                                                            if(/^[a-zA-Z\s]*$/.test(grad.value)===false){
                                                                addErrorNevalidanGrad();
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
                                                                                IzmeniPodatkeZadruge();
                                                                            }
                                                                            else{
                                                                                addErrorNevalidanBrojStana();
                                                                            }
                                                                        }
                                                                        else{
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
        }  
    
    else{
        if(naziv.value===""){
            addErrorUnesiNaziv();
        }

        if(pib.value===""){
            addErrorUnesitePIB();
        }

        if(maticniBroj.value===""){
            addErrorUnesiteMaticniBroj();
        }

        if(fiksniTelefon.value===""){
            addErrorUnesiFiksniTelefon();
        }

        if(mobilniTelefon.value===""){
            addErrorUnesiMobilniTelefon();
        }

        if(brRacuna.value===""){
            addErrorUnesiBrojRacuna();
        }

        if(grad.value===""){
            addErrorUnesiGrad();
        }

        if(ulica.value===""){
            addErrorUnesiUlicu();
        }
    }
})



if(zadrugaUrl==null){
    let url;
   //sta radi kad klikne logo
    let uposlimeLogo=document.querySelector(".uposliMeIkona");
    uposlimeLogo.addEventListener("click",function(){
        url="../korisnikZadruga/index.html?username="+username;
        location.href=url;
    })

    //sta radi kad klikne na pocetnu
    let pocetna=document.querySelector(".pocetna");
    pocetna.addEventListener("click",function(){
        url="../korisnikZadruga/index.html?username="+username;
        location.href=url;
    })

    //postavljanje linka na dugme "oglasi za validiranje"
    let oglasiZaValidiranje=document.querySelector(".oglasiZaValidiranje");
    oglasiZaValidiranje .addEventListener("click",function(){
        location.href="../../Zadruga/korisnikZadruga/zadruga-oglasi-za-validiranje.html?username="+username;
    })

    //postavljanje linka na dugme "aktivni ugovori"
    let aktivniUgovori =document.querySelector(".aktivniUgovori");
    aktivniUgovori.addEventListener("click",function(){
        location.href="../../Zadruga/korisnikZadruga/zadruga-aktivni-ugovori.html?username="+username;
    })

    //postavljanje linka na dugme "kreiraj ugovor"
    let kreirajUgovor=document.querySelector(".kreirajUgovor");
    kreirajUgovor.addEventListener("click",function(){
        location.href="../../Zadruga/korisnikZadruga/zadruga-kreiraj-ugovori.html?username="+username;
    })

    //postavljanje linka na dugme "ocene"
    let oceneBtn=document.querySelector(".ocene");
    oceneBtn.addEventListener("click",function(){
        location.href="../../Zadruga/korisnikZadruga/zadruga-ocene.html?username="+username;
    })

    //sta radi kad klikne na profil
    let profil = document.querySelector(".profil");
    profil.addEventListener("click",function(){
        url="./zadruga-profil-podaci.html?username="+username;
        location.href=url;
    })

    //postavljanje linka na dugme "prijaviSmetnju"
    let prijaviSmetnje=document.querySelector(".prijaviSmetnje");
    prijaviSmetnje.addEventListener("click",function(){
        url="../korisnikZadruga/zadruga-prijavi-smetnju.html?username="+username;
        location.href=url;
    })

    //postavljanje linka na dugme "obrisiProfil"
    let obrisiProfil=document.querySelector(".obrisiProfil");
    obrisiProfil.addEventListener("click",function(){
        location.href="../korisnikZadruga/zadruga-obrisi-profil.html?username="+username;
        
    })

    //postavljanje linka na dugme "promeniLozinku"
    let promeniLozinku=document.querySelector(".promeniLozinku");
    promeniLozinku.addEventListener("click",function(){
        location.href="../../ZaboravljenaLozinka/HTML/zaboravljenaLozinka.html";
    })

}