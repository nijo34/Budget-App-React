import ReactShallowRenderer from "react-test-renderer/shallow";
import React from 'react'
// import toJSON from 'enzyme-to-json'                                 //if not used, then we get a lot of junk data from enzyme within the snapshot which if altered, can lead to faulty test cases.
import { shallow } from 'enzyme'
import Header from '../../components/Header'


test('should render header correctly',()=>{
    const wrapper = shallow(<Header />)
    expect(wrapper).toMatchSnapshot()                               //removed enzyme-to-json since it is included in the config file.

    // expect(wrapper.find('h1').text()).toBe('Budget App')
    //  const renderer = new ReactShallowRenderer();              //created a new instance of shallow renderer
    //  renderer.render(<Header />)                               //shallow rendered the Header component
    //  expect(renderer.getRenderOutput()).toMatchSnapshot()      //method used to get the rendered output via the shallow renderer.
                                                               //it always passes the first time, since there is no existing snapshot.
})