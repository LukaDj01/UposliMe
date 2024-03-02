import{Feedback} from './Feedback.js'
import{Poslodavac} from '../../Poslodavac/JS/Poslodavac.js'
import{Zadruga} from '../../Zadruga/JS/Zadruga.js'
import{Zadrugar} from '../../Zadrugar/JS/Zadrugar.js'

const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //ko pristupa
var usernameZadrugar = urlParam.get('zadrugar'); //prosledjen zadrugar 
var usernameZadruga = urlParam.get('zadruga'); //prosledjena zadruga
var usernamePoslodavac = urlParam.get('poslodavac'); //prosledjen poslodavac


let poslodavac;
let zadruga;
let zadrugar;
let feedbacks=[];
let ocenePrikaz=document.querySelector(".ocenePrikaz");

fetch("http://localhost:5258/Zadrugar/ValidanUsername/"+username)        //proveri jel ima takav zadrugar
        .then( p=> {
                if(p.status===200){
                   //proveri da li zadrugar pristupa svom profilu
                   if(usernameZadruga==null && usernameZadrugar==null && usernamePoslodavac==null){
                    fetch(`http://localhost:5258/Zadrugar/ValidanUsername/${username}`).then(p=>{
                        p.json().then(z=>{
                            zadrugar = new Zadrugar(z.id, z.userName, z.password, z.ime, z.prezime, z.slika, z.email, z.telefon,
                                z.datumRodjenja, z.jmbg, z.srednjaSkola, z.fakultet, z.indeks, z.lbo, z.brojRacuna, 
                                z.grad, z.ulica, z.brojStana, z.brojUlaza, z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);

                                fetch(`http://localhost:5258/Feedback/PreuzmiFeedbackZadrugar/${zadrugar.id}`).then(q=> {
                                    q.json().then(f=>{
                                        f.forEach(feedback=>{
                                            const fb = new Feedback(feedback.id, feedback.ocena, feedback.komentar, feedback.zadrugar, feedback.zadruga, feedback.poslodavac);
                                            feedbacks.push(fb);
                                        })
                                        prikaziFeedback(feedbacks);
                                    })
                                })
                        })
                    })
                   
                }//proveri da li zadrugar pristupa  profilu posldoavca, ako da, onda ucitaj njegove komentare
                else if(usernameZadruga==null && usernameZadrugar==null && usernamePoslodavac!=null){
                    fetch(`http://localhost:5258/Poslodavac/ValidanUsername/${usernamePoslodavac}`).then(p=>{ 
                        p.json().then(z=>{
                            poslodavac = new Poslodavac(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
                                z.mobilniTelefon, z.naziv, z.delatnost, z.grad, z.ulica, z.brojStana, z.brojUlaza, z.informacije, 
                                z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);


                            fetch(`http://localhost:5258/Feedback/PreuzmiFeedbackPoslodavac/${poslodavac.id}`).then(q => {
                                q.json().then(f=>{
                                    f.forEach(feedback=>{
                                        const fb = new Feedback(feedback.id, feedback.ocena, feedback.komentar, feedback.zadrugar, feedback.zadruga, feedback.poslodavac);
                                        feedbacks.push(fb);
                                    })
                                    prikaziFeedback(feedbacks);
                                })
                            })
                    
                        })
                    })

                    
                }//proveri da li zadrugar pristupa  profilu zadruge, ako da, onda ucitaj njene komentare
                else if(usernameZadruga!=null && usernameZadrugar==null && usernamePoslodavac==null){
                    fetch(`http://localhost:5258/Zadruga/ValidanUsername/${usernameZadruga}`).then(p=>{ 
                        p.json().then(z=>{
                            zadruga = new Zadruga(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
                                z.mobilniTelefon, z.naziv, z.brojRacuna, z.grad, z.ulica, z.brojStana, z.brojUlaza, 
                                z.informacije,z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);


                            fetch(`http://localhost:5258/Feedback/PreuzmiFeedbackZadruga/${zadruga.id}`).then(q => {
                                q.json().then(f=>{
                                    f.forEach(feedback=>{
                                        const fb = new Feedback(feedback.id, feedback.ocena, feedback.komentar, feedback.zadrugar, feedback.zadruga, feedback.poslodavac);
                                        feedbacks.push(fb);
                                    })
                                    prikaziFeedback(feedbacks);
                                })
                            })
                    
                        })
                    })
                }
                }
                else{
                    fetch("http://localhost:5258/Zadruga/ValidanUsername/"+username)        //proveri jel ima takva zadruga
                    .then( p=> {
                            if(p.status===200){
                               //proveri da li zadruga pristupa svom profilu
                               if(usernameZadruga==null && usernameZadrugar==null && usernamePoslodavac==null){
                                fetch(`http://localhost:5258/Zadruga/ValidanUsername/${username}`).then(p=>{
                                    p.json().then(z=>{
                                        zadruga = new Zadruga(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
                                            z.mobilniTelefon, z.naziv, z.brojRacuna, z.grad, z.ulica, z.brojStana, z.brojUlaza, 
                                            z.informacije,z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);
                                        
                                            fetch(`http://localhost:5258/Feedback/PreuzmiFeedbackZadruga/${zadruga.id}`).then(q=>{
                                                q.json().then(f=>{
                                                    f.forEach(feedback=>{
                                                        const fb = new Feedback(feedback.id, feedback.ocena, feedback.komentar, feedback.zadrugar, feedback.zadruga, feedback.poslodavac);
                                                        feedbacks.push(fb);
                                                    })
                                                    prikaziFeedback(feedbacks);
                                            })})

                                    })
                                });
                               
                            }//proveri da li zadruga pristupa  profilu posldoavca, ako da, onda ucitaj njegove komentare
                            else if(usernameZadruga==null && usernameZadrugar==null && usernamePoslodavac!=null){
                                fetch(`http://localhost:5258/Poslodavac/ValidanUsername/${usernamePoslodavac}`).then(p=>{ 
                                    p.json().then(z=>{
                                        poslodavac = new Poslodavac(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
                                            z.mobilniTelefon, z.naziv, z.delatnost, z.grad, z.ulica, z.brojStana, z.brojUlaza, z.informacije, 
                                            z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);


                                        fetch(`http://localhost:5258/Feedback/PreuzmiFeedbackPoslodavac/${poslodavac.id}`).then(q => {
                                            q.json().then(f=>{
                                                f.forEach(feedback=>{
                                                    const fb = new Feedback(feedback.id, feedback.ocena, feedback.komentar, feedback.zadrugar, feedback.zadruga, feedback.poslodavac);
                                                    feedbacks.push(fb);
                                                })
                                                prikaziFeedback(feedbacks);
                                            })
                                        })
                                
                                    })
                                })
            
                                
                            }//proveri da li zadruga pristupa  profilu zadrugadrugara, ako da, onda ucitaj njegove komentare
                            else if(usernameZadruga==null && usernameZadrugar!=null && usernamePoslodavac==null){
                                fetch(`http://localhost:5258/Zadrugar/ValidanUsername/${usernameZadrugar}`).then(p=>{
                                    p.json().then(z=>{
                                        zadrugar = new Zadrugar(z.id, z.userName, z.password, z.ime, z.prezime, z.slika, z.email, z.telefon,
                                            z.datumRodjenja, z.jmbg, z.srednjaSkola, z.fakultet, z.indeks, z.lbo, z.brojRacuna, 
                                            z.grad, z.ulica, z.brojStana, z.brojUlaza, z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);

                                            fetch(`http://localhost:5258/Feedback/PreuzmiFeedbackZadrugar/${zadrugar.id}`).then(q=> {
                                                q.json().then(f=>{
                                                    f.forEach(feedback=>{
                                                        const fb = new Feedback(feedback.id, feedback.ocena, feedback.komentar, feedback.zadrugar, feedback.zadruga, feedback.poslodavac);
                                                        feedbacks.push(fb);
                                                    })
                                                    prikaziFeedback(feedbacks);
                                                })
                                            })
                                    })
                                })
                            }
                            }
                            else{
                                fetch("http://localhost:5258/Poslodavac/ValidanUsername/"+username)        //proveri jel ima takav poslodavac
                                .then( p=> {
                                        if(p.status===200){
                                            //proveri da li poslodavac pristupa svom profilu
                                            if(usernameZadruga==null && usernameZadrugar==null && usernamePoslodavac==null){
                                                fetch(`http://localhost:5258/Poslodavac/ValidanUsername/${username}`).then(p=>{
                                                    p.json().then(z=>{
                                                        poslodavac = new Poslodavac(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
                                                            z.mobilniTelefon, z.naziv, z.delatnost, z.grad, z.ulica, z.brojStana, z.brojUlaza, z.informacije, 
                                                            z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);
                                                        
                                                            fetch(`http://localhost:5258/Feedback/PreuzmiFeedbackPoslodavac/${poslodavac.id}`).then(q=>{
                                                                q.json().then(f=>{
                                                                    f.forEach(feedback=>{
                                                                        const fb = new Feedback(feedback.id, feedback.ocena, feedback.komentar, feedback.zadrugar, feedback.zadruga, feedback.poslodavac);
                                                                        feedbacks.push(fb);
                                                                    })
                                                                    prikaziFeedback(feedbacks);
                                                            })})

                                                    })
                                                });
                                               
                                            }//proveri da li poslodavac pristupa  profilu zadruge, ako da, onda ucitaj njene komentare
                                            else if(usernameZadruga!=null && usernameZadrugar==null && usernamePoslodavac==null){
                                                fetch(`http://localhost:5258/Zadruga/ValidanUsername/${usernameZadruga}`).then(p=>{ 
                                                    p.json().then(z=>{
                                                        zadruga = new Zadruga(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
                                                            z.mobilniTelefon, z.naziv, z.brojRacuna, z.grad, z.ulica, z.brojStana, z.brojUlaza, 
                                                            z.informacije,z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);


                                                        fetch(`http://localhost:5258/Feedback/PreuzmiFeedbackZadruga/${zadruga.id}`).then(q => {
                                                            q.json().then(f=>{
                                                                f.forEach(feedback=>{
                                                                    const fb = new Feedback(feedback.id, feedback.ocena, feedback.komentar, feedback.zadrugar, feedback.zadruga, feedback.poslodavac);
                                                                    feedbacks.push(fb);
                                                                })
                                                                prikaziFeedback(feedbacks);
                                                            })
                                                        })
                                                
                                                    })
                                                })
                            
                                                
                                            }//proveri da li poslodavac pristupa  profilu zadrugadrugara, ako da, onda ucitaj njegove komentare
                                            else if(usernameZadruga==null && usernameZadrugar!=null && usernamePoslodavac==null){
                                                fetch(`http://localhost:5258/Zadrugar/ValidanUsername/${usernameZadrugar}`).then(p=>{
                                                    p.json().then(z=>{
                                                        zadrugar = new Zadrugar(z.id, z.userName, z.password, z.ime, z.prezime, z.slika, z.email, z.telefon,
                                                            z.datumRodjenja, z.jmbg, z.srednjaSkola, z.fakultet, z.indeks, z.lbo, z.brojRacuna, 
                                                            z.grad, z.ulica, z.brojStana, z.brojUlaza, z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);

                                                            fetch(`http://localhost:5258/Feedback/PreuzmiFeedbackZadrugar/${zadrugar.id}`).then(q=> {
                                                                q.json().then(f=>{
                                                                    f.forEach(feedback=>{
                                                                        const fb = new Feedback(feedback.id, feedback.ocena, feedback.komentar, feedback.zadrugar, feedback.zadruga, feedback.poslodavac);
                                                                        feedbacks.push(fb);
                                                                    })
                                                                    prikaziFeedback(feedbacks);
                                                                })
                                                            })
                                                    })
                                                })
                                            }
                                        }
                                        else{
                                            fetch("http://localhost:5258/Administrator/ValidanUsername/"+username)        //proveri jel ima takav admin
                                            .then( p=> {
                                                    if(p.status===200)
                                                    
                                                        if(usernameZadruga==null && usernameZadrugar==null && usernamePoslodavac!=null){
                                                        fetch(`http://localhost:5258/Poslodavac/ValidanUsername/${usernamePoslodavac}`).then(p=>{
                                                            p.json().then(z=>{
                                                                poslodavac = new Poslodavac(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
                                                                    z.mobilniTelefon, z.naziv, z.delatnost, z.grad, z.ulica, z.brojStana, z.brojUlaza, z.informacije, 
                                                                    z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);
                                                                
                                                                    fetch(`http://localhost:5258/Feedback/PreuzmiFeedbackPoslodavac/${poslodavac.id}`).then(q=>{
                                                                        q.json().then(f=>{
                                                                            f.forEach(feedback=>{
                                                                                const fb = new Feedback(feedback.id, feedback.ocena, feedback.komentar, feedback.zadrugar, feedback.zadruga, feedback.poslodavac);
                                                                                feedbacks.push(fb);
                                                                            })
                                                                            prikaziFeedback(feedbacks);
                                                                    })})
        
                                                            })
                                                        });
                                                       
                                                    }//proveri da li poslodavac pristupa  profilu zadruge, ako da, onda ucitaj njene komentare
                                                    else if(usernameZadruga!=null && usernameZadrugar==null && usernamePoslodavac==null){
                                                        fetch(`http://localhost:5258/Zadruga/ValidanUsername/${usernameZadruga}`).then(p=>{ 
                                                            p.json().then(z=>{
                                                                zadruga = new Zadruga(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
                                                                    z.mobilniTelefon, z.naziv, z.brojRacuna, z.grad, z.ulica, z.brojStana, z.brojUlaza, 
                                                                    z.informacije,z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);
        
        
                                                                fetch(`http://localhost:5258/Feedback/PreuzmiFeedbackZadruga/${zadruga.id}`).then(q => {
                                                                    q.json().then(f=>{
                                                                        f.forEach(feedback=>{
                                                                            const fb = new Feedback(feedback.id, feedback.ocena, feedback.komentar, feedback.zadrugar, feedback.zadruga, feedback.poslodavac);
                                                                            feedbacks.push(fb);
                                                                        })
                                                                        prikaziFeedback(feedbacks);
                                                                    })
                                                                })
                                                        
                                                            })
                                                        })
                                    
                                                        
                                                    }//proveri da li poslodavac pristupa  profilu zadrugadrugara, ako da, onda ucitaj njegove komentare
                                                    else if(usernameZadruga==null && usernameZadrugar!=null && usernamePoslodavac==null){
                                                        fetch(`http://localhost:5258/Zadrugar/ValidanUsername/${usernameZadrugar}`).then(p=>{
                                                            p.json().then(z=>{
                                                                zadrugar = new Zadrugar(z.id, z.userName, z.password, z.ime, z.prezime, z.slika, z.email, z.telefon,
                                                                    z.datumRodjenja, z.jmbg, z.srednjaSkola, z.fakultet, z.indeks, z.lbo, z.brojRacuna, 
                                                                    z.grad, z.ulica, z.brojStana, z.brojUlaza, z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);
        
                                                                    fetch(`http://localhost:5258/Feedback/PreuzmiFeedbackZadrugar/${zadrugar.id}`).then(q=> {
                                                                        q.json().then(f=>{
                                                                            f.forEach(feedback=>{
                                                                                const fb = new Feedback(feedback.id, feedback.ocena, feedback.komentar, feedback.zadrugar, feedback.zadruga, feedback.poslodavac);
                                                                                feedbacks.push(fb);
                                                                            })
                                                                            prikaziFeedback(feedbacks);
                                                                        })
                                                                    })
                                                            })
                                                        })
                                                    }
                                                
                                                    else{
                                                        alert("Greska!")
                                                    }
                                            })
                                        }
                                })
                            }
                    })
                }
        })
















//funkcija za prikaz oglasa
function prikaziFeedback(niz) {
    brisanjeFeedbacka();
    
    //ako je poslodavac pristupio profilu zadruge ili zadrugara
    if(usernameZadruga!=null || usernameZadrugar!=null){
        //proveri jel ima uopste ocene i komentare, ako ima napisi Ocene i izcrtaj ih, ako nema, preskoci
        if(feedbacks.length>0){
            let naslovOcene = document.createElement("a");
            naslovOcene.classList.add('naslovOcene');
            naslovOcene.innerHTML="Ocene";
            naslovOcene.style.fontSize="40px";
            naslovOcene.style.textDecoration="none";
            naslovOcene.style.color="black";
            ocenePrikaz.appendChild(naslovOcene);
        }
    }

    if(niz.length!=0)
    {
        niz.forEach(fb => {
            fb.crtajFeedback(ocenePrikaz);
        });

    }
}

//brisanje oglasa
function brisanjeFeedbacka() {
    let ocenePodaci = document.querySelector(".ocenePodaci");
    ocenePodaci.removeChild(ocenePrikaz);
    ocenePrikaz = document.createElement("div");
    ocenePrikaz.classList.add("ocenePrikaz");
    ocenePodaci.appendChild(ocenePrikaz);
}