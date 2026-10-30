import type { WorkItemCardActionEmptyProps } from "@/shared/ui/WorkerItemCard/ActionCard/WorkItemCardActionEmpty/types/typesWorkItemCardActionEmpty";
import { WorkItemCardActionEmpty } from "@/shared/ui/WorkerItemCard/ActionCard/WorkItemCardActionEmpty/WorkItemCardActionEmpty";
import type { WorkItemCardActionSeveralProps } from "@/shared/ui/WorkerItemCard/ActionCard/WorkItemCardActionSeveral/types/typesWorkItemCardActionSeveral";
import { WorkItemCardActionSeveral } from "@/shared/ui/WorkerItemCard/ActionCard/WorkItemCardActionSeveral/WorkItemCardActionSeveral";
import { createElement } from "react";

export class WorkItemCardFactory {

    static workItemCardActionSeveral(props: WorkItemCardActionSeveralProps) {
        return createElement(WorkItemCardActionSeveral, props);
    }

    static workItemCardActionEmpty<T, P>(props: WorkItemCardActionEmptyProps<T, P>){
        return createElement(WorkItemCardActionEmpty as any, props);
    }

}