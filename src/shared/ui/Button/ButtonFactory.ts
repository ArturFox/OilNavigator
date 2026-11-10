import { createElement } from 'react';
import { DetailButtonBase } from '@/shared/ui/Button/DetailButton/DetailButtonBase/DetailButtonBase';
import { AddButtonBase } from '@/shared/ui/Button/AddButton/AddButtonBase/AddButtonBase';
import type { DetailButtonBaseProps } from '@/shared/ui/Button/DetailButton/DetailButtonBase/types/typesDetailButtonBase';
import { SelectButtonBase } from '@/shared/ui/Button/SelectionButton/SelectButtonBase/SelectButtonBase';
import type { SelectButtonBaseProps } from '@/shared/ui/Button/SelectionButton/SelectButtonBase/types/typesSelectButtonBase';
import type { AddButtonBaseProps } from '@/shared/ui/Button/AddButton/AddButtonBase/types/typesAddButtonBase';
import { SelectButtonPerson } from '@/shared/ui/Button/SelectionButton/SelectButtonPerson/SelectButtonPerson';
import type { SelectButtonPersonProps } from '@/shared/ui/Button/SelectionButton/SelectButtonPerson/types/typesSelectButtonPerson';
import type { SelectButtonPersonObjectProps } from '@/shared/ui/Button/SelectionButton/SelectButtonPersonObject/types/typesSelectButtonPersonObject';
import { SelectButtonPersonObject } from '@/shared/ui/Button/SelectionButton/SelectButtonPersonObject/SelectButtonPersonObject';

export class ButtonFactory {

    static selectButtonBase(props: SelectButtonBaseProps){
        return createElement(SelectButtonBase, props);
    }

    static selectButtonPerson(props: SelectButtonPersonProps){
        return createElement(SelectButtonPerson, props);
    }

    static detailButtonBase(props: DetailButtonBaseProps){
        return createElement(DetailButtonBase, props);
    }

    static addButtonBase(props: AddButtonBaseProps){
        return createElement(AddButtonBase, props);
    }

    static selectButtonPersonObject(props: SelectButtonPersonObjectProps){
        return createElement(SelectButtonPersonObject, props);
    }

}