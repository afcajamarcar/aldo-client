import { render, screen } from '@testing-library/react'
import Card from "../components/Card"

import { NOTIFICATIONS } from '../constants/notifications'

const { LOW_STOCK, NO_STOCK } = NOTIFICATIONS

const setup = (propsOverride: any = {}) => {
  const props = {
    store: 'ALDO Centre Eaton',
    model: 'MIRIRA',
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
  it('should display the name, model and inventory of the store', () => {
    const { props: { store, model, inventory } } = setup()
    const storeNameHeader = screen.getByText(store)
    const modelHeader = screen.getByText(model)
    const inventoryNumber = screen.getByText(inventory)

    expect(storeNameHeader).toBeDefined()
    expect(modelHeader).toBeDefined()
    expect(inventoryNumber).toBeDefined()
  })
})

describe('<Card> notification variant component', () => {
  it('should display a notification header if notification prop is defined', () => {
    const { props: { notification } } = setup({
      notification: LOW_STOCK,
    })

    const notificationHeader = screen.getByText(notification)

    expect(notificationHeader).toBeDefined()
  })

  it('should paint notification message in red if no stock notification is found', () => {
    const { props: { store, notification } } = setup({
      notification: NO_STOCK,
    })

    const notificationHeader = screen.getByText(notification)
    const storeNameHeader = screen.getByText(store)

    expect(notificationHeader.className.split(' ')).toContain('text-red-600')
    expect(storeNameHeader.className.split(' ')).toContain('text-red-600')
  })
})
