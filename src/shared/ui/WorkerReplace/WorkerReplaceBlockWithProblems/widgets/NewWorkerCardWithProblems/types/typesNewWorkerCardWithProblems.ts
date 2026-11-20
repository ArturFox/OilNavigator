type ObjectSelectUser = {
    id: string;
};

export interface NewWorkerCardWithProblemsProps{
    id: string | null;
    name: string | null;
    surname: string | null;
    otherSurname: string | null;
    numberBrigade: number | null;
    jobTitle: string | null;
    block: string | null;
    discharge: number | null;
    avalibleBlocks: string[] | null;
    objectSelectUser: ObjectSelectUser | null;
    setApply: (apply: boolean) => void;
    redAlarm: string[];
    yellowAlarm: string[];
}