type ObjectSelectUser = {
    id: string;
};

export interface CurrentWorkerCardWithProblemsProps {
    id: string | null;
    name: string | null;
    surname: string | null;
    otherSurname: string | null;
    numberBrigade: number | null;
    jobTitle: string | null;
    block: string | null;
    discharge: number | null;
    avalibleBlocks: string[] | null;
    onIsOpenModalDetail: ((isOpenModalDetail: boolean) => void);
    objectSelectUser: ObjectSelectUser | null;
    redAlarm: string[];
    yellowAlarm: string[];
}