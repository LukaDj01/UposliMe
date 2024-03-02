namespace Models;

public class NotifikacijaZadrugar{

    [Key]
    public int ID { get; set; }

    [Required]

    public bool Procitana { get; set; }
    public Zadrugar Zadrugar { get; set; }
    public Notifikacija Notifikacija { get; set; }

}
