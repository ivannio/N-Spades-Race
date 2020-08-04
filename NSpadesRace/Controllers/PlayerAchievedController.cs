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

        [HttpGet("{playerId}")]
        public IActionResult GetAchievedByPlayerId(int playerId)
        {
            var playerAchieved = _repository.GetByPlayerId(playerId);            
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