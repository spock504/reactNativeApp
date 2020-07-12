import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

export default class WebviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canGoback: false,
      url: 'wwww.baidu.com',
    };
  }
  onNavigationStateChange = e => {
    const {canGoback, url} = e;
    this.setState({
      canGoback,
      url,
    });
  };
  render() {
    <View style={{flex: 1}}>
      <WebView
        ref={ref => (this.webviewRef = ref)}
        startInLoadingState={true}
        onNavigationStateChange={e => this.onNavigationStateChange(e)}
        source={{uri: this.state.url}}
      />
    </View>;
  }
}
