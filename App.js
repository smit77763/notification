/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Component} from 'react';
import {View, Text} from 'react-native';

import {FlatList} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mid: 0,
      data: [],
      // lengthOfData:''
    };
  }

  async componentDidMount() {
    // let data=this.state.data;
    // let mid=this.state.mid;

    try {
      await fetch('http://contest-test-2.herokuapp.com/usernotifi/getByMid', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: '600fb97efe981e0004891abb',
          mid: this.state.mid,
        }),
      }).then(result => {
        result.json().then(resp => {
          //resp is array
          // console.warn('response : ',resp);
          this.state.data = [...this.state.data, ...resp];

          // this.state.mid=this.state.data.length;
          console.warn(
            'data : ',
            this.state.data,
            'Length : ',
            this.state.data.length,
            'mid : ',
            this.state.mid,
          );
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => {
            return <Text style={{color: 'white'}}>{item.qty} </Text>;
          }}
        />
      </View>
    );
  }
}
