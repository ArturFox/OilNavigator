import { configureStore, createSlice } from '@reduxjs/toolkit'



const scheduleSlice = createSlice({
  name: 'scheduleSlice',
  initialState: {
    startArr: [
      {id: '0', code: "У", label: "Утро", color: "yellow", startDate: '', brigade: '', startTime: '08:00', endTime: '16:00' },
      {id: '1', code: "У", label: "Утро", color: "yellow", startDate: '', brigade: '', startTime: '08:00', endTime: '16:00' },

      {id: '2', code: "О", label: "Отдых", color: "white", startDate: '', brigade: '', startTime: '', endTime: '' },

      {id: '3', code: "В", label: "Вечер", color: "pink", startDate: '', brigade: '', startTime: '16:00', endTime: '00:00' },
      {id: '4', code: "В", label: "Вечер", color: "pink", startDate: '', brigade: '', startTime: '16:00', endTime: '00:00' },

      {id: '5', code: "О", label: "Отдых", color: "white", startDate: '', brigade: '', startTime: '', endTime: '' },

      {id: '6', code: "Н", label: "Ночь", color: "blue", startDate: '', brigade: '', startTime: '00:00', endTime: '00:00' },
      {id: '7', code: "Н", label: "Ночь", color: "blue", startDate: '', brigade: '', startTime: '00:00', endTime: '00:00' },

      {id: '8', code: "О", label: "Отдых", color: "white", startDate: '', brigade: '', startTime: '', endTime: '' },
      {id: '9', code: "О", label: "Отдых", color: "white", startDate: '', brigade: '', startTime: '', endTime: '' },
    ]
  },
  reducers: {
    addShift: (state, action) => { state.startArr.push(action.payload) },
    removeShift: (state, action) => { state.startArr = state.startArr.filter(s => s.id !== action.payload) }
  }
})

export const { addShift, removeShift } = scheduleSlice.actions





