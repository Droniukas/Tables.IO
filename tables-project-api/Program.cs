using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Text.Json.Serialization;
using tables_project_api.Data;
using tables_project_api.Interfaces;
using tables_project_api.Repository;
using tables_project_api.Services;
using static Microsoft.AspNetCore.Http.StatusCodes;

namespace tables_project_api
{
    public class Program
    {

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // fix for prod
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                    policy =>
                                    {
                                        policy.AllowAnyOrigin()
                                   .AllowAnyMethod()
                                   .AllowAnyHeader();
                                    });
            });

            // Add services to the container.
            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });
            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            builder.Services.AddScoped<ITableRepository, TableRepository>();
            builder.Services.AddScoped<ITableService, TableService>();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
                //options.EnableSensitiveDataLogging(true);
            });

            var app = builder.Build();

            // fix for prod
            app.UseCors(MyAllowSpecificOrigins);

            if (args.Length == 1 && args[0].ToLower() == "seeddata")
                SeedData(app);

            if (app.Environment.IsDevelopment())
            {
                SeedData(app);
            }

            void SeedData(IHost app)
            {
                using (var scope = app.Services.CreateScope())
                {
                    var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();
                    dataContext.Database.EnsureCreated();
                    dataContext.SeedDataContext();
                }
            }

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}