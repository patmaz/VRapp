import React from 'react';
import {
  asset,
  View,
  Model,
  AmbientLight,
  VrButton,
  Text,
  Pano,
} from 'react-vr';

btnStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  borderRadius: 0.1,
  fontSize: 0.1,
  layoutOrigin: [0.5, 0.5],
  paddingLeft: 0.2,
  paddingRight: 0.2,
  textAlign: 'center',
  textAlignVertical: 'center',
};

export class Intro extends React.Component {
  render() {
    if (this.props.mode === 'btn') {
      return(
        <View style={{
          position: 'absolute',
          transform: [
            {translate: [0, 2.5, -4]},
            {rotateX : 20},
          ]
        }}>
          <VrButton
            onClick={() => {this.props.changeView(null)}}
          >
            <Text
              style={{
                ...btnStyle,
                width: 1,
              }}>
              return
            </Text>
          </VrButton>
        </View>
      )
    }

    return (
      <View
        style={{transform: [{translate: [0, 0, 0]},]}}
      >
        <Pano
          source={asset('360_intro_forest.jpg')}
          style={{
            transform: [{rotateY: 90}],
          }}
        />
        <AmbientLight intensity={ 2.6 }  />
        <Model
          style={{
            transform: [
              {translate: [0, 70, -100]},
              {scale: 0.3 },
              {rotateY: 20},
              {rotateX: 20},
              {rotateZ: 10} ],
          }}
          source={{obj:asset('moon.obj'), mtl:asset('moon.mtl')}} lit={true}
        />
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            borderRadius: 0.1,
            fontSize: 0.1,
            layoutOrigin: [0.5, 0.5],
            width: 2,
            height: 1,
            paddingLeft: 0.1,
            paddingRight: 0.1,
            paddingTop: 0.05,
            transform: [{translate: [-0.8, 0, -2]}],
            position: 'absolute',
          }}
        >
          <Text>
            Welcome to the 360 Project - my playground focused on web VR development using ReactVR framework.
          </Text>
          <Text>
            Choose one of the places in VR for further exploration. In any time you can look up forward in order to return to this home place. Enjoy!
          </Text>
          <Text
            style={{
              fontSize: 0.05,
            }}
          >
            Made by... look down.
          </Text>
        </View>
        <View style={{
          transform: [{translate: [0.8, 0.4, -2]}],
          position: 'absolute',
          flex: 1,
          flexDirection: 'column',
          width: 2,
        }}>
          {
            this.props.views.map((view, index) =>
              <VrButton
                key={view.name}
                onClick={() => {this.props.changeView(index)}}
              >
                <Text
                  style={{
                    ...btnStyle,
                    marginTop: 0.1,
                    width: 1,
                  }}>
                  { view.label }
                </Text>
              </VrButton>
            )
          }
        </View>
      </View>
    );
  }
}