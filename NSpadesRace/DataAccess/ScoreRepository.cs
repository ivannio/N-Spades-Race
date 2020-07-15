using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using NSpadesRace.Models;
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

        public IEnumerable<Score> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<Score>("select * from score");
            }
        }

        public Score GetById(int id)
        {
            var query = @"select *
                          from score
                          where id = @id";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Id = id };

                var score = db.QueryFirstOrDefault<Score>(query, parameters);
                return score;
            }
        }

        public Score Add(Score score)
        {
            var sql = @"insert into score(PlayerId,Time,DateRecorded)
                        output inserted.*
                        values(@PlayerId, @Time, getDate())";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<Score>(sql, score);
                return result;
            }
        }
    }
}
