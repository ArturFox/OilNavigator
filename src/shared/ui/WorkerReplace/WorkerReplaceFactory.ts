import type { WorkerReplaceBlockWithProblemAndHavePersonProps } from "@/shared/ui/WorkerReplace/WorkerReplaceBlockWithProblem/WorkerReplaceBlockWithProblemAndHavePerson/types/typesWorkerReplaceBlockWithProblemAndHavePerson";
import { WorkerReplaceBlockWithProblemAndHavePerson } from "@/shared/ui/WorkerReplace/WorkerReplaceBlockWithProblem/WorkerReplaceBlockWithProblemAndHavePerson/WorkerReplaceBlockWithProblemAndHavePerson";
import { createElement } from "react";

export class WorkerReplaceFactory {

    static workerReplaceBlockWithProblemAndHavePerson(props: WorkerReplaceBlockWithProblemAndHavePersonProps) {
        return createElement(WorkerReplaceBlockWithProblemAndHavePerson, props);
    }

}