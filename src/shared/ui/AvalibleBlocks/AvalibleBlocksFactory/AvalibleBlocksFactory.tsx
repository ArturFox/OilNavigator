import type { AvalibleBlocksBaseProps, AvalibleBlocksWithObjectPersonProps } from "@/shared/ui/AvalibleBlocks/AvalibleBlocksFactory/types/typesAvalibleBlocks";
import { AvalibleBlocksBase } from "@/shared/ui/AvalibleBlocks/AvalibleBlocksFactory/widgets/AvalibleBlocksBase/AvalibleBlocksBase";
import { AvalibleBlocksWithObjectPerson } from "@/shared/ui/AvalibleBlocks/AvalibleBlocksFactory/widgets/AvalibleBlocksWithObjectPerson/AvalibleBlocksWithObjectPerson";
import { createElement } from "react";

export class AvalibleBlocksFactory {

    static avalibleBlocksBase(props: AvalibleBlocksBaseProps){
        return createElement(AvalibleBlocksBase, props);
    }

    static avalibleBlocksWithComparison(props: AvalibleBlocksWithObjectPersonProps){
        return createElement(AvalibleBlocksWithObjectPerson, props);
    }
    
}