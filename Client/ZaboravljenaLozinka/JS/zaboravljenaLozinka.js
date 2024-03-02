var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1),
             a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", 
             t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) 
             { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), 
             a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, 
             ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () 
             { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) 
             { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

let email = document.querySelector(".email");

let posaljiBtn = document.querySelector(".posaljiKod");

let sacuvajBTN = document.querySelector(".sacuvajBTN");


var ulogujSeBtn = document.querySelector(".ulogujSe");
ulogujSeBtn.addEventListener("click",function(){
    location.href="../../Logovanje/HTML/logovanje.html";
})

//eror za email
let errorUnesiEmail = document.querySelector(".errorUnesiEmail");
var addErrorUnesiEmail = function(){
    email.classList.add('error');
    errorUnesiEmail.classList.add('error');
};

let errorNepostojeciEmail = document.querySelector(".errorNepostojeciEmail");
var addErrorNepostojeciEmail  = function(){
    email.classList.add('error');
    errorNepostojeciEmail.classList.add('error');
};

//error za kod
let kod = document.querySelector(".kod");
let errorNevalidanKod = document.querySelector(".errorNevalidanKod");
var addErrorNevalidanKod = function(){
    kod.classList.add('error');
    errorNevalidanKod.classList.add('error');
};
var removeErrorNevalidanKod = function(){
    kod.classList.remove('error');
    errorNevalidanKod.classList.remove('error');
};
let errorVremeIsteklo = document.querySelector(".errorVremeIsteklo");
var addErrorVremeIsteklo = function(){
    kod.classList.add('error');
    errorVremeIsteklo.classList.add('error');
    kod.disabled=true;
};
var removeVremeIsteklo = function(){
    errorVremeIsteklo.classList.remove('error');
    kod.classList.remove('error');
}     


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


//da se prikazu tajmer i unos koda
let div3d = document.querySelector(".div3D");
var prikaziTajmerIUnosKod = function(){
    div3d.classList.add('prikazi');
};

//da se prikaze deo za promenu sifre
let div4 = document.querySelector(".div4");
var prikaziFormu = function(){
    div4.classList.add('prikazi2');
};

//izbrisi prethodni unos koda
var izbrisiUnosKoda = function(){
    kod.value="";
};

//tajmer
var timeLimitInMinutes;
var timeLimitInSeconds;
var timerElement;
var minutes;
var seconds;
var timerInterval;

function timerPriprema(){   //ako klikne opet dugme posalji, da krene iz pocetka
    if (timeLimitInSeconds > 0) {
        removeVremeIsteklo();
        timerElement.textContent = '01:00';
        clearInterval(timerInterval);
    }
        izbrisiUnosKoda();
        timeLimitInMinutes = 1;
        timeLimitInSeconds = timeLimitInMinutes * 60;
        timerElement = document.querySelector(".tajmer");
}
    
function startTimer() { //tajmer
        timeLimitInSeconds--;
        minutes = Math.floor(timeLimitInSeconds / 60);
        seconds = timeLimitInSeconds % 60;
        
         if (timeLimitInSeconds < 0) {
            addErrorVremeIsteklo();
            timerElement.textContent = '00:00';
            clearInterval(timerInterval);
        return;
        }
        if (minutes < 1) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
            
        timerElement.textContent = minutes + ':' + seconds;
    }

function sekvenca1(){   //pripremi tajmer(vrati ga na 1min i pocni od pocetka), pokreni tajmer, omoguci unos kod, prikazi tajmer i kod input
    timerPriprema();
    timerInterval = setInterval(startTimer, 1000);
    kod.disabled=false;
    prikaziTajmerIUnosKod();
}

let br;

function sendEmail(){
    br=Math.floor(Math.random()*90000) + 10000;
    //function send email
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "samanoku@elfak.rs",
        Password : "87FCB833ABCDB11D7B729D833B989545D9C7",
        To : "samanoku@elfak.rs",
        From : "samanoku@elfak.rs",
        Subject : "Kod za promenu lozinke",
        Body : JSON.stringify(br)
    })
}


