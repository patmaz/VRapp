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
    isIntroVisible: true,
    isLoaded: false,
  };

  hideBtns = () => {
    this.setState({
      areBtnsHidden: !this.state.areBtnsHidden,
    })
  };

  closeIntoHandler = () => {
    this.setState({
      isIntroVisible: false,
    })
  };

  prevHandler = () => {
    this.setState({
      scene: this.state.scene === 0 ?
        this.state.scene : this.state.scene  - 1,
      isLoaded: false,
    });
  };

  nextHandler = () => {
    this.setState({
      scene: this.state.scene === scenes.length - 1 ?
        this.state.scene : this.state.scene  + 1,
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
          source={asset(`/gallery/360_${scene.pano}_stitched_injected_filter.JPG`)}
          style={{
            transform: [
              {rotateY : 180}
            ],
          }}
          onLoad={this.isLoadedHandler}
        />
        <AmbientLight intensity={ 2.6 }  />
        {this.state.isLoaded && !this.state.isIntroVisible &&
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
        {!this.state.areBtnsHidden && !this.state.isIntroVisible && this.state.isLoaded &&
          <VrButton
            onClick={this.nextHandler}>
            <Text
              style={{
                position: 'absolute',
                backgroundColor: '#000000',
                borderRadius: 0.1,
                fontSize: 0.15,
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
        {!this.state.areBtnsHidden && !this.state.isIntroVisible && this.state.isLoaded &&
          <VrButton
            onClick={this.prevHandler}>
            <Text
              style={{
                position: 'absolute',
                backgroundColor: '#000000',
                borderRadius: 0.1,
                fontSize: 0.15,
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
        {this.state.isIntroVisible && this.state.isLoaded &&
          <VrButton
            onClick={this.closeIntoHandler}
            style={{
              position: 'absolute',
              transform: [{translate: [0, 0, -3]}],
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderRadius: 0.1,
              fontSize: 0.1,
              layoutOrigin: [0.5, 0.5],
              width: 2,
              height: 1,
              paddingLeft: 0.1,
              paddingRight: 0.1,
              paddingTop: 0.1,
            }}
          >
            <Text>
              Welcome to the VR street art gallery.
            </Text>
            <Text>
              It is the best art gallery in Warsaw (Poland), moved from the Trasa Siekierkowska to VR world.
            </Text>
            <Text>
              Look around, click on img-spots, go further and have fun... click here to start.
            </Text>
            <Text
              style={{
                fontSize: 0.05,
              }}
            >
              Made by... look down.
            </Text>
          </VrButton>}
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
              {translate: [0, -1, 0]},
              {rotateX : -90}
            ],

          }}>
          Made by patmaz from codebooyah.com :)
        </Text>
        {!this.state.isLoaded &&
          <Text
            style={{
              position: 'absolute',
              backgroundColor: '#000000',
              borderRadius: 0.1,
              fontSize: 0.2,
              layoutOrigin: [0.5, 0.5],
              paddingLeft: 0.1,
              paddingRight: 0.1,
              textAlign: 'center',
              textAlignVertical: 'center',
              transform: [
                {translate: [0, 0, -3]}
              ],
            }}
          >
            Keep calm, loading some awesome content...
          </Text>}
      </View>
    );
  }
};

AppRegistry.registerComponent('vrapp', () => vrapp);
