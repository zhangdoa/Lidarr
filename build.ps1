dotnet msbuild -restore src/Lidarr.sln -p:Configuration=Release -p:Platform=Posix -t:PublishAllRids

# Specify the folder and zip file names
$destFolder = "lidarr.develop.zhangdoa.linux-core-arm64"
$zipFile = "$destFolder.zip"

# Remove existing folder and zip file if they exist
if (Test-Path $destFolder) {
    Remove-Item -Path $destFolder -Recurse -Force
}

if (Test-Path $zipFile) {
    Remove-Item -Path $zipFile -Force
}

# Create destination folder
New-Item -ItemType Directory -Path $destFolder -Force

# Copy content to destination folder using robocopy
robocopy "_output\net6.0\linux-arm64\publish" $destFolder /E

# Copy Lidarr.Update content using robocopy
robocopy "_output\Lidarr.Update\net6.0\linux-arm64\publish" "$destFolder\Lidarr.Update" /E

# Copy UI content to UI subfolder using robocopy
robocopy "_output\UI" "$destFolder\UI" /E

# Compress the destination folder to .zip
Compress-Archive -Path $destFolder -DestinationPath $zipFile -Force
