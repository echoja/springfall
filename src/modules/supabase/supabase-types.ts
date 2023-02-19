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
          content: string;
          created_at: string;
          deleted_at: string | null;
          id: number;
          post_id: number | null;
          published_at: string;
          source_info: Json;
          tags: string[];
          title: string;
          updated_at: string;
        };
        Insert: {
          content?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          post_id?: number | null;
          published_at: string;
          source_info?: Json;
          tags?: string[];
          title?: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          post_id?: number | null;
          published_at?: string;
          source_info?: Json;
          tags?: string[];
          title?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          content: Json;
          created_at: string;
          id: number;
          published: boolean;
          removed_at: string | null;
          summary: string;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          content?: Json;
          created_at?: string;
          id?: number;
          published?: boolean;
          removed_at?: string | null;
          summary?: string;
          title?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          content?: Json;
          created_at?: string;
          id?: number;
          published?: boolean;
          removed_at?: string | null;
          summary?: string;
          title?: string;
          updated_at?: string;
          user_id?: string;
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
