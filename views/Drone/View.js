import React from 'react';
import {
  asset,
  Text,
  View,
  AmbientLight,
  VrButton,
  Pano,
} from 'react-vr';

import { scenes } from './scenes';
import { loading } from '../StreetArt/loading';

const btnStyle = {
  position: 'absolute',
  backgroundColor: '#000000',
  borderRadius: 0.1,
  fontSize: 0.15,
  layoutOrigin: [0.5, 0.5],
  paddingLeft: 0.1,
  paddingRight: 0.1,
  textAlign: 'center',
  textAlignVertical: 'center',
};

export class Drone extends React.Component {
  state = {
    scene: 0,
    isLoaded: false,
  };

  nextHandler = () => {
    this.setState({
      scene: this.state.scene === scenes.length - 1 ?
        0 : this.state.scene  + 1,
      isLoaded: false,
    });
  };

  isLoadedHandler = () => {
    this.setState({
      isLoaded: true,
    });
  };

  render() {
    const scene = scenes[this.state.scene];

    return (
      <View>
        <Pano
          source={asset(`/drone/${scene.pano}.JPG`)}
          style={{
            transform: [
              {rotateY : 180}
            ],
          }}
          onLoad={this.isLoadedHandler}
        />
        <AmbientLight intensity={ 2.6 }  />
        {
          this.state.isLoaded &&
          <VrButton
            onClick={this.nextHandler}>
            <Text
              style={{
                ...btnStyle,
                transform: [{translate: [0, -0.5, -3]}],
              }}>
              next
            </Text>
          </VrButton>
        }
        {!this.state.isLoaded &&
        <Text
          style={{
            ...btnStyle,
            width: 3,
            transform: [
              {translate: [0, 0, -3]}
            ],
          }}
        >
          {loading[Math.floor(Math.random()*loading.length)]}
        </Text>}
        <VrButton
          onClick={() => {this.linkHandler('https://codebooyah.com')}}>
          <Text
            style={{
              position: 'absolute',
              backgroundColor: '#000000',
              borderRadius: 0.1,
              fontSize: 0.1,
              layoutOrigin: [0.5, 0.5],
              paddingLeft: 0.1,
              paddingRight: 0.1,
              textAlign: 'center',
              textAlignVertical: 'center',
              transform: [
                {translate: [0, 1, 0]},
                {rotateX : -270}
              ],

            }}>
            Made by patmaz from codebooyah.com :)
          </Text>
        </VrButton>
      </View>
    );
  }
}