using System.Collections.Generic;
using NLog;
using NzbDrone.Common.Extensions;
using NzbDrone.Common.Http;
using NzbDrone.Common.Serializer;
using NzbDrone.Core.Notifications.Xbmc.Model;

namespace NzbDrone.Core.Notifications.Xbmc
{
    public interface IXbmcJsonApiProxy
    {
        string GetJsonVersion(XbmcSettings settings);
        void Notify(XbmcSettings settings, string title, string message);
        string UpdateLibrary(XbmcSettings settings, string path);
        void CleanLibrary(XbmcSettings settings);
        List<ActivePlayer> GetActivePlayers(XbmcSettings settings);
        List<KodiArtist> GetArtist(XbmcSettings settings);
        List<KodiSource> GetSources(XbmcSettings settings);
    }

    public class XbmcJsonApiProxy : IXbmcJsonApiProxy
    {
        private readonly IHttpClient _httpClient;
        private readonly Logger _logger;

        public XbmcJsonApiProxy(IHttpClient httpClient, Logger logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public string GetJsonVersion(XbmcSettings settings)
        {
            return ProcessRequest(settings, "JSONRPC.Version");
        }

        public void Notify(XbmcSettings settings, string title, string message)
        {
            ProcessRequest(settings, "GUI.ShowNotification", title, message, "https://raw.github.com/Lidarr/Lidarr/develop/Logo/64.png", settings.DisplayTime * 1000);
        }

        public string UpdateLibrary(XbmcSettings settings, string path)
        {
            string response;

            if (path == null)
            {
                response = ProcessRequest(settings, "AudioLibrary.Scan");
            }
            else
            {
                response = ProcessRequest(settings, "AudioLibrary.Scan", path);
            }

            return Json.Deserialize<XbmcJsonResult<string>>(response).Result;
        }

        public void CleanLibrary(XbmcSettings settings)
        {
            ProcessRequest(settings, "AudioLibrary.Clean");
        }

        public List<ActivePlayer> GetActivePlayers(XbmcSettings settings)
        {
            var response = ProcessRequest(settings, "Player.GetActivePlayers");

            return Json.Deserialize<ActivePlayersResult>(response).Result;
        }

        public List<KodiArtist> GetArtist(XbmcSettings settings)
        {
            var response = ProcessRequest(settings, "AudioLibrary.GetArtists", true, new List<string> { "sourceid", "musicbrainzartistid" });

            return Json.Deserialize<ArtistResponse>(response).Result.Artists;
        }

        public List<KodiSource> GetSources(XbmcSettings settings)
        {
            var response = ProcessRequest(settings, "AudioLibrary.GetSources", new List<string> { "file" });

            return Json.Deserialize<SourceResponse>(response).Result.Sources;
        }

        private string ProcessRequest(XbmcSettings settings, string method, params object[] parameters)
        {
            var url = HttpRequestBuilder.BuildBaseUrl(settings.UseSsl, settings.Host, settings.Port, "jsonrpc");
            var requestBuilder = new JsonRpcRequestBuilder(url, method, parameters);

            requestBuilder.LogResponseContent = true;

            var request = requestBuilder.Build();

            if (!settings.Username.IsNullOrWhiteSpace())
            {
                request.Credentials = new BasicNetworkCredential(settings.Username, settings.Password);
            }

            var response = _httpClient.Execute(request);
            _logger.Trace("Response: {0}", response.Content);

            CheckForError(response);

            return response.Content;
        }

        private void CheckForError(HttpResponse response)
        {
            if (string.IsNullOrWhiteSpace(response.Content))
            {
                throw new XbmcJsonException("Invalid response from XBMC, the response is not valid JSON");
            }

            _logger.Trace("Looking for error in response, {0}", response.Content);

            if (response.Content.StartsWith("{\"error\""))
            {
                var error = Json.Deserialize<ErrorResult>(response.Content);
                var code = error.Error["code"];
                var message = error.Error["message"];

                var errorMessage = string.Format("XBMC Json Error. Code = {0}, Message: {1}", code, message);
                throw new XbmcJsonException(errorMessage);
            }
        }
    }
}
