dotnet ef migrations add $1 --verbose --context=CBetApiDbContext --startup-project ../../CBetApi && dotnet ef database update --startup-project ../../CBetApi

