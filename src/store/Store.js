import { createSlice, configureStore } from '@reduxjs/toolkit'

const TRUCKS = `query GetTrucks {
  trucks {
    Constructor
    Model
    id
    price
    size
    description
    photos {
      url
    }
    company {
      id
      name
    }
  }
}`

const initialTrukState = { query: TRUCKS, params: {} }

const dataSlice = createSlice({
  name: 'trucksData',
  initialState: initialTrukState,
  reducers: {
    initialTrucks(state)
    {
      state.query=TRUCKS
      state.params = {}
    },
    filterId(state, action) {
      const TRUCKSFILTER = `
        query GetTrucks($id : ID!) {
          truck(id: $id) {
            Constructor
            Model
            id
            price
            size
            description
            photos {
              url
            }
            company {
              id
              name
            }
          }
        }
      `
      state.query = TRUCKSFILTER
      state.params = action.payload
    },
  },
})

const store = configureStore({
  reducer: dataSlice.reducer,
})

export const dataAction = dataSlice.actions

export default store
