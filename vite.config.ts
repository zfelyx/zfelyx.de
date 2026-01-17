import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import JavaScriptObfuscator from 'javascript-obfuscator'

// Custom plugin to obfuscate code in development (optimized for speed)
function obfuscatePlugin(): Plugin {
  const cache: Record<string, string> = {}

  return {
    name: 'obfuscate-dev',
    apply: 'serve', // Only apply in dev mode
    transform(code: string, id: string) {
      // Skip node_modules and config files
      if (id.indexOf('node_modules') !== -1 || id.indexOf('vite.config') !== -1) {
        return null
      }

      // Only process source files from src directory
      if (id.indexOf('/src/') === -1) {
        return null
      }

      // Check if it's a JS/TS file
      const isTargetFile = id.indexOf('.tsx') !== -1 ||
          id.indexOf('.ts') !== -1 ||
          id.indexOf('.jsx') !== -1 ||
          id.indexOf('.js') !== -1

      if (!isTargetFile) {
        return null
      }

      // Check cache
      const cacheKey = id + '|' + code.length
      if (cache[cacheKey]) {
        return cache[cacheKey]
      }

      try {
        const obfuscated = JavaScriptObfuscator.obfuscate(code, {
          compact: false,
          controlFlowFlattening: false,
          numbersToExpressions: false,
          simplify: true,
          stringArray: true,
          stringArrayEncoding: [],
          stringArrayThreshold: 0.5,
          transformObjectKeys: false,
          identifierNamesGenerator: 'mangled-shuffled',
          renameGlobals: false,
          seed: 0,
          sourceMap: false,
        }).getObfuscatedCode()

        cache[cacheKey] = obfuscated
        return obfuscated
      } catch (err) {
        console.error('Obfuscation error:', err)
        return code // Return original on error
      }
    }
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    obfuscatePlugin(),
  ],
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
  },
}))