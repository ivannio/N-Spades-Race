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

        [HttpGet("{id}")]
        public IActionResult GetScoreById(int id)
        {
            var score = _repository.GetById(id);
            if (score == null) return NotFound("No score with that id could be found.");
            return Ok(score);
        }

        [HttpPost]
        public IActionResult AddScore(Score scoreToAdd)
        {
            var newScore = _repository.Add(scoreToAdd);
            return Created("", newScore);
        }

    }
}
