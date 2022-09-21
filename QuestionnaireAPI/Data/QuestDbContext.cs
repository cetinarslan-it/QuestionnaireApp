using Microsoft.EntityFrameworkCore;
using QuestionnaireAPI.Models;

namespace QuestionnaireAPI.Data
{
    public class QuestDbContext : DbContext
    {
        public QuestDbContext(DbContextOptions<QuestDbContext> options) : base(options)
        {

        }

        public DbSet<Participant> Participants { get; set; }
        public DbSet<Question> Questions { get; set; }
    }
}
