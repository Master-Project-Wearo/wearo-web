export type Outfit = {
  outfit_id: string
  name: string
  theme: string | null
  calculated_price: string | null
  is_favorite: boolean | null
  created_at: string
  user_id: string
}

export type UpdateOutfitInput = {
  name?: string
  theme?: string
  calculated_price?: number
  is_favorite?: boolean
}
