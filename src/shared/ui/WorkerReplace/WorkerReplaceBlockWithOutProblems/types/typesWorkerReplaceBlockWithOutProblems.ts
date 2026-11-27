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
    isLoadingNewWorkerCardProps: boolean;
}

export interface WorkerReplaceBlockWithOutProblemsProps {

    currentWorker: CurrentWorker | null;

    newWorker: NewWorker | null;

}