import type { WorkItemCardActionEmptyProps } from "@/shared/ui/WorkerItemCard/ActionCard/WorkItemCardActionEmpty/types/typesWorkItemCardActionEmpty";
import { WorkItemCardActionEmpty } from "@/shared/ui/WorkerItemCard/ActionCard/WorkItemCardActionEmpty/WorkItemCardActionEmpty";
import type { WorkItemCardActionOneProps } from "@/shared/ui/WorkerItemCard/ActionCard/WorkItemCardActionOne/types/typesWorkItemCardActionOne";
import { WorkItemCardActionOne } from "@/shared/ui/WorkerItemCard/ActionCard/WorkItemCardActionOne/WorkItemCardActionOne";
import type { WorkItemCardActionSeveralProps } from "@/shared/ui/WorkerItemCard/ActionCard/WorkItemCardActionSeveral/types/typesWorkItemCardActionSeveral";
import { WorkItemCardActionSeveral } from "@/shared/ui/WorkerItemCard/ActionCard/WorkItemCardActionSeveral/WorkItemCardActionSeveral";
import { createElement } from "react";

export class WorkItemCardFactory {

    static workItemCardActionOne(props: WorkItemCardActionOneProps) {
        return createElement(WorkItemCardActionOne, props);
    }

    static workItemCardActionSeveral(props: WorkItemCardActionSeveralProps) {
        return createElement(WorkItemCardActionSeveral, props);
    }

    static workItemCardActionEmpty(props: WorkItemCardActionEmptyProps){
        return createElement(WorkItemCardActionEmpty as any, props);
    }

}