const allBrigades = createSlice({
  name: 'allBrigades',
  initialState: {
    brigadeOneState: [
      {id: '0', code: "У", label: "Утро", color: "green", startDate: '15.01.2026', brigade: '1', startTime: '08:00', endTime: '16:00' },
      {id: '1', code: "У", label: "Утро", color: "green", startDate: '16.01.2026', brigade: '1', startTime: '08:00', endTime: '16:00' },

      {id: '2', code: "О", label: "Отдых", color: "white", startDate: '17.01.2026', brigade: '1', startTime: null, endTime: null },
      
      {id: '3', code: "В", label: "Вечер", color: "violet", startDate: '18.01.2026', brigade: '1', startTime: '16:00', endTime: '00:00' },
      {id: '4', code: "В", label: "Вечер", color: "violet", startDate: '19.01.2026', brigade: '1', startTime: '16:00', endTime: '00:00' },
      
      {id: '5', code: "О", label: "Отдых", color: "white", startDate: '20.01.2026', brigade: '1', startTime: null, endTime: null },
      
      {id: '6', code: "Н", label: "Ночь", color: "blue", startDate: '21.01.2026', brigade: '1', startTime: '00:00', endTime: '08:00' },
      {id: '7', code: "Н", label: "Ночь", color: "blue", startDate: '22.01.2026', brigade: '1', startTime: '00:00', endTime: '08:00' },
      
      {id: '8', code: "О", label: "Отдых", color: "white", startDate: '23.01.2026', brigade: '1', startTime: null, endTime: null },
      {id: '9', code: "О", label: "Отдых", color: "white", startDate: '24.01.2026', brigade: '1', startTime: null, endTime: null },
    ],
    brigadeTwoState: [
      {id: '0', code: "У", label: "Утро", color: "green", startDate: '17.01.2026', brigade: '2', startTime: '08:00', endTime: '16:00' },
      {id: '1', code: "У", label: "Утро", color: "green", startDate: '18.01.2026', brigade: '2', startTime: '08:00', endTime: '16:00' },
      
      {id: '2', code: "О", label: "Отдых", color: "white", startDate: '19.01.2026', brigade: '2', startTime: null, endTime: null },
      
      {id: '3', code: "В", label: "Вечер", color: "violet", startDate: '20.01.2026', brigade: '2', startTime: '16:00', endTime: '00:00' },
      {id: '4', code: "В", label: "Вечер", color: "violet", startDate: '21.01.2026', brigade: '2', startTime: '16:00', endTime: '00:00' },
      
      {id: '5', code: "О", label: "Отдых", color: "white", startDate: '22.01.2026', brigade: '2', startTime: null, endTime: null },
      
      {id: '6', code: "Н", label: "Ночь", color: "blue", startDate: '23.01.2026', brigade: '2', startTime: '00:00', endTime: '08:00' },
      {id: '7', code: "Н", label: "Ночь", color: "blue", startDate: '24.01.2026', brigade: '2', startTime: '00:00', endTime: '08:00' },
      
      {id: '8', code: "О", label: "Отдых", color: "white", startDate: '25.01.2026', brigade: '2', startTime: null, endTime: null },
      {id: '9', code: "О", label: "Отдых", color: "white", startDate: '26.01.2026', brigade: '2', startTime: null, endTime: null },
    ],
    brigadeThreeState: [
      {id: '0', code: "У", label: "Утро", color: "green", startDate: '19.01.2026', brigade: '3', startTime: '08:00', endTime: '16:00' },
      {id: '1', code: "У", label: "Утро", color: "green", startDate: '20.01.2026', brigade: '3', startTime: '08:00', endTime: '16:00' },
      
      {id: '2', code: "О", label: "Отдых", color: "white", startDate: '21.01.2026', brigade: '3', startTime: null, endTime: null },
      
      {id: '3', code: "В", label: "Вечер", color: "violet", startDate: '22.01.2026', brigade: '3', startTime: '16:00', endTime: '00:00' },
      {id: '4', code: "В", label: "Вечер", color: "violet", startDate: '23.01.2026', brigade: '3', startTime: '16:00', endTime: '00:00' },
      
      {id: '5', code: "О", label: "Отдых", color: "white", startDate: '24.01.2026', brigade: '3', startTime: null, endTime: null },
      
      {id: '6', code: "Н", label: "Ночь", color: "blue", startDate: '25.01.2026', brigade: '3', startTime: '00:00', endTime: '08:00' },
      {id: '7', code: "Н", label: "Ночь", color: "blue", startDate: '26.01.2026', brigade: '3', startTime: '00:00', endTime: '08:00' },
      
      {id: '8', code: "О", label: "Отдых", color: "white", startDate: '27.01.2026', brigade: '3', startTime: null, endTime: null },
      {id: '9', code: "О", label: "Отдых", color: "white", startDate: '28.01.2026', brigade: '3', startTime: null, endTime: null },
    ],
    brigadeFourState: [
      {id: '0', code: "У", label: "Утро", color: "green", startDate: '21.01.2026', brigade: '4', startTime: '08:00', endTime: '16:00' },
      {id: '1', code: "У", label: "Утро", color: "green", startDate: '22.01.2026', brigade: '4', startTime: '08:00', endTime: '16:00' },
      
      {id: '2', code: "О", label: "Отдых", color: "white", startDate: '23.01.2026', brigade: '4', startTime: null, endTime: null },
      
      {id: '3', code: "В", label: "Вечер", color: "violet", startDate: '24.01.2026', brigade: '4', startTime: '16:00', endTime: '00:00' },
      {id: '4', code: "В", label: "Вечер", color: "violet", startDate: '25.01.2026', brigade: '4', startTime: '16:00', endTime: '00:00' },
      
      {id: '5', code: "О", label: "Отдых", color: "white", startDate: '26.01.2026', brigade: '4', startTime: null, endTime: null },
      
      {id: '6', code: "Н", label: "Ночь", color: "blue", startDate: '27.01.2026', brigade: '4', startTime: '00:00', endTime: '08:00' },
      {id: '7', code: "Н", label: "Ночь", color: "blue", startDate: '28.01.2026', brigade: '4', startTime: '00:00', endTime: '08:00' },
      
      {id: '8', code: "О", label: "Отдых", color: "white", startDate: '29.01.2026', brigade: '4', startTime: null, endTime: null },
      {id: '9', code: "О", label: "Отдых", color: "white", startDate: '30.01.2026', brigade: '4', startTime: null, endTime: null },
    ],
    brigadeFiveState: [
      {id: '0', code: "У", label: "Утро", color: "green", startDate: '23.01.2026', brigade: '5', startTime: '08:00', endTime: '16:00' },
      {id: '1', code: "У", label: "Утро", color: "green", startDate: '24.01.2026', brigade: '5', startTime: '08:00', endTime: '16:00' },
      
      {id: '2', code: "О", label: "Отдых", color: "white", startDate: '25.01.2026', brigade: '5', startTime: null, endTime: null },
    
      {id: '3', code: "В", label: "Вечер", color: "violet", startDate: '26.01.2026', brigade: '5', startTime: '16:00', endTime: '00:00' },
      {id: '4', code: "В", label: "Вечер", color: "violet", startDate: '27.01.2026', brigade: '5', startTime: '16:00', endTime: '00:00' },
      
      {id: '5', code: "О", label: "Отдых", color: "white", startDate: '28.01.2026', brigade: '5', startTime: null, endTime: null },
      
      {id: '6', code: "Н", label: "Ночь", color: "blue", startDate: '29.01.2026', brigade: '5', startTime: '00:00', endTime: '08:00' },
      {id: '7', code: "Н", label: "Ночь", color: "blue", startDate: '30.01.2026', brigade: '5', startTime: '00:00', endTime: '08:00' },
      
      {id: '8', code: "О", label: "Отдых", color: "white", startDate: '31.01.2026', brigade: '5', startTime: null, endTime: null },
      {id: '9', code: "О", label: "Отдых", color: "white", startDate: '01.02.2026', brigade: '5', startTime: null, endTime: null },
    ],
  },
  reducers: {
    addbrigadeOneState: (state, action) => { state.brigadeOneState.push(action.payload)},
    addbrigadeTwoState: (state, action) => { state.brigadeTwoState.push(action.payload)},
    addbrigadeThreeState: (state, action) => { state.brigadeThreeState.push(action.payload)},
    addbrigadeFourState: (state, action) => { state.brigadeFourState.push(action.payload)},
    addbrigadeFiveState: (state, action) => { state.brigadeFiveState.push(action.payload)},

    changeBrigadeOneState: (state, action) => { state.brigadeOneState = action.payload},
    changeBrigadeTwoState: (state, action) => { state.brigadeTwoState = action.payload},
    changeBrigadeThreeState: (state, action) => { state.brigadeThreeState = action.payload},
    changeBrigadeFourState: (state, action) => { state.brigadeFourState = action.payload},
    changeBrigadeFiveState: (state, action) => { state.brigadeFiveState = action.payload},
  }
})

