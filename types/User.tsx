export type User = {
  id: number
  projects_users: ProjectUsers[]
  displayname: string
  avatar: string
}

export type ProjectUsers = {
  created_at: string
  current_team_id: number
  cursus_ids: number[]
  final_mark: null | number
  id: number
  marked: boolean
  marked_at: null | string
  occurrence: number
  project: Project
  retriable_at: null | string
  status: string
  updated_at: string
  validated?: null | boolean
}

export type Project = {
  id: number
  name: string
  parent_id: number
  slug: string
}
