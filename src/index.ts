import { Hono } from "hono";
const app = new Hono();

const PLIST_TEMPLATE = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>items</key>
    <array>
        <dict>
            <key>assets</key>
            <array>
                <dict>
                    <key>kind</key>
                    <string>software-package</string>
                    <key>url</key>
                    <string>{fetchurl}</string>
                </dict>
            </array>
            <key>metadata</key>
            <dict>
                <key>bundle-identifier</key>
                <string>{bundleid}</string>
                <key>bundle-version</key>
                <string>{version}</string>
                <key>kind</key>
                <string>software</string>
                <key>title</key>
                <string>{name}</string>
            </dict>
        </dict>
    </array>
</dict>
</plist>`;

app.get("/genPlist", (c) => {
  const { bundleid, version, name, fetchurl } = c.req.query();
  const plist = PLIST_TEMPLATE.replace("{bundleid}", bundleid)
    .replace("{version}", version)
    .replace("{name}", name)
    .replace("{fetchurl}", fetchurl);

  return c.text(plist, 200, {
    "Content-Type": "application/octet-stream",
  });
});

export default app;
