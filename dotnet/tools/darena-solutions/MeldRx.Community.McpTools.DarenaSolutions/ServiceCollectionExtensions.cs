using MeldRx.Community.Mcp.Core;
using Microsoft.Extensions.DependencyInjection;

namespace MeldRx.Community.McpTools.DarenaSolutions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddPatientAgeMcpTool(this IServiceCollection services)
    {
        return services
            .AddSingleton<IPatientSearchService, PatientSearchService>()
            .AddScoped<IMcpTool, PatientAgeTool>();
    }
}
