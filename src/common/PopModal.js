import React, {Component} from 'react';
import {TouchableOpacity, Modal, StyleSheet, View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class PopModal extends Component {
  state = {
    visible: true,
  };

  dismiss() {
    this.setState({
      visible: false,
    });
  }
  render() {
    const {visible} = this.state;
    const {onClose, data = []} = this.props;
    return (
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => onClose}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.dismiss()}>
          <MaterialIcons
            name={'arrow-drop-up'}
            size={36}
            style={styles.arrow}
          />
          <View style={styles.content}>
            {data.map((item, index) => {
              return (
                <TouchableOpacity
                  key={`key_${index}`}
                  style={styles.textContainer}>
                  <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  arrow: {
    marginTop: 40,
    color: '#fff',
    padding: 0,
    margin: -15,
  },
  content: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 3,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  text: {
    fontSize: 13,
  },
});
