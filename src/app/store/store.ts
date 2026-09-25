import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getShiftsApi } from '../../entities/shifts/api/getShifts';
import { getPesonsApi } from '../../entities/persons/api/getPersons';
import { getBrigadeApi } from '../../entities/brigades/api/getBrigades';
import { getWalletsApi } from '../../entities/wallets/api/getWallets';
import { getPersonReplacementApi } from '../../entities/personReplacement/api/getPersonReplacement';
import type { Persons } from '../../entities/persons/types/persons.dto';
import type { Brigade } from '../../entities/brigades/types/brigades.dto';

const today = new Date();
const dateString: string = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

const date = createSlice({

  name: 'date',

  initialState: {

    day: dateString,
    brigadeTransfer: {
      person: null as Persons | null,
      brigade: null as Brigade | null,
    }
    
  },

  reducers: {
    changeDay: (
      state, 
      action: PayloadAction<string>
    ) => { 
      state.day = action.payload
    },
 
    onBrigadeTransfer: (
      state,
      action: PayloadAction<{
        person: Persons;
        brigade: Brigade;
      }>
    ) => {
      state.brigadeTransfer = action.payload
    },

    resetBrigadeTransfer: (state) => {
      state.brigadeTransfer = {
        person: null,
        brigade: null
      }
    },
  
  }

})

export const 
  { 
    changeDay, 
    onBrigadeTransfer, 
    resetBrigadeTransfer
  } = date.actions

export const store = configureStore(
  { 
    reducer: { 
      date: date.reducer,
      [getShiftsApi.reducerPath]: getShiftsApi.reducer,
      [getPesonsApi.reducerPath]: getPesonsApi.reducer,
      [getBrigadeApi.reducerPath]: getBrigadeApi.reducer,
      [getWalletsApi.reducerPath]: getWalletsApi.reducer,
      [getPersonReplacementApi.reducerPath]: getPersonReplacementApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(getShiftsApi.middleware)
        .concat(getPesonsApi.middleware)
        .concat(getBrigadeApi.middleware)
        .concat(getWalletsApi.middleware)
        .concat(getPersonReplacementApi.middleware)
  }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch