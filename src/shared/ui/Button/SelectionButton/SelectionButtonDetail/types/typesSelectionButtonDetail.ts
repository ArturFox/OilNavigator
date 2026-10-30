import type { Brigade } from "@/entities/brigades/types/brigades.dto";
import type { SelectedPerson } from "@/pages/ReplaceWorker/types/typeReplaseWorker";

export interface SelectionButtonDetailProps {
    selectedBoolean: boolean;
    selected: string;
    onSelected: (value: string) => void;
    onSelectedPerson: (value: SelectedPerson) => void;
    personId: string;
    b: Brigade;
}