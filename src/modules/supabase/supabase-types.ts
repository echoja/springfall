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
      posts: {
        Row: {
          id: number;
          removed_at: string | null;
          user_id: string;
          created_at: string;
          updated_at: string;
          published: boolean;
          summary: string;
          title: string;
          content: Json;
        };
        Insert: {
          id?: number;
          removed_at?: string | null;
          user_id: string;
          created_at?: string;
          updated_at?: string;
          published?: boolean;
          summary?: string;
          title?: string;
          content?: Json;
        };
        Update: {
          id?: number;
          removed_at?: string | null;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
          published?: boolean;
          summary?: string;
          title?: string;
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
