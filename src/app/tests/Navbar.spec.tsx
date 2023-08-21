import { render, screen } from '@testing-library/react'
import Navbar from "../components/Navbar"

const setup = (propsOverride: any = {}) => {
  const props = {
    ...propsOverride,
  }

  const renderWrapper = render(<Navbar {...props} />)

  return {
    renderWrapper,
    props,
  }
}

describe('<Navbar> component', () => {
  it('should displat a nav tag', () => {
    setup()
    const nav = screen.getByRole('navigation')
    expect(nav).toBeDefined()
  })
})
