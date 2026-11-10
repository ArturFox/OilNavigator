type ObjectSelectUser = {
    id: string;
};

type CurrentWorker = {
    id: string;
    name: string;
    surname: string;
    otherSurname: string;
    numberBrigade: number | null;
    jobTitle: string;
    block: string;
    discharge: number;
    avalibleBlocks: string[];
}

type NewWorker = {
    id: string;
    name: string;
    surname: string;
    otherSurname: string;
    numberBrigade: number | null;
    jobTitle: string;
    block: string;
    discharge: number;
    avalibleBlocks: string[];
    objectSelectUser: ObjectSelectUser | null;
    setApply: (apply: boolean) => void;
}

export interface WorkerReplaceBlockWithProblemAndHavePersonProps {

    currentWorker: CurrentWorker | null;

    newWorker: NewWorker | null;

}