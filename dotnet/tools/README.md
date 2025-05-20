# Contributing DotNet Tools

## Overview
You can contribute open source tools in this directory. These tools will then be made available to the community as nuget
packages.

> [!NOTE]
> Since these tools will be available as nuget packages to the community, there are additional restrictions to be aware
> of in contrast to creating your own MCP server which houses your tools.

## Restrictions
- In the `/tools` directory, create a folder that represents you as an individual or an organization. For example `/tools/darena-solutions`.
- Create a new solution with a project in that directory. There should only be one solution and only one project in that
directory.
- The project name must begin with `MeldRx.Community.McpTools.`. For example: `MeldRx.Community.McpTools.DarenaSolutions`.
- The assembly name of the project must match the project name. In other words, there shouldn't be a custom `<AssemblyName>`
attribute in the `.csproj` file.
- In your solution, add an existing project, and add the existing core project located in `../core/MeldRx.Community.Mcp.Core/MeldRx.Community.Mcp.Core.csproj`.
You will need to then reference this project with your tools project.
- All MCP tools in the project must implement the `IMcpTool` interface located in `MeldRx.Community.Mcp.Core`.

### Registering MCP Tools
The community should have an easy way to register your MCP tools for use with dependency injection. We have placed additional
rules around this idea.

- Your project must have a top level extensions class called `ServiceCollectionExtensions.cs`. In it, you should have one
or more extension methods that register your MCP tools.
- Each extension method must begin with `Add` and end with `McpTool` or `McpTools`. For example `AddPatientAgeMcpTool` or
`AddDarenaSolutionsMcpTools`.
- Tools should not be registered as a singleton.
- These extension methods may register additional services as needed. It's a great idea to make these additional services
configurable by the developer.

```csharp
public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddPatientAgeMcpTool(this IServiceCollection services)
    {
        return services
            .AddSingleton<IPatientSearchService, PatientSearchService>()
            .AddScoped<IMcpTool, PatientAgeTool>();
    }
}
```

This method above registers a scoped MCP tool and registers an `IPatientSearchService` service. A developer using this tool
can create their own implementation of `IPatientSearchService` if required and override the default implementation.

### README
Ensure you have a README located in `/tools/{your directory}/README.md`. The README should describe your tools and what
the purpose of the tools are. It is also a great idea to highlight any configurability available in your MCP tool and what
steps a developer can take to make those configurations.

## Pull Requests
Once you are ready with your project, you can create a PR to the main branch. Several github workflows will begin ensuring
that your submission follows the restrictions. A DarenaSolutions maintainer will review your PR. Once any comments or changes
have been resolved and the PR has been approved, you may merge your changes.

The merge will trigger an action that will make your package available in the nuget repository with a name that matches
your project name.

## Example Project
An example project has been added for reference: [Example Project](darena-solutions)