export const {
  addbrigadeOneState, 
  addbrigadeTwoState,
  addbrigadeThreeState,
  addbrigadeFourState,
  addbrigadeFiveState, 
  changeBrigadeOneState,
  changeBrigadeTwoState,
  changeBrigadeThreeState,
  changeBrigadeFourState,
  changeBrigadeFiveState,
} = allBrigades.actions



const allPeople = createSlice({
  name: 'allPeople',
  initialState: {
    brigadeOnePeople: [
      {id: '0', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '6', brigade: '1', block: "Главный", jobTitle: "Старший оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '1', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '5', brigade: '1', block: "АТ", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '2', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '5', brigade: '1', block: "ВТ", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '3', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '5', brigade: '1', block: "Стабилизация", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '4', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '4', brigade: '1', block: "Печи", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '5', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '4', brigade: '1', block: "ЭЛОУ", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ']  },
      {id: '6', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '4', brigade: '1', block: null, jobTitle: "Машинист", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['Насосы'] },
    ],
    brigadeTwoPeople: [
      {id: '0', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '6', brigade: '2', block: "Главный", jobTitle: "Старший оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '1', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '5', brigade: '2', block: "АТ", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '2', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '5', brigade: '2', block: "ВТ", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '3', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '5', brigade: '2', block: "Стабилизация", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '4', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '4', brigade: '2', block: "Печи", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '5', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '4', brigade: '2', block: "ЭЛОУ", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '6', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '4', brigade: '2', block: null, jobTitle: "Машинист", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['Насосы'] },
    ],
    brigadeThreePeople: [
      {id: '0', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '6', brigade: '3', block: "Главный", jobTitle: "Старший оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '1', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '5', brigade: '3', block: "АТ", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '2', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '5', brigade: '3', block: "ВТ", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '3', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '5', brigade: '3', block: "Стабилизация", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '4', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '4', brigade: '3', block: "Печи", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '5', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '4', brigade: '3', block: "ЭЛОУ", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '6', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '4', brigade: '3', block: null, jobTitle: "Машинист", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['Насосы'] },
    ],
    brigadeFourPeople: [
      {id: '0', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '6', brigade: '4', block: "Главный", jobTitle: "Старший оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '1', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '5', brigade: '4', block: "АТ", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '2', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '5', brigade: '4', block: "ВТ", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '3', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '5', brigade: '4', block: "Стабилизация", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '4', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '4', brigade: '4', block: "Печи", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '5', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '4', brigade: '4', block: "ЭЛОУ", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '6', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '4', brigade: '4', block: null, jobTitle: "Машинист", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['Насосы'] },
    ],
    brigadeFivePeople: [
      {id: '0', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '6', brigade: '5', block: "Главный", jobTitle: "Старший оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "19.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '1', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '5', brigade: '5', block: "АТ", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '2', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '5', brigade: '5', block: "ВТ", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '3', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '5', brigade: '5', block: "Стабилизация", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '4', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '4', brigade: '5', block: "Печи", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '5', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '4', brigade: '5', block: "ЭЛОУ", jobTitle: "Оператор", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['ВТ', 'СТ', 'АТ', 'ПЕЧИ', 'ЭЛОУ'] },
      {id: '6', name: "Артур", surname: "Иванов", otherSurname: "Дмитриевич", discharge: '4', brigade: '5', block: null, jobTitle: "Машинист", phoneNumber: "+79174685924", birthday: "18.02.2026", vacationStart: "20.02.2026", vacationEnd: '28.02.2026', heCan: ['Насосы'] },
    ],
  },
  reducers: {
    addbrigadeOnePeople: (state, action) => { state.brigadeOnePeople.push(action.payload)}
  }
})

export const {
  addbrigadeOnePeople
} = allPeople.actions

const date = createSlice({
  name: 'date',
  initialState: {
    d: '',
    personFlag: false,
    person: {id: '', name: "", surname: "", otherSurname: "", discharge: '', brigade: '', block: "", jobTitle: "", phoneNumber: "", birthday: "", vacation: ""  },
  },
  reducers: {
    addDate: (state, action) => { state.d = action.payload},
    addPerson: (state, action) => { state.person = action.payload},
    changePeson: (state, action) => { state.personFlag = action.payload}
  }
})

export const {addDate, addPerson, changePeson} = date.actions

export const store = configureStore(
  { 
    reducer: { 
      scheduleSlice: scheduleSlice.reducer,
      allBrigades: allBrigades.reducer,
      allPeople: allPeople.reducer,
      date: date.reducer,
    } 
  }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch