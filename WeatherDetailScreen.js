import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Constants } from 'expo';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
      return {
          title : `날씨정보 : ${navigation.getParam('city', 'Unknown')}`,
      }
  }


  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const city = navigation.getParam('city', null);
    //const city = 'Daejeon';

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

      if(this.state.isLoading)
      {
        return (
            <View style={styles.loadingContainer}>
                <Image source = {require('./assets/Loading.gif')} style = {{width : 360, height : 240}}></Image>
                <Text style = {styles.text}>데이터를 불러오는 중입니다.</Text>
            </View>
        );
      }

      let celsius = this.state.main.temp - 273.15;
      let celsius_min = this.state.main.temp_min - 273.15;
      let celsius_max = this.state.main.temp_max - 273.15;

      let weatherIcon;
      let weatherString;
      let weatherDesc;
      let background;

      if(this.state.weather[0].main != 'Rain')
      {
        
        weatherIcon = require('./assets/white/sun.png');
        weatherString = "맑은 하늘이 왔네요.\n 산책나가시는건 어떨까요";
        weatherDesc = '맑음';
        background = require('./assets/night.jpg');

      }
      else
      {
        weatherIcon = require('./assets/white/umbrella.png');
        weatherString = "구름이 울고 있네요.\n 막아줄 우산을 준비하세요.";
        weatherDesc = '비';
        background = require('./assets/rainybg3.jpg');

      }

      
      return(
        
        <ImageBackground source = {background}  style={styles.backGroudStyle}>
          
          <View style = {styles.firstContainer}>
              <Text style = {styles.firstText}>{'\n'}{weatherString}</Text>
          </View> 
          <View style= {styles.mainContainer}>
            <View style = {styles.iconContainer}>
              <Image style = {styles.imageStyle} source = {weatherIcon}/>
              <Text style = {styles.iconText}>{weatherDesc}</Text>
            </View>
            <View style = {styles.tempContainer}>
              <Text style = {styles.celsiusText}>{celsius.toFixed(1)}C</Text>
              <Text style = {styles.celsiusSubText}>최저 {celsius_min.toFixed(1)}C 최고 {celsius_max.toFixed(1)}C</Text>
              
            </View>
          </View>
          <View style = {styles.lastContainer}>
            <View style = {styles.subContainer}>
              <Image style = {{width : 50, height : 50}} source = {require('./assets/white/wind.png')}/>
              <Text style = {{fontSize : 35, color : 'white'}}>{this.state.wind.speed}노트</Text>
              <Text style = {{fontSize : 25, color : 'white'}}>풍속</Text>
            </View>
            <View style = {styles.subContainer}>
              <Image style = {{width : 50, height : 50}} source = {require('./assets/white/drop.png')}/>
              <Text style = {{fontSize : 35, color : 'white'}}>{this.state.main.humidity}</Text>
              <Text style = {{fontSize : 25, color : 'white'}}>습도</Text>
            </View>
            <View style = {styles.subContainer}>
              <Image style = {{width : 50, height : 50}} source = {require('./assets/white/cloud.png')}/>
              <Text style = {{fontSize : 35, color : 'white'}}>{this.state.clouds.all}</Text>
              <Text style = {{fontSize : 25, color : 'white'}}>구름</Text>
            </View>
          </View>
          
        </ImageBackground>
        
      )
  }
}

const styles = StyleSheet.create({

  container : {
    flex : 1,
    
  },

  backGroudStyle : {
    
    width : '100%',
    height : '100%',
    resizeMode : 'cover'
   
  },

  firstContainer : {
    flex : 1,

  },


  mainContainer: {
    flex: 2,
    flexDirection : "row",
    
    alignItems : 'center',

  },

  iconContainer : {
    flex : 1,
    alignItems : 'center',
    
  },

  tempContainer : {
    flex : 1,

  },
  
  
  lastContainer : {
    flex : 2,
    flexDirection : 'row',
    
   
  },

  subContainer : {
    flex : 1,
    
    alignItems : 'center',

  },
  

  firstText : {
    fontSize : 30,
    textAlign : 'center',
    color : 'white'
  },

  iconText : {
    fontSize : 25,
    textAlign : 'center',
    color : 'white'
    
  },

  celsiusText :{
    fontSize : 60,
    textAlign: 'center',
    color : 'white'
  },

  celsiusSubText : {
    fontSize : 20,
    textAlign : 'center',
    color : 'white'
  },

  imageStyle : {
    width : 140,
    height : 140,
  },

  loadingContainer: {
    flex : 1,
    
    alignItems : 'center'
  }
});