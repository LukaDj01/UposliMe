namespace UposliMe.Controllers;

[ApiController]
[Route("[controller]")]
public class NotifikacijaController : ControllerBase
{
    public UposliMeContext Context { get; set; }

    public NotifikacijaController(UposliMeContext context)
    {
        Context = context;
    }

    [Route("DodajNotifikacijuZaZadrugara/{poruka}/{idZadrugar}")]
    [HttpPost]
    public async Task<ActionResult> DodajNotifikacijuZaZadrugara(string poruka, int idZadrugar){

        if(string.IsNullOrWhiteSpace(poruka) || poruka.Length>10000)
        {
            return BadRequest("Lose uneta poruka!");
        }
        
        try
        {   
            var zadrugar = Context.Zadrugari.Find(idZadrugar);
            if(zadrugar==null)
            {
                return BadRequest("Ne postoji zadrugar!");
            }
            

            var notifikacija = new Notifikacija{
                Poruka=poruka
            };
            notifikacija.Datum = DateTime.Now;
            Context.Notifikacije.Add(notifikacija);

            var notifZadrugar = new NotifikacijaZadrugar{
                
            };
            notifZadrugar.Procitana=false;
            notifZadrugar.Zadrugar=zadrugar;
            notifZadrugar.Notifikacija=notifikacija;
            Context.NotifikacijeZadrugari.Add(notifZadrugar);

            await Context.SaveChangesAsync();
            return Ok($"Uspesno dodata notifikacija sa id={notifikacija.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("DodajNotifikacijuZaZadrugaraUsername/{poruka}/{username}")]
    [HttpPost]
    public async Task<ActionResult> DodajNotifikacijuZaZadrugaraUsername(string poruka, string username){

        if(string.IsNullOrWhiteSpace(poruka) || poruka.Length>10000)
        {
            return BadRequest("Lose uneta poruka!");
        }
        
        try
        {   
            var zadrugar = Context.Zadrugari.Where(p=>p.UserName==username).FirstOrDefault();
            if(zadrugar==null)
            {
                return BadRequest("Ne postoji zadrugar!");
            }
            

            var notifikacija = new Notifikacija{
                Poruka=poruka
            };
            notifikacija.Datum = DateTime.Now;
            Context.Notifikacije.Add(notifikacija);

            var notifZadrugar = new NotifikacijaZadrugar{
                
            };
            notifZadrugar.Procitana=false;
            notifZadrugar.Zadrugar=zadrugar;
            notifZadrugar.Notifikacija=notifikacija;
            Context.NotifikacijeZadrugari.Add(notifZadrugar);

            await Context.SaveChangesAsync();
            return Ok($"Uspesno dodata notifikacija sa id={notifikacija.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("DodajNotifikacijuZaPoslodavca/{poruka}/{idPoslodavac}")]
    [HttpPost]
    public async Task<ActionResult> DodajNotifikacijuZaPoslodavca(string poruka, int idPoslodavac){

        if(string.IsNullOrWhiteSpace(poruka) || poruka.Length>10000)
        {
            return BadRequest("Lose uneta poruka!");
        }
        
        try
        {   
            var poslodavac = Context.Poslodavci.Find(idPoslodavac);
            if(poslodavac==null)
            {
                return BadRequest("Ne postoji poslodavac!");
            }
            

            var notifikacija = new Notifikacija{
                Poruka=poruka
            };
            notifikacija.Datum = DateTime.Now;
            Context.Notifikacije.Add(notifikacija);

            var notifPoslodavac = new NotifikacijaPoslodavac{
                
            };
            notifPoslodavac.Procitana=false;
            notifPoslodavac.Poslodavac=poslodavac;
            notifPoslodavac.Notifikacija=notifikacija;
            Context.NotifikacijePoslodavci.Add(notifPoslodavac);

            await Context.SaveChangesAsync();
            return Ok($"Uspesno dodata notifikacija sa id={notifikacija.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("DodajNotifikacijuZaPoslodavcaUsername/{poruka}/{username}")]
    [HttpPost]
    public async Task<ActionResult> DodajNotifikacijuZaPoslodavcaUsername(string poruka, string username){

        if(string.IsNullOrWhiteSpace(poruka) || poruka.Length>10000)
        {
            return BadRequest("Lose uneta poruka!");
        }
        
        try
        {   
            var poslodavac = Context.Poslodavci.Where(p=>p.UserName==username).FirstOrDefault();
            if(poslodavac==null)
            {
                return BadRequest("Ne postoji poslodavac!");
            }
            

            var notifikacija = new Notifikacija{
                Poruka=poruka
            };
            notifikacija.Datum = DateTime.Now;
            Context.Notifikacije.Add(notifikacija);

            var notifPoslodavac = new NotifikacijaPoslodavac{
                
            };
            notifPoslodavac.Procitana=false;
            notifPoslodavac.Poslodavac=poslodavac;
            notifPoslodavac.Notifikacija=notifikacija;
            Context.NotifikacijePoslodavci.Add(notifPoslodavac);

            await Context.SaveChangesAsync();
            return Ok($"Uspesno dodata notifikacija sa id={notifikacija.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("DodajNotifikacijuZaZadrugu/{poruka}/{idZadruga}")]
    [HttpPost]
    public async Task<ActionResult> DodajNotifikacijuZaZadrugu(string poruka, int idZadruga){

        if(string.IsNullOrWhiteSpace(poruka) || poruka.Length>10000)
        {
            return BadRequest("Lose uneta poruka!");
        }
        
        try
        {   
            var zadruga = Context.Zadruge.Find(idZadruga);
            if(zadruga==null)
            {
                return BadRequest("Ne postoji zadruga!");
            }
            

            var notifikacija = new Notifikacija{
                Poruka=poruka
            };
            notifikacija.Datum = DateTime.Now;
            Context.Notifikacije.Add(notifikacija);

            var notifZadruga = new NotifikacijaZadruga{
                
            };
            notifZadruga.Procitana=false;
            notifZadruga.Zadruga=zadruga;
            notifZadruga.Notifikacija=notifikacija;
            Context.NotifikacijeZadruge.Add(notifZadruga);

            await Context.SaveChangesAsync();
            return Ok($"Uspesno dodata notifikacija sa id={notifikacija.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("DodajNotifikacijuZaZadruguNaziv/{poruka}/{zadrugaNaziv}")]
    [HttpPost]
    public async Task<ActionResult> DodajNotifikacijuZaZadruguNaziv(string poruka, string zadrugaNaziv){

        if(string.IsNullOrWhiteSpace(poruka) || poruka.Length>10000)
        {
            return BadRequest("Lose uneta poruka!");
        }
        
        try
        {   
            var zadruga = Context.Zadruge.Where(p=>p.Naziv==zadrugaNaziv).FirstOrDefault();
            if(zadruga==null)
            {
                return BadRequest("Ne postoji zadruga!");
            }
            

            var notifikacija = new Notifikacija{
                Poruka=poruka
            };
            notifikacija.Datum = DateTime.Now;
            Context.Notifikacije.Add(notifikacija);

            var notifZadruga = new NotifikacijaZadruga{
                
            };
            notifZadruga.Procitana=false;
            notifZadruga.Zadruga=zadruga;
            notifZadruga.Notifikacija=notifikacija;
            Context.NotifikacijeZadruge.Add(notifZadruga);

            await Context.SaveChangesAsync();
            return Ok($"Uspesno dodata notifikacija sa id={notifikacija.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("DodajNotifikacijuZaZadruguUsername/{poruka}/{username}")]
    [HttpPost]
    public async Task<ActionResult> DodajNotifikacijuZaZadruguUsername(string poruka, string username){

        if(string.IsNullOrWhiteSpace(poruka) || poruka.Length>10000)
        {
            return BadRequest("Lose uneta poruka!");
        }
        
        try
        {   
            var zadruga = Context.Zadruge.Where(p=>p.UserName==username).FirstOrDefault();
            if(zadruga==null)
            {
                return BadRequest("Ne postoji zadruga!");
            }
            

            var notifikacija = new Notifikacija{
                Poruka=poruka
            };
            notifikacija.Datum = DateTime.Now;
            Context.Notifikacije.Add(notifikacija);

            var notifZadruga = new NotifikacijaZadruga{
                
            };
            notifZadruga.Procitana=false;
            notifZadruga.Zadruga=zadruga;
            notifZadruga.Notifikacija=notifikacija;
            Context.NotifikacijeZadruge.Add(notifZadruga);

            await Context.SaveChangesAsync();
            return Ok($"Uspesno dodata notifikacija sa id={notifikacija.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("DodajNotifikacijuZaAdministratora/{poruka}")] // salje se notifikacija prvom pronadjenom administratoru
    [HttpPost]
    public async Task<ActionResult> DodajNotifikacijuZaAdministratora(string poruka){

        if(string.IsNullOrWhiteSpace(poruka) || poruka.Length>10000)
        {
            return BadRequest("Lose uneta poruka!");
        }
        
        try
        {   
            var administrator = Context.Administratori.FirstOrDefault();
            if(administrator==null)
            {
                return BadRequest("Ne postoji administrator!");
            }
            

            var notifikacija = new Notifikacija{
                Poruka=poruka
            };
            notifikacija.Datum = DateTime.Now;
            Context.Notifikacije.Add(notifikacija);

            var notifAdministrator = new NotifikacijaAdministrator{
                
            };
            notifAdministrator.Procitana=false;
            notifAdministrator.Administrator=administrator;
            notifAdministrator.Notifikacija=notifikacija;
            Context.NotifikacijeAdministratori.Add(notifAdministrator);

            await Context.SaveChangesAsync();
            return Ok($"Uspesno dodata notifikacija sa id={notifikacija.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("PreuzmiNotifikacijeZadrugarProzorce/{idZadrugar}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiNotifikacijeZadrugar(int idZadrugar){
           
        var notifZadrugar = await Context.NotifikacijeZadrugari.Include(p=>p.Notifikacija)
                                                        .Include(p=>p.Zadrugar)
                                                        .Where(p=>p.Zadrugar.ID==idZadrugar)
                                                        .ToListAsync();

        notifZadrugar.Sort((a,b)=>b.Notifikacija.Datum.CompareTo(a.Notifikacija.Datum));

        var procitaneLista = notifZadrugar.Where(p=>p.Procitana==true).ToList();
        var neprocitaneLista = notifZadrugar.Where(p=>p.Procitana==false).ToList();

        var procitane = new List<NotifikacijaZadrugar>();
        var neprocitane = new List<NotifikacijaZadrugar>();
        if(neprocitaneLista.Count>5)
        {
            foreach (var o in neprocitaneLista.Select((neprocitana, index) => new { index, neprocitana })) // funkcionalnost 1.1
            {
                if(o.index<5)
                    neprocitane.Add(o.neprocitana);
            }
            return Ok(new {
                procitane,
                neprocitane,
                brojNeprocitanih = neprocitaneLista.Count
            });
        }
        else
        {
            foreach (var o in procitaneLista.Select((procitana, index) => new { index, procitana })) // funkcionalnost 1.2
            {
                if(o.index+neprocitaneLista.Count<5) // mzd bug oko konkateniranja ? 
                    procitane.Add(o.procitana);
            }

            return Ok(new {
                procitane,
                neprocitane = neprocitaneLista,
                brojNeprocitanih = notifZadrugar.Where(p=>p.Procitana==false).Count()
            });
        }
    }

    [Route("PreuzmiNotifikacijeZadrugaProzorce/{idZadruga}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiNotifikacijeZadrugaProzorce(int idZadruga){
           
        var notifZadruga = await Context.NotifikacijeZadruge.Include(p=>p.Notifikacija)
                                                        .Include(p=>p.Zadruga)
                                                        .Where(p=>p.Zadruga.ID==idZadruga)
                                                        .ToListAsync();

        notifZadruga.Sort((a,b)=>b.Notifikacija.Datum.CompareTo(a.Notifikacija.Datum));

        var procitaneLista = notifZadruga.Where(p=>p.Procitana==true).ToList();
        var neprocitaneLista = notifZadruga.Where(p=>p.Procitana==false).ToList();

        var procitane = new List<NotifikacijaZadruga>();
        var neprocitane = new List<NotifikacijaZadruga>();
        if(neprocitaneLista.Count>5)
        {
            foreach (var o in neprocitaneLista.Select((neprocitana, index) => new { index, neprocitana })) // funkcionalnost 1.1
            {
                if(o.index<5)
                    neprocitane.Add(o.neprocitana);
            }
            return Ok(new {
                procitane,
                neprocitane,
                brojNeprocitanih = neprocitaneLista.Count
            });
        }
        else
        {
            foreach (var o in procitaneLista.Select((procitana, index) => new { index, procitana })) // funkcionalnost 1.2
            {
                if(o.index+neprocitaneLista.Count<5) // mzd bug oko konkateniranja ? 
                    procitane.Add(o.procitana);
            }

            return Ok(new {
                procitane,
                neprocitane = neprocitaneLista,
                brojNeprocitanih = notifZadruga.Where(p=>p.Procitana==false).Count()
            });
        }
    }

    [Route("PreuzmiNotifikacijePoslodavacProzorce/{idPoslodavac}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiNotifikacijePoslodavacProzorce(int idPoslodavac){
           
        var notifPoslodavac = await Context.NotifikacijePoslodavci.Include(p=>p.Notifikacija)
                                                        .Include(p=>p.Poslodavac)
                                                        .Where(p=>p.Poslodavac.ID==idPoslodavac)
                                                        .ToListAsync();

        notifPoslodavac.Sort((a,b)=>b.Notifikacija.Datum.CompareTo(a.Notifikacija.Datum));

        var procitaneLista = notifPoslodavac.Where(p=>p.Procitana==true).ToList();
        var neprocitaneLista = notifPoslodavac.Where(p=>p.Procitana==false).ToList();

        var procitane = new List<NotifikacijaPoslodavac>();
        var neprocitane = new List<NotifikacijaPoslodavac>();
        if(neprocitaneLista.Count>5)
        {
            foreach (var o in neprocitaneLista.Select((neprocitana, index) => new { index, neprocitana })) // funkcionalnost 1.1
            {
                if(o.index<5)
                    neprocitane.Add(o.neprocitana);
            }
            return Ok(new {
                procitane,
                neprocitane,
                brojNeprocitanih = neprocitaneLista.Count
            });
        }
        else
        {
            foreach (var o in procitaneLista.Select((procitana, index) => new { index, procitana })) // funkcionalnost 1.2
            {
                if(o.index+neprocitaneLista.Count<5) // mzd bug oko konkateniranja ? 
                    procitane.Add(o.procitana);
            }

            return Ok(new {
                procitane,
                neprocitane = neprocitaneLista,
                brojNeprocitanih = notifPoslodavac.Where(p=>p.Procitana==false).Count()
            });
        }
    }

    [Route("PreuzmiNotifikacijeAdministratorProzorce/{idAdministrator}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiNotifikacijeAdministratorProzorce(int idAdministrator){
           
        var notifAdministrator = await Context.NotifikacijeAdministratori.Include(p=>p.Notifikacija)
                                                        .Include(p=>p.Administrator)
                                                        .Where(p=>p.Administrator.ID==idAdministrator)
                                                        .ToListAsync();

        notifAdministrator.Sort((a,b)=>b.Notifikacija.Datum.CompareTo(a.Notifikacija.Datum));

        var procitaneLista = notifAdministrator.Where(p=>p.Procitana==true).ToList();
        var neprocitaneLista = notifAdministrator.Where(p=>p.Procitana==false).ToList();

        var procitane = new List<NotifikacijaAdministrator>();
        var neprocitane = new List<NotifikacijaAdministrator>();
        if(neprocitaneLista.Count>5)
        {
            foreach (var o in neprocitaneLista.Select((neprocitana, index) => new { index, neprocitana })) // funkcionalnost 1.1
            {
                if(o.index<5)
                    neprocitane.Add(o.neprocitana);
            }
            return Ok(new {
                procitane,
                neprocitane,
                brojNeprocitanih = neprocitaneLista.Count
            });
        }
        else
        {
            foreach (var o in procitaneLista.Select((procitana, index) => new { index, procitana })) // funkcionalnost 1.2
            {
                if(o.index+neprocitaneLista.Count<5) // mzd bug oko konkateniranja ? 
                    procitane.Add(o.procitana);
            }

            return Ok(new {
                procitane,
                neprocitane = neprocitaneLista,
                brojNeprocitanih = notifAdministrator.Where(p=>p.Procitana==false).Count()
            });
        }
    }

    [Route("PreuzmiNotifikacijeZadrugarPregledSortiranjeStranica/{username}/{sortiranje}/{stranica}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiNotifikacijeZadrugarPregled(string username, string sortiranje, int stranica){
           
        var notifZadrugar = await Context.NotifikacijeZadrugari.Include(p=>p.Notifikacija)
                                                        .Include(p=>p.Zadrugar)
                                                        .Where(p=>p.Zadrugar.UserName==username)
                                                        .ToListAsync();

        notifZadrugar.Sort((a,b)=>b.Notifikacija.Datum.CompareTo(a.Notifikacija.Datum));
        //sortiranje pocetak
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                notifZadrugar.Sort((a,b)=>b.Notifikacija.Datum.CompareTo(a.Notifikacija.Datum));
            if(sortiranje=="Nepročitane")
                notifZadrugar.Sort((a,b)=>a.Procitana.CompareTo(b.Procitana));
        }
        //sortiranje kraj

        List<NotifikacijaZadrugar> notif5 = new List<NotifikacijaZadrugar>();

        foreach (var o in notifZadrugar.Select((notif, index) => new { index, notif })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.notif!=null)
                        notif5.Add(o.notif);
            }

            return Ok(new {
                notif5,
                brojNotifikacija = notifZadrugar.Count,
                brojNeprocitanih = notifZadrugar.Where(p=>p.Procitana==false).Count()
            });

    }

    [Route("PreuzmiNotifikacijeZadrugaPregledSortiranjeStranica/{username}/{sortiranje}/{stranica}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiNotifikacijeZadrugaPregled(string username, string sortiranje, int stranica){
           
        var notifZadruga = await Context.NotifikacijeZadruge.Include(p=>p.Notifikacija)
                                                        .Include(p=>p.Zadruga)
                                                        .Where(p=>p.Zadruga.UserName==username)
                                                        .ToListAsync();

        notifZadruga.Sort((a,b)=>b.Notifikacija.Datum.CompareTo(a.Notifikacija.Datum));
        //sortiranje pocetak
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                notifZadruga.Sort((a,b)=>b.Notifikacija.Datum.CompareTo(a.Notifikacija.Datum));
            if(sortiranje=="Nepročitane")
                notifZadruga.Sort((a,b)=>a.Procitana.CompareTo(b.Procitana));
        }
        //sortiranje kraj

        List<NotifikacijaZadruga> notif5 = new List<NotifikacijaZadruga>();

        foreach (var o in notifZadruga.Select((notif, index) => new { index, notif })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.notif!=null)
                        notif5.Add(o.notif);
            }

            return Ok(new {
                notif5,
                brojNotifikacija = notifZadruga.Count,
                brojNeprocitanih = notifZadruga.Where(p=>p.Procitana==false).Count()
            });

    }

    [Route("PreuzmiNotifikacijePoslodavacPregledSortiranjeStranica/{username}/{sortiranje}/{stranica}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiNotifikacijePoslodavacPregledSortiranjeStranica(string username, string sortiranje, int stranica){
           
        var notifPoslodavac = await Context.NotifikacijePoslodavci.Include(p=>p.Notifikacija)
                                                        .Include(p=>p.Poslodavac)
                                                        .Where(p=>p.Poslodavac.UserName==username)
                                                        .ToListAsync();

        notifPoslodavac.Sort((a,b)=>b.Notifikacija.Datum.CompareTo(a.Notifikacija.Datum));
        //sortiranje pocetak
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                notifPoslodavac.Sort((a,b)=>b.Notifikacija.Datum.CompareTo(a.Notifikacija.Datum));
            if(sortiranje=="Nepročitane")
                notifPoslodavac.Sort((a,b)=>a.Procitana.CompareTo(b.Procitana));
        }
        //sortiranje kraj

        List<NotifikacijaPoslodavac> notif5 = new List<NotifikacijaPoslodavac>();

        foreach (var o in notifPoslodavac.Select((notif, index) => new { index, notif })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.notif!=null)
                        notif5.Add(o.notif);
            }

            return Ok(new {
                notif5,
                brojNotifikacija = notifPoslodavac.Count,
                brojNeprocitanih = notifPoslodavac.Where(p=>p.Procitana==false).Count()
            });

    }

    [Route("PreuzmiNotifikacijeAdministratorPregledSortiranjeStranica/{username}/{sortiranje}/{stranica}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiNotifikacijeAdministratorPregledSortiranjeStranica(string username, string sortiranje, int stranica){
           
        var notifAdministrator = await Context.NotifikacijeAdministratori.Include(p=>p.Notifikacija)
                                                        .Include(p=>p.Administrator)
                                                        .Where(p=>p.Administrator.UserName==username)
                                                        .ToListAsync();

        notifAdministrator.Sort((a,b)=>b.Notifikacija.Datum.CompareTo(a.Notifikacija.Datum));
        //sortiranje pocetak
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                notifAdministrator.Sort((a,b)=>b.Notifikacija.Datum.CompareTo(a.Notifikacija.Datum));
            if(sortiranje=="Nepročitane")
                notifAdministrator.Sort((a,b)=>a.Procitana.CompareTo(b.Procitana));
        }
        //sortiranje kraj

        List<NotifikacijaAdministrator> notif5 = new List<NotifikacijaAdministrator>();

        foreach (var o in notifAdministrator.Select((notif, index) => new { index, notif })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.notif!=null)
                        notif5.Add(o.notif);
            }

            return Ok(new {
                notif5,
                brojNotifikacija = notifAdministrator.Count,
                brojNeprocitanih = notifAdministrator.Where(p=>p.Procitana==false).Count()
            });

    }

    [Route("PreuzmiNotifikacijuZadrugar/{username}/{idNotifikacija}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiNotifikacijuZadrugar(string username, int idNotifikacija){
           
        var notifikacija = await Context.NotifikacijeZadrugari.Include(p=>p.Notifikacija)
                                                        .Include(p=>p.Zadrugar)
                                                        .Where(p=>p.Zadrugar.UserName==username && p.ID==idNotifikacija)
                                                        .FirstOrDefaultAsync();
        
        return Ok(notifikacija);

    }

    [Route("PreuzmiNotifikacijuPoslodavac/{username}/{idNotifikacija}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiNotifikacijuPoslodavac(string username, int idNotifikacija){
           
        var notifikacija = await Context.NotifikacijePoslodavci.Include(p=>p.Notifikacija)
                                                        .Include(p=>p.Poslodavac)
                                                        .Where(p=>p.Poslodavac.UserName==username && p.ID==idNotifikacija)
                                                        .FirstOrDefaultAsync();
        
        return Ok(notifikacija);

    }

    [Route("PreuzmiNotifikacijuZadruga/{username}/{idNotifikacija}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiNotifikacijuZadruga(string username, int idNotifikacija){
           
        var notifikacija = await Context.NotifikacijeZadruge.Include(p=>p.Notifikacija)
                                                        .Include(p=>p.Zadruga)
                                                        .Where(p=>p.Zadruga.UserName==username && p.ID==idNotifikacija)
                                                        .FirstOrDefaultAsync();
        
        return Ok(notifikacija);

    }

    [Route("PreuzmiNotifikacijuAdministrator/{username}/{idNotifikacija}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiNotifikacijuAdministrator(string username, int idNotifikacija){
           
        var notifikacija = await Context.NotifikacijeAdministratori.Include(p=>p.Notifikacija)
                                                        .Include(p=>p.Administrator)
                                                        .Where(p=>p.Administrator.UserName==username && p.ID==idNotifikacija)
                                                        .FirstOrDefaultAsync();
        
        return Ok(notifikacija);

    }

    [Route("PromeniNotifikacijaProcitanaZadrugar/{idZadrugar}/{idNotifikacija}")]
    [HttpPut]
    public async Task<ActionResult> PromeniNotifikacijaProcitanaZadrugar(int idZadrugar, int idNotifikacija){
           
        var notifZadrugar = await Context.NotifikacijeZadrugari.Include(p=>p.Notifikacija)
                                                        .Include(p=>p.Zadrugar)
                                                        .Where(p=>p.Zadrugar.ID==idZadrugar && p.ID==idNotifikacija)
                                                        .FirstOrDefaultAsync();

        notifZadrugar.Procitana=true;
        Context.NotifikacijeZadrugari.Update(notifZadrugar);
        await Context.SaveChangesAsync();

        return Ok("Uspesno procitana notifikacija!");
    }

    [Route("PromeniNotifikacijaProcitanaZadruga/{idZadruga}/{idNotifikacija}")]
    [HttpPut]
    public async Task<ActionResult> PromeniNotifikacijaProcitanaZadruga(int idZadruga, int idNotifikacija){
           
        var notifZadruga = await Context.NotifikacijeZadruge.Include(p=>p.Notifikacija)
                                                        .Include(p=>p.Zadruga)
                                                        .Where(p=>p.Zadruga.ID==idZadruga && p.ID==idNotifikacija)
                                                        .FirstOrDefaultAsync();

        notifZadruga.Procitana=true;
        Context.NotifikacijeZadruge.Update(notifZadruga);
        await Context.SaveChangesAsync();

        return Ok("Uspesno procitana notifikacija!");
    }

    [Route("PromeniNotifikacijaProcitanaPoslodavac/{idPoslodavac}/{idNotifikacija}")]
    [HttpPut]
    public async Task<ActionResult> PromeniNotifikacijaProcitanaPoslodavac(int idPoslodavac, int idNotifikacija){
           
        var notifPoslodavac = await Context.NotifikacijePoslodavci.Include(p=>p.Notifikacija)
                                                        .Include(p=>p.Poslodavac)
                                                        .Where(p=>p.Poslodavac.ID==idPoslodavac && p.ID==idNotifikacija)
                                                        .FirstOrDefaultAsync();

        notifPoslodavac.Procitana=true;
        Context.NotifikacijePoslodavci.Update(notifPoslodavac);
        await Context.SaveChangesAsync();

        return Ok("Uspesno procitana notifikacija!");
    }

    [Route("PromeniNotifikacijaProcitanaAdministrator/{idAdministrator}/{idNotifikacija}")]
    [HttpPut]
    public async Task<ActionResult> PromeniNotifikacijaProcitanaAdministrator(int idAdministrator, int idNotifikacija){
           
        var notifAdministrator = await Context.NotifikacijeAdministratori.Include(p=>p.Notifikacija)
                                                        .Include(p=>p.Administrator)
                                                        .Where(p=>p.Administrator.ID==idAdministrator && p.ID==idNotifikacija)
                                                        .FirstOrDefaultAsync();

        notifAdministrator.Procitana=true;
        Context.NotifikacijeAdministratori.Update(notifAdministrator);
        await Context.SaveChangesAsync();

        return Ok("Uspesno procitana notifikacija!");
    }
}
