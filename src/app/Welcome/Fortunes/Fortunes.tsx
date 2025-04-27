import './Fortunes.css'
import { Title } from '@solidjs/meta'
import '@solidfun/loadSpin.styles.css'
import { Route } from '@solidfun/route'
import RootLayout from '../../RootLayout'
import WelcomeLayout from '../WelcomeLayout'
import { createSignal, For, Show } from 'solid-js'
import { fortunes as allFortunes } from '@src/lib/vars'
import { randomBetween } from '@solidfun/randomBetween'
import { AnimatedFor, ForAnimator } from '@solidfun/animatedFor'


export default new Route({
  path: '/fortunes',
  layouts: [RootLayout, WelcomeLayout],
  component({ fe }) {
    const forAnimator = new ForAnimator()
    const [fortunes, setFortunes] = createSignal<string[]>([])

    async function onClick() {
      forAnimator.preFetch()

      // call BE api
      const params = { id: randomBetween(0, allFortunes.length - 1) } 
      const res = await fe.GET('/api/fortune/:id', {params, bitKey: 'fortune'})

      if (res.error) alert(res.error.message)
      else if (res.data) {
        setFortunes([ res.data.fortune, ...fortunes() ]) // bind dom
        forAnimator.postSet()
      }
    }

    return <>
      <Title>🧚‍♀️ Fortune</Title>

      <main class="fortunes">
        <div class="title">Fortune 🧚‍♀️</div>

        <button class="brand gold" onClick={onClick}>
          <Show when={fe.bits.isOn('fortune')} fallback="Click for Fortunes!">
            <span class="load-spin--two"></span>
          </Show>
        </button>

        <AnimatedFor forAnimator={ forAnimator } items={
          <For each={fortunes()}>
            {fortune => <div class="fortune">{fortune}</div>}
          </For>
        } />
      </main>
    </>
  }
})
