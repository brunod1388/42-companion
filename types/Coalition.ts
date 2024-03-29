export type Scores = {
  id: number
  coalition_id: number
  user_id: number
  score: number
  rank: number
  created_at: string
  updated_at: string
}

export type Coalition = {
  id: number
  name: string
  slug: string
  image_url: string
  cover_url: string
  color: string
  score: number
  user_id: number
  scores: Scores
}
