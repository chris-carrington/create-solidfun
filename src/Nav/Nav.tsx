import './Nav.css'
import { A } from '@solidfun/a'
import Counter from '@src/lib/Counter'


export default () => {
  return <>
    <nav>
      <Counter />
      <A path="/" activeClass="active" end={true} class="brand">Home</A>
      <A path="/fortune" activeClass="active" class="brand">Fortune</A>
      <A path="/smooth" activeClass="active" class="brand">Smooth</A>
    </nav>
  </>
}
