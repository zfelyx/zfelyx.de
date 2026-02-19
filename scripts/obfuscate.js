import fs from 'fs'
import path from 'path'
import fsExtra from 'fs-extra'
const { copySync, removeSync } = fsExtra

import JavaScriptObfuscator from 'javascript-obfuscator'

const cwd = process.cwd()
const distDir = path.resolve(cwd, 'dist')
const backupDir = path.resolve(cwd, 'dist_unobfuscated')

function obfuscateFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf8')
  const obfuscated = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    numbersToExpressions: true,
    simplify: true,
    stringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
  }).getObfuscatedCode()

  fs.writeFileSync(filePath, obfuscated, 'utf8')
  console.log('Obfuscated:', path.relative(cwd, filePath))
}

function walk(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, item.name)
    if (item.isDirectory()) walk(abs)
    else if (item.isFile() && abs.endsWith('.js')) {
      obfuscateFile(abs)
    }
  }
}

if (!fs.existsSync(distDir)) {
  console.error('dist directory not found. Run build first.')
  process.exit(1)
}

try {
  if (fs.existsSync(backupDir)) {
    removeSync(backupDir)
  }
  copySync(distDir, backupDir)
  console.log('Backup of dist created at', path.relative(cwd, backupDir))
} catch (err) {
  console.error('Failed to create backup:', err)
  process.exit(1)
}

walk(distDir)
console.log('Obfuscation complete')
