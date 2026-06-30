export type User = {
  user_id: string
  profile_picture_url: string | null
  background_image_url: string | null
  email: string
  description: string | null
  created_at: string
  nickname: string
}

export type UpdateUserInput = {
  nickname: string
  description: string
  imageUrl?: string
}