//proverava da li je uneti kod jednak sa poslatim, ako jeste, prikazi formu za promenu lozinke i ukloni tajmer
function sekvenca2(){
    if(br!=="" && document.querySelector(".kod").value!==""){
        if(br===parseInt(document.querySelector(".kod").value)){
            prikaziFormu();
            timerElement.textContent = '';
            clearInterval(timerInterval);
        }
        else{
            addErrorNevalidanKod();
        }
    }
}

function promenaSifre(){
    if(password1.value!=="" && password2.value!==""){
        if(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password1.value)){     //proverimo jel validna sifra
            if(password1.value===password2.value){      //proverimo da li se uneta i ponovljena sifra poklapaju
                fetch("http://localhost:5258/Zadrugar/PreuzmiZadrugaraEmail/"+email.value)        //proveri jel ima takav zadrugar
                .then( p=> {
                            if(p.status!==200){
                                fetch("http://localhost:5258/Zadruga/PreuzmiZadruguEmail/"+email.value)        //proveri jel ima takva zadruga
                                .then( p=> {
                                            if(p.status!==200){
                                                    //sigurno je poslodavac
                                                    fetch("http://localhost:5258/Zadrugar/PromeniLozinkuPoslodavac/"+ email.value + "/" +password1.value,
                                                    {
                                                        method:"PUT"
                                                    }) .then( p => {
                                                        if(p.ok){
                                                            (document.querySelector(".poruka")).classList.add('prikazi3');
                                                        }
                                                    }) 
                                            }
                                            else{   //zadruga
                                                fetch("http://localhost:5258/Zadruga/PromeniLozinkuZadruga/"+ email.value + "/" +password1.value,
                                                {
                                                    method:"PUT"
                                                }) .then( p => {
                                                    if(p.ok){
                                                        (document.querySelector(".poruka")).classList.add('prikazi3');
                                                    }
                                                }) 
                                            }                                                              
                                })
                            }
                            else{ //zadrugar
                                fetch("http://localhost:5258/Zadrugar/PromeniLozinkuZadrugar/"+ email.value + "/" +password1.value,
                                {
                                    method:"PUT"
                                }) .then( p => {
                                    if(p.ok){
                                        (document.querySelector(".poruka")).classList.add('prikazi3');
                                    }
                                }) 
                            }                                       
                    })                  
            }
            else{
                addErrorNevalidanPassword2();   //lozinke se ne poklapaju
            }
        }
        else{
            addErrorNevalidanPassword1();    //lozinka nevalidna
        }
    }
    else if(password1.value=="" && password2.value==""){
        addErrorUnesiPassword1();
        addErrorUnesiPassword2();
    }
    else if(password1.value==""){
        addErrorUnesiPassword1();
    }
    else if(password2.value==""){
        addErrorUnesiPassword2();
    }
}

sacuvajBTN.addEventListener("click",promenaSifre);

kod.addEventListener("change",sekvenca2);


posaljiBtn.addEventListener("click",function(){
    removeErrorNevalidanKod();
    removeVremeIsteklo();
    if(email.value!==""){
        fetch("http://localhost:5258/Zadrugar/PreuzmiZadrugaraEmail/"+email.value)        //proveri jel ima takav zadrugar
        .then( p=> {
                    if(p.status!==200){
                        fetch("http://localhost:5258/Zadruga/PreuzmiZadruguEmail/"+email.value)        //proveri jel ima takva zadruga
                        .then( p=> {
                                    if(p.status!==200){
                                        fetch("http://localhost:5258/Poslodavac/PreuzmiPoslodavcaEmail/"+email.value)        //proveri jel ima takva poslodavac
                                        .then( p=> {
                                                    if(p.status!==200){
                                                        addErrorNepostojeciEmail();
                                                    }
                                                    else{   //poslodavac
                                                        sekvenca1();
                                                        sendEmail();
                                                    }
                                        })
                                    }
                                    else{   //zadruga
                                        sekvenca1();
                                        sendEmail();
                                    }                                                              
                        })
                    }
                    else{ //zadrugar
                        sekvenca1();
                        sendEmail();
                    }                                       
            })
    }
    else[
       addErrorUnesiEmail()
    ]
})