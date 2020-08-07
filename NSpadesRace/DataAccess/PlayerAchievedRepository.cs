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

        public IEnumerable<Achievement> GetByPlayerId(int playerId)
        {
            var query = @"select achievement.id, achievement.title, achievement.description
                            from playerAchieved
                            join achievement on achievement.id = playerachieved.achievementid
                            where playerId = @playerId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { PlayerId = playerId };

                return db.Query<Achievement>(query, parameters);

            }
        }

        public ScoreCount CheckConsistentlyQuick(int playerId)
        {
            var query = @"select count(*) as count
                        from score 
                        where raw < 90000
                        and playerId = @playerId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { PlayerId = playerId };

                return db.QueryFirst<ScoreCount>(query, parameters);
            }
        }

        public ScoreCount CheckLeaderboardMaterial(int playerId)
        {
            var query = @"select count(*) as count
                        from score 
                        where raw < 45000
                        and playerId = @playerId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { PlayerId = playerId };

                return db.QueryFirst<ScoreCount>(query, parameters);
            }
        }

        public ScoreCount CheckDoubleDigits(int playerId)
        {
            var query = @"select count(*) as count
                            from score
                            where playerId = @playerId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { PlayerId = playerId };

                return db.QueryFirst<ScoreCount>(query, parameters);
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
