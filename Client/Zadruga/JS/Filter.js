export class Filter{
    
    constructor(){

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
        gradVrednost.classList.add("gradVrednost");
        gradDiv.appendChild(gradVrednost);

        var gradovi=[ "Beograd", "Bor", "Čačak","Jagodina","Kikinda","Kraljevo","Kragujevac","Kruševac","Leskovac",
                      "Loznica", "Novi Pazar", "Novi Sad", "Niš", "Pančevo", "Pirot", "Požarevac", "Prokuplje",
                      "Smederevo", "Sombor", "Sremska Mitrovica", "Subotica", "Šabac", "Užice", "Valjevo", "Vranje",
                      "Vršac",  "Zaječar", "Zrenjanin"];

        let izaberiGrad;
        izaberiGrad= document.createElement("option");
        izaberiGrad.classList.add("izaberiGrad");
        izaberiGrad.innerHTML="Izaberi grad";
        izaberiGrad.value="Izaberi grad";
        gradVrednost.appendChild(izaberiGrad);

        gradovi.forEach(ind=>{
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
        tipVrednost.appendChild(izaberiTip);
        
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
        nacinPlacanjaVrednost.appendChild(izaberiNacinPlacanja);
        
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
        novacDoVrednost.value=10000;
        novacDoDiv.appendChild(novacDoVrednost);
        
        //Dugme
        let dugmeDiv = document.createElement("div");
        dugmeDiv.classList.add("dugmeDiv");
        host.appendChild(dugmeDiv);

        let dugmePrimeni = document.createElement("input");
        dugmePrimeni.classList.add("dugmePrimeni");
        dugmePrimeni.type="button";
        dugmePrimeni.value="Primeni";
        dugmeDiv.appendChild(dugmePrimeni);
        
    }
}