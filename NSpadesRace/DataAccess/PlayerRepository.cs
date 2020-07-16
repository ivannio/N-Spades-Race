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
    public class PlayerRepository
    {
        string ConnectionString;

        public PlayerRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("NSpadesRace");
        }

        public IEnumerable<Player> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<Player>("select * from player");
            }
        }

        public Player GetById(int id)
        {
            var query = @"select *
                          from player
                          where id = @id";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Id = id };

                var player = db.QueryFirstOrDefault<Player>(query, parameters);
                return player;
            }
        }

        public Player Add(Player player)
        {
            var sql = @"insert into player(username, acctCreated, firebaseUid, email)
                        output inserted.*
                        values(@UserName, getDate(), @FirebaseUid, @Email)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<Player>(sql, player);
                return result;
            }
        }
    }
}
