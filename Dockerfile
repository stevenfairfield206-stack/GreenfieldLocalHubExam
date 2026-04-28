# Use the SDK image to build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy everything and restore
COPY . .
RUN dotnet restore

# Build and publish. 
# NOTE: If your .csproj is in a folder, change "." to that folder name
RUN dotnet publish -c Release -o /app

# Use the runtime image for the final container
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .

# IMPORTANT: Replace 'GreenfieldLocalHubExam.dll' with your actual DLL name
ENTRYPOINT ["dotnet", "GreenfieldLocalHubExam.dll"]
