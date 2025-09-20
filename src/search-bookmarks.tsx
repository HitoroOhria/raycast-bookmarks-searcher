import { ActionPanel, Action, Icon, List, showToast, Toast } from "@raycast/api";
import { useEffect, useState } from "react";

import { getChromiumBookmarks } from "./getChromiumBookmarks";
import { getDefaultFaviconUrl } from "./getDefaultFaviconUrl";
import { Bookmark, getBookmarksAsFlatten } from "./Bookmark";

export default function Command() {
  const [bookmarks, setBookmarks] = useState<Bookmark[] | null>(null);

  useEffect(() => {
    getChromiumBookmarks()
      .then((chromiumBookmarks) => {
        const bookmarks = getBookmarksAsFlatten(chromiumBookmarks!);
        setBookmarks(bookmarks);
      })
      .catch((err: Error) => {
        console.error("getChromiumBookmarks():", err);
        showToast({
          style: Toast.Style.Failure,
          title: "Something went wrong",
          message: err.message,
        });
      });
  }, []);

  return (
    <List isLoading={bookmarks === null} searchBarPlaceholder="Search bookmarks...">
      {bookmarks?.map((bookmark) => (
        <List.Item
          key={bookmark.id}
          icon={getDefaultFaviconUrl(bookmark.url)}
          title={bookmark.name}
          // subtitle={bookmark.url}
          accessories={[
            {
              icon: Icon.Folder,
              text: bookmark.parentFolders.join(" > "),
            },
          ]}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url={bookmark.url} />
              <Action.CopyToClipboard content={bookmark.url} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
