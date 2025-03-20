using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TransactionService.Data;
using TransactionService.Models;

namespace TransactionService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TransactionController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Transaction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            return await _context.Transactions.ToListAsync();
        }

        // GET: api/Transaction/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
                return NotFound();
            return transaction;
        }

        // POST: api/Transaction
        [HttpPost]
        public async Task<ActionResult<Transaction>> CreateTransaction(Transaction transaction)
        {
            
            var product = await _context.Products.FindAsync(transaction.ProductId);
            if (product == null)
                return BadRequest("El producto no existe.");

            if (transaction.TransactionType.ToLower() == "venta")
            {
                if (product.Stock < transaction.Quantity)
                    return BadRequest("Stock insuficiente para realizar la venta.");

                product.Stock -= transaction.Quantity;
            }
            else if (transaction.TransactionType.ToLower() == "compra")
            {
                product.Stock += transaction.Quantity;
            }

            transaction.TotalPrice = transaction.UnitPrice * transaction.Quantity;

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTransaction), new { id = transaction.Id }, transaction);
        }

        // PUT: api/Transaction/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction(int id, Transaction transaction)
        {
            if (id != transaction.Id)
                return BadRequest();

           
            _context.Entry(transaction).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionExists(id))
                    return NotFound();
                throw;
            }
            return NoContent();
        }

        // DELETE: api/Transaction/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
                return NotFound();

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool TransactionExists(int id)
        {
            return _context.Transactions.Any(e => e.Id == id);
        }
    }
}
