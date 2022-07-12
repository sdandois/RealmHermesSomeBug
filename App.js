import React, { useCallback, useRef, useEffect, useLayoutEffect, useState } from 'react';
import Realm from 'realm';
import { StyleSheet, Text, FlatList, Button, View } from 'react-native';

import { createRealmContext } from '@realm/react';

class Task extends Realm.Object {
  static generate(id) {
    return {
      id,
      name: `${Math.floor(Math.random() * 100000)}`,
    };
  }

  static schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
    },
  };
}

const RealmContext = createRealmContext({
  schemaVersion: 3,
  deleteRealmIfMigrationNeeded: true,
  schema: [ Task ],

});

export const { useObject, useQuery, useRealm, RealmProvider } = RealmContext;

const getItemLayout = (data, index) => ({
  length: 150,
  offset: 150 * index,
  index,
});

const Section = () => {
  // const data = [];
  const data = useQuery(Task);
  // const realm = useRealm();

  // useEffect(() => {
  //   realm.write(() => {
  //     for (let index = 0; index < 20000; index++) {
  //       const element = Task.generate(index);
  //       realm.create(Task, element, 'all');
  //     }
  //   });
  //   // alert('finished writing');
  // }, [realm]);
  // const data = [{id: 42, name: 'pepe'}];

  const [ start, setStart ] = useState(performance.now())
  const [ end, setEnd ] = useState(performance.now())

  const Item = useCallback(({ item }) => {
    useEffect(() => {
      setEnd(performance.now())
    }, [])
    return (
      <View style={{ height: 150, borderWidth: 1 }}>
        <Text>{item.name ?? 'string'}</Text>
      </View>
    );


  }, [])

  const renderItem = useCallback(({ item }) => {

    return <Item item={item} />


  }, []);

  console.log('length', data.length)

  const flatListRef = useRef();
  const realm = useRealm();

  // return null;

  // return <FlatList renderItem={() => null} data={[]} />;

  // return <View style={{flex: 1, backgroundColor: 'red'}} />;

  // return (<View style={{ flex: 1, backgroundColor: 'cyan' }}>

  //   <FlatList data={data} renderItem={({ item }) => <View />} />

  // </View>);

  const onViewableItemsChanged = useCallback(() => {
    // alert('changed');
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: 'cyan' }}>
      <Text>Delta time: {Math.floor(end - start)}</Text>
      <Button title="Populate" onPress={() => {

        realm.write(() => {

          for (let index = 0; index < 100000; index++) {
            const element = Task.generate(index);
            realm.create(Task, element, 'all');
          }
        })
        alert('finished writing')

      }} />
      <Button title="SCROLL 0" onPress={() => {
        setStart(performance.now())
        flatListRef.current.scrollToIndex({ index: 0 })

      }} />
      <Button title="SCROLL 100" onPress={() => {
        setStart(performance.now())
        flatListRef.current.scrollToIndex({ index: 100 })

      }} />
      <Button title="SCROLL 1000" onPress={() => {
        setStart(performance.now())
        flatListRef.current.scrollToIndex({ index: 1000 })

      }} />
      <Button title="SCROLL 10000" onPress={() => {
        setStart(performance.now())
        flatListRef.current.scrollToIndex({ index: 10000, animated: false })

      }} />
      <Button title="SCROLL 90000" onPress={() => {
        setStart(performance.now())
        flatListRef.current.scrollToIndex({ index: 90000 })

      }} />
      <FlatList
        data={data}
        renderItem={renderItem}
        ref={flatListRef}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged}
        m
      />
    </View>
  );
};

const App = () => {
  return (
    <RealmProvider fallback={<View style={{ flex: 1 }} onFirstOpen={realm => {

    }} />}>
      <Section />
    </RealmProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
