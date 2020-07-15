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
    [Route("api/playerachieved")]
    [ApiController]
    public class PlayerAchievedController : ControllerBase
    {
        PlayerAchievedRepository _repository;

        public PlayerAchievedController(PlayerAchievedRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAllPlayerAchieved()
        {
            var allPlayerAchieved = _repository.GetAll();
            return Ok(allPlayerAchieved);
        }

        [HttpGet("{id}")]
        public IActionResult GetPlayerAchievedById(int id)
        {
            var playerAchieved = _repository.GetById(id);
            if (playerAchieved == null) return NotFound("No playerAchieved with that id could be found.");
            return Ok(playerAchieved);
        }

        [HttpPost]
        public IActionResult AddPlayerAchieved(PlayerAchieved playerAchievedToAdd)
        {
            var newPlayerAchieved = _repository.Add(playerAchievedToAdd);
            return Created("", newPlayerAchieved);
        }
    }
}