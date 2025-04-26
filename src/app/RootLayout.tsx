import Nav from '@src/Nav/Nav'
import { Layout } from '@solidfun/layout'


export default new Layout({
  component(props) {
    return <>
      <Nav />
      {props.children}
    </>
  }
})
