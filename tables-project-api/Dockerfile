FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["tables-project-api.csproj", "."]
RUN dotnet restore "./tables-project-api.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "tables-project-api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "tables-project-api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "tables-project-api.dll"]
