using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string Name { get; set; }

        public string? Position { get; set; }

        public string? Department { get; set; }

        public string? Address { get; set; }

        public decimal Salary { get; set; }

        public DateOnly Birthday { get; set; }

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }
    }
}
