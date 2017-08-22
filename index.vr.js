import React from 'react';
import {
  AppRegistry,
  asset,
  Text,
  View,
  Model,
  AmbientLight,
  VideoPano,
  VrButton,
} from 'react-vr';
import {ImgSwitch} from './components/ImgSwitch';

export default class vrapp extends React.Component {
  state = {
    display: 'none',
  };

  clickHandler = () => {
    this.setState({
      display: this.state.display === 'none' ? 'block' : 'none',
    })
  };

  render() {
    return (
      <View>
        <VideoPano
          source={asset('360.mp4')}
          style={{
            display: this.state.display,
          }}
          loop={true}
          muted={true}
          poster={asset('360.JPG')}
        />
        <AmbientLight intensity={ 2.6 }  />
        <Model
          style={{
          transform: [
            {translate: [0, 40, -40]},
            {scale: 0.3 },
            {rotateY: 20},
            {rotateX: 20},
            {rotateZ: 10} ],
            display: this.state.display === 'none' ? 'block' : 'none',
          }}
          source={{obj:asset('moon.obj'), mtl:asset('moon.mtl')}} lit={true}
        />

        <VrButton
          onClick={()=>this.clickHandler()}>
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
              transform: [{translate: [0, 0, -3]}],
            }}>
            click me
          </Text>
        </VrButton>
        <ImgSwitch
          X={2}
          Y={1}
          Z={-3}
          rotate={-20}
          label="?"
        />
      </View>
    );
  }
};

AppRegistry.registerComponent('vrapp', () => vrapp);
