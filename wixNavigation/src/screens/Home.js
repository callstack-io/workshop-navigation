import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, Linking } from 'react-native';
import { screens } from '../constants';

export default class Home extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: 'rgb(255, 0, 0)',
    navBarTextColor: '#FFFFFF',
    navBarButtonColor: 'white',
  };

  static navigatorButtons = {
    leftButtons: [
      {
        id: 'sideMenu',
      },
    ],
    rightButtons: [
      {
        title: 'Logout',
        id: 'logout',
      },
    ],
  };

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = event => {
    const urlSplit = event.url.split('/');
    const id = urlSplit[urlSplit.length - 1];
    this.props.navigator.push({
      screen: screens.details,
      title: 'Details',
      passProps: {
        id,
        navBarBackgroundColor: 'blue',
      },
      animated: false,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home Screen</Text>
        <Button
          title="Push Screen"
          onPress={() =>
            this.props.navigator.push({
              screen: screens.details,
              title: 'Details',
              passProps: {
                id: 100,
                navBarBackgroundColor: 'blue',
              },
            })}
          color="blue"
        />
        <View style={{ marginTop: 10 }}>
          <Button
            title="Show Modal"
            onPress={() =>
              this.props.navigator.showLightBox({
                style: {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  tapBackgroundToDismiss: true,
                },
                screen: screens.modal,
                passProps: {
                  id: 900,
                },
              })}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 10,
  },
});
