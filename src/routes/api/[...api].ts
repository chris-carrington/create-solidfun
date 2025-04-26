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
