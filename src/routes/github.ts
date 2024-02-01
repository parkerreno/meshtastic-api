import { app } from "../index.js";
import { GitHub } from "../lib/index.js";

export const GithubRoutes = () => {
  return app.get("/github/releases", async (_, res) => {
    const releases = await GitHub.deviceOctokit.rest.repos.listReleases(
      GitHub.DeviceRequestOptions,
    );

    res.send(
      releases.data.map((release) => {
        return <GitHub.DeviceFirmwareResource>{
          id: release.tag_name,
          title: release.name,
          pageUrl: release.html_url,
          zipUrl: release.assets.find((asset) =>
            asset.name.startsWith("firmware-"),
          )?.browser_download_url,
        };
      }),
    );
  });
};
