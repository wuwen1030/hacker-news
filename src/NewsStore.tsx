const baseURL = 'https://hacker-news.firebaseio.com'
const version = 'v0'

let storyIds: {[key: string]: number[]} = {}
let allItems: {[key: string]: NewsEntity} = {}

export interface NewsEntity {
  id: number,
  deleted?: boolean,
  type?: string,
  by?: string,
  time?: number,
  text?: string,
  dead?: boolean,
  parent: number,
  poll?: number,
  kids?: number[],
  url?: string,
  score?: number,
  title?: string,
  parts?: number[],
  descendants?: number,
} 

export async function fetchStoryIds(category: string) {
  if (storyIds[category]) {
    return storyIds[category]
  } else {
    const url = `${baseURL}/${version}/${category}stories.json`
    const res = await fetch(url)
    const ids = await res.json()
    storyIds[category] = ids
    return storyIds[category]
  }
}

export async function fetchItems(ids: number[]) {
  return Promise.all(
    ids.map(async id => {
      if (allItems[id]) {
        return allItems[id]
      } else {
        const url = `${baseURL}/${version}/item/${id}.json`
        const res = await fetch(url)
        const item = await res.json()
        allItems[id] = item
        return allItems[id]
      }
    })
  )
}

