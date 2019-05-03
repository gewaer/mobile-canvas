// Importing package modules.
import React, { Component } from "react";
import {
	View,
  Image,
  Dimensions,
  Slider,
  Text,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";
import Stylesheet from "./stylesheet";
import { colors } from "../../config/styles";
import { getPercentage } from '../../lib/helpers';

import Sound from 'react-native-sound';

const deviceWidth = Dimensions.get("window").width;
const itemWidth = getPercentage(deviceWidth, 80);
const img_speaker = require('./resources/ui_speaker.png');
const img_pause = require('./resources/ui_pause.png');
const img_play = require('./resources/ui_play.png');
const img_playjumpleft = require('./resources/ui_playjumpleft.png');
const img_playjumpright = require('./resources/ui_playjumpright.png');

interface State {
  playState: String
}
interface Props {
  title: String,
  filepath: String
}

class AudioPlayer extends Component<State,Props> {

	static defaultProps = {
    activeSlide: 0
  }

  constructor(){
    super();
    this.state = {
        playState:'paused', //playing, paused
        playSeconds:0,
        duration:0
    }
    this.sliderEditing = false;
  }

  componentDidMount(){
    this.play();

    this.timeout = setInterval(() => {
        if(this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing){
          this.sound.getCurrentTime((seconds, isPlaying) => {
              this.setState({playSeconds:seconds});
          })
        }
      }, 100);
    }

  componentWillUnmount(){
    if(this.sound){
      this.sound.release();
      this.sound = null;
    }
    if(this.timeout){
      clearInterval(this.timeout);
    }
  }

  onSliderEditStart = () => {
    this.sliderEditing = true;
  }
  onSliderEditEnd = () => {
    this.sliderEditing = false;
  }
  onSliderEditing = value => {
    if(this.sound){
      this.sound.setCurrentTime(value);
      this.setState({playSeconds:value});
    }
  }

  play = async () => {
    if(this.sound){
      this.sound.play(this.playComplete);
      this.setState({playState:'playing'});
    } else {
      const filepath = this.props.filepath;
      console.log('[Play]', filepath);

      this.sound = new Sound(filepath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          Alert.alert('Notice', 'audio file error. (Error code : 1)');
          this.setState({playState:'paused'});
        }else{
          this.setState({playState:'playing', duration:this.sound.getDuration()});
          this.sound.play(this.playComplete);
        }
      });
    }
  }

  playComplete = (success) => {
    if(this.sound){
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        Alert.alert('Notice', 'audio file error. (Error code : 2)');
      }
      this.setState({playState:'paused', playSeconds:0});
      this.sound.setCurrentTime(0);
    }
  }

  pause = () => {
    if(this.sound){
      this.sound.pause();
    }
    this.setState({playState:'paused'});
  }

  jumpPrev30Seconds = () => {this.jumpSeconds(-30);}
  jumpNext30Seconds = () => {this.jumpSeconds(30);}
  jumpSeconds = (secsDelta) => {
    if(this.sound){
      this.sound.getCurrentTime((secs, isPlaying) => {
        let nextSecs = secs + secsDelta;
        if(nextSecs < 0) nextSecs = 0;
        else if(nextSecs > this.state.duration) nextSecs = this.state.duration;
        this.sound.setCurrentTime(nextSecs);
        this.setState({playSeconds:nextSecs});
      })
    }
  }

  getAudioTimeString(seconds){
    const h = parseInt(seconds/(60*60));
    const m = parseInt(seconds%(60*60)/60);
    const s = parseInt(seconds%60);

    return ((h<10?'0'+h:h) + ':' + (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
  }


	render() {
		const {
      title,
      filepath
    } = this.props;
    const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration);

		return (
      <View style={ Stylesheet.container }>
        <Image source={ img_speaker } style={ Stylesheet.coverImage }/>
        <View style={ Stylesheet.topContainer }>
          <TouchableOpacity onPress={ this.jumpPrev30Seconds } style={ Stylesheet.jumpIconContainer }>
            <Image source={img_playjumpleft} style={ Stylesheet.jumpIcon }/>
            <Text style={ Stylesheet.jumpLabel }>30</Text>
          </TouchableOpacity>
          {this.state.playState == 'playing' &&
          <TouchableOpacity onPress={this.pause} style={ Stylesheet.playPauseContainer }>
            <Image source={img_pause} style={ Stylesheet.jumpIcon }/>
          </TouchableOpacity>}
          {this.state.playState == 'paused' &&
          <TouchableOpacity onPress={this.play} style={ Stylesheet.playPauseContainer }>
            <Image source={img_play} style={ Stylesheet.jumpIcon }/>
          </TouchableOpacity>}
          <TouchableOpacity onPress={this.jumpNext30Seconds} style={ Stylesheet.jumpIconContainer }>
            <Image source={img_playjumpright} style={ Stylesheet.jumpIcon }/>
            <Text style={{position:'absolute', alignSelf:'center', marginTop:1, color:'white', fontSize:12}}>30</Text>
          </TouchableOpacity>
        </View>
        <View style={ Stylesheet.bottomContanier }>
          <Text style={ Stylesheet.sliderLabel }>{currentTimeString}</Text>
          <Slider
              onTouchStart={this.onSliderEditStart}
              onTouchEnd={this.onSliderEditEnd}
              onValueChange={this.onSliderEditing}
              value={this.state.playSeconds} maximumValue={this.state.duration} maximumTrackTintColor='gray' minimumTrackTintColor='white' thumbTintColor='white'
              style={ Stylesheet.slider }/>
          <Text style={ Stylesheet.sliderLabel }>{durationString}</Text>
        </View>
      </View>
		);
	}
}

export default AudioPlayer;
