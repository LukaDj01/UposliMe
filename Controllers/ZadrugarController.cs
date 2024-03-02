namespace UposliMe.Controllers;

[ApiController]
[Route("[controller]")]
public class ZadrugarController : ControllerBase
{
    public UposliMeContext Context { get; set; }

    public ZadrugarController(UposliMeContext context)
    {
        Context = context;
    }

    [Route("DodajZadrugara")]
    [HttpPost]
    public async Task<ActionResult> DodajZadrugara([FromBody] Zadrugar zadrugar){
        if(string.IsNullOrWhiteSpace(zadrugar.UserName) || zadrugar.UserName.Length>20){
            return BadRequest("Lose unet username!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.Password) || zadrugar.Password.Length>20){
            return BadRequest("Lose unet password!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.Ime) || zadrugar.Ime.Length>20){
            return BadRequest("Lose uneto ime!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.Prezime) || zadrugar.Prezime.Length>30){
            return BadRequest("Lose uneto prezime!");
        }
        if(zadrugar.Slika.Length>300){
            return BadRequest("Lose uneta slika!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.Email) || zadrugar.Email.Length>100){
            return BadRequest("Lose unet email!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.Telefon) || zadrugar.Telefon.Length>20 || zadrugar.Telefon.Length<8){
            return BadRequest("Lose unet telefon!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.DatumRodjenja.ToString()) || (DateTime.Now-zadrugar.DatumRodjenja).Days>=10950 || (DateTime.Now-zadrugar.DatumRodjenja).Days<=5475){
            return BadRequest("Lose unet datum rodjenja!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.JMBG) || zadrugar.JMBG.Length>13 || zadrugar.JMBG.Length<13){
            return BadRequest("Lose unet JMBG!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.SrednjaSkola) || zadrugar.SrednjaSkola.Length>50){
            return BadRequest("Lose uneta srednja skola!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.Fakultet)){
            zadrugar.Indeks=999999;
        }
        else{ 
            if(zadrugar.Fakultet.Length>50){
                return BadRequest("Lose unet fakultet!");
            }
            if(zadrugar.Indeks<1 || zadrugar.Indeks>=999999){
                return BadRequest("Lose unet indeks!");
            }
        }
        if(string.IsNullOrWhiteSpace(zadrugar.LBO) || zadrugar.LBO.Length>11 || zadrugar.LBO.Length<11){
            return BadRequest("Lose unet LBO!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.BrojRacuna) || zadrugar.BrojRacuna.Length>30){
            return BadRequest("Lose uneta broj racuna!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.Grad) || zadrugar.Grad.Length>20){
            return BadRequest("Lose unet grad!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.Ulica) || zadrugar.Ulica.Length>50){
            return BadRequest("Lose uneta ulica!");
        }
        if(zadrugar.BrojStana.Length>3){
            return BadRequest("Lose unet broj stana!");
        }
        if(zadrugar.BrojUlaza.Length>3){
            return BadRequest("Lose unet broj ulaza!");
        }

        try
        {   
            //proverimo jel postoji zadrugar sa tim usernameom
            var zadrugarPom = Context.Zadrugari.Where( p=> p.UserName==zadrugar.UserName ).FirstOrDefault();
            if(zadrugarPom!=null){
                return BadRequest($"Username: {zadrugar.UserName} je zauzet!");
            }

            //proverimo jel postoji zadruga sa tim usernameom
            var zadrugaPom = Context.Zadruge.Where( p=> p.UserName==zadrugar.UserName ).FirstOrDefault();
            if(zadrugaPom!=null){
                return BadRequest($"Username: {zadrugar.UserName} je zauzet!");
            }

            //proverimo jel postoji poslodavac sa tim usernameom
            var poslodavacPom = Context.Poslodavci.Where( p=> p.UserName==zadrugar.UserName ).FirstOrDefault();
            if(poslodavacPom!=null){
                return BadRequest($"Username: {zadrugar.UserName} je zauzet!");
            }

            //proverimo jel postoji administrator sa tim usernameom
            var administratorPom = Context.Administratori.Where( p=> p.UserName==zadrugar.UserName ).FirstOrDefault();
            if(administratorPom!=null){
                return BadRequest($"Username: {zadrugar.UserName} je zauzet!");
            }

            //proverimo jel postoji zadrugar sa tom email adresom
            zadrugarPom = Context.Zadrugari.Where( p=> p.Email==zadrugar.Email ).FirstOrDefault();
            if(zadrugarPom!=null){
                return BadRequest($"Email: {zadrugar.Email} je zauzet!");
            }

            //proverimo jel postoji zadruga sa tom email adresom
            zadrugaPom = Context.Zadruge.Where( p=> p.Email==zadrugar.Email ).FirstOrDefault();
            if(zadrugaPom!=null){
                return BadRequest($"Email: {zadrugar.Email} je zauzet!");
            }

            //proverimo jel postoji poslodavac sa tom email adresom
            poslodavacPom = Context.Poslodavci.Where( p=> p.Email==zadrugar.Email ).FirstOrDefault();
            if(poslodavacPom!=null){
                return BadRequest($"Email: {zadrugar.Email} je zauzet!");
            }
            Context.Zadrugari.Add(zadrugar);
            

            await Context.SaveChangesAsync();
            return Ok($"Uspesno dodat zadrugar sa id={zadrugar.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //ovako ne mozemo da ostavimo prazno na primer za sliku, zahteva da je nesto upisano
    [Route("PromeniPodatkeZadrugara/{nadjiUsername}/{UserName}/{Password}/{Ime}/{Prezime}/{Slika}/{Email}/{Telefon}/{DatumRodjenja}/{JMBG}/{SrednjaSkola}/{Fakultet}/{Indeks}/{LBO}/{BrojRacuna}/{Grad}/{Ulica}/{BrojStana}/{BrojUlaza}")]
    [HttpPut]
    public async Task<ActionResult> PromeniPodatkeZadrugara(string nadjiUsername, string UserName, string Password, string Ime, string Prezime, string Slika, string Email,string Telefon,DateTime DatumRodjenja,string JMBG,string SrednjaSkola,string Fakultet,int Indeks,string LBO ,string BrojRacuna,string Grad,string Ulica,string BrojStana,string BrojUlaza){
        
        if(string.IsNullOrWhiteSpace(nadjiUsername) || nadjiUsername.Length>20){  //proverimo da li je uopste validan username
            return BadRequest("Lose unet username!");
        }
       
        try{
            var zadrugar = Context.Zadrugari.Where(p => p.UserName==nadjiUsername).FirstOrDefault(); //proverimo da li imamo zadrugara sa datim username-om

            if(zadrugar != null){   //ako ga imamo, modifikujemo ga

        //prvo proverimo unesene provere
        if(string.IsNullOrWhiteSpace(UserName) || UserName.Length>20){  //proverimo da li je uopste validan username
            return BadRequest("Lose unet username!");
        }
        if(string.IsNullOrWhiteSpace(Password) || Password.Length>20){
            return BadRequest("Lose unet password!");
        }
        if(string.IsNullOrWhiteSpace(Ime) || Ime.Length>20){
            return BadRequest("Lose uneto ime!");
        }
        if(string.IsNullOrWhiteSpace(Prezime) || Prezime.Length>30){
            return BadRequest("Lose uneto prezime!");
        }
        if(Slika.Length>300){
            return BadRequest("Lose uneta slika!");
        }
        if(string.IsNullOrWhiteSpace(Email) || Email.Length>100){
            return BadRequest("Lose unet email!");
        }
        if(string.IsNullOrWhiteSpace(Telefon) || Telefon.Length>20 || Telefon.Length<8){
            return BadRequest("Lose unet telefon!");
        }
        if(string.IsNullOrWhiteSpace(DatumRodjenja.ToString()) || (DateTime.Now-DatumRodjenja).Days>=10950 || (DateTime.Now-DatumRodjenja).Days<=5475){
            return BadRequest("Lose unet datum rodjenja!");
        }
        if(string.IsNullOrWhiteSpace(JMBG) || JMBG.Length>13 || JMBG.Length<13){
            return BadRequest("Lose unet JMBG!");
        }
        if(string.IsNullOrWhiteSpace(SrednjaSkola) || SrednjaSkola.Length>50){
            return BadRequest("Lose uneta srednja skola!");
        }
        if(string.IsNullOrWhiteSpace(Fakultet)){
            Indeks=999999;
        }
        else{ 
            if(Fakultet.Length>50){
                return BadRequest("Lose unet fakultet!");
            }
            if(Indeks<1 || Indeks>=999999){
                return BadRequest("Lose unet indeks!");
            }
        }
        if(string.IsNullOrWhiteSpace(LBO) || LBO.Length>11 || LBO.Length<11){
            return BadRequest("Lose unet LBO!");
        }
        if(string.IsNullOrWhiteSpace(BrojRacuna) || BrojRacuna.Length>30){
            return BadRequest("Lose uneta broj racuna!");
        }
        if(string.IsNullOrWhiteSpace(Grad) || Grad.Length>20){
            return BadRequest("Lose unet grad!");
        }
        if(string.IsNullOrWhiteSpace(Ulica) || Ulica.Length>50){
            return BadRequest("Lose uneta ulica!");
        }
        if(BrojStana.Length>3){
            return BadRequest("Lose unet broj stana!");
        }
        if(BrojUlaza.Length>3){
            return BadRequest("Lose unet broj ulaza!");
        }

         //proverimo jel postoji zadrugar sa tim usernameom
            var zadrugarPom = Context.Zadrugari.Where( p=> p.UserName==UserName ).FirstOrDefault();
            if(zadrugarPom!=null){
                return BadRequest($"Username: {UserName} je zauzet!");
            }

            //proverimo jel postoji zadrugar sa tom email adresom
            zadrugarPom = Context.Zadrugari.Where( p=> p.Email==Email ).FirstOrDefault();
            if(zadrugarPom!=null){
                return BadRequest($"Email: {Email} je zauzet!");
            }
        //pa tek onda izvrsimo modifikacije

                zadrugar.UserName = UserName;
                zadrugar.Password = Password;
                zadrugar.Ime = Ime;
                zadrugar.Prezime = Prezime;
                zadrugar.Slika = Slika;
                zadrugar.Email = Email;
                zadrugar.Telefon = Telefon;
                zadrugar.DatumRodjenja = DatumRodjenja;
                zadrugar.JMBG = JMBG;
                zadrugar.SrednjaSkola = SrednjaSkola;
                zadrugar.Fakultet = Fakultet;
                zadrugar.Indeks = Indeks;
                zadrugar.LBO = LBO;
                zadrugar.BrojRacuna = BrojRacuna;
                zadrugar.Grad = Grad;
                zadrugar.Ulica = Ulica;
                zadrugar.BrojStana = BrojStana;
                zadrugar.BrojUlaza = BrojUlaza;

                await Context.SaveChangesAsync();   //saljemo promene nazad u bazu podatala
                return Ok($"Uspesno izmenjen zadrugar sa username-om:{nadjiUsername}.");
            }
            else{   //ako ga nemamo, prijavimo da nije nadjen
                return BadRequest($"Zadrugar sa username-om:{nadjiUsername} nije pronadjen!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

    
    //ovako  mozemo da ostavimo prazno na primer za sliku
    [Route("PromeniPodatkeZadrugaraKrozBody")]
    [HttpPut]
    public async Task<ActionResult>PromeniPodatkeZadrugaraKrozBody([FromBody] Zadrugar zadrugar){
        if(zadrugar.ID<=0){
            return BadRequest("Nevalidan ID!");
        }

        if(string.IsNullOrWhiteSpace(zadrugar.UserName) || zadrugar.UserName.Length>20){
            return BadRequest("Lose unet username!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.Password) || zadrugar.Password.Length>20){
            return BadRequest("Lose unet password!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.Ime) || zadrugar.Ime.Length>20){
            return BadRequest("Lose uneto ime!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.Prezime) || zadrugar.Prezime.Length>30){
            return BadRequest("Lose uneto prezime!");
        }
        if(zadrugar.Slika.Length>300){
            return BadRequest("Lose uneta slika!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.Email) || zadrugar.Email.Length>100){
            return BadRequest("Lose unet email!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.Telefon) || zadrugar.Telefon.Length>20 || zadrugar.Telefon.Length<8){
            return BadRequest("Lose unet telefon!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.DatumRodjenja.ToString()) || (DateTime.Now-zadrugar.DatumRodjenja).Days>=10950 || (DateTime.Now-zadrugar.DatumRodjenja).Days<=5475){
            return BadRequest("Lose unet datum rodjenja!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.JMBG) || zadrugar.JMBG.Length>13 || zadrugar.JMBG.Length<13){
            return BadRequest("Lose unet JMBG!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.SrednjaSkola) || zadrugar.SrednjaSkola.Length>50){
            return BadRequest("Lose uneta srednja skola!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.Fakultet)){
            zadrugar.Indeks=999999;
        }
        else{ 
            if(zadrugar.Fakultet.Length>50){
                return BadRequest("Lose unet fakultet!");
            }
            if(zadrugar.Indeks<1 || zadrugar.Indeks>=999999){
                return BadRequest("Lose unet indeks!");
            }
        }
        if(string.IsNullOrWhiteSpace(zadrugar.LBO) || zadrugar.LBO.Length>11 || zadrugar.LBO.Length<11){
            return BadRequest("Lose unet LBO!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.BrojRacuna) || zadrugar.BrojRacuna.Length>30){
            return BadRequest("Lose uneta broj racuna!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.Grad) || zadrugar.Grad.Length>20){
            return BadRequest("Lose unet grad!");
        }
        if(string.IsNullOrWhiteSpace(zadrugar.Ulica) || zadrugar.Ulica.Length>50){
            return BadRequest("Lose uneta ulica!");
        }
        if(zadrugar.BrojStana.Length>3){
            return BadRequest("Lose unet broj stana!");
        }
        if(zadrugar.BrojUlaza.Length>3){
            return BadRequest("Lose unet broj ulaza!");
        }

        try{
             //proverimo jel postoji zadrugar sa tim usernameom
            var zadrugarPom = Context.Zadrugari.Where( p=> p.UserName==zadrugar.UserName ).FirstOrDefault();
            if(zadrugarPom!=null){
                return BadRequest($"Username: {zadrugar.UserName} je zauzet!");
            }

            //proverimo jel postoji zadrugar sa tom email adresom
            zadrugarPom = Context.Zadrugari.Where( p=> p.Email==zadrugar.Email ).FirstOrDefault();
            if(zadrugarPom!=null){
                return BadRequest($"Email: {zadrugar.Email} je zauzet!");
            }

            var zadrugarZaPromenu = await Context.Zadrugari.FindAsync(zadrugar.ID);   //nadji nam tog zadrugara sa tim id-em u bazi

            if(zadrugarZaPromenu != null){  //ako je nadjen, izvrsimo zamene
                zadrugarZaPromenu.UserName = zadrugar.UserName;
                zadrugarZaPromenu.Password = zadrugar.Password;
                zadrugarZaPromenu.Ime = zadrugar.Ime;
                zadrugarZaPromenu.Prezime = zadrugar.Prezime;
                zadrugarZaPromenu.Slika = zadrugar.Slika;
                zadrugarZaPromenu.Email = zadrugar.Email;
                zadrugarZaPromenu.Telefon = zadrugar.Telefon;
                zadrugarZaPromenu.DatumRodjenja = zadrugar.DatumRodjenja;
                zadrugarZaPromenu.JMBG = zadrugar.JMBG;
                zadrugarZaPromenu.SrednjaSkola = zadrugar.SrednjaSkola;
                zadrugarZaPromenu.Fakultet = zadrugar.Fakultet;
                zadrugarZaPromenu.Indeks = zadrugar.Indeks;
                zadrugarZaPromenu.LBO = zadrugar.LBO;
                zadrugarZaPromenu.BrojRacuna = zadrugar.BrojRacuna;
                zadrugarZaPromenu.Grad = zadrugar.Grad;
                zadrugarZaPromenu.Ulica =zadrugar.Ulica;
                zadrugarZaPromenu.BrojStana =zadrugar.BrojStana;
                zadrugarZaPromenu.BrojUlaza = zadrugar.BrojUlaza;

                await Context.SaveChangesAsync();

                return Ok($"Uspesno sacuvane promene nad zadrugarom sa ID:{zadrugar.ID}");
            }
            else{   //nije nadjen
                return BadRequest("Nije pronadjen zadrugar sa trazenim ID-em!");
            }

        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

   

    [Route("IzbrisiZadrugaraPrekoID/{ID}")]
    [HttpDelete]
    public async Task<ActionResult>IzbrisiZadrugaraPrekoID(int ID){
        if(ID<=0){
            return BadRequest("Nevalidan ID!");
        }

        try{
            var zadrugar = await Context.Zadrugari.FindAsync(ID);

            if(zadrugar!=null){
                int idKopi = ID;
                Context.Zadrugari.Remove(zadrugar);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno obrisan zadrugar sa ID:{idKopi}!");
            }
            else{
                return BadRequest($"Nije pronadjen zadrugar sa ID:{ID}!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

    [Route("IzbrisiZadrugaraPrekousername/{username}")]
    [HttpPut]
    public async Task<ActionResult>IzbrisiZadrugaraPrekousername(string username){
        if(string.IsNullOrWhiteSpace(username) || username.Length>20){  //proverimo da li je uopste validan username
            return BadRequest("Lose unet username!");
        }

        try{
            var zadrugar = Context.Zadrugari.Where(p=> p.UserName==username).FirstOrDefault();

            if(zadrugar!=null){
                zadrugar.Password = "Izbrisan*999";
                zadrugar.Email = "izbrisan korisnik";
                Context.Zadrugari.Update(zadrugar);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno obrisan zadrugar sa Username-om:{username}!");
            }
            else{
                return BadRequest($"Nije pronadjen zadrugar sa Username-om:{username}!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

    [Route("PreuzmiZadrugara/{korisnickoIme}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiZadrugara(string korisnickoIme){
        var zadrugari = Context.Zadrugari
                        .Include(p => p.Ugovori);

        var zadrugar = await zadrugari.Where( p => p.UserName==korisnickoIme).ToListAsync();

        return Ok(zadrugar);
    }

    [Route("PreuzmiZadrugaraUsernameIPassword/{korisnickoIme}/{lozinka}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiZadrugaraUsernameIPassword(string korisnickoIme, string lozinka){

        var zadrugar = await Context.Zadrugari.Where( p => p.UserName==korisnickoIme && p.Password==lozinka).FirstOrDefaultAsync();

            if(zadrugar!=null)
                return Ok(zadrugar);    //vraca kod 200
            else
                return NoContent(); //vraca 204 kod
    }

    [Route("PreuzmiZadrugaraEmail/{email}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiZadrugaraEmail(string email){

        var zadrugar = await Context.Zadrugari.Where( p => p.Email==email).FirstOrDefaultAsync();

            if(zadrugar!=null)
                return Ok(zadrugar);    //vraca kod 200
            else
                return NoContent(); //vraca 204 kod
    }

    [Route("ValidanUsername/{username}")]
    [HttpGet]
    public async Task<ActionResult> ValidanUsername(string username){
        var zadrugar = await Context.Zadrugari.Where( p=> p.UserName==username).FirstOrDefaultAsync();
        if(zadrugar!=null)
            return Ok(zadrugar);
        else    
            return NoContent(); //vraca 204 ako nema zadrugara sa takvim usernamom
    }

    [Route("PromeniLozinkuZadrugar/{mejl}/{lozinka}")]
    [HttpPut]
    public async Task<ActionResult>PromeniLozinku(string mejl,string lozinka){

       
        try{
            var zadrugarPom = Context.Zadrugari.Where( p=> p.Email==mejl ).FirstOrDefault();
        

            if(zadrugarPom!=null){
               zadrugarPom.Password = lozinka;
                await Context.SaveChangesAsync();
                return Ok("Uspesno izmenjeno!");
            }
            else{
                return BadRequest("Greska!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

    //za menjanje informacija zadrugara preko njegovog profila
    [Route("IzmeniPodatkeZadrugar/{nadjiUsername}/{Ime}/{Prezime}/{Slika}/{Telefon}/{DatumRodjenja}/{JMBG}/{SrednjaSkola}/{Fakultet}/{Indeks}/{LBO}/{BrojRacuna}/{Grad}/{Ulica}/{BrojStana}/{BrojUlaza}")]
    [HttpPut]
    public async Task<ActionResult> IzmeniPodatkeZadrugar(string nadjiUsername, string Ime, string Prezime, string Slika,string Telefon,DateTime DatumRodjenja,string JMBG,string SrednjaSkola,string Fakultet,int Indeks,string LBO ,string BrojRacuna,string Grad,string Ulica,string BrojStana,string BrojUlaza){
        try{
            var zadrugar = Context.Zadrugari.Where(p => p.UserName==nadjiUsername).FirstOrDefault(); //proverimo da li imamo zadrugara sa datim username-om

            if(zadrugar != null) //ako ga imamo, modifikujemo ga
            {                      
                    //prvo proverimo unesene provere
                    if(string.IsNullOrWhiteSpace(Ime) || Ime.Length>20){
                        return BadRequest("Lose uneto ime!");
                    }
                    if(string.IsNullOrWhiteSpace(Prezime) || Prezime.Length>30){
                        return BadRequest("Lose uneto prezime!");
                    }
                    if(Slika.Length>300){
                        return BadRequest("Lose uneta slika!");
                    }
                    if(string.IsNullOrWhiteSpace(Telefon) || Telefon.Length>20 || Telefon.Length<8){
                        return BadRequest("Lose unet telefon!");
                    }
                    if(string.IsNullOrWhiteSpace(DatumRodjenja.ToString()) || (DateTime.Now-DatumRodjenja).Days>=10950 || (DateTime.Now-DatumRodjenja).Days<=5475){
                        return BadRequest("Lose unet datum rodjenja!");
                    }
                    if(string.IsNullOrWhiteSpace(JMBG) || JMBG.Length>13 || JMBG.Length<13){
                        return BadRequest("Lose unet JMBG!");
                    }
                    if(string.IsNullOrWhiteSpace(SrednjaSkola) || SrednjaSkola.Length>50){
                        return BadRequest("Lose uneta srednja skola!");
                    }
                    if(string.IsNullOrWhiteSpace(Fakultet)){
                        Indeks=999999;
                    }
                    else{ 
                        if(Fakultet.Length>50){
                            return BadRequest("Lose unet fakultet!");
                        }
                        if(Indeks<1 || Indeks>=999999){
                            return BadRequest("Lose unet indeks!");
                        }
                    }
                    if(string.IsNullOrWhiteSpace(LBO) || LBO.Length>11 || LBO.Length<11){
                        return BadRequest("Lose unet LBO!");
                    }
                    if(string.IsNullOrWhiteSpace(BrojRacuna) || BrojRacuna.Length>30){
                        return BadRequest("Lose uneta broj racuna!");
                    }
                    if(string.IsNullOrWhiteSpace(Grad) || Grad.Length>20){
                        return BadRequest("Lose unet grad!");
                    }
                    if(string.IsNullOrWhiteSpace(Ulica) || Ulica.Length>50){
                        return BadRequest("Lose uneta ulica!");
                    }
                    if(BrojStana.Length>3){
                        return BadRequest("Lose unet broj stana!");
                    }
                    if(BrojUlaza.Length>3){
                        return BadRequest("Lose unet broj ulaza!");
                    }

                    //izvrsimo modifikacije
                            zadrugar.Ime = Ime;
                            zadrugar.Prezime = Prezime;
                            zadrugar.Slika = Slika;
                            zadrugar.Telefon = Telefon;
                            
                            zadrugar.DatumRodjenja = DatumRodjenja;
                            
                            zadrugar.JMBG = JMBG;
                            zadrugar.SrednjaSkola = SrednjaSkola;
                            zadrugar.Fakultet = Fakultet;
                            zadrugar.Indeks = Indeks;
                            zadrugar.LBO = LBO;
                            zadrugar.BrojRacuna = BrojRacuna;
                            zadrugar.Grad = Grad;
                            zadrugar.Ulica = Ulica;
                            zadrugar.BrojStana = BrojStana;
                            zadrugar.BrojUlaza = BrojUlaza;

                            await Context.SaveChangesAsync();   //saljemo promene nazad u bazu podatala
                            return Ok($"Uspesno izmenjen zadrugar sa username-om:{nadjiUsername}.");
            }
            else{   //ako ga nemamo, prijavimo da nije nadjen
                return BadRequest($"Zadrugar sa username-om:{nadjiUsername} nije pronadjen!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }


 [Route("Apliciranje/{idOglasa}/{idZadrugara}")]
    [HttpPost]
    public async Task<ActionResult>Apliciranje(int idOglasa, int idZadrugara){


        try{

            Oglas oglas = await Context.Oglasi.Where(p=>p.ID==idOglasa).FirstOrDefaultAsync();
            Zadrugar zadrugar = await Context.Zadrugari.Where(p=>p.ID==idZadrugara).FirstOrDefaultAsync();

            if(zadrugar!=null && oglas!=null){

                var oglasZadrugar = new OglasZadrugar();

                oglasZadrugar.Oglas=oglas;
                oglasZadrugar.Zadrugar=zadrugar;

                Context.OglasiZadrugari.Add(oglasZadrugar);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno je aplicirao zadrugar <{zadrugar.Ime}> na oglas sa nazivom <{oglas.Naziv}>!");
            }
            else{
                return BadRequest("Greska!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

    [Route("OtkaziAplikaciju/{idOglasa}/{idZadrugara}")]
    [HttpDelete]
    public async Task<ActionResult>OtkaziAplikaciju(int idOglasa, int idZadrugara){


        try{

            Oglas oglas = await Context.Oglasi.Where(p=>p.ID==idOglasa).FirstOrDefaultAsync();
            Zadrugar zadrugar = await Context.Zadrugari.Where(p=>p.ID==idZadrugara).FirstOrDefaultAsync();

            if(zadrugar!=null && oglas!=null){

                var oglasZadrugar = Context.OglasiZadrugari.Where(p=> p.Oglas==oglas && p.Zadrugar==zadrugar).FirstOrDefault();
                Context.OglasiZadrugari.Remove(oglasZadrugar);

                await Context.SaveChangesAsync();
                return Ok($"Uspesno je otkazana aplikacija od strane <{zadrugar.Ime}> za oglas sa nazivom <{oglas.Naziv}>!");
            }
            else{
                return BadRequest("Greska!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

    [Route("PreuzmiSveZadrugare")]
    [HttpGet]
    public async Task<ActionResult>PreuzmiSveZadrugare(){

        var zadrugari = await Context.Zadrugari.ToListAsync();

        return Ok(new {
            zadrugari,
            brojZadrugara=zadrugari.Count
        });
    }

}
