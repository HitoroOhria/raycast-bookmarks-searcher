import * as fs from "node:fs";
import * as os from "node:os";
import path from "node:path";
import { ChromiumBookmarks, parseAsChromiumBookmarks } from "./ChromiumBookmark";

const chromiumBookmarksFileLocation = path.join(
  os.homedir(),
  "Library/Application Support/BraveSoftware/Brave-Browser/Default/Bookmarks",
);

export async function getChromiumBookmarks(): Promise<ChromiumBookmarks> {
  const data = await fs.promises.readFile(chromiumBookmarksFileLocation, "utf8");

  return parseAsChromiumBookmarks(data);
}
