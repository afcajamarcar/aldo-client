import { render, screen } from '@testing-library/react'
import Card from "../components/card"

const setup = (propsOverride: any = {}) => {
  const props = {
    composedInfo: 'ALDO Centre Eaton/MIRIRA',
    inventory: '9',
    ...propsOverride,
  }

  const renderWrapper = render(<Card {...props} />)

  return {
    renderWrapper,
    props,
  }
}

describe('<Card> component', () => {
  it('should display the name of the store', () => {
    const { props: { composedInfo } } = setup()
    const storeName = composedInfo.split('/')[0]
    const storeNameHeader = screen.getByText(storeName)
    expect(storeNameHeader).toBeDefined()
  })
})
