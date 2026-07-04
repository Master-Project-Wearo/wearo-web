export type Item = {
  item_id: string
  image_url: string | null
  web_url: string | null
  name: string
  ai_description: string | null
  ai_attributes: Record<string, unknown> | null
  price: string | null
  brand: string | null
  colors: string[]
  is_favorite: boolean | null
  added_at: string
  user_id: string
  type_id: string | null
}

export type UpdateItemInput = {
  image_url?: string
  web_url?: string
  name?: string
  ai_description?: string
  ai_attributes?: Record<string, unknown>
  price?: number
  brand?: string
  colors?: string[]
  is_favorite?: boolean
  type_id?: string
}
