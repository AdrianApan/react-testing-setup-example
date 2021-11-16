import React from 'react'
import { navigate } from '@reach/router'

// Custom testing utils
import { render, fireEvent, screen } from '../../utils/testing/test-utils'
import '@testing-library/jest-dom/extend-expect'

// Initial state
import { initialState as initialUserState } from '../../state/slices/user.slice'

// Component to test
import User from './User'

// Configs and mocks
jest.mock('axios')

jest.mock('@reach/router', () => ({
  ...jest.requireActual('@reach/router'),
  useParams: () => ({
    userID: '1',
  }),
  navigate: jest.fn(),
}))

// Mock store
const mockState = {
  user: {
    ...initialUserState,
    details: {
      ...initialUserState.details,
      name: 'Fictional Character',
      height: '123',
      mass: '45',
      hair_color: 'red',
      skin_color: 'green',
      eye_color: 'yellow',
      birth_year: '1BBX3',
      gender: 'martian',
    },
  },
}

const displayedFields = [
  'height',
  'mass',
  'hair_color',
  'skin_color',
  'eye_color',
  'birth_year',
  'gender',
]

// Test suite
describe('User component', () => {
  beforeEach(() => {
    render(<User />, { initialState: mockState })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should render the component with the mock data', async () => {
    expect(await screen.findByText(mockState.user.details.name)).toBeInTheDocument()
  })

  it('Should hide the user details on initial render', async () => {
    expect(await screen.findByText('Details are hidden')).toBeInTheDocument()
  })

  describe('User details', () => {
    beforeEach(() => {
      fireEvent.click(screen.getByText('Toggle details'))
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('Should not show the default text', () => {
      expect(screen.queryByText('Details are hidden')).toBeNull()
    })

    test.each(displayedFields)('Should show a %p field', async (fieldName) => {
      expect(
        // @ts-ignore
        await screen.findByText(mockState.user.details[fieldName]),
      ).toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    it('Should disable the previous button if userID is 1', () => {
      fireEvent.click(screen.getByText('Previous user'))
      expect(navigate).not.toHaveBeenCalled()
    })
    it('Should navigate to next user when clicking the "Next user" button', () => {
      fireEvent.click(screen.getByText('Next user'))
      expect(navigate).toHaveBeenCalledTimes(1)
      expect(navigate).toHaveBeenCalledWith('/people/2')
    })
  })

  describe('Special states', () => {
    it('Should show a loading state when page data is loading', async () => {
      render(<User />, {
        initialState: {
          user: { ...mockState.user, isLoading: true, isError: false },
        },
      })
      expect(await screen.findByText('Loading...')).toBeTruthy()
    })

    it("Should show an error message when data can't be loaded", async () => {
      render(<User />, {
        initialState: {
          user: { ...mockState.user, isLoading: false, isError: true },
        },
      })
      expect(await screen.findByText('Something went wrong. Please try again.')).toBeTruthy()
    })
  })
})
