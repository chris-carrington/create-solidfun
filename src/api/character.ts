import { API } from '@solidfun/api'
import { holdUp } from '@solidfun/holdUp'
import type { InferEnums } from '@solidfun/paramEnums'
import { randomBetween } from '@solidfun/randomBetween'
import { characters, elementEnums } from '@src/lib/vars'


export const GET = new API({
  path: '/api/character/:element',
  async fn({ be, params }) {
    if (!elementEnums.has(params.element)) throw new Error(`❌ Please send a valid element, "${params.element}" is not a valid element, the valid elements are: ${elementEnums}`)

    await holdUp()

    const character = characters[params.element][randomBetween(0, characters[params.element].length - 1)]

    return be.json({ character })
  }
})
.params<{ element: InferEnums<typeof elementEnums> }>()
