import { configureStore, createSlice } from '@reduxjs/toolkit'
import { getBrigadeApi } from '../api/brigades/brigades.api'
import { getPesonsApi } from '../api/persons/persons.api'
import { getShiftsApi } from '../api/shifts/shifts.api'

const date = createSlice({
  name: 'date',
  initialState: {
    d: '',
    personFlag: false,
    person: {id: '', name: "", surname: "", otherSurname: "", discharge: '', brigade: '', block: "", jobTitle: "", phoneNumber: "", birthday: "", vacation: ""  },
    day: '',
    p: {id: '', name: "", surname: "", otherSurname: "", discharge: '', brigade: '', block: "", jobTitle: "", phoneNumber: "", birthday: "", vacation: ""  },
    flag: false,
    montDay: '2026-03-01',
    infoPersonBrigadeDropDown: false
  },
  reducers: {
    addDate: (state, action) => { state.d = action.payload},
    addPerson: (state, action) => { state.person = action.payload},
    changePeson: (state, action) => { state.personFlag = action.payload},
    changeDay: (state, action) => { state.day = action.payload }, 
    setFlag: (state, action) => { state.flag = action.payload },
    setMontDay: (state, action) => { state.montDay = action.payload},
    setInfoPersonBrigadeDropDown: (state, action) => { state.infoPersonBrigadeDropDown = action.payload}
  }
})

export const {addDate, addPerson, changePeson, changeDay, setFlag, setMontDay, setInfoPersonBrigadeDropDown} = date.actions

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