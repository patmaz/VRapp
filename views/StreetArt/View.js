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
import { loading } from './loading';
import { ImgSwitch } from '../../components/ImgSwitch';

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

export class StreetArt extends React.Component {
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
            key={img.img}
            areBtnsHidden={this.state.areBtnsHidden}
            hideBtns={this.hideBtns}
          />
        )
        }
        {
          !this.state.areBtnsHidden &&
          !this.state.isIntroVisible &&
          this.state.isLoaded &&
          this.state.scene !== scenes.length - 1 &&
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
        {
          !this.state.areBtnsHidden &&
          !this.state.isIntroVisible &&
          this.state.isLoaded &&
          this.state.scene !== 0 &&
          <VrButton
            onClick={this.prevHandler}>
            <Text
              style={{
                ...btnStyle,
                transform: [
                  {translate: [0, -1, 3]},
                  {rotateY : 180}
                ],

              }}>
              prev
            </Text>
          </VrButton>
        }
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
            Look around, click on foto-spots, go further and have fun... click here to start.
          </Text>
          <Text
            style={{
              fontSize: 0.05,
            }}
          >
            Made by... look down.
          </Text>
        </VrButton>}
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
                {translate: [0, -1, 0]},
                {rotateX : -90}
              ],

            }}>
            Made by patmaz from codebooyah.com :)
          </Text>
        </VrButton>
      </View>
    );
  }
};