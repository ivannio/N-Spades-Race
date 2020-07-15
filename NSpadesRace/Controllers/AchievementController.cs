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
    [Route("api/achievement")]
    [ApiController]
    public class AchievementController : ControllerBase
    {
        AchievementRepository _repository;

        public AchievementController(AchievementRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAllAchievements()
        {
            var allAchievements = _repository.GetAll();
            return Ok(allAchievements);
        }

        [HttpGet("{id}")]
        public IActionResult GetAchievementById(int id)
        {
            var achievement = _repository.GetById(id);
            if (achievement == null) return NotFound("No achievement with that id could be found.");
            return Ok(achievement);
        }

        [HttpPost]
        public IActionResult AddAchievement(Achievement achievementToAdd)
        {
            var newAchievement = _repository.Add(achievementToAdd);
            return Created("", newAchievement);
        }
    }
}