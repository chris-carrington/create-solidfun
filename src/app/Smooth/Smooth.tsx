import './Smooth.css'
import { A } from '@solidfun/a'
import { Suspense } from 'solid-js'
import '@solidfun/shimmer.styles.css'
import { Title } from '@solidjs/meta'
import RootLayout from '../RootLayout'
import { Route } from '@solidfun/route'
import type { elementEnums } from '@src/lib/vars'
import { svg_npm, svg_github } from '@src/lib/svgs'
import type { InferGETParse } from '@solidfun/types'
import type { InferEnums } from '@solidfun/paramEnums'
import { beAsync, beGET, beParse } from '@solidfun/beAsync'


const _air = beAsync(() => beGET('/api/character/:element', {params: {element: 'air'}}), 'air')
const _fire = beAsync(() => beGET('/api/character/:element', { params: {element: 'fire'} }), 'fire')
const _earth = beAsync(() => beGET('/api/character/:element', {params: {element: 'earth'}}), 'earth')
const _water = beAsync(() => beGET('/api/character/:element', {params: {element: 'water'}}), 'water')


export default new Route({
  path: '/smooth',
  layouts: [RootLayout],
  component() {
    const air = beParse(() => _air())
    const fire = beParse(() => _fire())
    const earth = beParse(() => _earth())
    const water = beParse(() => _water())

    return <>
      <Title>😎 Smooth</Title>

      <main class="smooth">
        <div class="welcome-emoji">🌟</div>
        <Notice />
        <Characters res={{ air, fire, earth, water }} />
        <div class="hr"></div>
        <Links />
      </main>
    </>
  }
})


function Notice() {
  return <>
    <div class="title">Smooth 😎</div>

    <ol>
      <li>Did ya notice on page load... 🧐</li>
      <li>That static content is available immediately! 💨</li>
      <li>& each response is streamed when ready?! 🪄</li>
    </ol>
  </>
}


function Characters({ res }: { res: Record<InferEnums<typeof elementEnums>, InferGETParse<'/api/character/:element'>> }) {
  return <>
    <div class="characters">
      <Character element={res.fire} />
      <Character element={res.water} />
      <Character element={res.earth} />
      <Character element={res.air} />
    </div>
  </>
}


function Character({ element }: { element: InferGETParse<'/api/character/:element'> }) {
  return <>
    <div class="character">
      <Suspense fallback={<div class="shimmer"></div>}>
        { element()?.error?.message || element()?.data?.character }
      </Suspense>
    </div>
  </>
}


function Links() {
  return <>
    <div class="links">
      <a href="https://github.com/chris-carrington/solidfun" target="_blank" class="brand">
        {svg_github()}
        <span>GitHub</span>
      </a>

      <a href="https://www.npmjs.com/package/solidfun" target="_blank" class="brand">
        {svg_npm()}
        <span>NPM</span>
      </a>

      <A path="/" activeClass="active" end={true} class="brand">
        <span>🏡</span>
        <span>Home</span>
      </A>

      <A path="/fortunes" activeClass="active" class="brand">
        <span>🧚‍♀️</span>
        <span>Fortunes</span>
      </A>

      <A path="/smooth" activeClass="active" class="brand">
        <span>😎</span>
        <span>Smooth</span>
      </A>
    </div>
  </>
}
