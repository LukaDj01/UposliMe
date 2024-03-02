namespace Models;

public class Notifikacija{

    [Key]
    public int ID { get; set; }

    [MaxLength(10000)]
    public string Poruka { get; set; }

    public DateTime Datum { get; set; }
    
    [JsonIgnore]
    public List<NotifikacijaZadrugar> NotifikacijeZadrugari { get; set; }
    
    [JsonIgnore]
    public List<NotifikacijaZadruga> NotifikacijeZadruge { get; set; }
    
    [JsonIgnore]
    public List<NotifikacijaPoslodavac> NotifikacijePoslodavci { get; set; }
    
    [JsonIgnore]
    public List<NotifikacijaAdministrator> NotifikacijeAdministratori { get; set; }

}
