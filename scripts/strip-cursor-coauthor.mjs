import { createInterface } from 'node:readline'

const lines = []

for await (const line of createInterface({ input: process.stdin })) {
  if (line.includes('Co-authored-by: Cursor') || line.includes('cursoragent@cursor.com')) {
    continue
  }
  lines.push(line)
}

process.stdout.write(lines.join('\n'))
