import { wait } from './utils'

export interface IArticle {
  id: string
  title: string
  cover: string
  summary: string
  content: string
}

export async function getArticles(): Promise<Omit<IArticle, 'content'>[]> {
  // simulate network latency
  await wait(1000)
  return [
    {
      id: '1',
      title: 'Article 1',
      cover: 'https://picsum.photos/id/1/640/280',
      summary:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quas. Quasi, iure!'
    },
    {
      id: '2',
      title: 'Article 2',
      cover: 'https://picsum.photos/id/2/640/280',
      summary:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quas. Quasi, iure!'
    },
    {
      id: '3',
      title: 'Article 3',
      cover: 'https://picsum.photos/id/3/640/280',
      summary:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quas. Quasi, iure!'
    }
  ]
}

export async function getArticle(articleId: string): Promise<IArticle> {
  // simulate network latency
  await wait(1000)
  return {
    id: articleId,
    title: `Article ${articleId}`,
    cover: `https://picsum.photos/id/${articleId}/640/280`,
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quas. Quasi, iure!',
    content:
      '# Test content Lorem ipsum dolor sit amet consectetur adipisicing elit.\n Aperiam, quas. Quasi, iure!'
  }
}
