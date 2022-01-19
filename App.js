import React from 'react';
import {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {FlatList} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mid: 0,
      data: [],
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
      <View style={styles.container}>
        <Text>Hello 1</Text>
        <FlatList
          data={this.state.data}
          renderItem={data => <Text>${data.type}</Text>}
          onEndReached={() => {
            this.setState({mid: this.data.length});
          }}
          style={styles.FlatList}
        />
        <Text>Hello 2</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'black',
    backgroundColor: 'white',
  },
  FlatList: {
    backgroundColor: 'yellow',
  },
});
