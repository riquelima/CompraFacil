export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            inventory_items: {
                Row: {
                    category: string | null
                    created_at: string
                    expiry_date: string | null
                    id: string
                    is_low_stock: boolean | null
                    name: string
                    quantity: number | null
                    unit: string | null
                    user_id: string
                }
                Insert: {
                    category?: string | null
                    created_at?: string
                    expiry_date?: string | null
                    id?: string
                    is_low_stock?: boolean | null
                    name: string
                    quantity?: number | null
                    unit?: string | null
                    user_id: string
                }
                Update: {
                    category?: string | null
                    created_at?: string
                    expiry_date?: string | null
                    id?: string
                    is_low_stock?: boolean | null
                    name?: string
                    quantity?: number | null
                    unit?: string | null
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "inventory_items_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            list_items: {
                Row: {
                    category: string | null
                    created_at: string
                    id: string
                    is_checked: boolean | null
                    list_id: string
                    name: string
                    price: number | null
                    quantity: number | null
                    user_id: string
                }
                Insert: {
                    category?: string | null
                    created_at?: string
                    id?: string
                    is_checked?: boolean | null
                    list_id: string
                    name: string
                    price?: number | null
                    quantity?: number | null
                    user_id: string
                }
                Update: {
                    category?: string | null
                    created_at?: string
                    id?: string
                    is_checked?: boolean | null
                    list_id?: string
                    name?: string
                    price?: number | null
                    quantity?: number | null
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "list_items_list_id_fkey"
                        columns: ["list_id"]
                        referencedRelation: "shopping_lists"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "list_items_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    email: string | null
                    full_name: string | null
                    id: string
                    updated_at: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    email?: string | null
                    full_name?: string | null
                    id: string
                    updated_at?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    email?: string | null
                    full_name?: string | null
                    id?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            shopping_lists: {
                Row: {
                    color: string | null
                    created_at: string
                    icon: string | null
                    id: string
                    item_count: number | null
                    status: string | null
                    title: string
                    total_amount: number | null
                    updated_at: string
                    user_id: string
                }
                Insert: {
                    color?: string | null
                    created_at?: string
                    icon?: string | null
                    id?: string
                    item_count?: number | null
                    status?: string | null
                    title: string
                    total_amount?: number | null
                    updated_at?: string
                    user_id: string
                }
                Update: {
                    color?: string | null
                    created_at?: string
                    icon?: string | null
                    id?: string
                    item_count?: number | null
                    status?: string | null
                    title?: string
                    total_amount?: number | null
                    updated_at?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "shopping_lists_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
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
