using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NSpadesRace.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace NSpadesRace.DataAccess
{
    public class AchievementRepository
    {
        string ConnectionString;

        public AchievementRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("NSpadesRace");
        }

        public IEnumerable<Achievement> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<Achievement>("select * from achievement");
            }
        }

        public Achievement GetById(int id)
        {
            var query = @"select *
                          from achievement
                          where id = @id";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Id = id };

                var achievement = db.QueryFirstOrDefault<Achievement>(query, parameters);
                return achievement;
            }
        }

        public Achievement Add(Achievement achievement)
        {
            var sql = @"insert into achievement(Title, Description)
                        output inserted.*
                        values(@Title, @Description )";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<Achievement>(sql, achievement);
                return result;
            }
        }
    }
}
