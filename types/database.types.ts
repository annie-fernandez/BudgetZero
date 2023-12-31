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
          budget: number | null
          created_at: string
          id: number
          name: string
          user_id: string
        }
        Insert: {
          budget?: number | null
          created_at?: string
          id?: number
          name: string
          user_id: string
        }
        Update: {
          budget?: number | null
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
          tax: number | null
        }
        Insert: {
          created_at?: string
          email: string
          gross_income: number
          id: string
          image_url?: string | null
          name: string
          register_complete?: boolean
          tax?: number | null
        }
        Update: {
          created_at?: string
          email?: string
          gross_income?: number
          id?: string
          image_url?: string | null
          name?: string
          register_complete?: boolean
          tax?: number | null
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
      get_categories_with_transactions: {
        Args: Record<PropertyKey, never>
        Returns: Json[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
