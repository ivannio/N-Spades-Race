using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NSpadesRace.Models.ViewModels
{
    public class LeaderboardEntry
    {
        public int Id { get; set; }
        public string PlayerName { get; set; }
        public string Time { get; set; }
        public DateTime DateRecorded { get; set; }        
    }
}
