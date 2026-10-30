export interface WorkInfoWithProblemProps {
    job_title: string;
    block: string;
    discharge: number;
    arrProblem: string[];
    problemsMoreThatOne: boolean;
    currentIndex: number;
}

export interface WorkInfoBaseProps {
    job_title: string;
    block: string;
    discharge: number;
}