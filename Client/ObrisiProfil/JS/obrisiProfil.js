const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //odredjeni parametar  


var obrisi = document.querySelector(".obrisi")


let vrstaProblema = document.querySelector(".vrstaProblema")
let errorVrstaProblema = document.querySelector(".errorVrstaProblema");
    var addErrorVrstaProblema = function(){ 
        vrstaProblema.classList.add('error');
        errorVrstaProblema.classList.add('error');
    };

let opisProblema=document.querySelector(".opisProblema");



function fjaObrisiZadrugara(){
    let popap= document.querySelector(".popup");
    popap.classList.add("show");

    
    let otkaziBrisanje= document.querySelector(".otkaziBrisanje");
    otkaziBrisanje.addEventListener("click", function () {
        popap.classList.remove("show");
        popap.removeEventListener("click", fjaZadrugarBrisanje);
    });
    window.addEventListener("click", function (event) {
        if (event.target == popap) {
            popap.classList.remove("show");
            popap.removeEventListener("click", fjaZadrugarBrisanje);
        }
    });

    let potvrdiBrisanje= document.querySelector(".potvrdiBrisanje");
    potvrdiBrisanje.addEventListener("click", fjaZadrugarBrisanje);
         
};

function fjaZadrugarBrisanje() {
    fetch("http://localhost:5258/Zadrugar/IzbrisiZadrugaraPrekousername/"+username,
    {
    method: 'PUT',
    }).then(p=>{
        if(p.ok){
            location.href="../../Logovanje/HTML/logovanje.html";
        }
    });
}

function fjaObrisiZadrugu(){
    let popap= document.querySelector(".popup");
    popap.classList.add("show");

    
    let otkaziBrisanje= document.querySelector(".otkaziBrisanje");
    otkaziBrisanje.addEventListener("click", function () {
        popap.classList.remove("show");
        popap.removeEventListener("click", fjaZadrugaBrisanje);
    });
    window.addEventListener("click", function (event) {
        if (event.target == popap) {
            popap.classList.remove("show");
            popap.removeEventListener("click", fjaZadrugaBrisanje);
        }
    });

    let potvrdiBrisanje= document.querySelector(".potvrdiBrisanje");
    potvrdiBrisanje.addEventListener("click", fjaZadrugaBrisanje);
};

function fjaZadrugaBrisanje() {
    fetch("http://localhost:5258/Zadruga/IzbrisiZadruguPrekousername/"+username,
    {
    method: 'PUT',
    }).then(p=>{
        if(p.ok){
            location.href="../../Logovanje/HTML/logovanje.html";
        }
    });
}

function fjaObrisiPoslodavca(){
    let popap= document.querySelector(".popup");
    popap.classList.add("show");

    
    let otkaziBrisanje= document.querySelector(".otkaziBrisanje");
    otkaziBrisanje.addEventListener("click", function () {
        popap.classList.remove("show");
        popap.removeEventListener("click", fjaPoslodavacBrisanje);
    });
    window.addEventListener("click", function (event) {
        if (event.target == popap) {
            popap.classList.remove("show");
            popap.removeEventListener("click", fjaPoslodavacBrisanje);
        }
    });

    let potvrdiBrisanje= document.querySelector(".potvrdiBrisanje");
    potvrdiBrisanje.addEventListener("click", fjaPoslodavacBrisanje);
};

function fjaPoslodavacBrisanje() {
    fetch("http://localhost:5258/Poslodavac/IzbrisiPoslodavcaPrekousername/"+username,
    {
    method: 'PUT',
    }).then(p=>{
        if(p.ok){
            location.href="../../Logovanje/HTML/logovanje.html";
        }
    });
}

let obrisiKorisnika =  function(){

    fetch("http://localhost:5258/Zadrugar/ValidanUsername/"+username)        //proveri jel ima takav zadrugar
    .then( p=> {
            if(p.status===200){

                fjaObrisiZadrugara();

            }
            else{
                fetch("http://localhost:5258/Zadruga/ValidanUsername/"+username)        //proveri jel ima takva zadruga
                .then( p=> {
                        if(p.status===200){

                            fjaObrisiZadrugu();

                        }
                        else{
                            fetch("http://localhost:5258/Poslodavac/ValidanUsername/"+username)        //proveri jel ima takav poslodavac
                            .then( p=> {
                                    if(p.status===200){
                                       
                                        fjaObrisiPoslodavca();

                                    }
                            })
                        }
                })
            }
    })



}



obrisi.addEventListener("click",function(){
    if(vrstaProblema.value!=""){
        /*console.log(vrstaProblema.value);
        if(opisProblema.value!==""){
            console.log(opisProblema.value);
        }*/
        
        obrisiKorisnika();
    }
    else{
        if(vrstaProblema.value===""){
            addErrorVrstaProblema();
        }
    }
})