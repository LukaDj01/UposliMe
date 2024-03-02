namespace Models;

public class NotifikacijaZadruga{

    [Key]
    public int ID { get; set; }

    [Required]

    public bool Procitana { get; set; }
    public Zadruga Zadruga { get; set; }
    public Notifikacija Notifikacija { get; set; }

}
