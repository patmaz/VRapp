import React from 'react';
import {
  AppRegistry,
  asset,
  Text,
  View,
  AmbientLight,
  VrButton,
  Pano,
} from 'react-vr';

import { scenes } from './scenes';
import {ImgSwitch} from './components/ImgSwitch';

export default class vrapp extends React.Component {
  state = {
    scene: 0,
    areBtnsHidden: false,
  };

  hideBtns = () => {
    this.setState({
      areBtnsHidden: !this.state.areBtnsHidden,
    })
  };

  prevHandler = () => {
    this.setState({
      scene: this.state.scene === 0 ?
        this.state.scene : this.state.scene  - 1
    });
  };

  nextHandler = () => {
    this.setState({
      scene: this.state.scene === scenes.length - 1 ?
        this.state.scene : this.state.scene  + 1
    });
  };

  render() {
    const scene = scenes[this.state.scene];

    return (
      <View>
        <Pano
          source={asset(`/gallery/360_${scene.pano}_stitched_injected_filter.JPG`)}
          style={{
            transform: [
              {rotateY : 180}
            ],
          }}
        />
        <AmbientLight intensity={ 2.6 }  />
        {
          scene.imgs.map(img =>
            <ImgSwitch
              X={img.X}
              Y={img.Y}
              Z={img.Z}
              rotate={img.rotate}
              label={img.label}
              img={`/gallery/DSC${img.img}_filter.JPG`}
              areBtnsHidden={this.state.areBtnsHidden}
              hideBtns={this.hideBtns}
            />
          )
        }
        {!this.state.areBtnsHidden &&
          <VrButton
            onClick={this.nextHandler}>
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
                transform: [{translate: [0, -0.5, -3]}],
              }}>
              next
            </Text>
          </VrButton>}
        {!this.state.areBtnsHidden &&
          <VrButton
            onClick={this.prevHandler}>
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
                  {translate: [0, -0.5, 3]},
                  {rotateY : 180}
                ],

              }}>
              prev
            </Text>
          </VrButton>}
      </View>
    );
  }
};

AppRegistry.registerComponent('vrapp', () => vrapp);
