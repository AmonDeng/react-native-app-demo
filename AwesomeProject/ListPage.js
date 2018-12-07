import React, { Component } from 'react';
import { Image,FlatList, StyleSheet, Text, View,RefreshControl } from 'react-native';
var REQUEST_URL =
  "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";
export default class ListPage extends Component {
  constructor(props) {
        super(props)

        this.state = {
            refreshing: false,
            isLoreMoreing: 'LoreMoreing',
            dataSource: [],
            data: [],

        }
        this.responseData = [];
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
          data: this.state.data.concat(responseData.movies),
          refreshing: false
        });
        this.isLoreMore = false;
      });
  }
    isLoreMore = false;
    LoreMore = ()=> {

        if (this.isLoreMore == false) {
            this.setState({
                isLoreMoreing: 'LoreMoreing',
            });


            this.fetchData();
            // this.responseData = this.responseData.concat({id: '加载的新数据'});
            // setTimeout(() => {
            //     this.setState({
            //         dataSource: this.responseData,
            //     })
            // }, 500);
            //
            // setTimeout(() => {
            //     this.setState({
            //         isLoreMoreing: 'LoreMoreEmpty'
            //     })
            // }, 500);
        }
    }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
          refreshControl={
         <RefreshControl
           refreshing={this.state.refreshing}
           onRefresh={this.fetchData}
         />
       }
          data={this.state.data}
        renderItem={this.renderMovie}
          onEndReachedThreshold={0.1}
          onEndReached={this.LoreMore}
          ListFooterComponent={this.renderFooter}

        />
      </View>
    );
  }
  renderMovie({ item }) {
   // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
   // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
   return (
     <View style={styles.container}>
       <Image
         source={{ uri: item.posters.thumbnail }}
         style={styles.thumbnail}
       />
       <View style={styles.rightContainer}>
         <Text style={styles.title}>{item.title}</Text>
         <Text style={styles.year}>{item.year}</Text>
       </View>
     </View>
   );
 }

  renderFooter = ()=> {

        if (this.state.isLoreMoreing == 'LoreMoreing') {
            return (
                <View style={{
                    height: 44,
                    backgroundColor: 'rgb(200,200,200)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>{'正在加载....'}</Text>
                </View>
            )
        } else if (this.state.isLoreMoreing == 'LoreMoreEmpty') {
            return (
                <View style={{
                    height: 44,
                    backgroundColor: 'rgb(200,200,200)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>{'暂无更多'}</Text>
                </View>
            )
        } else {
            return null
        }

    }
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  container: {
   flex: 1,
   flexDirection: "row",
   justifyContent: "center",
   alignItems: "center",
   backgroundColor: "#F5FCFF"
 },
 rightContainer: {
   flex: 1
 },
 title: {
   fontSize: 20,
   marginBottom: 8,
   textAlign: "center"
 },
 year: {
   textAlign: "center"
 },
 thumbnail: {
   width: 53,
   height: 81
 },
 list: {
   paddingTop: 20,
   backgroundColor: "#F5FCFF"
 }
})
