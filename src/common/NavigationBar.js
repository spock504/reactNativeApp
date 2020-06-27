/*
 * @Author: liujian 
 * @Date: 2020-03-01 18:24:11 
 * @Last Modified by: liujian
 * @Last Modified time: 2020-03-01 22:46:58
 */
import React from "react"
import { Text , View, TouchableOpacity } from "react-native"
import PropTypes from "prop-types"

class NavigationBar extends React.Component {
    // 设置所提供属性的类型检查
    static propTypes = {
        title: PropTypes.string,
    }
    constructor(props) {
      super(props);
      this.state = {}
    }

    render() {
      return (
          <View></View>
      )
    }
}