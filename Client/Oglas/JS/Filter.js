import {Zadruga} from '../../Zadruga/JS/Zadruga.js'
import {Poslodavac} from '../../Poslodavac/JS/Poslodavac.js'

export class Filter{
    
    constructor(){
        this.gradovi = [ "Beograd", "Bor", "Čačak","Jagodina","Kikinda","Kraljevo","Kragujevac","Kruševac","Leskovac",
                      "Loznica", "Novi Pazar", "Novi Sad", "Niš", "Pančevo", "Pirot", "Požarevac", "Prokuplje",
                      "Smederevo", "Sombor", "Sremska Mitrovica", "Subotica", "Šabac", "Užice", "Valjevo", "Vranje",
                      "Vršac",  "Zaječar", "Zrenjanin"];
        this.naciniPlacanja = ["Po satu", "Na dnevnom nivou", "Na nedeljnom nivou", "Na mesečnom nivou", "Na tri meseca", "Ostalo"];
        this.tipovi = [  "Administracija", "Gradjevina", "Dizajn","Elektronika", "Ekonomija","Zabava", "Zdravstvo","IT","Logistika",
                    "Masinstvo", "Montaza", "Marketing","Mediji","Magacin","Odrzavanje",  "Obezbedjenje","Pravo","Proizvodnja", "Priprema hrane",
                    "Racunovodstvo", "Stomatologija", "Turizam","Transport", "Umetnost", "Ugostiteljstvo",  "Trgovina", "Ostalo"];
    }

    

    crtajFilter(host){
        //naslov "Filteri"
        let naslovDiv = document.createElement("div");
        naslovDiv.classList.add("naslovDiv");
        host.appendChild(naslovDiv);

        let naslov = document.createElement("h2");
        naslov.classList.add("naslov");
        naslov.innerHTML="Filteri";
        naslovDiv.appendChild(naslov);
        
        //Grad
        let gradDiv = document.createElement("div");
        gradDiv.classList.add("gradDiv");
        host.appendChild(gradDiv);

        let gradLabela = document.createElement("label");
        gradLabela.classList.add("gradLabela");
        gradLabela.innerHTML="Grad: ";
        gradDiv.appendChild(gradLabela);

        let gradVrednost = document.createElement("select");
        gradVrednost.classList.add("gradVrednostFilter");
        gradDiv.appendChild(gradVrednost);

        let izaberiGrad;
        izaberiGrad= document.createElement("option");
        izaberiGrad.classList.add("izaberiGrad");
        izaberiGrad.innerHTML="Izaberi grad";
        izaberiGrad.value="Izaberi grad";
        gradVrednost.appendChild(izaberiGrad);

        this.gradovi.forEach(ind=>{
            izaberiGrad= document.createElement("option");
            izaberiGrad.innerHTML=ind;
            izaberiGrad.value=ind;
            gradVrednost.appendChild(izaberiGrad);
        })
        
    
        //Datum izvrsavanja
        let datumIzvrsavanjaDiv = document.createElement("div");
        datumIzvrsavanjaDiv.classList.add("datumIzvrsavanjaDiv");
        host.appendChild(datumIzvrsavanjaDiv);

        let datumIzvrsavanjaLabela = document.createElement("label");
        datumIzvrsavanjaLabela.classList.add("datumIzvrsavanjaLabela");
        datumIzvrsavanjaLabela.innerHTML="Datum izvrsavanja: ";
        datumIzvrsavanjaDiv.appendChild(datumIzvrsavanjaLabela);

        let datumIzvrsavanjaVrednost = document.createElement("input");
        datumIzvrsavanjaVrednost.classList.add("datumIzvrsavanjaVrednost");
        datumIzvrsavanjaVrednost.type="date";
        datumIzvrsavanjaDiv.appendChild(datumIzvrsavanjaVrednost);
        
        //Tip
        let tipDiv = document.createElement("div");
        tipDiv.classList.add("tipDiv");
        host.appendChild(tipDiv);

        let tipLabela = document.createElement("label");
        tipLabela.classList.add("tipLabela");
        tipLabela.innerHTML="Tip: ";
        tipDiv.appendChild(tipLabela);

        let tipVrednost = document.createElement("select");
        tipVrednost.classList.add("tipVrednost");
        tipDiv.appendChild(tipVrednost);

        let izaberiTip = document.createElement("option");
        izaberiTip.classList.add("izaberiTip");
        izaberiTip.innerHTML="Izaberi tip";
        izaberiTip.value="Izaberi tip";
        tipVrednost.appendChild(izaberiTip);

        this.tipovi.forEach(ind=>{
            izaberiTip= document.createElement("option");
            izaberiTip.innerHTML=ind;
            izaberiTip.value=ind;
            tipVrednost.appendChild(izaberiTip);
        });
        
        //Nacin placanja
        let nacinPlacanjaDiv = document.createElement("div");
        nacinPlacanjaDiv.classList.add("nacinPlacanjaDiv");
        host.appendChild(nacinPlacanjaDiv);

        let nacinPlacanjaLabela = document.createElement("label");
        nacinPlacanjaLabela.classList.add("nacinPlacanjaLabela");
        nacinPlacanjaLabela.innerHTML="Nacin placanja: ";
        nacinPlacanjaDiv.appendChild(nacinPlacanjaLabela);

        let nacinPlacanjaVrednost = document.createElement("select");
        nacinPlacanjaVrednost.classList.add("nacinPlacanjaVrednost");
        nacinPlacanjaDiv.appendChild(nacinPlacanjaVrednost);

        let izaberiNacinPlacanja = document.createElement("option");
        izaberiNacinPlacanja.classList.add("izaberiNacinPlacanja");
        izaberiNacinPlacanja.innerHTML="Izaberi način plaćanja";
        izaberiNacinPlacanja.value="Izaberi način plaćanja";
        nacinPlacanjaVrednost.appendChild(izaberiNacinPlacanja);
        
        this.naciniPlacanja.forEach(ind=>{
            izaberiNacinPlacanja= document.createElement("option");
            izaberiNacinPlacanja.innerHTML=ind;
            izaberiNacinPlacanja.value=ind;
            nacinPlacanjaVrednost.appendChild(izaberiNacinPlacanja);
        })

        //Novac od
        let novacOdDiv = document.createElement("div");
        novacOdDiv.classList.add("novacOdDiv");
        host.appendChild(novacOdDiv);

        let novacOdLabela = document.createElement("label");
        novacOdLabela.classList.add("novacOdLabela");
        novacOdLabela.innerHTML="Novac od: ";
        novacOdDiv.appendChild(novacOdLabela);

        let novacOdVrednost = document.createElement("input");
        novacOdVrednost.classList.add("novacOdVrednost");
        novacOdVrednost.type="number";
        novacOdVrednost.min=0;
        novacOdVrednost.max=9999999;
        novacOdVrednost.maxLength=7;
        novacOdVrednost.value=0;
        novacOdDiv.appendChild(novacOdVrednost);
        
        //Novac do
        let novacDoDiv = document.createElement("div");
        novacDoDiv.classList.add("novacDoDiv");
        host.appendChild(novacDoDiv);

        let novacDoLabela = document.createElement("label");
        novacDoLabela.classList.add("novacDoLabela");
        novacDoLabela.innerHTML="Novac do: ";
        novacDoDiv.appendChild(novacDoLabela);

        let novacDoVrednost = document.createElement("input");
        novacDoVrednost.classList.add("novacDoVrednost");
        novacDoVrednost.type="number";
        novacOdVrednost.min=0;
        novacOdVrednost.max=9999999;
        novacOdVrednost.maxLength=7;
        novacDoVrednost.value=9999999;
        novacDoDiv.appendChild(novacDoVrednost);
        
        //Dugmici
        let dugmiciDiv = document.createElement("div");
        dugmiciDiv.classList.add("dugmiciDiv");
        host.appendChild(dugmiciDiv);

        let dugmeOtkaziDiv = document.createElement("div");
        dugmeOtkaziDiv.classList.add("dugmeOtkaziDiv");
        dugmiciDiv.appendChild(dugmeOtkaziDiv);

        let dugmeOtkazi = document.createElement("input");
        dugmeOtkazi.classList.add("dugmeOtkazi");
        dugmeOtkazi.type="button";
        dugmeOtkazi.value="Otkaži";
        dugmeOtkaziDiv.appendChild(dugmeOtkazi);

        let dugmePrimeniDiv = document.createElement("div");
        dugmePrimeniDiv.classList.add("dugmePrimeniDiv");
        dugmiciDiv.appendChild(dugmePrimeniDiv);

        let dugmePrimeni = document.createElement("input");
        dugmePrimeni.classList.add("dugmePrimeni");
        dugmePrimeni.type="button";
        dugmePrimeni.value="Primeni";
        dugmePrimeniDiv.appendChild(dugmePrimeni);
        
    }

