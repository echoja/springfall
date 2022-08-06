import type {
  ColorModeStore,
  AdminStore,
  Stores,
  Set,
  Get,
} from "@modules/content/types";
import type { Post } from "@modules/supabase/supabase";
import { atom } from "jotai";
import { useCallback } from "react";
import create from "zustand";
import { devtools } from "zustand/middleware";

function createColorModeStore(set: Set, _get: Get): ColorModeStore {
  return {
    colorMode: "light",
    toggleColorMode: () =>
      set((state) => ({
        colorMode: state.colorMode === "dark" ? "light" : "dark",
      })),
  };
}

const defaultPost: Post = {
  title: "",
  content: {
    data: [
      {
        type: "PARAGRAPH",
        children: [
          {
            type: "TEXT",
            text: "",
          },
        ],
      },
    ],
  },
  published: false,
  created_at: "",
  id: -1,
  summary: "",
  updated_at: "",
  removed_at: "",
  user_id: "-1",
};

function createAdminStore(set: Set, _get: Get): AdminStore {
  return {
    codeBlockEditPath: [],
    closeCodeBlockEditModal: () => set(() => ({ codeBlockEditPath: [] })),
    openCodeBlockEditModal: (path: number[]) =>
      set(() => ({ codeBlockEditPath: path })),

    isOpenCommandPalette: false,
    openCommandPalette: () => set(() => ({ isOpenCommandPalette: true })),
    closeCommandPalette: () => set(() => ({ isOpenCommandPalette: false })),

    isOpenImageInsertDialog: false,
    openImageInsertDialog: () => set(() => ({ isOpenImageInsertDialog: true })),
    closeImageInsertDialog: () =>
      set(() => ({ isOpenImageInsertDialog: false })),

    editingPostInitialized: false,
    setEditingPostInitialized: (initialized: boolean) =>
      set(() => ({ editingPostInitialized: initialized })),
  };
}

export const useMyStore = create<Stores>()(
  devtools((set, get) => ({
    ...createColorModeStore(set, get),
    ...createAdminStore(set, get),
  }))
);

export const useMyStoreMemo = <T>(
  selector: (stores: Stores) => T,
  dependencies: ReadonlyArray<unknown>
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMyStore(useCallback(selector, dependencies));
};

export const editingPostAtom = atom<Post>(defaultPost);
export const editingPostContentDataAtom = atom(
  (get) => get(editingPostAtom).content.data
);
