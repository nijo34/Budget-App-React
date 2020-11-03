import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
require('dotenv').config({ path :'.env.test'})

Enzyme.configure({                                  //configuring enzyme and the adapter.
    adapter: new Adapter()
})