    crtajFilterAdminPocetna(host){
        //naslov "Filteri"
        let naslovDiv = document.createElement("div");
        naslovDiv.classList.add("naslovDiv");
        host.appendChild(naslovDiv);

        let naslov = document.createElement("h2");
        naslov.classList.add("naslov");
        naslov.innerHTML="Filteri";
        naslovDiv.appendChild(naslov);
        
        //Zadruga
        let zadrugaDiv = document.createElement("div");
        zadrugaDiv.classList.add("zadrugaDiv");
        host.appendChild(zadrugaDiv);

        let zadrugaLabela = document.createElement("label");
        zadrugaLabela.classList.add("zadrugaLabela");
        zadrugaLabela.innerHTML="Zadruga: ";
        zadrugaDiv.appendChild(zadrugaLabela);

        let zadrugaVrednost = document.createElement("select");
        zadrugaVrednost.classList.add("zadrugaVrednostFilter");
        zadrugaDiv.appendChild(zadrugaVrednost);

        let izaberiZadrugu;
        izaberiZadrugu= document.createElement("option");
        izaberiZadrugu.classList.add("izaberiZadrugu");
        izaberiZadrugu.innerHTML="Izaberi zadrugu";
        izaberiZadrugu.value="Izaberi zadrugu";
        zadrugaVrednost.appendChild(izaberiZadrugu);

        fetch("http://localhost:5258/Zadruga/PreuzmiSveZadruge/").then(p=>{
            p.json().then(zad=>{
                zad.zadruge.forEach(z=> {
                    const zadruga = new Zadruga(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
                        z.mobilniTelefon, z.naziv, z.brojRacuna, z.grad, z.ulica, z.brojStana, z.brojUlaza, 
                        z.informacije,z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);
                        
                        izaberiZadrugu= document.createElement("option");
                        izaberiZadrugu.innerHTML=zadruga.naziv;
                        izaberiZadrugu.value=zadruga.naziv;
                        zadrugaVrednost.appendChild(izaberiZadrugu);
                });
            })
        });
        

         //Poslodavac
         let poslodavacDiv = document.createElement("div");
         poslodavacDiv.classList.add("poslodavacDiv");
         host.appendChild(poslodavacDiv);
 
         let poslodavacLabela = document.createElement("label");
         poslodavacLabela.classList.add("poslodavacLabela");
         poslodavacLabela.innerHTML="Poslodavac: ";
         poslodavacDiv.appendChild(poslodavacLabela);
 
         let poslodavacVrednost = document.createElement("select");
         poslodavacVrednost.classList.add("poslodavacVrednostFilter");
         poslodavacDiv.appendChild(poslodavacVrednost);
 
         let izaberiPoslodavca;
         izaberiPoslodavca= document.createElement("option");
         izaberiPoslodavca.classList.add("izaberiPoslodavca");
         izaberiPoslodavca.innerHTML="Izaberi poslodavca";
         izaberiPoslodavca.value="Izaberi poslodavca";
         poslodavacVrednost.appendChild(izaberiPoslodavca);
 
         fetch("http://localhost:5258/Poslodavac/PreuzmiSvePoslodavce/").then(p=>{
             p.json().then(pos=>{
                 pos.poslodavci.forEach(z=> {
                     const poslodavac =  new Poslodavac(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
                        z.mobilniTelefon, z.naziv, z.delatnost, z.grad, z.ulica, z.brojStana, z.brojUlaza, z.informacije, 
                        z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);
                         
                         izaberiPoslodavca= document.createElement("option");
                         izaberiPoslodavca.innerHTML=poslodavac.naziv;
                         izaberiPoslodavca.value=poslodavac.naziv;
                         poslodavacVrednost.appendChild(izaberiPoslodavca);
                 });
             })
         });
         
      

        //Grad
        let gradDiv = document.createElement("div");
        gradDiv.classList.add("gradDiv");
        host.appendChild(gradDiv);

        let gradLabela = document.createElement("label");
        gradLabela.classList.add("gradLabela");
        gradLabela.innerHTML="Grad: ";
        gradDiv.appendChild(gradLabela);

        let gradVrednost = document.createElement("select");
        gradVrednost.classList.add("gradVrednostFilter");
        gradDiv.appendChild(gradVrednost);

        let izaberiGrad;
        izaberiGrad= document.createElement("option");
        izaberiGrad.classList.add("izaberiGrad");
        izaberiGrad.innerHTML="Izaberi grad";
        izaberiGrad.value="Izaberi grad";
        gradVrednost.appendChild(izaberiGrad);

        this.gradovi.forEach(ind=>{
            izaberiGrad= document.createElement("option");
            izaberiGrad.innerHTML=ind;
            izaberiGrad.value=ind;
            gradVrednost.appendChild(izaberiGrad);
        })
        
    
        //Datum izvrsavanja
        let datumIzvrsavanjaDiv = document.createElement("div");
        datumIzvrsavanjaDiv.classList.add("datumIzvrsavanjaDiv");
        host.appendChild(datumIzvrsavanjaDiv);

        let datumIzvrsavanjaLabela = document.createElement("label");
        datumIzvrsavanjaLabela.classList.add("datumIzvrsavanjaLabela");
        datumIzvrsavanjaLabela.innerHTML="Datum izvrsavanja: ";
        datumIzvrsavanjaDiv.appendChild(datumIzvrsavanjaLabela);

        let datumIzvrsavanjaVrednost = document.createElement("input");
        datumIzvrsavanjaVrednost.classList.add("datumIzvrsavanjaVrednost");
        datumIzvrsavanjaVrednost.type="date";
        datumIzvrsavanjaDiv.appendChild(datumIzvrsavanjaVrednost);
        
        //Tip
        let tipDiv = document.createElement("div");
        tipDiv.classList.add("tipDiv");
        host.appendChild(tipDiv);

        let tipLabela = document.createElement("label");
        tipLabela.classList.add("tipLabela");
        tipLabela.innerHTML="Tip: ";
        tipDiv.appendChild(tipLabela);

        let tipVrednost = document.createElement("select");
        tipVrednost.classList.add("tipVrednost");
        tipDiv.appendChild(tipVrednost);

        let izaberiTip = document.createElement("option");
        izaberiTip.classList.add("izaberiTip");
        izaberiTip.innerHTML="Izaberi tip";
        izaberiTip.value="Izaberi tip";
        tipVrednost.appendChild(izaberiTip);

        this.tipovi.forEach(ind=>{
            izaberiTip= document.createElement("option");
            izaberiTip.innerHTML=ind;
            izaberiTip.value=ind;
            tipVrednost.appendChild(izaberiTip);
        });
        
        //Nacin placanja
        let nacinPlacanjaDiv = document.createElement("div");
        nacinPlacanjaDiv.classList.add("nacinPlacanjaDiv");
        host.appendChild(nacinPlacanjaDiv);

        let nacinPlacanjaLabela = document.createElement("label");
        nacinPlacanjaLabela.classList.add("nacinPlacanjaLabela");
        nacinPlacanjaLabela.innerHTML="Nacin placanja: ";
        nacinPlacanjaDiv.appendChild(nacinPlacanjaLabela);

        let nacinPlacanjaVrednost = document.createElement("select");
        nacinPlacanjaVrednost.classList.add("nacinPlacanjaVrednost");
        nacinPlacanjaDiv.appendChild(nacinPlacanjaVrednost);

        let izaberiNacinPlacanja = document.createElement("option");
        izaberiNacinPlacanja.classList.add("izaberiNacinPlacanja");
        izaberiNacinPlacanja.innerHTML="Izaberi način plaćanja";
        izaberiNacinPlacanja.value="Izaberi način plaćanja";
        nacinPlacanjaVrednost.appendChild(izaberiNacinPlacanja);
        
        this.naciniPlacanja.forEach(ind=>{
            izaberiNacinPlacanja= document.createElement("option");
            izaberiNacinPlacanja.innerHTML=ind;
            izaberiNacinPlacanja.value=ind;
            nacinPlacanjaVrednost.appendChild(izaberiNacinPlacanja);
        })

        //Novac od
        let novacOdDiv = document.createElement("div");
        novacOdDiv.classList.add("novacOdDiv");
        host.appendChild(novacOdDiv);

        let novacOdLabela = document.createElement("label");
        novacOdLabela.classList.add("novacOdLabela");
        novacOdLabela.innerHTML="Novac od: ";
        novacOdDiv.appendChild(novacOdLabela);

        let novacOdVrednost = document.createElement("input");
        novacOdVrednost.classList.add("novacOdVrednost");
        novacOdVrednost.type="number";
        novacOdVrednost.min=0;
        novacOdVrednost.max=9999999;
        novacOdVrednost.maxLength=7;
        novacOdVrednost.value=0;
        novacOdDiv.appendChild(novacOdVrednost);
        
        //Novac do
        let novacDoDiv = document.createElement("div");
        novacDoDiv.classList.add("novacDoDiv");
        host.appendChild(novacDoDiv);

        let novacDoLabela = document.createElement("label");
        novacDoLabela.classList.add("novacDoLabela");
        novacDoLabela.innerHTML="Novac do: ";
        novacDoDiv.appendChild(novacDoLabela);

        let novacDoVrednost = document.createElement("input");
        novacDoVrednost.classList.add("novacDoVrednost");
        novacDoVrednost.type="number";
        novacOdVrednost.min=0;
        novacOdVrednost.max=9999999;
        novacOdVrednost.maxLength=7;
        novacDoVrednost.value=9999999;
        novacDoDiv.appendChild(novacDoVrednost);
        
        //Dugmici
        let dugmiciDiv = document.createElement("div");
        dugmiciDiv.classList.add("dugmiciDiv");
        host.appendChild(dugmiciDiv);

        let dugmeOtkaziDiv = document.createElement("div");
        dugmeOtkaziDiv.classList.add("dugmeOtkaziDiv");
        dugmiciDiv.appendChild(dugmeOtkaziDiv);

        let dugmeOtkazi = document.createElement("input");
        dugmeOtkazi.classList.add("dugmeOtkazi");
        dugmeOtkazi.type="button";
        dugmeOtkazi.value="Otkaži";
        dugmeOtkaziDiv.appendChild(dugmeOtkazi);

        let dugmePrimeniDiv = document.createElement("div");
        dugmePrimeniDiv.classList.add("dugmePrimeniDiv");
        dugmiciDiv.appendChild(dugmePrimeniDiv);

        let dugmePrimeni = document.createElement("input");
        dugmePrimeni.classList.add("dugmePrimeni");
        dugmePrimeni.type="button";
        dugmePrimeni.value="Primeni";
        dugmePrimeniDiv.appendChild(dugmePrimeni);
        
    }

