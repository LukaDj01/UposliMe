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
    url="../../Zadrugar/korisnikZadrugar/index.html?username="+username.value;
    location.href=url;
}

 async function dodajZadrugaraBodi(){
    return new Promise((resolve,reject)=>{
        resolve(fetch("http://localhost:5258/Zadrugar/DodajZadrugara/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                UserName :username.value,
                Password : password1.value,
                Ime : ime.value,
                Prezime : prezime.value,
                Slika : "brRadnika.png",
                Email : email.value,
                Telefon : telefon.value,
                DatumRodjenja : datumRodjenja.value,
                JMBG : jmbg.value,
                SrednjaSkola : srSk.value,
                Fakultet : (fakultet.value!=="")? fakultet.value:"",
                Indeks : (fakultet.value!=="")? indeks.value:999999,
                LBO : lbo.value,
                BrojRacuna : brRacuna.value,
                Grad : grad.options[grad.selectedIndex].value,
                Ulica : ulica.value,
                BrojStana : brStana.value,
                BrojUlaza : brUlaza.value
            })
        }));
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
                                                         dodajZadrugaraBodi().then(p=>{if(p.status===200)otvoriHtml()})
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



zavrsiRegistracijuBtn.addEventListener("click", function(){
    if(username.value!=="" && password1.value!=="" && password2.value!=="" && jmbg.value!=="" && lbo.value!=="" && email.value!=="" && srSk.value!=="" && ime.value!=="" && prezime.value!=="" && datumRodjenja.value!=="" && telefon.value!=="" && brRacuna.value!=="" && grad.options[grad.selectedIndex].value!=="Izaberi grad" && ulica.value!==""){
      
        if(jmbg.value.length<13 || jmbg.value.length>13 || isNaN(jmbg.value)===true){
            addErrorNevalidanJMBG();
        }
        else {
            if(lbo.value.length<11 || lbo.value.length>11 || isNaN(lbo.value)===true){
                addErrorNevalidanLBO();
            }
            else {
                if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)===false || email.length>100){
                    addErrorNevalidanEmail();
                }
                else {
                        if(srSk.length>50 || isNaN(srSk.value)!==true){
                            addErrorNevalidnaSrSk();
                        }
                        else {
                            if( fakultet.length>50 || isNaN(srSk.value)!==true){
                                addErrorNevalidanFakultet();
                                indeks.disabled=true;
                            }
                            else{
                                if(fakultet.value!=="" && (/^[1-999999]*$/.test(indeks.value)===false || indeks.value==="999999")){
                                    addErrorNevalidanIndeks();
                                }
                                else{
                                    let trenutniDatum = new Date();
                                    let datumR = new Date(datumRodjenja.value)
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
                                            if(isNaN(telefon.value)===true || telefon.value.length<8){
                                                addErrorNevalidanTelefon();
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
                                                                                                                             proveriZauzetostEmail();    //ako se poklapaju, pokreni proveru zauzetosti mejla
                                                                                                                           
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
        if(jmbg.value===""){
            addErrorUnesiteJMBG();
        }

        if(lbo.value===""){
            addErrorUnesiteLBO();
        }

        if(email.value===""){
            addErrorUnesiteEmail();
        }

        if(srSk.value===""){
            addErrorUnesiteSrSk();
        }

        if(fakultet.value!="" && indeks.value===""){
            addErrorUnesiteIndeks();
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

        if(grad.options[grad.selectedIndex].value==="Izaberi grad"){
            addErrorUnesiGrad();
        }

        if(ulica.value===""){
            addErrorUnesiUlicu();
        }
    }
})