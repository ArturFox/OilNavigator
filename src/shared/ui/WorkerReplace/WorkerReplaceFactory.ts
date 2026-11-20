import type { WorkerReplaceBlockWithOutProblemsProps } from "@/shared/ui/WorkerReplace/WorkerReplaceBlockWithOutProblems/types/typesWorkerReplaceBlockWithOutProblems";
import { WorkerReplaceBlockWithOutProblems } from "@/shared/ui/WorkerReplace/WorkerReplaceBlockWithOutProblems/WorkerReplaceBlockWithOutProblems";
import type { WorkerReplaceBlockWithProblemsProps } from "@/shared/ui/WorkerReplace/WorkerReplaceBlockWithProblems/types/typesWorkerReplaceBlockWithProblems";
import { WorkerReplaceBlockWithProblems } from "@/shared/ui/WorkerReplace/WorkerReplaceBlockWithProblems/WorkerReplaceBlockWithProblems";
import { createElement } from "react";

export class WorkerReplaceFactory {

    static workerReplaceBlockWithOutProblems(props: WorkerReplaceBlockWithOutProblemsProps) {
        return createElement(WorkerReplaceBlockWithOutProblems, props);
    }

    static workerReplaceBlockWithProblems(props: WorkerReplaceBlockWithProblemsProps) {
        return createElement(WorkerReplaceBlockWithProblems, props);
    }

}