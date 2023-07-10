import { Provider } from 'react-redux'
import { screen, render } from '@testing-library/react'
import {} from 'ts-jest'

import App from './App'
import store from '../store'
import { fetchFruits } from '../actions'

jest.mock('../actions')
const fetchFruits_ = fetchFruits as jest.Mock<ReturnType<typeof fetchFruits>>
const mockStore = store as jest.Mocked<typeof store>

fetchFruits_.mockImplementation(() => async () => {})
test('page header includes fruit', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const heading = screen.getByRole('heading')
  expect(heading.innerHTML).toMatch(/Fruit/)
})

test('renders an <li> for each fruit', () => {
  const fruits = ['orange', 'persimmons', 'kiwi fruit']
  jest.spyOn(store, 'getState')
  mockStore.getState.mockImplementation(() => ({ fruits }))

  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const li = screen.getAllByRole('listitem')
  expect(li).toHaveLength(3)
})

test('dispatches fetchFruits action', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  expect(fetchFruits).toHaveBeenCalled()
})
