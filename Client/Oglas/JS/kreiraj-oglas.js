import { Poslodavac } from "../../Poslodavac/JS/Poslodavac.js";
import { Zadruga} from "../../Zadruga/JS/Zadruga.js"


var proslediOglas=document.querySelector(".proslediOglas")


const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //odredjeni parametar  


let x = document.querySelector(".zadruga");
x.addEventListener("mouseover", function(){
    x.style.color="black";
});

//ucitavanje podataka o poslodavcu
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

//postavi username
let imePrezime = document.querySelector(".imePrezime");
imePrezime.innerHTML=poslodavac.naziv;

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

//postavljanje linka na dugme "kreirajOglas"
let kreirajOglas=document.querySelector(".kreirajOglas");
kreirajOglas.addEventListener("click",function(){
    location.href="../korisnikPoslodavac/poslodavac-kreiraj-oglas.html?username="+username;
})



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

//brPotRadnika
var brPotRadnika = document.querySelector(".brojPotrebnihRadnika");
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
var rokZaPrijavu= document.querySelector(".rokZaPrijavu");
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
var datumIzvrsavanjaPosla= document.querySelector(".datumIzvrsavanjaPosla");
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
var novac = document.querySelector(".novac");
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
var nacinPlacanja  = document.querySelector(".nacinPlacanja");
var errorNacinPlacanja = document.querySelector(".errorNacinPlacanja");
    var addErrorNacinPlacanja = function(){
        nacinPlacanja.classList.add('error');
        errorNacinPlacanja.classList.add('error');
    };


//zadruga
var zadruga  = document.querySelector(".zadruga");
var errorZadruga = document.querySelector(".errorZadruga");
    var addErrorZadruga = function(){
        zadruga.classList.add('error');
        errorZadruga.classList.add('error');
    };


//tip
var tip = document.querySelector(".tip");
var errorTip = document.querySelector(".errorTip");
    var addErrorTip = function(){
        tip.classList.add('error');
        errorTip.classList.add('error');
    };


//grad
var grad = document.querySelector(".grad");
var errorGrad = document.querySelector(".errorGrad");
    var addErrorUnesiGrad = function(){
        grad.classList.add('error');
        errorGrad.classList.add('error');
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


//opis
let opis = document.querySelector(".opis");
let errorUnesiOpis = document.querySelector(".errorUnesiOpis");
    var addErrorUnesiOpis = function(){
        opis.classList.add('error');
        errorUnesiOpis.classList.add('error');
    }







async function dodajOglasBodi(){
    //preuzmi zadrugu id
    /*let zadrugaObjekat;
    let promZadruga = await fetch(`http://localhost:5258/Zadruga/ValidanUsername/${zadruga.options[zadruga.selectedIndex].value}`);
    await promZadruga.json().then(z=>{
        zadrugaObjekat = new Zadruga(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
            z.mobilniTelefon, z.naziv, z.brojRacuna, z.grad, z.ulica, z.brojStana, z.brojUlaza, 
            z.informacije,z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);
    })*/

    return new Promise((resolve,reject)=>{
        resolve(fetch("http://localhost:5258/Oglas/DodajOglas/"+zadruga.options[zadruga.selectedIndex].value+"/"+poslodavac.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                naziv: naziv.value,
                opis: opis.value,
                brojPotrebnihRadnika: brPotRadnika.value,
                grad: grad.options[grad.selectedIndex].value,
                ulica: ulica.value,
                brojStana: brStana.value,
                brojUlaza: brUlaza.value,
                rokZaPrijavu: rokZaPrijavu.value,
                datumPostavljanja: new Date(),
                datumIzvrsavanjaPosla: datumIzvrsavanjaPosla.value,
                tip: tip.options[tip.selectedIndex].value,
                novac: novac.value,
                nacinPlacanja: nacinPlacanja.options[nacinPlacanja.selectedIndex].value
            })
        }));
    })
        
}



proslediOglas.addEventListener("click", function(){
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
                                                                    dodajOglasBodi().then(p=> {
                                                                        if(p.ok){
                                                                            let poruka = `Stigao je novi oglas za validiranje pod nazivom "${naziv.value}" od strane poslodavca "${poslodavac.naziv}".`;
                                                                            fetch(`http://localhost:5258/Notifikacija/DodajNotifikacijuZaZadruguNaziv/${poruka}/${zadruga.options[zadruga.selectedIndex].value}`, 
                                                                            {
                                                                                method: "POST"
                                                                            }).then(p=>{
                                                                                if(p.ok){
                                                                                    location.reload();
                                                                                }
                                                                            });
                                                                            
                                                                        }
                                                                        else{
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