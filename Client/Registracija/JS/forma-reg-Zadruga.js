/*import{ usernamePom, passwordPom, tipKorisnikaPom }from"./registrovanje.js";*/

var prethodnoBtn = document.querySelector(".prethodno");

var zavrsiRegistracijuBtn = document.querySelector(".zavrsi")

/*var slika = document.querySelector(".slika");*/

//username
var username = document.querySelector(".username")
var errorUsername = document.querySelector(".errorUsername");
    var addErrorUnesiUsername = function(){ 
        username.classList.add('error');
        errorUsername.classList.add('error');
    };
var errorNevalidanUsername= document.querySelector(".errorNevalidanUsername");
    var addErrorNevalidanUsername = function(){ 
        username.classList.add('error');
        errorNevalidanUsername.classList.add('error');
    };

//password1
var password1 = document.querySelector(".password1")
var errorPassword1 = document.querySelector(".errorPassword1");
    var addErrorUnesiPassword1 = function(){ 
        password1.classList.add('error');
        errorPassword1.classList.add('error');
    };
var errorNevalidanPassword1= document.querySelector(".errorNevalidanPassword1");
    var addErrorNevalidanPassword1 = function(){ 
        password1.classList.add('error');
        errorNevalidanPassword1.classList.add('error');
    };

//password2
var password2 = document.querySelector(".password2")
var errorPassword2 = document.querySelector(".errorPassword2");
    var addErrorUnesiPassword2 = function(){ 
        password2.classList.add('error');
        errorPassword2.classList.add('error');
    };
var errorNevalidanPassword2= document.querySelector(".errorNevalidanPassword2");
    var addErrorNevalidanPassword2 = function(){ 
        password2.classList.add('error');
        errorNevalidanPassword2.classList.add('error');
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

//informacije
var informacije = document.querySelector(".informacije");


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


prethodnoBtn.addEventListener("click",function(){   
    history.back();
})


let url;
function otvoriHtml(){
    url="../../Zadruga/korisnikZadruga/index.html?username="+username.value;
    location.href=url;
}

async function dodajZadruguBodi(){
    return new Promise((resolve,reject)=>{
    fetch("http://localhost:5258/Zadruga/DodajZadrugu/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                userName: username.value,
                password: password1.value,
                pib: pib.value,
                maticniBroj: maticniBroj.value,
                slika: "brRadnika.png",
                email: email.value,
                fiksniTelefon: mobilniTelefon.value,
                mobilniTelefon: fiksniTelefon.value,
                naziv: naziv.value,
                brojRacuna: brRacuna.value,
                grad: grad.options[grad.selectedIndex].value,
                ulica:  ulica.value,
                brojStana:brStana.value,
                brojUlaza: brUlaza.value,
                informacije: informacije.value

                                        // ovo nece ????
                /*UserName :username.value,
                Password : password1.value,
                PIB: pib.value,
                MaticniBroj: maticniBroj.value,
                Slika : "",
                Email : email.value,
                MobilniTelefon : mobilniTelefon.value,
                FiksniTelefon : fiksniTelefon.value,
                Naziv: naziv.value,
                BrojRacuna : brRacuna.value,
                Grad : grad.value,
                Ulica : ulica.value,
                BrojStana : brStana.value,
                BrojUlaza : brUlaza.value,
                Informacije: informacije.value*/
            })
         }).then(p=>
            {
                if(p.ok)
                {
                    resolve(p);
                }
                else{
                    reject("Nije uspelo dodavanje zadruge!");
                }
            })
    })
}

function proveriZauzetostEmail(){
    fetch("http://localhost:5258/Zadrugar/PreuzmiZadrugaraEmail/"+email.value)        //proveri jel ima takav zadrugar
        .then( p=> {
                    if(p.status!==200){
                         fetch("http://localhost:5258/Zadruga/PreuzmiZadruguEmail/"+email.value)        //proveri jel ima takva zadruga
                        .then( p=> {
                                    if(p.status!==200){
                                         fetch("http://localhost:5258/Poslodavac/PreuzmiPoslodavcaEmail/"+email.value)        //proveri jel ima takva poslodavac
                                        .then( p=> {
                                                    if(p.status!==200){ //nema takvog mejla u bazi, kreiraj 
                                                         //sacuvaj ga u bazi
                                                         dodajZadruguBodi().then(p=>{otvoriHtml()})
                                                                                .catch(s=>console.log(s));
                                                    }
                                                    else{   //poslodavac
                                                       addErrorZauzetEmail();
                                                    }
                                        })
                                    }
                                    else{   //zadruga    
                                        addErrorZauzetEmail();
                                    }                                                              
                        })
                    }
                    else{ //zadrugar
                        addErrorZauzetEmail();
                    }                                       
            })
}





