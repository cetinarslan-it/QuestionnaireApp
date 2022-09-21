using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuestionnaireAPI.Data;
using QuestionnaireAPI.Models;

namespace QuestionnaireAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantController : ControllerBase
    {
        private readonly QuestDbContext _context;

        public ParticipantController(QuestDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Participant>>> GetParticipants()
        {
            return await _context.Participants.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Participant>> GetParticipant(int id)
        {
            var participant = await _context.Participants.FindAsync(id);

            if (participant == null)
            {
                return NotFound();
            }

            return participant;
        }

        [HttpPost]
        public async Task<ActionResult<Participant>> PostParticipant(Participant participant)
        {
            var temp = _context.Participants
                .Where(x => x.Name == participant.Name
                && x.Email == participant.Email)
                .FirstOrDefault();

            if (temp == null)
            {
                _context.Participants.Add(participant);
                await _context.SaveChangesAsync();
            }
            else
                participant = temp;

            return Ok(participant);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParticipant(int id)
        {
            var participant = await _context.Participants.FindAsync(id);

            if (participant == null)
            {
                return NotFound();
            }

            _context.Participants.Remove(participant);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ParticipantExists(int id)
        {
            return _context.Participants.Any(e => e.ParticipantId == id);
        }
    }
}
