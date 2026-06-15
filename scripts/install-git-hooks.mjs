import { chmodSync, copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, '.githooks', 'prepare-commit-msg')
const targetDir = join(root, '.git', 'hooks')
const target = join(targetDir, 'prepare-commit-msg')

if (!existsSync(source)) {
  console.warn('Git hook source not found, skipping install.')
  process.exit(0)
}

mkdirSync(targetDir, { recursive: true })
copyFileSync(source, target)

try {
  chmodSync(target, 0o755)
} catch {
  // Windows may not support chmod; Git Bash still runs the hook.
}

console.log('Installed git hook: prepare-commit-msg')
