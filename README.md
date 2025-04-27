# 🧚‍♀️ Create Solid Fun!
![Sloths developing software in a tree](https://i.imgur.com/LognTyf.jpeg)



# How?
```bash
npx create-solidfun@latest # bash 🧙
```



# Or?
```bash
nvm use 22
npm create solid # basic / typescript
npm install solidfun
npm install @types/node -D
```



### Update Typescript Config
- @ `./tsconfig.json`
```json
{
  "paths": {
    "@src/*": ["./src/*"],
    "fun.config": ["./fun.config.js"],
    "@solidfun/*": ["./.solidfun/fundamentals/*"]
  }
}
```



### Update Vite Config
- @ `./app.config.ts`
```ts
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
```



### 🗂️ Create the folders
1. `./src/app/`
    - Route & layout `tsx` files go here
2. `./src/api/`
    - GET & POST functions go here



![Animals developing software in the safari](https://i.imgur.com/9WBk7EM.png)



### 🥳 Create fun config
- @ `./fun.config.js`
```ts
// @ts-check 


/** @type {import('solidfun').FunConfig} */
export const config = {
  apiDir: './src/api',
  appDir: './src/app',
  cookieKey: 'fun_cookie',
  sessionDataTTL: 1000 * 60 * 60 * 24 * 3, // 3 days in ms
  envs: [
    { name: 'local', url: 'http://localhost:3000' },
  ],
  plugins: {
    solid: true,
  }
}


/** 
 * @typedef {Object} SessionData
 * @property {string} userId
 * @property {string} sessionId
 */
```



### Bind `<App />` component
```tsx
import './app.css'
import { App } from '@solidfun/app'

export default () => <App />
```



![Lion's using app's at Pride Rock](https://i.imgur.com/37aoJkk.png)



### Create primary api endpoint
- @ `./src/routes/api/[...api].ts`
- Thanks to the Solid Start `<FileRoutes />` component, all calls to `/api` will go through the fn's placed here
```tsx
import { gets, posts } from '@solidfun/apis'
import type { APIEvent } from '@solidfun/types'
import { onAPIEvent } from '@solidfun/onAPIEvent'


export async function GET(event: APIEvent) {
  'use server'
  return await onAPIEvent(event, gets)
}


export async function POST(event: APIEvent) {
  'use server'
  return await onAPIEvent(event, posts)
}
```



![Kitties developing software](https://i.imgur.com/Ao8xTG5.png)



### Update package.json
```
"scripts": {
  "dev": "fun build local && vinxi dev",
}
```



![Bunnies writing code](https://i.imgur.com/d0wINvM.jpeg)



### 🧼 Cleanup 
- Delete the `./src/routes/about.tsx` file
- Delete the `./src/routes/index.tsx` file
- Delete the `./src/components` folder
- Create a `./src/lib` folder
    - Lib is short for library
    - `./src/lib` holds common variables, functions & components



### 🙏 Create middleware
-  @ `./src/lib/middleware.ts`:
    ```tsx
    import { getMiddleware } from '@solidfun/getMiddleware'

    export default getMiddleware()
    ```
  - Add `middleware` to config @ `./app.config.ts`, example:
    ```ts
    import path from 'node:path'
    import { fileURLToPath } from 'node:url'
    import { defineConfig } from '@solidjs/start/config'


    const cwd = path.dirname(fileURLToPath(import.meta.url))


    export default defineConfig({
      middleware: './src/lib/middleware.ts',
      vite: {
        resolve: {
          alias: {
            '@src': path.resolve(cwd, 'src'),
            'fun.config': path.resolve(cwd, './fun.config.js'),
            '@solidfun': path.resolve(cwd, '.solidfun/fundamentals'),
          }
        }
      }
    })
    ```



![kitty developer](https://camo.githubusercontent.com/68c3849e22315c2dc02b02b433db1b51ae7fefe0372bf395b2a75ab4f692941f/68747470733a2f2f692e696d6775722e636f6d2f7a6378436b4a482e706e67)
