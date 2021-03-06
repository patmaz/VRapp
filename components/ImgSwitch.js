import React from 'react';
import {
  asset,
  Text,
  View,
  VrButton,
  Animated,
} from 'react-vr';

export class ImgSwitch extends React.Component {
  state = {
    imgVisible: false,
    bounceValue: new Animated.Value(0),
    btnBgr: 'rgba(0, 0, 0, 0.7)',
    isLoaded: false,
  };

  clickHandler = () => {
    if (!this.state.isLoaded) {
      return;
    }
    this.setState({
      imgVisible: this.state.imgVisible !== true,
    });
    this.props.hideBtns();
    this.appearHandler();
    this.onExitHandler();
  };

  appearHandler = () => {
    this.state.bounceValue.setValue(0.9);
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 1,
        friction: 1,
      }
    ).start();
  };

  onEnterHandler = () => {
    this.setState({
      btnBgr: 'rgba(0, 0, 0, 1)'
    });
  };

  onExitHandler = () => {
    this.setState({
      btnBgr: 'rgba(0, 0, 0, 0.7)'
    });
  };

  isLoadedHandler = () => {
    this.setState({
      isLoaded: true,
    })
  };

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          layoutOrigin: [0.5, 0.5],
          transform: [
            {translate: [this.props.X, this.props.Y, this.props.Z]},
            {rotateY : this.props.rotate}
            ],
        }}
      >
        {!this.props.areBtnsHidden &&
          <VrButton
            onClick={this.clickHandler}
            onEnter={this.onEnterHandler}
            onExit={this.onExitHandler}
          >
            <Text
              style={{
                backgroundColor: this.state.btnBgr,
                borderRadius: 0.1,
                fontSize: 0.1,
                paddingLeft: 0.1,
                paddingRight: 0.1,
                textAlign: 'center',
                textAlignVertical: 'center',
                zIndex: 1,
              }}>
              { this.state.isLoaded ? this.props.label : '...' }
            </Text>
          </VrButton>}
        <VrButton onClick={()=>this.clickHandler()}>
          <Animated.Image
            source={asset(this.props.img)}
            style={{
              width: 3,
              height: 2,
              zIndex: 1000,
              transform: [
                {scale: this.state.bounceValue},
              ],
              display: this.state.imgVisible ? 'flex' : 'none',
            }}
            onLoad={this.isLoadedHandler}
          />
        </VrButton>
      </View>
    )
  }
}

ImgSwitch.defaultProps = {
  X: 0,
  Y: 0,
  Z: -3,
  rotate: 0,
  label: 'click',
  img: '360.JPG',
};