import type { Dispatch, SetStateAction } from "react";

export interface WorkItemCardActionEmptyProps {
    shouldRedirect: boolean; 
    setShouldRedirect: (shouldRedirect: boolean) => void;
    brigadeId: string;
    setTargetBrigadeId: Dispatch<SetStateAction<string | null>>
}