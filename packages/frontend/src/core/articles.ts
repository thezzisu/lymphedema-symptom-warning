export interface IArticle {
  id: string
  title: string
  html: string
}

export async function getArticles(): Promise<Omit<IArticle, 'content'>[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return import('@content').then((m) => m.default as any)
}

export async function getArticle(articleId: string): Promise<IArticle> {
  return import('@content').then((m) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (m.default as any).find((x: any) => x.id === articleId)
  )
}
