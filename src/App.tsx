import { Redirect, Router } from '@reach/router'
import { Box } from '@material-ui/core'

import User from './components/User'

const App = () => (
  <Box p={3}>
    <Router>
      <Redirect from="/" to="/people/1" />
      <User path="/people/:userID" />
    </Router>
  </Box>
)

export default App
