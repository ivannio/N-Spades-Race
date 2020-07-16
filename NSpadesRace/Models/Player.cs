using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NSpadesRace.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public DateTime AcctCreated { get; set; }
        public bool AcctActive { get; set; }
        public string FireBaseUid { get; set; }
        public string Email { get; set; }
    }
}
