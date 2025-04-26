import { API } from '@solidfun/api'
import { fortunes } from '@src/lib/vars'
import { holdUp } from '@solidfun/holdUp'
import { parseNumber } from '@solidfun/parseNumber'


export const GET = new API({
  path: '/api/fortune/:id',
  async fn({ be, params }) {
    const maxId = fortunes.length - 1

    const id = parseNumber({ potential: params.id, min: 0, max: maxId, error: `❌ Please send a valid id, "${params.id}" is not a number between 0 and ${maxId}` })

    await holdUp()

    return be.json({ fortune: fortunes[id] })
  }
})
.params<{ id: number }>()
