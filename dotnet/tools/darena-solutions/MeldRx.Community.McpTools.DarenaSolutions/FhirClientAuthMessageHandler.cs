using System.Net.Http.Headers;

namespace MeldRx.Community.McpTools.DarenaSolutions;

public class FhirClientAuthMessageHandler(string accessToken) : HttpClientHandler
{
    protected override Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request,
        CancellationToken cancellationToken
    )
    {
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        return base.SendAsync(request, cancellationToken);
    }
}
