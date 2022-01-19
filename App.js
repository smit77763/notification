import React, {useState, useEffect} from 'react';
import {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {FlatList} from 'react-native';

const App = () => {
  const [mid, setMid] = useState(0);
  const [data, setData] = useState([]);

  const callApi = () => {
    fetch('http://contest-test-2.herokuapp.com/usernotifi/getByMid', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: '600fb97efe981e0004891abb',
        mid: mid,
      }),
    }).then(result => {
      result.json().then(resp => {
        //resp is array
        // console.warn('response : ',resp);
        // this.state.data = [...this.state.data, ...resp];
        if (resp.data == '') {
          console.log('no data fond bolte');
        }

        setData([...data, ...resp]);
        // this.state.mid=this.state.data.length;
        console.warn('data : ', data, 'Length : ', data?.length, 'mid : ', mid);
      });
    });
  };

  useEffect(() => {
    callApi();
  }, [mid]);

  return (
    <View style={styles.container}>
      <View style={styles.FlatList}>
        <FlatList
          data={data}
          renderItem={({item: data, index}) => {
            console.log(' IN Flatlist');
            return (
              <Text style={styles.text}>
                {index + 1} ){data.type} : {data.qty}
              </Text>
            );
          }}
          onEndReached={() => {
            setMid(data?.length);
          }}
          onEndReachedThreshold={0.5}
          // style={styles.FlatList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    // backgroundColor: 'white',
    paddingVertical: 70,
    borderBottomWidth: 2,
    // alignSelf: 'center',
  },
  FlatList: {
    backgroundColor: 'yellow',
    borderWidth: 3,
    flex: 0.6,

    // padding: 50,
  },
});

export default App;
