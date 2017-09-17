import React from 'react';
import {
  asset,
  View,
  Model,
  AmbientLight,
  VrButton,
  Text,
} from 'react-vr';

btnStyle = {
  backgroundColor: '#000000',
  borderRadius: 0.1,
  fontSize: 0.2,
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
            {translate: [0, 4, -4]},
            {rotateX : 20},
          ]
        }}>
          <VrButton
            onClick={() => {this.props.changeView(null)}}
          >
            <Text
              style={{
                ...btnStyle,
                width: 2,
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
        <AmbientLight intensity={ 2.6 }  />
        <Model
          style={{
            transform: [
              {translate: [0, 35, -40]},
              {scale: 0.3 },
              {rotateY: 20},
              {rotateX: 20},
              {rotateZ: 10} ],
          }}
          source={{obj:asset('moon.obj'), mtl:asset('moon.mtl')}} lit={true}
        />
        <View style={{
          transform: [{translate: [0, 0, -2]}],
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
                    width: 2,
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