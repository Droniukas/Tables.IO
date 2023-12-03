using AutoMapper;
using tables_project_api.Dtos;
using tables_project_api.Models;

namespace tables_project_api.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {

            CreateMap<Table, TableReturnDto>();
            CreateMap<Column, ColumnReturnDto>();
            CreateMap<JobApplicationRow, JobApplicationRowReturnDto>();
        }
    }
}
