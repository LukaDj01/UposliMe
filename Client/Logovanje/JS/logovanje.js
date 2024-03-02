var loginBtn = document.querySelector(".logovanjeBTN");
var username=document.querySelector(".username");
var password=document.querySelector(".password");

//username
var errorUsername = document.querySelector(".errorUsername");
    var addErrorUnesiUsername = function(){
        username.classList.add('error');
        errorUsername.classList.add('error');
    };
var errorUsernameIPasswordDontMatch = document.querySelectorAll(".errorUsernameIPasswordDontMatch");
    var addErrorUsernameIPasswordDontMatch = function(){
        username.classList.add('error');
        password.classList.add('error');
        errorUsernameIPasswordDontMatch[0].classList.add('error');
        errorUsernameIPasswordDontMatch[1].classList.add('error');
    };

//password
var errorPassword = document.querySelector(".errorPassword");
    var addErroruUnesiPassword = function(){
        password.classList.add('error');
        errorPassword.classList.add('error');
    };

    var url;
loginBtn.addEventListener("click", loginovanje);


function loginovanje(){
    if(username.value!=="" && password.value!==""){

        fetch("http://localhost:5258/Zadrugar/PreuzmiZadrugaraUsernameIPassword/"+username.value + "/" + password.value)        //proveri jel ima takav zadrugar
        .then( p=> {
                if(p.status===200){
                    url="../../Zadrugar/korisnikZadrugar/index.html?username="+username.value;
                    location.href=url;
                }
                else{
                    fetch("http://localhost:5258/Zadruga/PreuzmiZadruguUsernameIPassword/"+username.value + "/" + password.value)        //proveri jel ima takva zadruga
                    .then( p=> {
                            if(p.status===200){
                                url="../../Zadruga/korisnikZadruga/index.html?username="+username.value;
                                location.href=url;
                            }
                            else{
                                fetch("http://localhost:5258/Poslodavac/PreuzmiPoslodavcaUsernameIPassword/"+username.value + "/" + password.value)        //proveri jel ima takav poslodavac
                                .then( p=> {
                                        if(p.status===200){
                                            url="../../Poslodavac/korisnikPoslodavac/index.html?username="+username.value;
                                            location.href=url;
                                        }
                                        else{
                                            fetch("http://localhost:5258/Administrator/PreuzmiAdministratoraUsernameIPassword/"+username.value + "/" + password.value)        //proveri jel ima takav administrator
                                            .then( p=> {
                                                    if(p.status===200){
                                                        url="../../Administrator/korisnikAdministrator/index.html?username="+username.value;
                                                        location.href=url;
                                                    }
                                                    else{
                                                            addErrorUsernameIPasswordDontMatch();
                                                        }
                                            })
                                        }
                                })
                            }
                    })
                }
        })
        

    }
    else if(username.value==="" && password.value===""){
        addErrorUnesiUsername();
        addErroruUnesiPassword();
    }
    else if(username.value===""){
        addErrorUnesiUsername();
    }
    else if(password.value===""){
        addErroruUnesiPassword();
    }
    
}

username.addEventListener("keypress", function (event) {
    if(event.key === "Enter")
    {
        loginovanje();
    }
})

password.addEventListener("keypress", function (event) {
    if(event.key === "Enter")
    {
        loginovanje();
    }
})