using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NSpadesRace.Models
{
    public class Score
    {
        public int Id { get; set; }
        public int PlayerId { get; set; }
        public string Time { get; set; }
        public int Raw { get; set; }
        public DateTime DateRecorded { get; set; }
    }  
}