zavrsiRegistracijuBtn.addEventListener("click",function(){
    if(username.value!=="" && password1.value!=="" && password2.value!=="" && pib.value!=="" && maticniBroj.value!=="" && email.value!==""  && naziv.value!=="" && fiksniTelefon.value!=="" && mobilniTelefon.value!=="" && brRacuna.value!=="" && grad.options[grad.selectedIndex].value!=="Izaberi grad" && ulica.value!==""){
      
        if(pib.value.length<9 || pib.value.length>9 || isNaN(pib.value)===true){
            addErrorNevalidanPIB();
        }
        else {
            if(maticniBroj.value.length<8 || maticniBroj.value.length>8 || isNaN(maticniBroj.value)===true){
                addErrorNevalidanMaticniBroj();
            }
            else {
                if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)===false || email.length>100){
                    addErrorNevalidanEmail();
                }
                else {
                                   if(naziv.length>50 || isNaN(naziv.value)!==true){
                                        addErrorNevalidanNaziv();
                                   }
                                   else{
                                   
                                        if(isNaN(fiksniTelefon.value)===true || fiksniTelefon.value.length<6){
                                            addErrorNevalidanFiksniTelefon();
                                        }                            
                                        else{ 
                                            if(isNaN(mobilniTelefon.value)===true || mobilniTelefon.value.length<8){
                                            addErrorNevalidanMobilniTelefon();
                                            }                            
                                            else{
                                                if(isNaN(brRacuna.value)===true){
                                                    addErrorNevalidanBrojRacuna();
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
                                                                    fetch("http://localhost:5258/Zadrugar/ValidanUsername/"+username.value )        //proveri jel neki zadrugar mozda vec koristi taj username
                                                                    .then( p=> {
                                                                            if(p.status===204){
                                                                                fetch("http://localhost:5258/Zadruga/ValidanUsername/"+username.value )         //proveri jel neka zadruga mozda vec koristi taj username
                                                                                .then( p=> {
                                                                                        if(p.status===204){
                                                                                            fetch("http://localhost:5258/Poslodavac/ValidanUsername/"+username.value )        //proveri jel neki poslodavac mozda vec koristi taj username
                                                                                            .then( p=> {
                                                                                                    if(p.status===204){
                                                                                                        fetch("http://localhost:5258/Administrator/ValidanUsername/"+username.value )         //proveri jel administrator mozda vec koristi taj username
                                                                                                        .then( p=> {
                                                                                                                if(p.status===204){
                                                                                                                    if(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password1.value)){     //proverimo jel validna sifra
                                                                                                                        if(password1.value===password2.value){      //proverimo da li se uneta i ponovljena sifra poklapaju
                                                                                                                            proveriZauzetostEmail();  
                                                                                                                        }
                                                                                                                        else{
                                                                                                                            addErrorNevalidanPassword2();   //lozinke se ne poklapaju
                                                                                                                        }
                                                                                                                    }
                                                                                                                    else{
                                                                                                                        addErrorNevalidanPassword1();    //lozinka nevalidna
                                                                                                                    }
                                                                                                                }
                                                                                                                else{
                                                                                                                        addErrorNevalidanUsername();
                                                                                                                    }
                                                                                                        })
                                                                                                    }
                                                                                                    else{
                                                                                                        addErrorNevalidanUsername();
                                                                                                        }
                                                                                            })
                                                                                        }
                                                                                        else{
                                                                                            addErrorNevalidanUsername();
                                                                                            }
                                                                                })
                                                                            }
                                                                            else{
                                                                                addErrorNevalidanUsername();
                                                                                }
                                                                    })
                                                                
                                                        
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

    }
    else{
        if(username.value===""){
            addErrorUnesiUsername();
        } 
        if( password1.value==="" ){
            addErrorUnesiPassword1();
        }
        if(password2.value===""){
            addErrorUnesiPassword2();
        }
        if(pib.value===""){
            addErrorUnesitePIB();
        }

        if(maticniBroj.value===""){
            addErrorUnesiteMaticniBroj();
        }

        if(email.value===""){
            addErrorUnesiteEmail();
        }

        if(naziv.value===""){
            addErrorUnesiNaziv();
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

        if(grad.options[grad.selectedIndex].value==="Izaberi grad"){
            addErrorUnesiGrad();
        }

        if(ulica.value===""){
            addErrorUnesiUlicu();
        }
    }
})