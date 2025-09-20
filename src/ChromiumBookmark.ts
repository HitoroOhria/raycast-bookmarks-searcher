export type ChromiumBookmarks = {
  checksum: string;
  roots: {
    bookmark_bar: BookmarkRoot;
    other?: BookmarkRoot;
    synced?: BookmarkRoot;
  };
  version?: number;
};

type BookmarkRoot = {
  children: BookmarkItem[];
  date_added: string;
  date_last_used: string;
  date_modified: string;
  guid: string;
  id: string;
  name: string;
  type: "folder";
};

type BookmarkItem = {
  children?: BookmarkItem[];
  date_added: string;
  date_last_used: string;
  date_modified?: string;
  guid: string;
  id: string;
  meta_info?: MetaInfo;
  name: string;
  type: "url" | "folder";
  url?: string;
};

type MetaInfo = {
  power_bookmark_meta?: string;
};

export function parseAsChromiumBookmarks(bookmark: string): ChromiumBookmarks {
  return JSON.parse(bookmark);
}

export type Bookmark = {
  id: string;
  parentFolders: string[];
  name: string;
  url: string;
};

export function getBookmarksAsFlatten(bookmark: ChromiumBookmarks): Bookmark[] {
  return getBookmarksFromItems(bookmark.roots.bookmark_bar.children, []);
}

function getBookmarksFromItems(items: readonly BookmarkItem[], parentFolders: readonly string[]): Bookmark[] {
  return items.flatMap((item) => {
    let bookmark: Bookmark | null = null;
    if (item.type === "url") {
      if (item.url === undefined) {
        throw new Error(`item.url is undefined. id = ${item.id}, name = ${item.name}`);
      }

      bookmark = {
        id: item.id,
        parentFolders: [...parentFolders],
        name: item.name,
        url: item.url,
      };
    }

    let children: Bookmark[] = [];
    if (item.type == "folder") {
      if (item.children === undefined) {
        throw new Error(`item.children is undefined. id = ${item.id}, name = ${item.name}`);
      }

      children = getBookmarksFromItems(item.children, [...parentFolders, item.name]);
    }

    return bookmark ? [bookmark, ...children] : children;
  });
}
