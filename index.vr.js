import React from 'react';
import {
  AppRegistry,
  asset,
  Text,
  View,
  Model,
  AmbientLight,
  VrButton,
  NativeModules,
} from 'react-vr';
const Linking = NativeModules.LinkingManager;

export default class vrapp extends React.Component {


  clickHandler = (url) => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  render() {
    return (
      <View>
        <AmbientLight intensity={ 2.6 }  />
        <Model
          style={{
          transform: [
            {translate: [0, 35, -40]},
            {scale: 0.3 },
            {rotateY: 20},
            {rotateX: 20},
            {rotateZ: 10} ],
          }}
          source={{obj:asset('moon.obj'), mtl:asset('moon.mtl')}} lit={true}
        />

        <VrButton
          onClick={() => {this.clickHandler('https://360.codebooyah.com/streetart')}}>
          <Text
            style={{
              backgroundColor: '#000000',
              borderRadius: 0.1,
              fontSize: 0.2,
              layoutOrigin: [0.5, 0.5],
              paddingLeft: 0.2,
              paddingRight: 0.2,
              textAlign: 'center',
              textAlignVertical: 'center',
              transform: [{translate: [0, 0.1, -3]}],
            }}>
            street art gallery
          </Text>
        </VrButton>
        <Text
          style={{
            backgroundColor: '#000000',
            borderRadius: 0.1,
            fontSize: 0.15,
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          or
        </Text>
        <VrButton
          onClick={() => {this.clickHandler('https://360.codebooyah.com/wawa')}}>
          <Text
            style={{
              backgroundColor: '#000000',
              borderRadius: 0.1,
              fontSize: 0.2,
              layoutOrigin: [0.5, 0.5],
              paddingLeft: 0.2,
              paddingRight: 0.2,
              textAlign: 'center',
              textAlignVertical: 'center',
              transform: [{translate: [0, -0.1, -3]}],
            }}>
            warsaw panorama
          </Text>
        </VrButton>
      </View>
    );
  }
};

AppRegistry.registerComponent('vrapp', () => vrapp);
