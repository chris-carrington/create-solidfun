import './Fortune.css'
import { Title } from '@solidjs/meta'
import '@solidfun/loadSpin.styles.css'
import { Route } from '@solidfun/route'
import { fortunes } from '@src/lib/vars'
import RootLayout from '../../RootLayout'
import WelcomeLayout from '../WelcomeLayout'
import { randomBetween } from '@solidfun/randomBetween'
import { createSignal, Show, type Accessor } from 'solid-js'


export default new Route({
  path: '/fortune',
  layouts: [RootLayout, WelcomeLayout],
  component({ fe }) {
    const [fortune, setFortune] = createSignal('')

    async function onClick() {
      const params = { id: randomBetween(0, fortunes.length - 1) } 
      const res = await fe.GET('/api/fortune/:id', {params, bitKey: 'fortune'})

      if (res.data) setFortune(res.data.fortune)
      else if (res.error) alert(res.error.message)
    }

    return <>
      <Title>🧚‍♀️ Fortune</Title>

      <main class="fortune">
        <div class="title">Fortune 🧚‍♀️</div>

        <button class="brand gold" onClick={onClick}>
          <Show when={fe.bits.isOn('fortune')} fallback={<ButtonText fortune={fortune} />}>
            <span class="load-spin--two"></span>
          </Show>
        </button>
      </main>
    </>
  }
})


function ButtonText({ fortune }: { fortune: Accessor<string> }) {
  return <>
    <Show when={fortune()} fallback="Click for Fortune!">
      {fortune()}
    </Show>
  </>
}
