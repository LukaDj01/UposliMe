namespace Models;

public class Administrator {

    [Key]
    public int ID { get; set; } 

    [Required]
    [MaxLength(20)]
    public string UserName { get; set; }

    [Required]
    [MaxLength(20)]
    [RegularExpression(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",ErrorMessage = "Nevalidan password!")]
    public string Password { get; set; }
    
    [JsonIgnore]
    public List<NotifikacijaAdministrator> NotifikacijeAdministratori { get; set; }
    
}
