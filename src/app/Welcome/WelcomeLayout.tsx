import './Welcome.css'
import { Layout } from '@solidfun/layout'


export default new Layout({
  component(props) {
    return <>
      <div class="welcome">
        <div class="welcome-emoji">✨</div>
        {props.children}
      </div>
    </>
  }
})
