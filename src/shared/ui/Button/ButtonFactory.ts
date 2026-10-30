import { createElement } from 'react';
import { SelectionButtonDetail } from '@/shared/ui/Button/SelectionButton/SelectionButtonDetail/SelectionButtonDetail';
import { DetailButtonBase } from '@/shared/ui/Button/DetailButton/DetailButtonBase/DetailButtonBase';
import { AddButtonBase } from '@/shared/ui/Button/AddButton/AddButtonBase/AddButtonBase';
import type { SelectionButtonDetailProps } from '@/shared/ui/Button/SelectionButton/SelectionButtonDetail/types/typesSelectionButtonDetail';
import type { DetailButtonBaseProps } from '@/shared/ui/Button/DetailButton/DetailButtonBase/types/typesDetailButtonBase';
import { SelectButtonBase } from '@/shared/ui/Button/SelectionButton/SelectButtonBase/SelectButtonBase';
import type { SelectButtonBaseProps } from '@/shared/ui/Button/SelectionButton/SelectButtonBase/types/typesSelectButtonBase';
import type { AddButtonBaseProps } from '@/shared/ui/Button/AddButton/AddButtonBase/types/typesAddButtonBase';

export class ButtonFactory {

    static selectionButtonDetail(props: SelectionButtonDetailProps){
        return createElement(SelectionButtonDetail, props);
    }

    static selectButtonBase(props: SelectButtonBaseProps){
        return createElement(SelectButtonBase, props);
    }

    static detailButtonBase(props: DetailButtonBaseProps){
        return createElement(DetailButtonBase, props);
    }

    static addButtonBase(props: AddButtonBaseProps){
        return createElement(AddButtonBase, props);
    }

}