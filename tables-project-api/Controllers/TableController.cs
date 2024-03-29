﻿using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using tables_project_api.Dtos;
using tables_project_api.Interfaces;

namespace tables_project_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController : Controller
    {
        private readonly ITableService _tableService;

        public TableController(ITableService tableService)
        {
            this._tableService = tableService;
        }

        [HttpGet("{userId}")]
        [ProducesResponseType(200, Type = typeof(TableReturnDto))]
        public IActionResult GetTableByUserId(int userId)
        {
            //try
            //{
            return Ok(_tableService.GetTableByUserId(userId));
            //}
            //catch
            //{
            //    return StatusCode(StatusCodes.Status500InternalServerError);
            //};
        }

        [HttpPost("autoGenerateJobData")]
        [ProducesResponseType(200, Type = typeof(AutoGeneratedJobDataDto))]
        public IActionResult AutoGenerateJobData([FromBody][Required] InputURLDto inputURLDto)
        {
            return Ok(_tableService.AutoGenerateJobData(inputURLDto));
        }

        [HttpPatch("updateDatacellValueById/{datacellId}")]
        [ProducesResponseType(200, Type = typeof(TableRowReturnDto))]
        public IActionResult UpdateDatacellValueById(int datacellId, [FromBody][Required] InputDatacellValueDto inputDatacellValueDto)
        {
            return Ok(_tableService.UpdateDatacellValueById(datacellId, inputDatacellValueDto.Value));
        }


    }
}
