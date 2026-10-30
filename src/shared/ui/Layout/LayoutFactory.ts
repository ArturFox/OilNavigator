import { LayoutCenterBase } from '@/shared/ui/Layout/LayoutCenter/LayoutCenterBase/LayoutCenterBase';
import type { LayoutCenterBaseProps } from '@/shared/ui/Layout/LayoutCenter/LayoutCenterBase/types/typesLayoutCenterBase';
import { LayoutCenterOnePerson } from '@/shared/ui/Layout/LayoutCenter/LayoutCenterOnePerson/LayoutCenterOnePerson';
import type { LayoutCenterOnePersonProps } from '@/shared/ui/Layout/LayoutCenter/LayoutCenterOnePerson/types/typesLayoutCenterOnePerson';
import { createElement } from 'react';

export class LayoutFactory {

    static layoutCenterOnePerson(props: LayoutCenterOnePersonProps){
        return createElement(LayoutCenterOnePerson, props)
    }

    static layoutCenterBase(props: LayoutCenterBaseProps){
        return createElement(LayoutCenterBase, props)
    }

}