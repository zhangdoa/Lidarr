using System.Collections.Generic;
using NzbDrone.Core.CustomFormats;
using NzbDrone.Core.Datastore;
using NzbDrone.Core.DecisionEngine;
using NzbDrone.Core.Music;
using NzbDrone.Core.Parser.Model;
using NzbDrone.Core.Qualities;

namespace NzbDrone.Core.MediaFiles.TrackImport.Manual
{
    public class ManualImportItem : ModelBase
    {
        public ManualImportItem()
        {
            Tracks = new List<Track>();
            CustomFormats = new List<CustomFormat>();
        }

        public string Path { get; set; }
        public string Name { get; set; }
        public long Size { get; set; }
        public Artist Artist { get; set; }
        public Album Album { get; set; }
        public AlbumRelease Release { get; set; }
        public List<Track> Tracks { get; set; }
        public QualityModel Quality { get; set; }
        public string ReleaseGroup { get; set; }
        public string DownloadId { get; set; }
        public List<CustomFormat> CustomFormats { get; set; }
        public IEnumerable<Rejection> Rejections { get; set; }
        public ParsedTrackInfo Tags { get; set; }
        public bool AdditionalFile { get; set; }
        public bool ReplaceExistingFiles { get; set; }
        public bool DisableReleaseSwitching { get; set; }
        public bool IsSingleFileRelease { get; set; }
        public string CueSheetPath { get; set; }
    }
}
