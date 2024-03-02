import {Poslodavac} from '../../Poslodavac/JS/Poslodavac.js'
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
var poslodavacUrl = urlParam.get('poslodavac'); //odredjeni parametar

if(poslodavacUrl!=null){
    username=poslodavacUrl;
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


//delatnost
var delatnost = document.querySelector(".delatnost");
var errorDelatnost = document.querySelector(".errorDelatnost");
    var addErrorUnesiDelatnost = function(){
        delatnost.classList.add('error');
        errorDelatnost.classList.add('error');
    };
    var errorNevalidnaDelatnost = document.querySelector(".errorNevalidnaDelatnost");
    var addErrorNevalidnaDelatnost= function(){
        delatnost.classList.add('error');
        errorNevalidnaDelatnost.classList.add('error');
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
var poslodavac;
//proveri jel postoji poslodavac sa zadatim usernamom i ucitaj njegove podatke
var ucitajPodatkePoslodavac = function() {
    fetch("http://localhost:5258/Poslodavac/ValidanUsername/"+username)        //proveri jel ima takav poslodavac
    .then( p=> {
                    p.json().then(z=>{
                        poslodavac = new Poslodavac(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
                            z.mobilniTelefon, z.naziv, z.delatnost, z.grad, z.ulica, z.brojStana, z.brojUlaza, z.informacije, 
                            z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);
                if(poslodavacUrl==null){
                            //postavljamo sliku gore desno
                            let profilnaSlika = document.querySelector(".profilnaSlika");
                            if(poslodavac && poslodavac.slika!="")
                                profilnaSlika.src=`../../Slike/${poslodavac.slika}`;
                       
                            //prikazemo naziv poslodavca gore desno
                            let imePrezime = document.querySelector(".imePrezime");
                            imePrezime.innerHTML=poslodavac.naziv;
                } 
                        if(poslodavac.slika!=="" && poslodavac.slika!==undefined){//ako poslodavac ima svoju sliku, ucitaj je u formu
                            slika.style.backgroundImage="url('../../Slike/"+poslodavac.slika+"')";
                            slikaprom=poslodavac.slika;
                        }
                        if(poslodavac.slika===""){//ako je slika przna, ucitaj difoltnu u formu
                            slika.style.backgroundImage="url('../../Slike/brRadnika.png')";
                            slikaprom="brRadnika.png";
                        }

                        //u divove prikazujemo poslodavceve informacije
                        naziv.value=poslodavac.naziv;
                        pib.value=poslodavac.pib;
                        maticniBroj.value=poslodavac.maticniBroj;
                        email.value=poslodavac.email;
                        fiksniTelefon.value=poslodavac.fiksniTelefon;
                        mobilniTelefon.value=poslodavac.mobilniTelefon;
                        delatnost.value=poslodavac.delatnost;
                        grad.value=poslodavac.grad;
                        ulica.value=poslodavac.ulica;
                        brStana.value=poslodavac.brojStana;
                        brUlaza.value=poslodavac.brojUlaza;
                        informacije.value=poslodavac.informacije;

                        
                        if(poslodavacUrl==null){
                            // pribavljanje notifikacija vezanih za datog poslodavca
                            let notifikacijeDiv = document.querySelector(".notifikacijeDiv");
                            let notifikacije = [];
                            let brNeprocitanih;
                            fetch(`http://localhost:5258/Notifikacija/PreuzmiNotifikacijePoslodavacProzorce/${poslodavac.id}`)
                            .then(p=>p.json().then(notifLista=>{
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
                                    location.href="./poslodavac-notifikacije.html?username="+username;
                                })
                                notifikacijeDiv.appendChild(prikaziSveNotif);
                            }

                            //funkcionalnost klika na notifikaciju
                            function omoguciNotifClick() {
                                let notifClick = document.querySelectorAll(".notifikacija");
                                notifClick.forEach(nc=>{
                                    nc.addEventListener("click", function () {
                                        location.href="../korisnikPoslodavac/poslodavac-pregled-notifikacije.html?username="+username+"&notifikacija="+nc.id;
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
    delatnost.disabled=false;
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
    delatnost.disabled=true;
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
window.onload=ucitajPodatkePoslodavac(),onemoguciUnosPromeniDugmad();

//pritiskom na dugme otkazi, vrati dugme izmeniPodatke i ucitaj podatke
otkazi.addEventListener("click",function(){
    onemoguciUnosPromeniDugmad();
    ucitajPodatkePoslodavac();
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

function IzmeniPodatkePoslodavca(){
    fetch("http://localhost:5258/Poslodavac/IzmeniPodatkePoslodavca/"+username    
                                                                            +"/"+slikaprom
                                                                            +"/"+naziv.value
                                                                            +"/"+pib.value
                                                                            +"/"+maticniBroj.value
                                                                            +"/"+fiksniTelefon.value
                                                                            +"/"+mobilniTelefon.value
                                                                            +"/"+delatnost.value
                                                                            +"/"+grad.value
                                                                            +"/"+ulica.value
                                                                            +"/"+brStana.value
                                                                            +"/"+brUlaza.value
                                                                            +"/"+((informacije.value==="")? "null" : informacije.value),
        
        {
            method: 'PUT',
        }).then(p=>{
            if(p.ok){
                location.reload();
            }  
        })}

sacuvaj.addEventListener("click", function(){

    if(naziv.value!=="" && pib.value!=="" && maticniBroj.value!=="" && fiksniTelefon.value!=="" && mobilniTelefon.value!=="" && delatnost.value!=="" && grad.value!=="" && ulica.value!==""){
        
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
                                                    if(/^[a-zA-Z\s]*$/.test(delatnost.value)===false){
                                                        addErrorNevalidnaDelatnost();
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
                                                                                
                                                                                IzmeniPodatkePoslodavca();
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

        if(delatnost.value===""){
            addErrorUnesiDelatnost();
        }

        if(grad.value===""){
            addErrorUnesiGrad();
        }

        if(ulica.value===""){
            addErrorUnesiUlicu();
        }
    }
})


if(poslodavacUrl==null){
    let url;
    //postavljanje linka na logo-u
    let uposlimeLogo=document.querySelector(".uposliMeIkona");
    uposlimeLogo.addEventListener("click",function(){
        url="../korisnikPoslodavac/index.html?username="+username;
        location.href=url;
    })

    //postavljanje linka na dugme "pocetna"
    let pocetna=document.querySelector(".pocetna");
    pocetna.addEventListener("click",function(){
        url="../korisnikPoslodavac/index.html?username="+username;
        location.href=url;
    })

    //postavljanje linka na dugme "profil"
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

    //postavljanje linka na dugme "promeniLozinku"
    let promeniLozinku=document.querySelector(".promeniLozinku");
    promeniLozinku.addEventListener("click",function(){
        location.href="../../ZaboravljenaLozinka/HTML/zaboravljenaLozinka.html";
        
    })

    //postavljanje linka na dugme "obrisiProfil"
    let obrisiProfil=document.querySelector(".obrisiProfil");
    obrisiProfil.addEventListener("click",function(){
        location.href="../korisnikPoslodavac/poslodavac-obrisi-profil.html?username="+username;
        
    })

    //postavljanje linka na dugme "oglasi na validaciji"
    let oglasiNaValidaciji =document.querySelector(".oglasiNaValidaciji");
    oglasiNaValidaciji.addEventListener("click",function(){
        location.href="../korisnikPoslodavac/poslodavac-oglasi-na-validaciji.html?username="+username;
    })

    //postavljanje linka na dugme "odbijeni oglasi"
    let odbijeniOglasi =document.querySelector(".odbijeniOglasi");
    odbijeniOglasi.addEventListener("click",function(){
        location.href="../korisnikPoslodavac/poslodavac-odbijeni-oglasi.html?username="+username;
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

    //postavljanje linka na dugme "ugovori"
    let ugovori=document.querySelector(".ugovori");
    ugovori.addEventListener("click",function(){
        location.href="../korisnikPoslodavac/poslodavac-ugovori.html?username="+username;
    })

    //postavljanje linka na dugme "ocene"
    let ocene=document.querySelector(".ocene");
    ocene.addEventListener("click",function(){
        location.href="../korisnikPoslodavac/poslodavac-ocene.html?username="+username;
    })
}