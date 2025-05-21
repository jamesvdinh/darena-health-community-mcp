# Contributing DotNet Tools

## Overview
You can contribute open source tools in this directory. These tools will then be made available to the community as nuget
packages.

> [!NOTE]
> Since these tools will be available as nuget packages to the community, there are additional restrictions to be aware
> of in contrast to creating your own MCP server which houses your tools.

We provide a core project that can provide some utilities and helpers that can help get build tools.

## Restrictions
- In the project, create a directory that represents you as an individual or an organization. For example `DarenaSolutions`.
  - Follow c# conventions and ensure this directory is pascal-cased.
- Add your tools and any additional code that your tool requires to run.
- All MCP tools in the directory must implement the `IMcpTool` interface located in `MeldRx.Community.Mcp.Core`.

### Registering MCP Tools
After you have created your tools, you will need to update the top level `ServiceCollectionExtensions.cs` file so that the
tool can be registered.

In the file, create a new private extension method. This method must begin with `Add` and end with `McpTool` or `McpTools`.
This method should register all your tools and dependent services. Finally, update the public extension method `AddMcpTools`
so that it calls your private extension.

Your tools should not be registered as a singleton.

Here is an example:

```csharp
public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddMcpTools(this IServiceCollection services)
    {
        return services.AddPatientAgeMcpTool();
    }
    
    private static IServiceCollection AddPatientAgeMcpTool(this IServiceCollection services)
    {
        return services
            .AddSingleton<IPatientSearchService, PatientSearchService>()
            .AddScoped<IMcpTool, PatientAgeTool>();
    }
}
```

This method above registers a scoped MCP tool and registers an `IPatientSearchService` service.

### Formatting
This repository uses [csharpier](https://csharpier.com/) for formatting. Set this up in your IDE and ensure your code is
formatted before creating a PR.

### Package Dependencies
You are limited to a set of external library dependencies (nuget packages). If your tool requires a nuget package that is
not listed here, send us a request and we will review it.

- `Hl7.Fhir.R4` - 5.11.7
- `ModelContextProtocol.AspNetCore` - 0.1.0-preview.13
- `System.IdentityModel.Tokens.Jwt` - 8.10.0

## Pull Requests
Once you are ready with your project, you can create a PR to the main branch. Several github workflows will begin ensuring
that your submission follows the restrictions. A DarenaSolutions maintainer will review your PR. Once any comments or changes
have been resolved and the PR has been approved, you may merge your changes.
