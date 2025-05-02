import './Welcome.css'
import { Layout } from '@solidfun/layout'


export default new Layout()
  .component((fe) => {
    return <>
      <div class="welcome">
        <div class="welcome-emoji">✨</div>
        {fe.getChildren()}
      </div>
    </>
  })
