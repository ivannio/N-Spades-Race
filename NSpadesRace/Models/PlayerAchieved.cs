using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NSpadesRace.Models
{
    public class PlayerAchieved
    {
        public int Id { get; set; }
        public int PlayerId { get; set; }
        public int AchievementId { get; set; }
    }
}
