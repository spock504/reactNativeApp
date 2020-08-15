import React from 'react';
import {View, Text, Linking, Image} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

export default class ParallaxPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = () => {
    return {
      title: 'parallax页面',
    };
  };

  handleLinkPress = () => {
    const url = 'tel:10086';
    Linking.canOpenURL(url)
      .then(support => {
        if (!support) {
          console.log("can't handle url :", url);
        } else {
          Linking.openURL(url);
        }
      })
      .catch(e => {
        console.log('an error occurred', e);
      });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 60, backgroundColor: 'green'}} />
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: 60, backgroundColor: 'red'}} />
          <ParallaxScrollView
            style={{flex: 1, backgroundColor: 'hotpink', overflow: 'hidden'}}
            renderBackground={() => (
              <Image
                source={{
                  uri: `https://placekitten.com/414/350`,
                  width: window.width,
                  height: 350,
                }}
              />
            )}
            renderFixedHeader={() => (
              <Text
                style={{
                  textAlign: 'right',
                  color: 'white',
                  padding: 5,
                  fontSize: 20,
                }}>
                Hello
              </Text>
            )}
            parallaxHeaderHeight={350}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 30}}>Meow!</Text>
              <Text
                style={{fontSize: 30}}
                onPress={() => this.handleLinkPress()}>
                open tel
              </Text>
            </View>
          </ParallaxScrollView>
          <View style={{width: 60, backgroundColor: 'orange'}} />
        </View>
        <View style={{height: 60, backgroundColor: 'blue'}} />
      </View>
    );
  }
}
