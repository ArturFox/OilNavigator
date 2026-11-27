import { LayoutBottom } from '@/shared/ui/Layout/LayoutBottom/LayoutBottom';
import type { LayoutBottomProps } from '@/shared/ui/Layout/LayoutBottom/types/typesLayoutBottom';
import { LayoutCenterColumn } from '@/shared/ui/Layout/LayoutCenter/LayoutCenterColumn/LayoutCenterColumn';
import type { LayoutCenterOnePersonProps } from '@/shared/ui/Layout/LayoutCenter/LayoutCenterColumn/types/typesLayoutCenterColumn';
import { LayoutSimpleBlackBackground } from '@/shared/ui/Layout/LayoutSimpleBlackBackground/LayoutSimpleBlackBackground';
import type { LayoutSimpleBlackBackgroundProps } from '@/shared/ui/Layout/LayoutSimpleBlackBackground/types/typesLayoutSimpleBlackBackground';
import { createElement } from 'react';

export class LayoutFactory {

    static layoutCenterColumn(props: LayoutCenterOnePersonProps){
        return createElement(LayoutCenterColumn, props)
    }

    static layoutSimpleBlackBackground(props: LayoutSimpleBlackBackgroundProps){
        return createElement(LayoutSimpleBlackBackground, props)
    }

    static layoutBottom(props: LayoutBottomProps){
        return createElement(LayoutBottom, props)
    }

}