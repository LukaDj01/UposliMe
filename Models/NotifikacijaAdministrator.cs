namespace Models;

public class NotifikacijaAdministrator{

    [Key]
    public int ID { get; set; }

    [Required]

    public bool Procitana { get; set; }
    public Administrator Administrator { get; set; }
    public Notifikacija Notifikacija { get; set; }

}
