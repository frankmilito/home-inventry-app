import { v4 as uuidv4 } from "uuid"

type StoredItem = Record<string, unknown> & { id: string }

const items: StoredItem[] = []

export const addItem = (item: Record<string, unknown>) => {
  const id = uuidv4()
  items.push({ ...item, id })
  return id
}
