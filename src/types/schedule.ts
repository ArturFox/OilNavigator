export interface Person {
  id: string
  name: string
  surname: string
  otherSurname: string
  discharge: string
  brigade: string
  block: string | null
  jobTitle: string
  phoneNumber: string
  birthday: string
  vacationStart: string
  vacationEnd: string
  heCan: string[]
}


export interface BrigadeShift {
  id: string
  code: string
  label: string
  color: string
  startDate: string
  brigade: string
  startTime: string | null
  endTime: string | null
}