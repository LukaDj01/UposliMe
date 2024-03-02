import {Zadrugar} from '../../Zadrugar/JS/Zadrugar.js'
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
var zadrugarUrl = urlParam.get('zadrugar'); //odredjeni parametar


if(zadrugarUrl!=null){
    username=zadrugarUrl;
    document.querySelector(".izmeniPodatke").style.display="none";
}


//jmbg
var jmbg = document.querySelector(".jmbg")
var errorNevalidanJMBG = document.querySelector(".errorNevalidanJMBG");
    var addErrorNevalidanJMBG = function(){ 
        jmbg.classList.add('error');
        errorNevalidanJMBG.classList.add('error');
    };
var errorJMBG= document.querySelector(".errorJMBG");
    var addErrorUnesiteJMBG = function(){ 
        jmbg.classList.add('error');
        errorJMBG.classList.add('error');
    };

//lbo
var lbo = document.querySelector(".lbo");
var errorNevalidanLBO = document.querySelector(".errorNevalidanLBO");
    var addErrorNevalidanLBO = function(){ 
        errorNevalidanLBO.classList.add('error');
        lbo.classList.add('error');
    };
var errorLBO = document.querySelector(".errorLBO");
    var addErrorUnesiteLBO = function(){ 
        errorLBO.classList.add('error');
        lbo.classList.add('error');
    };

//email
var email = document.querySelector(".email");
/*
var errorNevalidanEmail = document.querySelector(".errorNevalidanEmail"); 
    var addErrorNevalidanEmail = function(){ 
        email.classList.add('error');
        errorNevalidanEmail.classList.add('error');
    };
var errorEmail = document.querySelector(".errorEmail");
    var addErrorUnesiteEmail = function(){
        errorEmail.classList.add('error'); 
        email.classList.add('error');
    };
var errorZauzetEmail = document.querySelector(".errorZauzetEmail");
    var addErrorZauzetEmail = function(){
        errorZauzetEmail.classList.add('error'); 
        email.classList.add('error');
    };
*/
//srSk
var srSk = document.querySelector(".srednjaSkola");
var errorNevalidnaSrednjaSkola = document.querySelector(".errorNevalidnaSrednjaSkola");
    var addErrorNevalidnaSrSk = function(){ 
        errorNevalidnaSrednjaSkola.classList.add('error');
        srSk.classList.add('error');
    };
var errorSrednjaSkola = document.querySelector(".errorSrednjaSkola");
    var addErrorUnesiteSrSk = function(){ 
        errorSrednjaSkola.classList.add('error');
        srSk.classList.add('error');
    };

//fakultet
var fakultet = document.querySelector(".fakultet");
var errorNevalidanFakultet = document.querySelector(".errorNevalidanFakultet");
    var addErrorNevalidanFakultet = function(){
        fakultet.classList.add('error');
        errorNevalidanFakultet.classList.add('error');
    };
var errorUnesiFakultet = document.querySelector(".errorUnesiFakultet");
    var addErrorUnesiFakultet = function(){
        fakultet.classList.add('error');
        errorUnesiFakultet.classList.add('error');
    };
//indeks
var indeks = document.querySelector(".indeks");
var errorIndeks = document.querySelector(".errorIndeks");
    var addErrorUnesiteIndeks = function(){
        indeks.classList.add('error');
        errorIndeks.classList.add('error');
    };
var errorNevalidanIndeks = document.querySelector(".errorNevalidanIndeks");
    var addErrorNevalidanIndeks = function(){
        indeks.classList.add('error');
        errorNevalidanIndeks.classList.add('error');
    };

//ime
var ime = document.querySelector(".ime");
var errorIme = document.querySelector(".errorIme");
    var addErrorUnesiIme = function(){
        ime.classList.add('error');
        errorIme.classList.add('error');
    };
var errorNevalidanoIme = document.querySelector(".errorNevalidanoIme");
    var addErrorNevalidnoIme = function(){
        ime.classList.add('error');
        errorNevalidanoIme.classList.add('error');
    };

//prezime
var prezime = document.querySelector(".prezime");
var errorPrezime = document.querySelector(".errorPrezime");
    var addErrorUnesiPrezime = function(){
        prezime.classList.add('error');
        errorPrezime.classList.add('error');
    };
var errorNevalidnoPrezime = document.querySelector(".errorNevalidnoPrezime");
    var addErrorNevalidnoPrezime = function(){
        prezime.classList.add('error');
        errorNevalidnoPrezime.classList.add('error');
    };

//datumRodjenja
var datumRodjenja= document.querySelector(".datumRodjenja");
var errorDatumRodjejna= document.querySelector(".errorDatumRodjejna");
    var addErrorUnesiDatumRodjenja = function(){
        datumRodjenja.classList.add('error');
        errorDatumRodjejna.classList.add('error');
    };
var errorNevalidanDatumRodjejna= document.querySelector(".errorNevalidanDatumRodjejna");
    var addErrorNevalidanDatumRodjenja = function(){
        datumRodjenja.classList.add('error');
        errorNevalidanDatumRodjejna.classList.add('error');
    };

//telefon
var telefon = document.querySelector(".telefon");
var errorTelefon = document.querySelector(".errorTelefon");
    var addErrorUnesiTelefon = function(){
        telefon.classList.add('error');
        errorTelefon.classList.add('error');  
    };
var errorNevalidanTelefon = document.querySelector(".errorNevalidanTelefon");
    var addErrorNevalidanTelefon = function(){
        telefon.classList.add('error');
        errorNevalidanTelefon.classList.add('error');  
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

//brojUlaza
var brUlaza = document.querySelector(".brojUlaza");
var errorNevalidanBrojUlaza = document.querySelector(".errorNevalidanBrojUlaza");
    var addErrorNevalidanBrojUlaza = function(){
        brUlaza.classList.add('error');
        errorNevalidanBrojUlaza.classList.add('error');
    };

//brojStana
var brStana = document.querySelector(".brojStana");
var errorNevalidanBrojStana = document.querySelector(".errorNevalidanBrojStana");
    var addErrorNevalidanBrojStana = function(){
        brStana.classList.add('error');
        errorNevalidanBrojStana.classList.add('error');
    };



var pom;
var datum;
var pomocniDatum;
var zadrugar;
//proveri jel postoji korisnik sa zadatim usernamom i ucitaj njegove podatke
var ucitajPodatkeZadrugara = function() {
    fetch("http://localhost:5258/Zadrugar/ValidanUsername/"+username)        //proveri jel ima takav zadrugar
    .then( p=> { //zadrugar, ucitaj njegove podatke u polja 
                    p.json().then(z=>{
                        zadrugar=new Zadrugar(z.id, z.username, z.password, z.ime, z.prezime, z.slika, z.email, z.telefon,
                            z.datumRodjenja, z.jmbg, z.srednjaSkola, z.fakultet, z.indeks, z.lbo, z.brojRacuna, 
                            z.grad, z.ulica, z.brojStana, z.brojUlaza, z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);
                            
                    if(zadrugarUrl==null){
                            //postavljamo sliku gore desno
                            let profilnaSlika = document.querySelector(".profilnaSlika");
                            if(zadrugar && zadrugar.slika!="")
                                profilnaSlika.src=`../../Slike/${zadrugar.slika}`;
                            
                            //korisnikovo ime i prezime loudujemo na portal
                            let imePrezime = document.querySelector(".imePrezime");
                            imePrezime.innerHTML=(`${zadrugar.ime} ${zadrugar.prezime}`);
                    }
                        if(zadrugar.slika!=="" && zadrugar.slika!==undefined){
                            slika.style.backgroundImage="url('../../Slike/"+zadrugar.slika+"')";
                            slikaprom=zadrugar.slika;
                        }
                        if(zadrugar.slika===""){
                            slika.style.backgroundImage="url('../../Slike/brRadnika.png')";
                            slikaprom=zadrugar.slika;
                        }
                        ime.value=zadrugar.ime;
                        prezime.value=zadrugar.prezime;

                        datum = new Date(zadrugar.datumRodjenja);
                        //pomocniDatum=zadrugar.datumRodjenja;
                        pom=datum.getMonth()+1+"/"+datum.getDate()+"/"+datum.getFullYear();

                        datumRodjenja.value=pom;
                        jmbg.value=zadrugar.jmbg;
                        lbo.value=zadrugar.lbo;
                        email.value=zadrugar.email;
                        srSk.value=zadrugar.srednjaSkola;
                        fakultet.value=zadrugar.fakultet;
                        indeks.value=zadrugar.indeks;
                        telefon.value=zadrugar.telefon;
                        brRacuna.value=zadrugar.brojRacuna;
                        grad.value=zadrugar.grad;
                        ulica.value=zadrugar.ulica;
                        brStana.value=zadrugar.brojStana;
                        brUlaza.value=zadrugar.brojUlaza;
                        
                        if(zadrugarUrl==null){
                            // pribavljanje notifikacija vezanih za datog zadrugara
                            let notifikacijeDiv = document.querySelector(".notifikacijeDiv");
                            let notifikacije = [];
                            let brNeprocitanih;
                            fetch(`http://localhost:5258/Notifikacija/PreuzmiNotifikacijeZadrugarProzorce/${zadrugar.id}`)
                            .then(p=>p.json().then(notifLista=>{
                                brNeprocitanih = notifLista.brojNeprocitanih;
                                notifLista.neprocitane.forEach(notif => {
                                    const n = new Notifikacija(notif.id, notif.procitana, notif.zadrugar, notif.notifikacija, notifikacijeDiv);
                                    notifikacije.push(n);
                                });
                                if (brNeprocitanih < 5)
                                {
                                    notifLista.procitane.forEach(notif => {
                                        const n = new Notifikacija(notif.id, notif.procitana, notif.zadrugar, notif.notifikacija, notifikacijeDiv);
                                        notifikacije.push(n);
                                    });
                                }

                                // postavljanje broja neprocitanih notifikacija
                                let brNeprocNotif = document.querySelector(".brNeprocNotif");
                                if (brNeprocitanih > 5)
                                    brNeprocNotif.innerHTML = `5+`;
                                else if (brNeprocitanih != 0)
                                    brNeprocNotif.innerHTML = brNeprocitanih;

                                prikazNotifikacija();
                                omoguciNotifClick();
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
                                    location.href="./zadrugar-notifikacije.html?username="+username;
                                })
                                notifikacijeDiv.appendChild(prikaziSveNotif);
                            }

                            
                            //funkcionalnost klika na notifikaciju
                            function omoguciNotifClick() {
                                let notifClick = document.querySelectorAll(".notifikacija");
                                notifClick.forEach(nc=>{
                                    nc.addEventListener("click", function () {
                                        location.href="../korisnikZadrugar/zadrugar-pregled-notifikacije.html?username="+username+"&notifikacija="+nc.id;
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
    ime.disabled=false;
    prezime.disabled=false;
    datumRodjenja.disabled=false;
    jmbg.disabled=false;
    lbo.disabled=false;
    srSk.disabled=false;
    fakultet.disabled=false;
    telefon.disabled=false;
    brRacuna.disabled=false;
    grad.disabled=false;
    ulica.disabled=false;
    brStana.disabled=false;
    brUlaza.disabled=false;
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
    ime.disabled=true;
    prezime.disabled=true;
    datumRodjenja.disabled=true;
    jmbg.disabled=true;
    lbo.disabled=true;
    srSk.disabled=true;
    fakultet.disabled=true;
    indeks.disabled=true;
    telefon.disabled=true;
    brRacuna.disabled=true;
    grad.disabled=true;
    ulica.disabled=true;
    brStana.disabled=true;
    brUlaza.disabled=true;
    slika.classList.remove('prikazi');
    izmeniPodatke.classList.remove('blokiraj');
    ukloniSliku.classList.remove('enable');
    dodajSliku.classList.remove('enable');
    otkazi.classList.remove('enable');
    sacuvaj.classList.remove('enable');
}

//kad se refresuje strana, ucitaj podatke, onemoguci unos, postavi dugme izmeniPodatke,a ukloni otkazi i sacuvaj
window.onload=ucitajPodatkeZadrugara(),onemoguciUnosPromeniDugmad();

//pritiskom na dugme otkazi, vrati dugme izmeniPodatke
otkazi.addEventListener("click",function(){
    onemoguciUnosPromeniDugmad();
    ucitajPodatkeZadrugara();
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

function IzmeniPodatkeZadrugar(){
    fetch("http://localhost:5258/Zadrugar/IzmeniPodatkeZadrugar/"+username
                                                                             +"/"+document.querySelector(".ime").value
                                                                             +"/"+document.querySelector(".prezime").value
                                                                             +"/"+slikaprom
                                                                             +"/"+telefon.value
                                                                             +"/"+((datumRodjenja.value==pom)? zadrugar.datumRodjenja : datumRodjenja.value)
                                                                             +"/"+jmbg.value
                                                                             +"/"+srSk.value
                                                                             +"/"+fakultet.value
                                                                             +"/"+parseInt(document.querySelector(".indeks").value)
                                                                             +"/"+lbo.value
                                                                             +"/"+brRacuna.value
                                                                             +"/"+grad.value
                                                                             +"/"+ulica.value
                                                                             +"/"+brStana.value
                                                                             +"/"+brUlaza.value,
        
        {
            method: 'PUT',
        }).then(p=>{
            if(p.ok){
                location.reload();
            }  
        })}

sacuvaj.addEventListener("click", function(){


    if(jmbg.value!=="" && lbo.value!=="" && srSk.value!=="" && ime.value!=="" && prezime.value!=="" && datumRodjenja.value!=="" && telefon.value!=="" && brRacuna.value!=="" && grad.value!=="" && ulica.value!==""){
      
        if(jmbg.value.length<13 || jmbg.value.length>13 || isNaN(jmbg.value)===true){
            addErrorNevalidanJMBG();
        }
        else {
            if(lbo.value.length<11 || lbo.value.length>11 || isNaN(lbo.value)===true){
                addErrorNevalidanLBO();
            }
            else {
                        if(srednjaSkola.value.length>50 || isNaN(srednjaSkola.value)!==true){
                            addErrorNevalidnaSrSk();
                        }
                        else{  
                               
                                    let trenutniDatum = new Date();
                                    let datumR = new Date(datumRodjenja.value);
                                    let razlika=Math.abs(trenutniDatum-datumR);
                                    let d = razlika/(1000*3600*24);
                                    if(d>=10950 || d<=5475){
                                        addErrorNevalidanDatumRodjenja();
                                    }
                                    else{
                                    if(/^[a-zA-Z]*$/.test(ime.value)===false){
                                            addErrorNevalidnoIme();
                                    }
                                    else{
                                        if(/^[a-zA-Z]*$/.test(prezime.value)===false){
                                            addErrorNevalidnoPrezime();
                                    }                            
                                    else{
                                            if(isNaN(telefon.value)===true || telefon.length<8){
                                                addErrorNevalidanTelefon();
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
                                                            if(brUlaza.value=="BB" || /[1-9]|[1-9][0-9]|[1-9][0-9][0-9]/.test(parseInt(brUlaza.value))===true){
                                                                if(brStana.value=="BB" || /[1-9]|[1-9][0-9]|[1-9][0-9][0-9]/.test(parseInt(brStana.value))===true){
                                                                    
                                                                    if(fakultet.value==="" && indeks.value===""){
                                                                        indeks.value=999999;
                                                                        fakultet.value=" ";
                                                                        IzmeniPodatkeZadrugar();
                                                                    }
                                                                    
                                                                    else{
                                                                        if(fakultet.value==="" && indeks.value!=="999999"){
                                                                            addErrorUnesiFakultet();
                                                                        }
                                                                        else if(fakultet.value==="" && indeks.value==="999999"){
                                                                            fakultet.value=" ";
                                                                            IzmeniPodatkeZadrugar();
                                                                        }
                                                                        else {
                                                                                if(fakultet.value.length>50 || isNaN(fakultet.value)!==true){
                                                                                    addErrorNevalidanFakultet();
                                                                                    indeks.disabled=true;
                                                                                }
                                                                                else{
                                                                                    if(/^[1-999998]*$/.test(parseInt(indeks.value))===false || indeks.value==="999999"){
                                                                                      
                                                                                        addErrorNevalidanIndeks();
                                                                                    }
                                                                                    else{
                                                                                       console.log(indeks.value);
                                                                                       IzmeniPodatkeZadrugar();
                                                                                    }
                                                                                }
                                                                        }
                                                                    }

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
                }
        }
    else{
        if(jmbg.value===""){
            addErrorUnesiteJMBG();
        }

        if(lbo.value===""){
            addErrorUnesiteLBO();
        }

        if(srSk.value===""){
            addErrorUnesiteSrSk();
        }


        if(ime.value===""){
            addErrorUnesiIme();
        }

        if(prezime.value===""){
            addErrorUnesiPrezime();
        }

        if(datumRodjenja.value===""){
            addErrorUnesiDatumRodjenja();
        }

        if(telefon.value===""){
            addErrorUnesiTelefon();
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




if(zadrugarUrl==null){
    let url;
    //postavljanje linka na dugme "profil"
    let profil = document.querySelector(".profil");
    profil.addEventListener("click",function(){
        url="./zadrugar-profil-podaci.html?username="+username;
        location.href=url;
    })

    //postavljanje linka na dugme "uposliMeIkona"
    let uposlimeLogo=document.querySelector(".uposliMeIkona");
    uposlimeLogo.addEventListener("click",function(){
        url="../korisnikZadrugar/index.html?username="+username;
        location.href=url;
    })

    //postavljanje linka na dugme "pocetna"
    let pocetna=document.querySelector(".pocetna");
    pocetna.addEventListener("click",function(){
        url="../korisnikZadrugar/index.html?username="+username;
        location.href=url;
    })

    //postavljanje linka na dugme "mojaApliciranja"
    let mojaApliciranja=document.querySelector(".mojaApliciranja");
    mojaApliciranja.addEventListener("click",function(){
        url="../korisnikZadrugar/prijavljeni-Oglasi.html?username="+username;
        location.href=url;
    })

    //postavljanje linka na dugme "ugovori"
    let ugovoriDugme=document.querySelector(".ugovori");
    ugovoriDugme.addEventListener("click",function(){
        location.href="../korisnikZadrugar/zadrugar-ugovori.html?username="+username;
    })
    
    //postavljanje linka na dugme "ocene"
    let ocene=document.querySelector(".ocene");
    ocene.addEventListener("click",function(){
        location.href="../korisnikZadrugar/zadrugar-ocene.html?username="+username;
    })

    //postavljanje linka na dugme "prijaviSmetnju"
    let prijaviSmetnje=document.querySelector(".prijaviSmetnje");
    prijaviSmetnje.addEventListener("click",function(){
        url="../korisnikZadrugar/zadrugar-prijavi-smetnju.html?username="+username;
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
        location.href="../korisnikZadrugar/zadrugar-obrisi-profil.html?username="+username;
        
    })
}