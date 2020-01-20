/* 
    自定义导航使用
    优：拓展性好
*/
import React from 'react'
import { View, Text,Dimensions } from 'react-native';

import ScrollableTabView from '../../common/ScrollTabView'

const titles = ['科技', '热点', '饮食', '交通', '城市', '热点', '军事', '人文']
//tab对应的view
const views = []
const screenWidth = Dimensions.get('window').width;

export default class HomeTabPage extends React.Component {
    componentDidMount() {
        //  一个就相当于一个页面了
        views.push(<View key={1} style={{ width: screenWidth, backgroundColor: 'purple' }} />)
        views.push(<View key={2} style={{ width: screenWidth, backgroundColor: 'green' }} />)
        views.push(<View key={3} style={{ width: screenWidth, backgroundColor: 'yellow' }} />)
        views.push(<View key={4} style={{ width: screenWidth, backgroundColor: 'blue' }} />)
        views.push(<View key={5} style={{ width: screenWidth, backgroundColor: 'pink' }} />)
        views.push(<View key={6} style={{ width: screenWidth, backgroundColor: 'red' }} />)
        views.push(<View key={7} style={{ width: screenWidth, backgroundColor: 'gray' }} />)
        views.push(<View key={8} style={{ width: screenWidth, backgroundColor: '#ccc' }} />)
    }

    render() {
        return (
            <ScrollableTabView
                tabHeight={40}
                tabBarActiveTextColor='#686868'
                tabBarInactiveTextColor='#cccccc'
                titles={titles}
            >
                {/* 展示页面 */}
                {views}
        
            </ScrollableTabView>
        );
    }
}

