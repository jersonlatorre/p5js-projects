import styles from './styles/App.module.scss'
import { ReactP5Wrapper } from 'react-p5-wrapper'
import sketch from './sketch/main'

const App = () => {
  return (
    <div id={styles.app}>
      <ReactP5Wrapper sketch={sketch} />
    </div>
  )
}

export default App
