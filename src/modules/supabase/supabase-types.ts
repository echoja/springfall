/* eslint-disable @typescript-eslint/naming-convention */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      import_queue: {
        Row: {
          id: number;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
          title: string;
          content: string;
          published_at: string;
          source_info: Json;
          tags: string[];
          post_id: number | null;
        };
        Insert: {
          id?: number;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
          title?: string;
          content?: string;
          published_at: string;
          source_info?: Json;
          tags?: string[];
          post_id?: number | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
          title?: string;
          content?: string;
          published_at?: string;
          source_info?: Json;
          tags?: string[];
          post_id?: number | null;
        };
      };
      posts: {
        Row: {
          id: number;
          created_at: string;
          updated_at: string;
          removed_at: string | null;
          published: boolean;
          summary: string;
          title: string;
          user_id: string;
          content: Json;
        };
        Insert: {
          id?: number;
          created_at?: string;
          updated_at?: string;
          removed_at?: string | null;
          published?: boolean;
          summary?: string;
          title?: string;
          user_id: string;
          content?: Json;
        };
        Update: {
          id?: number;
          created_at?: string;
          updated_at?: string;
          removed_at?: string | null;
          published?: boolean;
          summary?: string;
          title?: string;
          user_id?: string;
          content?: Json;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
