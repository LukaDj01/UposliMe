
namespace UposliMe.Controllers;

[ApiController]
[Route("[controller]")]
public class AdministratorController : ControllerBase
{
    public UposliMeContext Context { get; set; }

    public AdministratorController(UposliMeContext context)
    {
        Context = context;
    }

    [Route("DodajAdministratora")]
    [HttpPost]
    public async Task<ActionResult> DodajAdministratora([FromBody] Administrator administrator){
        if(string.IsNullOrWhiteSpace(administrator.UserName) || administrator.UserName.Length>20){
            return BadRequest("Lose unet username!");
        }
        if(string.IsNullOrWhiteSpace(administrator.Password) || administrator.Password.Length>20){
            return BadRequest("Lose unet password!");
        }
        
        try
        {   
            //proverimo jel postoji zadrugar sa tim usernameom
            var zadrugarPom = Context.Zadrugari.Where( p=> p.UserName==administrator.UserName ).FirstOrDefault();
            if(zadrugarPom!=null){
                return BadRequest($"Username: {administrator.UserName} je zauzet!");
            }

            //proverimo jel postoji zadruga sa tim usernameom
            var zadrugaPom = Context.Zadruge.Where( p=> p.UserName==administrator.UserName ).FirstOrDefault();
            if(zadrugaPom!=null){
                return BadRequest($"Username: {administrator.UserName} je zauzet!");
            }

            //proverimo jel postoji poslodavac sa tim usernameom
            var poslodavacPom = Context.Poslodavci.Where( p=> p.UserName==administrator.UserName ).FirstOrDefault();
            if(poslodavacPom!=null){
                return BadRequest($"Username: {administrator.UserName} je zauzet!");
            }

            //proverimo jel postoji administrator sa tim usernameom
            var administratorPom = Context.Administratori.Where( p=> p.UserName==administrator.UserName ).FirstOrDefault();
            if(administratorPom!=null){
                return BadRequest($"Username: {administrator.UserName} je zauzet!");
            }


            Context.Administratori.Add(administrator);
            

            await Context.SaveChangesAsync();
            return Ok($"Uspesno dodat administrator sa id={administrator.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("PreuzmiAdministratoraUsernameIPassword/{korisnickoIme}/{lozinka}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiAdministratoraUsernameIPassword(string korisnickoIme, string lozinka){

        var administrator = await Context.Administratori.Where( p => p.UserName==korisnickoIme && p.Password==lozinka).FirstOrDefaultAsync();

        if(administrator!=null)
            return Ok(administrator);
        else
            return NoContent();
    }

    [Route("ValidanUsername/{username}")]
    [HttpGet]
    public async Task<ActionResult> ValidanUsername(string username){
        var administrator = await Context.Administratori.Where( p=> p.UserName==username).FirstOrDefaultAsync();
        if(administrator!=null)
            return Ok(administrator);
        else    
            return NoContent(); //vraca 204 ako nema poslodavca sa takvim usernamom
    }

    [Route("PreuzmiSveKorisnikeAdministratorPregledFiltriranjePretragaStranica/{username}/{zadruga}/{poslodavac}/{zadrugar}/{unosZaPretragu}/{stranica}")] 
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveKorisnikeAdministratorPregledFiltriranjePretragaStranica(string username,string zadruga,string poslodavac,string zadrugar,string unosZaPretragu, int stranica){
        
        
        //ovde stavljamo sve korisnike 
        ArrayList korisnici = new ArrayList();

        // vracaju se 5 korisnika u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)
        ArrayList korisnici5 = new ArrayList();

        //pozicija elementa u listi
        int index=0;
        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            if(zadruga!="null"){
                var zadra= await Context.Zadruge.Where(z=>z.Naziv==unosZaPretragu).ToListAsync();
                zadra.ForEach(z=>{
                    korisnici.Add(z);
                });
            }

            if(poslodavac!="null"){
                var posl= await Context.Poslodavci.Where(p=>p.Naziv==unosZaPretragu).ToListAsync();
                posl.ForEach(z=>{
                    korisnici.Add(z);
                });
            }

            if(zadrugar!="null"){
                var zadrr= await Context.Zadrugari.Where(z=>z.Ime==unosZaPretragu).ToListAsync();
                zadrr.ForEach(z=>{
                    korisnici.Add(z);
                });
            }

           
            foreach (var k in korisnici) // funkcionalnost 1.1 pretraga-stranice
            {
                if(index>=stranica*5 && index<stranica*5+5)
                    if(k!=null)
                        korisnici5.Add(k);
                index++;
            }

            return Ok(new {
                korisnici5,
                brojKorisnika = korisnici.Count
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj
        
         if(zadruga!="null"){
                var zadra= Context.Zadruge.ToList();
                zadra.ForEach(z=>{
                    korisnici.Add(z);
                });
            }

            if(poslodavac!="null"){
                var posl= Context.Poslodavci.ToList();
                posl.ForEach(z=>{
                    korisnici.Add(z);
                });
            }

            if(zadrugar!="null"){
                var zadrr= Context.Zadrugari.ToList();
                zadrr.ForEach(z=>{
                    korisnici.Add(z);
                });
            }

            foreach (var k in korisnici) // funkcionalnost 1.1 pretraga-stranice
            {
                if(index>=stranica*5 && index<stranica*5+5)
                    if(k!=null)
                        korisnici5.Add(k);
                index++;
            }

            return Ok(new {
                korisnici5,
                brojKorisnika = korisnici.Count
            }); // ako JE izvrsena pretraga
    }

    [Route("BlokirajZadrugaraAdministrator/{usernameZadrugara}")]
    [HttpPut]
    public async Task<ActionResult> BlokirajZadrugaraAdministrator(string usernameZadrugara){
        
        if(string.IsNullOrWhiteSpace(usernameZadrugara)){
            return BadRequest("Los username korisnika!");
        }
      
        try
        {   

            var zadrugarZaBlokiranje = await Context.Zadrugari.Where(o=> o.UserName==usernameZadrugara).FirstOrDefaultAsync();
            
            if(zadrugarZaBlokiranje!=null){
               zadrugarZaBlokiranje.Password="BLOKIRAN";
                await Context.SaveChangesAsync();
                return Ok($"Uspesno blokiran korisnik sa id={zadrugarZaBlokiranje.ID}");
            }
            else{
                return BadRequest("Nije nadjen takav korisnik!");
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("BlokirajZadruguAdministrator/{usernameZadruge}")]
    [HttpPut]
    public async Task<ActionResult> BlokirajZadruguAdministrator(string usernameZadruge){
        
        if(string.IsNullOrWhiteSpace(usernameZadruge)){
            return BadRequest("Los username korisnika!");
        }
      
        try
        {   

            var zadrugaZaBlokiranje = await Context.Zadruge.Where(o=> o.UserName==usernameZadruge).FirstOrDefaultAsync();
            
            if(zadrugaZaBlokiranje!=null){
               zadrugaZaBlokiranje.Password="BLOKIRAN";
                await Context.SaveChangesAsync();
                return Ok($"Uspesno blokiran korisnik sa id={zadrugaZaBlokiranje.ID}");
            }
            else{
                return BadRequest("Nije nadjen takav korisnik!");
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("BlokirajPoslodavcaAdministrator/{usernamePoslodavca}")]
    [HttpPut]
    public async Task<ActionResult> BlokirajPoslodavcaAdministrator(string usernamePoslodavca){
        
        if(string.IsNullOrWhiteSpace(usernamePoslodavca)){
            return BadRequest("Los username korisnika!");
        }
      
        try
        {   

            var poslodavacZaBlokiranje = await Context.Poslodavci.Where(o=> o.UserName==usernamePoslodavca).FirstOrDefaultAsync();
            
            if(poslodavacZaBlokiranje!=null){
               poslodavacZaBlokiranje.Password="BLOKIRAN";
                await Context.SaveChangesAsync();
                return Ok($"Uspesno blokiran korisnik sa id={poslodavacZaBlokiranje.ID}");
            }
            else{
                return BadRequest("Nije nadjen takav korisnik!");
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}