using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using NSpadesRace.Models;
using Microsoft.Data.SqlClient;

namespace NSpadesRace.DataAccess
{
    public class PlayerAchievedRepository
    {
        string ConnectionString;

        public PlayerAchievedRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("NSpadesRace");
        }

        public IEnumerable<PlayerAchieved> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<PlayerAchieved>("select * from playerAchieved");
            }
        }

        public PlayerAchieved GetById(int id)
        {
            var query = @"select *
                          from playerAchieved
                          where id = @id";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Id = id };

                var playerAchieved = db.QueryFirstOrDefault<PlayerAchieved>(query, parameters);
                return playerAchieved;
            }
        }

        public PlayerAchieved Add(PlayerAchieved playerAchieved)
        {
            var sql = @"insert into playerAchieved(PlayerId, AchievementId)
                        output inserted.*
                        values(@PlayerId, @AchievementId)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<PlayerAchieved>(sql, playerAchieved);
                return result;
            }
        }
    }
}
