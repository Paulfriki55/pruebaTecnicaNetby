using System.ComponentModel.DataAnnotations;

namespace TransactionService.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;

        // "compra" o "venta"
        [Required]
        public string TransactionType { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal UnitPrice { get; set; }

        [Required]
        public decimal TotalPrice { get; set; }

        public string Detail { get; set; }
    }
}
