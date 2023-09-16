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
      transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          due_date: string
          id: number
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          due_date: string
          id?: number
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          due_date?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      user_profile: {
        Row: {
          created_at: string
          email: string
          gross_salary: number
          id: string
          image_url: string | null
          is_register_complete: boolean
        }
        Insert: {
          created_at?: string
          email: string
          gross_salary: number
          id?: string
          image_url?: string | null
          is_register_complete?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          gross_salary?: number
          id?: string
          image_url?: string | null
          is_register_complete?: boolean
        }
        Relationships: []
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
