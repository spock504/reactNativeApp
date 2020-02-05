import React from 'react'
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';

import DataStore from '../../expand/dao/DataStore'
import { setStorage, getStorage } from '../../util/storage'

// 离线缓存框架 使用

class StorageData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showText: '',
        }
        this.dataStorage = new DataStore()
    }
    componentDidMount() {
        getStorage('https://api.github.com/search/repositories?q=Java').then(value=>{
            console.log("缓存的数据",value)
        })
    }
    

    loadData() {
        // console.log("搜索值", this.value)
        let url = `https://api.github.com/search/repositories?q=${this.value}`
        this.dataStorage.fetchData(url)
            .then(data => {
                let showText = `初次数据加载时间 :${new Date(parseInt(data.timestamp))} \n 数据${JSON.stringify(data.data)}`
                this.setState({
                    showText,
                })
            }).catch(e => {
                console.log('error info :', e)
            })
    }

    render() {
        const { showText } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f4f9' }}>
                <Text>StorageData Screen</Text>
                <TextInput
                    placeholder="请输入点什么进行请求吧"
                    onChangeText={(value) => {
                        this.value = value
                    }}
                />
                <Button
                    title='获取数据'
                    onPress={() => this.loadData()}
                />
                {showText ? <Text style={{ marginBottom: 10, lineHeight: 14 }} >{showText}</Text> : null}
            </View>
        );
    }
}
const mapStateToProps = ({ }) => {
    return {}
}
export default connect(mapStateToProps)(StorageData);
