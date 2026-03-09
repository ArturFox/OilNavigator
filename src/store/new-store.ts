import { configureStore, createSlice } from '@reduxjs/toolkit'
import { getBrigadeApi } from '../api/brigades/brigades.api'
import { getPesonsApi } from '../api/persons/persons.api'
import { getShiftsApi } from '../api/shifts/shifts.api'

 const today = new Date();
  const dateString = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

const date = createSlice({
  name: 'date',
  initialState: {

    person: {
      id: '',
      name: '',
      surname: '',
      other_surname: '',
      discharge: 0,
      brigade_id: null,
      block: null,
      job_title: '',
      phone_number: '',
      birthday: null,
      vacation_start: null,
      vacation_end: null,
      he_can: null,
      sick_start: null,
      sick_end: null,
      brigade_name: ''
    },
    day: dateString,
    personFlag: false,
    changePerson: false
    
  },
  reducers: {
    addPerson: (state, action) => { state.person = action.payload},
    setPesonFlag: (state, action) => { state.personFlag = action.payload},
    changeDay: (state, action) => { state.day = action.payload },
    setChangePerson: (state, action) => { state.changePerson = action.payload}, 
  }
})

export const {addPerson, setPesonFlag, changeDay, setChangePerson} = date.actions

export const store = configureStore(
  { 
    reducer: { 
      date: date.reducer,
      [getShiftsApi.reducerPath]: getShiftsApi.reducer,
      [getPesonsApi.reducerPath]: getPesonsApi.reducer,
      [getBrigadeApi.reducerPath]: getBrigadeApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(getShiftsApi.middleware)
        .concat(getPesonsApi.middleware)
        .concat(getBrigadeApi.middleware)
  }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch