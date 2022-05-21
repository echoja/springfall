import { useCallback } from "react";
import create from "zustand";
import { devtools } from "zustand/middleware";

import type {
  ColorModeStore,
  AdminStore,
  Stores,
  Set,
  Get,
  SerializedPost,
} from "./types";

function createColorModeStore(set: Set, _get: Get): ColorModeStore {
  return {
    colorMode: "light",
    toggleColorMode: () =>
      set((state) => ({
        colorMode: state.colorMode === "dark" ? "light" : "dark",
      })),
  };
}

const defaultPost: SerializedPost = {
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
  authorId: -1,
  published: false,
  createdAt: "",
  id: -1,
  summary: "",
  updatedAt: "",
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

    editingPost: defaultPost,
    setEditingPost: (post: SerializedPost) =>
      set(() => ({ editingPost: post })),

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
