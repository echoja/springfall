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
          user_id: string;
          created_at: string;
          updated_at: string;
          removed_at: string;
          published: boolean;
          summary: string;
          title: string;
          content: Json;
          id: number;
        };
        Insert: {
          user_id: string;
          created_at?: string;
          updated_at?: string;
          removed_at?: string;
          published?: boolean;
          summary?: string;
          title?: string;
          content?: Json;
          id?: number;
        };
        Update: {
          user_id?: string;
          created_at?: string;
          updated_at?: string;
          removed_at?: string;
          published?: boolean;
          summary?: string;
          title?: string;
          content?: Json;
          id?: number;
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
