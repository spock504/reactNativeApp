import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 42,
        backgroundColor: '#fff',
    },
})
class RNTestPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // let a = [1,2,3]
        // let value = a[3].toString()
        return (
            <ErrorBoundary>
                <Text>error</Text>
            <BuggyCounter />
            <BuggyCounter />
          </ErrorBoundary>
        )
    }
}

class BuggyCounter extends React.Component {
    constructor(props) {
      super(props);
      this.state = { counter: 0 };
      this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
      this.setState(({counter}) => ({
        counter: counter + 1
      }));
    }
    
    render() {
      if (this.state.counter === 5) {
        // Simulate a JS error
        throw new Error('I crashed!');
      }
      return <Text onPress={this.handleClick}>{this.state.counter}</Text>;
    }
  }

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      // You can also log error messages to an error reporting service here
    }
    
    render() {
        console.log("this.state.errorInfo",this.state.errorInfo)
      if (this.state.errorInfo) {
        // Error path
        return (
          <View>
            <Text>Something went wrong.错了错了</Text>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
          </View>
        );
      }
      // Normally, just render children
      return this.props.children;
    }  
  }

export default RNTestPage