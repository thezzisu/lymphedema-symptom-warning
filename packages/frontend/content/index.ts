import { Plugin } from 'vite'
import { basename, extname, resolve } from 'path'
import { readdirSync, readFileSync } from 'fs'
import fm from 'front-matter'
import { marked } from 'marked'

export function content(): Plugin {
  const prefix = '@content'
  const root = resolve(__dirname, 'articles')

  function generateContentModule() {
    const files = readdirSync(root).filter((x) => extname(x) === '.md')
    const records = files
      .map(
        (path) => [path, readFileSync(resolve(root, path)).toString()] as const
      )
      .map(
        ([path, content]) =>
          [path, fm<Record<string, string>>(content)] as const
      )
      .map(([path, { attributes, body }]) => ({
        ...attributes,
        id: basename(path, '.md'),
        html: marked(body)
      }))
      .reverse()
    console.log(`[content] found ${records.length} articles`)
    return `export default ${JSON.stringify(records, null, 2)}`
  }

  return {
    name: 'content',
    resolveId(id) {
      if (id.startsWith(prefix)) {
        return '\0' + id
      }
    },
    load(id) {
      if (id.startsWith('\0' + prefix)) {
        if (id === '\0' + prefix) {
          return generateContentModule()
        }
      }
    }
  }
}
