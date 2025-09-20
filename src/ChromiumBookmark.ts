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

export type BookmarkItem = {
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
