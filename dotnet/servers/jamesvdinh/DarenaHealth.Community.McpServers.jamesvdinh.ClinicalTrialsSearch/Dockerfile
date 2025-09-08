FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source
COPY core ./core
COPY servers ./servers
WORKDIR /source/servers/jamesvdinh/DarenaHealth.Community.McpServers.jamesvdinh.ClinicalTrialsSearch
RUN dotnet publish -c Release -r linux-x64 -o /publish
# RUN dotnet publish DarenaHealth.Community.McpServers.jamesvdinh.ClinicalTrialsSearch.csproj -c Release -r linux-x64 -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /publish ./

ENV ASPNETCORE_URLS=http://*:5000
ENTRYPOINT ["dotnet", "DarenaHealth.Community.McpServers.jamesvdinh.ClinicalTrialsSearch.dll"]