    crtajFilterAdminKorisnici(host){
        //naslov "Filteri"
        let naslovDiv = document.createElement("div");
        naslovDiv.classList.add("naslovDiv");
        host.appendChild(naslovDiv);

        let naslov = document.createElement("h2");
        naslov.classList.add("naslov");
        naslov.innerHTML="Filteri";
        naslovDiv.appendChild(naslov);
        //Zadruga
        let zadrugaFilterDiv = document.createElement("div");
        zadrugaFilterDiv.classList.add("zadrugaFilterDiv");
        host.appendChild(zadrugaFilterDiv);

        let zadrugaLabela = document.createElement("label");
        zadrugaLabela.classList.add("zadrugaLabela");
        zadrugaLabela.innerHTML="Zadruga: ";
        zadrugaFilterDiv.appendChild(zadrugaLabela);

        let zadrugaVrednost = document.createElement("INPUT");
        zadrugaVrednost.classList.add("zadrugaVrednost");
        zadrugaVrednost.setAttribute("type","checkbox");
        zadrugaVrednost.value="zadruga";
        zadrugaFilterDiv.appendChild(zadrugaVrednost);
 
        //Poslodavac
        let poslodavacFilterDiv = document.createElement("div");
        poslodavacFilterDiv.classList.add("poslodavacFilterDiv");
        host.appendChild(poslodavacFilterDiv);

        let poslodavacLabela = document.createElement("label");
        poslodavacLabela.classList.add("poslodavacLabela");
        poslodavacLabela.innerHTML="Poslodavac: ";
        poslodavacFilterDiv.appendChild(poslodavacLabela);

        let poslodavacVrednost = document.createElement("INPUT");
        poslodavacVrednost.classList.add("poslodavacVrednost");
        poslodavacVrednost.setAttribute("type","checkbox");
        poslodavacVrednost.value="poslodavac";
        poslodavacFilterDiv.appendChild(poslodavacVrednost);

        //Zadrugar
        let zadrugarFilterDiv = document.createElement("div");
        zadrugarFilterDiv.classList.add("zadrugarFilterDiv");
        host.appendChild(zadrugarFilterDiv);

        let zadrugarLabela = document.createElement("label");
        zadrugarLabela.classList.add("zadrugarLabela");
        zadrugarLabela.innerHTML="Zadrugar: ";
        zadrugarFilterDiv.appendChild(zadrugarLabela);

        let zadrugarVrednost = document.createElement("INPUT");
        zadrugarVrednost.classList.add("zadrugarVrednost");
        zadrugarVrednost.setAttribute("type","checkbox");
        zadrugarVrednost.value="zadrugar";
        zadrugarFilterDiv.appendChild(zadrugarVrednost);

       
          
       //Dugmici
       let dugmiciDiv = document.createElement("div");
       dugmiciDiv.classList.add("dugmiciDiv");
       host.appendChild(dugmiciDiv);

       let dugmeOtkaziDiv = document.createElement("div");
       dugmeOtkaziDiv.classList.add("dugmeOtkaziDiv");
       dugmiciDiv.appendChild(dugmeOtkaziDiv);

       let dugmeOtkazi = document.createElement("input");
       dugmeOtkazi.classList.add("dugmeOtkazi");
       dugmeOtkazi.type="button";
       dugmeOtkazi.value="Otkaži";
       dugmeOtkaziDiv.appendChild(dugmeOtkazi);

       let dugmePrimeniDiv = document.createElement("div");
       dugmePrimeniDiv.classList.add("dugmePrimeniDiv");
       dugmiciDiv.appendChild(dugmePrimeniDiv);

       let dugmePrimeni = document.createElement("input");
       dugmePrimeni.classList.add("dugmePrimeni");
       dugmePrimeni.type="button";
       dugmePrimeni.value="Primeni";
       dugmePrimeniDiv.appendChild(dugmePrimeni);
    }
}