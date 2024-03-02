namespace UposliMe.Controllers;

[ApiController]
[Route("[controller]")]
public class UgovorController : ControllerBase
{
    public UposliMeContext Context { get; set; }

    public UgovorController(UposliMeContext context)
    {
        Context = context;
    }

    [Route("DodajUgovorFB/{ZzadrugarID}/{ZzadrugaID}/{PposlodavacID}/{OoglasID}")]
    [HttpPost]
    public async Task<ActionResult> DodajUgovorFB([FromBody] Ugovor ugovor, int ZzadrugarID, int ZzadrugaID, int PposlodavacID, int OoglasID){

        /*if(string.IsNullOrWhiteSpace(ugovor.Opis))
        {
            ugovor.Opis=null;
        }*/
        
        try
        {   
            var zadrugar = await Context.Zadrugari.Where(p=>p.ID==ZzadrugarID).FirstOrDefaultAsync();
            if(zadrugar==null)
            {
                return BadRequest("Nije dobar zadrugar!");
            }
            var zadruga = await Context.Zadruge.Where(p=>p.ID==ZzadrugaID).FirstOrDefaultAsync();
            if(zadruga==null)
            {
                return BadRequest("Nije dobra zadruga!");
            }
            var poslodavac = await Context.Poslodavci.Where(p=>p.ID==PposlodavacID).FirstOrDefaultAsync();
            if(poslodavac==null)
            {
                return BadRequest("Nije dobar poslodavac!");
            }
            var oglas = await Context.Oglasi.Where(p=>p.ID==OoglasID).FirstOrDefaultAsync();
            if(oglas==null)
            {
                return BadRequest("Nije dobar oglas!");
            }

            ugovor.Zadrugar=zadrugar;
            ugovor.Zadruga=zadruga;
            ugovor.Poslodavac=poslodavac;
            ugovor.Oglas=oglas;
            ugovor.DatumFormiranja = DateTime.Now;

            Context.Ugovori.Add(ugovor);
            

            await Context.SaveChangesAsync();
            return Ok($"Uspesno dodat ugovor sa id={ugovor.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("DodajUgovor/{ZzadrugarID}/{ZzadrugaID}/{PposlodavacID}/{OoglasID}")]
    [HttpPost]
    public async Task<ActionResult> DodajUgovor(int ZzadrugarID, int ZzadrugaID, int PposlodavacID, int OoglasID){

        /*if(string.IsNullOrWhiteSpace(opis) || opis.Length>10000)
        {
            return BadRequest("Lose unet opis!");
        }*/
        
        try
        {   
            var ugovor = new Ugovor{};

            var zadrugar = await Context.Zadrugari.FindAsync(ZzadrugarID);
            if(zadrugar==null)
            {
                return BadRequest("Nije dobar zadrugar!");
            }
            var zadruga = await Context.Zadruge.FindAsync(ZzadrugaID);
            if(zadruga==null)
            {
                return BadRequest("Nije dobra zadruga!");
            }
            var poslodavac = await Context.Poslodavci.FindAsync(PposlodavacID);
            if(poslodavac==null)
            {
                return BadRequest("Nije dobar poslodavac!");
            }
            var oglas = await Context.Oglasi.Where(p=>p.ID==OoglasID).FirstOrDefaultAsync();
            if(oglas==null)
            {
                return BadRequest("Nije dobar oglas!");
            }

            ugovor.Opis="";
            ugovor.Zadrugar=zadrugar;
            ugovor.Zadruga=zadruga;
            ugovor.Poslodavac=poslodavac;
            ugovor.Oglas=oglas;
            ugovor.DatumFormiranja = DateTime.Now;

            Context.Ugovori.Add(ugovor);
            

            await Context.SaveChangesAsync();
            return Ok($"Uspesno dodat ugovor sa id={ugovor.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [Route("PreuzmiUgovor/{ID}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiUgovor(int ID){

        var ugovor = await Context.Ugovori.Where( p => p.ID==ID).Include(p=>p.Zadrugar)
                                                                              .Include(p=>p.Zadruga)
                                                                              .Include(p=>p.Poslodavac)
                                                                              .Include(p=>p.Oglas).FirstOrDefaultAsync();

        if(ugovor!=null)
            return Ok(ugovor);
        else
            return NoContent();
    }

    [Route("PreuzmiSveUgovoreZadrugar/{username}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveUgovoreZadrugar(string username){

        var zadrugar = Context.Zadrugari.Where(p=>p.UserName==username).FirstOrDefault();

        var ugovori = await Context.Ugovori.Where(p=>p.Zadrugar==zadrugar).ToListAsync();

        return Ok(ugovori);
    }

    [Route("PreuzmiSveUgovoreZadruga/{username}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveUgovoreZadruga(string username){

        var zadruga = Context.Zadruge.Where(p=>p.UserName==username).FirstOrDefault();

        var ugovori = await Context.Ugovori.Where(p=>p.Zadruga==zadruga).ToListAsync();

        return Ok(ugovori);
    }

    [Route("PreuzmiSveUgovorePoslodavac/{username}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveUgovorePoslodavac(string username){

        var poslodavac = Context.Poslodavci.Where(p=>p.UserName==username).FirstOrDefault();

        var ugovori = await Context.Ugovori.Where(p=>p.Poslodavac==poslodavac).Include(p=>p.Zadrugar)
                                                                              .Include(p=>p.Zadruga)
                                                                              .Include(p=>p.Poslodavac)
                                                                              .Include(p=>p.Oglas)
                                                                              .ToListAsync();

        return Ok(ugovori);
    }

    [Route("PreuzmiSveUgovorePoslodavacPretraga/{username}/{unosZaPretragu}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveUgovorePoslodavacPretraga(string username, string unosZaPretragu){

        var poslodavac = Context.Poslodavci.Where(p=>p.UserName==username).FirstOrDefault();

        var ugovori = await Context.Ugovori.Include(p=>p.Zadrugar)
                                            .Include(p=>p.Zadruga)
                                            .Include(p=>p.Poslodavac)
                                            .Include(p=>p.Oglas)
                                            .ToListAsync();
                                            
        List<Ugovor> ugovori2 = new List<Ugovor>();
        ugovori.ForEach(u=>{
            if(u.Poslodavac==poslodavac)
                ugovori2.Add(u);
        });

        //pretraga pocetak  
        if(!string.IsNullOrWhiteSpace(unosZaPretragu) && unosZaPretragu!="null")
        {
            List<Ugovor> ugovoriPregled = new List<Ugovor>();
            ugovori2.ForEach(ugovor=>{
                if(ugovor.Oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                    ugovoriPregled.Add(ugovor);
            });
            return Ok(ugovoriPregled); // ako JE izvrsena pretraga
        }
        //pretraga kraj

        return Ok(ugovori2); // ako NIJE izvrsena pretraga
    }

    [Route("ObrisiUgovorPoslodavac/{poslodavacId}/{ugovorId}")]
    [HttpDelete]
    public async Task<ActionResult> ObrisiUgovorPoslodavac(int poslodavacId, int ugovorId){

        var ugovorZaBrisanje = await Context.Ugovori.Where(u=> u.Poslodavac.ID==poslodavacId && u.ID==ugovorId).FirstOrDefaultAsync();

        try{
            if(ugovorZaBrisanje!=null){
                Context.Ugovori.Remove(ugovorZaBrisanje);
                await Context.SaveChangesAsync();

                return Ok("Uspesno obrisan ugovor!");
            }   
            else{
                return BadRequest("Niej nadjen ugovor!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

    [Route("PreuzmiSveUgovorePoslodavacPretragaStranica/{username}/{unosZaPretragu}/{stranica}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveUgovorePoslodavacPretragaStranica(string username, string unosZaPretragu, int stranica){

        var poslodavac = Context.Poslodavci.Where(p=>p.UserName==username).FirstOrDefault();

        var ugovori = await Context.Ugovori.Include(p=>p.Zadrugar)
                                            .Include(p=>p.Zadruga)
                                            .Include(p=>p.Poslodavac)
                                            .Include(p=>p.Oglas)
                                            .ToListAsync();
                                            
        List<Ugovor> ugovori2 = new List<Ugovor>();
        ugovori.ForEach(u=>{
            if(u.Poslodavac==poslodavac)
                ugovori2.Add(u);
        });


        List<Ugovor> ugovori5 = new List<Ugovor>(); // vracaju se 10 ugovora u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu) )
        {
            List<Ugovor> ugovoriPregled = new List<Ugovor>();
            ugovori2.ForEach(ugovor=>{
                if(ugovor.Oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                    ugovoriPregled.Add(ugovor);
            });

            foreach (var o in ugovoriPregled.Select((ugovor, index) => new { index, ugovor })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.ugovor!=null)
                        ugovori5.Add(o.ugovor);
            }

            return Ok(new {
                ugovori5,
                brojUgovora = ugovoriPregled.Count
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj
        
        foreach (var o in ugovori2.Select((ugovor, index) => new { index, ugovor })) // funkcionalnost 1.2
        {
            if(o.index>=stranica*5 && o.index<stranica*5+5)
                if(o.ugovor!=null)
                    ugovori5.Add(o.ugovor);  
        }

        return Ok(new {
            ugovori5,
            brojUgovora = ugovori2.Count
        }); // ako NIJE izvrsena pretraga
    }

    [Route("PreuzmiSveUgovoreZadrugaPretragaStranica/{username}/{unosZaPretragu}/{stranica}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveUgovoreZadrugaPretragaStranica(string username, string unosZaPretragu, int stranica){

        var zadruga = Context.Zadruge.Where(p=>p.UserName==username).FirstOrDefault();

        var ugovori = await Context.Ugovori.Include(p=>p.Zadrugar)
                                            .Include(p=>p.Zadruga)
                                            .Include(p=>p.Poslodavac)
                                            .Include(p=>p.Oglas)
                                            .ToListAsync();
                                            
        List<Ugovor> ugovori2 = new List<Ugovor>();
        ugovori.ForEach(u=>{
            if(u.Zadruga==zadruga)
                ugovori2.Add(u);
        });


        List<Ugovor> ugovori5 = new List<Ugovor>(); // vracaju se 10 ugovora u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu) )
        {
            List<Ugovor> ugovoriPregled = new List<Ugovor>();
            ugovori2.ForEach(ugovor=>{
                if(ugovor.Oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                    ugovoriPregled.Add(ugovor);
            });
            ugovoriPregled.Sort((a,b)=>b.DatumFormiranja.CompareTo(a.DatumFormiranja));//sortiramo da najnoviji ugovori budu prvi
            
            foreach (var o in ugovoriPregled.Select((ugovor, index) => new { index, ugovor })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.ugovor!=null)
                        ugovori5.Add(o.ugovor);
            }
            
            return Ok(new {
                ugovori5,
                brojUgovora = ugovoriPregled.Count
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj
        ugovori2.Sort((a,b)=>b.DatumFormiranja.CompareTo(a.DatumFormiranja));//sortiramo da najnoviji ugovori budu prvi

        foreach (var o in ugovori2.Select((ugovor, index) => new { index, ugovor })) // funkcionalnost 1.2
        {
            if(o.index>=stranica*5 && o.index<stranica*5+5)
                if(o.ugovor!=null)
                    ugovori5.Add(o.ugovor);  
        }
        
        return Ok(new {
            ugovori5,
            brojUgovora = ugovori2.Count
        }); // ako NIJE izvrsena pretraga
    }

    [Route("PreuzmiSveUgovoreZadrugarPretragaStranica/{username}/{unosZaPretragu}/{stranica}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveUgovoreZadrugarPretragaStranica(string username, string unosZaPretragu, int stranica){

        var zadrugar = Context.Zadrugari.Where(p=>p.UserName==username).FirstOrDefault();

        var ugovori = await Context.Ugovori.Include(p=>p.Zadrugar)
                                            .Include(p=>p.Zadruga)
                                            .Include(p=>p.Poslodavac)
                                            .Include(p=>p.Oglas)
                                            .ToListAsync();
                                            
        List<Ugovor> ugovori2 = new List<Ugovor>();
        ugovori.ForEach(u=>{
            if(u.Zadrugar==zadrugar)
                ugovori2.Add(u);
        });


        List<Ugovor> ugovori5 = new List<Ugovor>(); // vracaju se 10 ugovora u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu) )
        {
            List<Ugovor> ugovoriPregled = new List<Ugovor>();
            ugovori2.ForEach(ugovor=>{
                if(ugovor.Oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                    ugovoriPregled.Add(ugovor);
            });

            foreach (var o in ugovoriPregled.Select((ugovor, index) => new { index, ugovor })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.ugovor!=null)
                        ugovori5.Add(o.ugovor);
            }

            return Ok(new {
                ugovori5,
                brojUgovora = ugovoriPregled.Count
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj
        
        foreach (var o in ugovori2.Select((ugovor, index) => new { index, ugovor })) // funkcionalnost 1.2
        {
            if(o.index>=stranica*5 && o.index<stranica*5+5)
                if(o.ugovor!=null)
                    ugovori5.Add(o.ugovor);  
        }

        return Ok(new {
            ugovori5,
            brojUgovora = ugovori2.Count
        }); // ako NIJE izvrsena pretraga
    }

    [Route("PreuzmiSveUgovoreAdministratorPretragaStranica/{unosZaPretragu}/{stranica}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveUgovoreAdministratorPretragaStranica( string unosZaPretragu, int stranica){

        var ugovori = await Context.Ugovori.Include(p=>p.Zadrugar)
                                            .Include(p=>p.Zadruga)
                                            .Include(p=>p.Poslodavac)
                                            .Include(p=>p.Oglas)
                                            .ToListAsync();
                                            
        List<Ugovor> ugovori2 = new List<Ugovor>();
        ugovori.ForEach(u=>{
                ugovori2.Add(u);
        });


        List<Ugovor> ugovori5 = new List<Ugovor>(); // vracaju se 5 ugovora u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu) )
        {
            List<Ugovor> ugovoriPregled = new List<Ugovor>();
            ugovori2.ForEach(ugovor=>{
                if(ugovor.Oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                    ugovoriPregled.Add(ugovor);
            });

            foreach (var o in ugovoriPregled.Select((ugovor, index) => new { index, ugovor })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.ugovor!=null)
                        ugovori5.Add(o.ugovor);
            }

            return Ok(new {
                ugovori5,
                brojUgovora = ugovoriPregled.Count
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj
        
        foreach (var o in ugovori2.Select((ugovor, index) => new { index, ugovor })) // funkcionalnost 1.2
        {
            if(o.index>=stranica*5 && o.index<stranica*5+5)
                if(o.ugovor!=null)
                    ugovori5.Add(o.ugovor);  
        }

        return Ok(new {
            ugovori5,
            brojUgovora = ugovori2.Count
        }); // ako NIJE izvrsena pretraga
    }

    [Route("ObrisiUgovorAdministrator/{ugovorId}")]
    [HttpDelete]
    public async Task<ActionResult> ObrisiUgovorAdministrator(int ugovorId){

        var ugovorZaBrisanje = await Context.Ugovori.Where(u=> u.ID==ugovorId).FirstOrDefaultAsync();

        try{
            if(ugovorZaBrisanje!=null){
                Context.Ugovori.Remove(ugovorZaBrisanje);
                await Context.SaveChangesAsync();

                return Ok("Uspesno obrisan ugovor!");
            }   
            else{
                return BadRequest("Nije nadjen ugovor!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }
}
