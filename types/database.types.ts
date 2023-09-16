export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          id: number
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      transactions: {
        Row: {
          amount: number
          category_id: number | null
          created_at: string
          description: string | null
          due_date: number | null
          id: number
          name: string
          user_id: string
        }
        Insert: {
          amount: number
          category_id?: number | null
          created_at?: string
          description?: string | null
          due_date?: number | null
          id?: number
          name: string
          user_id: string
        }
        Update: {
          amount?: number
          category_id?: number | null
          created_at?: string
          description?: string | null
          due_date?: number | null
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          gross_income: number
          id: string
          image_url: string | null
          name: string
          register_complete: boolean
        }
        Insert: {
          created_at?: string
          email: string
          gross_income: number
          id: string
          image_url?: string | null
          name: string
          register_complete?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          gross_income?: number
          id?: string
          image_url?: string | null
          name?: string
          register_complete?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
