using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NSpadesRace.DataAccess;
using NSpadesRace.Models;

namespace NSpadesRace.Controllers
{
    [Route("api/player")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        PlayerRepository _repository;

        public PlayerController(PlayerRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAllPlayers()
        {
            var allPlayers = _repository.GetAll();
            return Ok(allPlayers);
        }

        [HttpGet("{id}")]
        public IActionResult GetPlayerById(int id)
        {
            var player = _repository.GetById(id);
            if (player == null) return NotFound("No player with that id could be found.");
            return Ok(player);
        }

        [HttpPost]
        public IActionResult AddPlayer(Player playerToAdd)
        {
            var newPlayer = _repository.Add(playerToAdd);
            return Created("", newPlayer);
        }
    }
}