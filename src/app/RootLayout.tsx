import Nav from '@src/Nav/Nav'
import { Layout } from '@solidfun/layout'


export default new Layout()
  .component((fe) => {
    return <>
      <Nav />
      {fe.getChildren()}
    </>
  })
