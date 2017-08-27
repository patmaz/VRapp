import React from 'react';
import {
  AppRegistry,
  asset,
  View,
  AmbientLight,
  VideoPano,
} from 'react-vr';

export default class vrapp extends React.Component {

  render() {
    return (
      <View>
        <VideoPano
          source={asset('360-520p.mp4')}
          loop={true}
          muted={true}
          poster={asset('360.JPG')}
        />
        <AmbientLight intensity={ 2.6 }  />
      </View>
    );
  }
};

AppRegistry.registerComponent('vrapp', () => vrapp);
