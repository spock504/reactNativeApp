import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import PopularTab from '../Detail/Popular'
import DetailTab from '../Detail/Detail'

const TabNavigator = createMaterialTopTabNavigator({
    PopularTab1: {
        screen: PopularTab,
        navigationOptions: {
            title:'PopularTab'
        }
    },
    PopularTab2: {
        screen: DetailTab,
        navigationOptions: {
            title:'DetailTab'
        }
    },
})

export default TabNavigator