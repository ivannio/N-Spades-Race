using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using NSpadesRace.Models;
using NSpadesRace.Models.ViewModels;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace NSpadesRace.DataAccess
{
    public class ScoreRepository
    {
        string ConnectionString;

        public ScoreRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("NSpadesRace");
        }

        public IEnumerable<LeaderboardEntry> GetLeaderboard()
        {
            var query = @"select top(10) score.Id, player.userName as PlayerName, [Time], DateRecorded
                            from score
                            join player on player.id = score.playerId
                            order by raw asc";

            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<LeaderboardEntry>(query);
            }
        }

        public IEnumerable<Score> GetByPlayerId(int playerId)
        {
            var query = @"select top(10) *
                          from score
                          where playerId = @playerId
                          order by raw asc";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { PlayerId = playerId };

                var scores = db.Query<Score>(query, parameters);
                return scores;
            }
        }

        public Score GetHighestByPlayerId(int playerId)
        {
            var query = @"select top(1) *
                          from score where playerId = @playerId
                          order by raw asc";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { PlayerId = playerId };

                var score = db.QueryFirstOrDefault<Score>(query, parameters);
                return score;
            }
        }

        public Score Add(Score score)
        {
            var sql = @"insert into score(PlayerId,Time,Raw,DateRecorded)
                        output inserted.*
                        values(@PlayerId, @Time, @Raw, getDate())";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<Score>(sql, score);
                return result;
            }
        }
    }
}
