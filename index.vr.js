import React from 'react';
import {
  AppRegistry,
  asset,
  Text,
  View,
  AmbientLight,
  VrButton,
  Pano,
  NativeModules,
} from 'react-vr';
const Linking = NativeModules.LinkingManager;

import { Intro } from './views/Intro';
import { StreetArt } from './views/StreetArt/View';
import { Wawa } from './views/Wawa/View';

export default class vrapp extends React.Component {
  state = {
    currentView: null,
  };

  views = [
    {
      component: StreetArt,
      label: 'street art gallery',
      name: 'streetArt',
      props: {},
    },
    {
      component: Wawa,
      label: 'warsaw panorama',
      name: 'wawa',
      props: {},
    }
  ];

  renderView = (view) => {
    if (view === null){
      return;
    }
    const ViewToRender = this.views[view].component;
    return <ViewToRender {...this.views[view].props}/>;
  };

  changeViewHandler = (view) => {
    this.setState({
      currentView: view,
    })
  };

  linkHandler = (url) => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  render() {
    const { currentView } = this.state;

    return (
      <View>
        <Intro
          changeView={this.changeViewHandler}
          views={this.views}
          mode={currentView === null ? 'full' : 'btn'}
        />

        { this.renderView(currentView) }

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
    )
  }


};

AppRegistry.registerComponent('vrapp', () => vrapp);
