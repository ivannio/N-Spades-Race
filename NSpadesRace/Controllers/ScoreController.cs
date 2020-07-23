using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NSpadesRace.DataAccess;
using NSpadesRace.Models;

namespace NSpadesRace.Controllers
{
    [ApiController]
    [Route("api/score")]
    public class ScoreController : ControllerBase
    {
        ScoreRepository _repository;

        public ScoreController(ScoreRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAllScores()
        {
            var allScores = _repository.GetAll();
            return Ok(allScores);
        }

        [HttpGet("{playerId}/highest")]
        public IActionResult GetHighestByPlayer(int playerId)
        {
            var highestScore = _repository.GetHighestByPlayerId(playerId);
            if (highestScore == null)
            {
                return NotFound("No scores for this user yet");
            }
            return Ok(highestScore);
        }

        [HttpGet("{playerId}")]
        public IActionResult GetHighScorseByPlayerId(int playerId)
        {
            var scores = _repository.GetByPlayerId(playerId);
            if (scores == null) 
            {
                return NotFound("No scores for this user yet");
            } 
            return Ok(scores);
        }

        [HttpPost]
        public IActionResult AddScore(Score scoreToAdd)
        {
            var newScore = _repository.Add(scoreToAdd);
            return Created("", newScore);
        }

    }
}
