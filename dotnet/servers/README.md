# Contributing MCP Servers

## Overview
You can contribute open source MCP servers in this directory. These servers will then be available for developers to use
and be available as a pluggable MCP server in the MeldRx ecosystem.

## Restrictions
- In the `/servers` directory, create a folder that represents you as an individual or an organization. For example `/servers/darena-solutions`.
- Create a new solution with a project in that directory. There should only be one solution which contains multiple projects,
each project representing a different MCP server you build.
- Each project name must begin with `MeldRx.Community.McpServers.{Your Identifier}.`. For example: `MeldRx.Community.McpTools.DarenaSolutions.`.

### Core Project
You are free to create the MCP server as you see fit. We also provide a core project that can provide some utilities and
helpers that can help get you started.

To add the core project, in your solution, add an existing project, and add the existing core project located in `../core/MeldRx.Community.Mcp.Core/MeldRx.Community.Mcp.Core.csproj`.
You can then reference this project with any of your server projects.

### MCP Server Verification
On your PR, we will perform a small verification to ensure the MCP server returns tool information. We will establish a
connection to the MCP server and make a [tools/list](https://modelcontextprotocol.io/specification/2025-03-26/server/tools#listing-tools)
call. Your MCP server should return at least one tool.

The MCP server should not require authentication for us to perform this verification. If authentication is required, one
option is to allow an open request when in the `Development` environment, but require authentication in other environments.
Our process will set the `ASPNETCORE_ENVIRONMENT` environment variable to `Development` when performing this verification.

### README
Ensure you have a README located in `/servers/{your directory}/{your server project}/README.md` for each MCP server. The
README should describe the MCP server and its purpose. It is also a great idea to highlight how to run the MCP server locally
and any configurability provided.

## Pull Requests
Once you are ready with your project, you can create a PR to the main branch. Several github workflows will begin ensuring
that your submission follows the restrictions. A DarenaSolutions maintainer will review your PR. Once any comments or changes
have been resolved and the PR has been approved, you may merge your changes.

The merge will trigger an action that will make your package available in the nuget repository with a name that matches
your project name.

## Example Project
An example project has been added for reference: [Example Project](darena-solutions)
