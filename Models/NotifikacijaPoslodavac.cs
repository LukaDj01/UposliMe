namespace Models;

public class NotifikacijaPoslodavac{

    [Key]
    public int ID { get; set; }

    [Required]

    public bool Procitana { get; set; }
    public Poslodavac Poslodavac { get; set; }
    public Notifikacija Notifikacija { get; set; }

}
