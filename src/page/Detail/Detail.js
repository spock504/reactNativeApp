import React from 'react'
import { View, Text, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";

import { setStorage, getStorage, deleteStorage } from '../../util/storage'

const STORAGE_KEY = 'detail_key'

class DetailPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            storageValue: '',
        }
    }
    componentDidMount() {

        this.loadData() // 请求

        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    loadData() {
        let url = 'https://api.github.com/search/repositories?q=java'
        fetch(url)
            .then(response => {
                console.log("response.ok", response.ok)
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Network response was not work.')
            })
            .then(responseJson => {
                console.log("responseJson--", responseJson.total_count)
            }).catch(e => {
                console.log('error info :', e)
            })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    setItemStorage() {
        setStorage(STORAGE_KEY, '23333', () => {
            console.log("设置缓存成功")
        })
    }

    getItemStorage() {
        getStorage(STORAGE_KEY).then((value) => {
            console.log("获取缓存成功",value)
            this.setState({
                storageValue: value
            })
        })
    }

    deleteItemStorage() {
        deleteStorage(STORAGE_KEY).then(() => {
            console.log("删除缓存成功")
            this.setState({
                storageValue: ''
            })
        })
      
    }

    render() {
        const { storageValue } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f4f9' }}>
                <Text>DetailPage Screen</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text onPress={() => this.setItemStorage()}>存储</Text>
                    <Text onPress={() => this.getItemStorage()}>获取</Text>
                    <Text onPress={() => this.deleteItemStorage()}>删除</Text>
                </View>
                {storageValue ? <Text>{storageValue}</Text> : null}
            </View>
        );
    }
}
const mapStateToProps = ({ nav }) => {
    return {
        nav
    }
}
export default connect(mapStateToProps)(DetailPage);
