import type { Dispatch, SetStateAction } from "react";

type ObjectSelectUser = {
    id: string;
};

export interface SelectButtonPersonObjectProps {
    id: string;
    objectSelectUser: ObjectSelectUser | null;
    onObjectSelectUser: Dispatch<SetStateAction<ObjectSelectUser | null>>;
}