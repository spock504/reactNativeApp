import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

export default class WebviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canGoback: false,
      url: 'http://wwww.baidu.com',
    };
  }
  static navigationOptions = () => {
    return {
      title: 'webview页面',
    };
  };
  onNavigationStateChange = e => {
    console.log('来了', e);
    const {canGoback, url} = e; // webview 自带属性canGoback，判断是否可以回退web页面
    this.setState({
      canGoback,
      url,
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <WebView
          ref={ref => (this.webviewRef = ref)}
          startInLoadingState={true}
          onNavigationStateChange={e => this.onNavigationStateChange(e)}
          source={{uri: this.state.url}}
          // source={{uri: 'https://infinite.red'}}
        />
      </View>
    );
  }
}
