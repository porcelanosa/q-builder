import { mount } from '@vue/test-utils'
import App from '../src/App.vue'

describe('App.spec.js', () => {
  it('renders', async () => {
    const wrapper = mount(App, { attachTo: '#app' })
    expect(wrapper.html()).to.contain('Header')
  })
})

// The component to test
const MessageComponent = {
  template: '<p>{{ msg }}</p>',
  props: ['msg']
}

test('displays message', () => {
  const wrapper = mount(MessageComponent, {
    props: {
      msg: 'Hello world'
    }
  })
  
  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('Hello world')
})
