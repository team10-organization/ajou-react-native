import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const city = navigation.getParam('city', null);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9bc8f879c18b16a1feace5ff7ea38ea7`)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }
    let name = this.state.name;
    let celsius = this.state.main.temp - 273.15;
    let description = this.state.weather[0].description;
    let weatherCondition = this.state.weather[0].main;

    return (
      <View style={styles.container}>
        <Text>도시 이름: {name}</Text>
        <Text>날씨: {weatherCondition}</Text>
        <Text>날씨 정보: {description}</Text>
        <Text>온도: {celsius.toFixed(1)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
});