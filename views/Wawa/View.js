import React from 'react';
import {
  asset,
  View,
  AmbientLight,
  VideoPano,
} from 'react-vr';

export class Wawa extends React.Component {

  render() {
    return (
      <View>
        <VideoPano
          source={asset('360_720p.mp4')}
          loop={true}
          muted={true}
          poster={asset('360.JPG')}
        />
        <AmbientLight intensity={ 2.6 }  />
      </View>
    );
  }
}
