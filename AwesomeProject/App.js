import React, { Component } from 'react';
import { Image, ScrollView, Text } from 'react-native';
import ListPage from './ListPage'
import ScrollableTabView, { DefaultTabBar,ScrollableTabBar, } from 'react-native-scrollable-tab-view';
export default class App extends Component {
  render() {
    return (
      <ScrollableTabView
    style={{marginTop: 20, }}
    initialPage={1}
    renderTabBar={() => <ScrollableTabBar />}
  >
    <ListPage tabLabel='Tab #1'></ListPage>
    <Text tabLabel='Tab #2'>favorite</Text>
    <Text tabLabel='Tab #3'>project</Text>
    <Text tabLabel='Tab #3'>project</Text>
    <Text tabLabel='Tab #3'>project</Text>
  </ScrollableTabView>
    );
  }
}
