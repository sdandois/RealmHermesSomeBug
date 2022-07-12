import React, { useCallback, useRef} from 'react';
import Realm from 'realm';
import {StyleSheet, Text, FlatList, Button, View} from 'react-native';

import {createRealmContext} from '@realm/react';

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
  schemaVersion: 2,
  deleteRealmIfMigrationNeeded: true,
  schema: [Task],
  // onFirstOpen: realm => {
  //   for (let index = 0; index < 20000; index++) {
  //     const element = Task.generate(index);
  //     realm.create(Task, element, 'all');
  //   }
  // },
});

export const {useObject, useQuery, useRealm, RealmProvider} = RealmContext;

const getItemLayout = (data, index) => ({
  length: 150,
  offset: 150 * index,
  index,
});

const Section = () => {
  const data = [];
  // const data = useQuery(Task);
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

  // const renderItem = useCallback(({item}) => {
  //   return (
  //     <View style={{height: 150, borderWidth: 1}}>
  //       <Text>{item.name ?? 'string'}</Text>
  //     </View>
  //   );
  // }, []);

  const flatListRef = useRef();

  // return null;

  return <FlatList renderItem={() => null} data={[]} />;

  return <View style={{flex: 1, backgroundColor: 'red'}} />;

  return <FlatList data={[]} renderItem={({item}) => <View />} />;

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ref={flatListRef}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

const App = () => {
  return (
    <RealmProvider fallback={<View style={{flex: 1}} />}>
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
