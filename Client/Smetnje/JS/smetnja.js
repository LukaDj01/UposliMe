const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //username  

var posalji = document.querySelector(".posalji")

let poslatoTekst = document.querySelector(".poslato");

let vrstaProblema = document.querySelector(".vrstaProblema")
let errorVrstaProblema = document.querySelector(".errorVrstaProblema");
    var addErrorVrstaProblema = function(){ 
        vrstaProblema.classList.add('error');
        errorVrstaProblema.classList.add('error');
    };

let opisProblema=document.querySelector(".opisProblema");
let errorOpisProblema = document.querySelector(".errorOpisProblema");
    var addErrorOpisProblema=function(){
        opisProblema.classList.add('error');
        errorOpisProblema.classList.add('error');
    }

posalji.addEventListener("click",function(){
    if(vrstaProblema.value!="" && opisProblema.value!=""){
        //console.log(vrstaProblema.value);
        //console.log(opisProblema.value);
        let poruka = `Korisnik "${username}" je prijavio smetnju. Vrsta problema: ${vrstaProblema.value}. Opis problema: ${opisProblema.value}.`;
        fetch(`http://localhost:5258/Notifikacija/DodajNotifikacijuZaAdministratora/${poruka}`, // podrazumevajuci da admin ima id 1 (moze biti promenljivo)
        {
            method: "POST"
        });
        poslatoTekst.classList.add('enable');
    }
    else{
        if(vrstaProblema.value===""){
            addErrorVrstaProblema();
        }
        if(opisProblema.value===""){
            addErrorOpisProblema();
        }
    }
})