namespace Models;

public class UposliMeContext : DbContext
{
    public DbSet<Zadruga> Zadruge { get; set; }
    public DbSet<Zadrugar> Zadrugari { get; set; }
    public DbSet<Poslodavac> Poslodavci { get; set; }
    public DbSet<Administrator> Administratori { get; set; }
    public DbSet<Oglas> Oglasi { get; set; }
    public DbSet<OglasZadrugar> OglasiZadrugari { get; set; }
    public DbSet<Ugovor> Ugovori { get; set; }
    public DbSet<Notifikacija> Notifikacije { get; set; }
    public DbSet<NotifikacijaZadrugar> NotifikacijeZadrugari { get; set; }
    public DbSet<NotifikacijaZadruga> NotifikacijeZadruge { get; set; }
    public DbSet<NotifikacijaPoslodavac> NotifikacijePoslodavci { get; set; }
    public DbSet<NotifikacijaAdministrator> NotifikacijeAdministratori { get; set; }
    public DbSet<Feedback> Feedbacks { get; set; }
    public UposliMeContext(DbContextOptions options) : base(options)
    {

    }
    
}