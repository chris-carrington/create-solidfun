import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from '@solidjs/start/config'


const dir = path.dirname(fileURLToPath(import.meta.url))


export default defineConfig({
  vite: { // vite config goes here
    resolve: {
      alias: {
        '@src': path.resolve(dir, 'src'),
        'fun.config': path.resolve(dir, './fun.config.js'),
        '@solidfun': path.resolve(dir, '.solidfun/fundamentals'),
      }
    }
  }
})