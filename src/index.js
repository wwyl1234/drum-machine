import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const AUDIODIR = './media/'

class DrumMachine extends React.Component {
    constructor(props){
        super(props);
        // Use the audio media files from freecodecamp
        this.state = {
            audioMap : {
                'Q': {
                    name: 'Bang',
                    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
                },
                'W': {
                    name: 'Beat',
                    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
                },
                'E': { 
                    name: 'Bling',
                    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
                },
                'A': {
                    name: 'Bloop',
                    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
                },
                'S': {
                    name: 'Boom',
                    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' 
                },
                'D': {
                    name: 'Clap',
                    src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
                },
                'Z': {
                    name: 'Ding',
                    src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
                },
                'X': {
                    name: 'Drumbeat',
                    src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
                },
                'C': {
                    name: 'Zap',
                    src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
                }
            },
            currentAudioName: "",
        };
        this.handleKeyPressed = this.handleKeyPressed.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    // play sound 
    playSound(src){
        let sound = new Audio(src);
         // sound.src = AUDIODIR + audioName + '.m4a';
        sound.currentTime = 0;
        let playPromise = sound.play();
        if (playPromise !== undefined) {
            playPromise
              .then(_ => {
                // Automatic playback started!
                // Show playing UI.
                console.log("audio played auto");
              })
              .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
                console.log("playback prevented");
              });
          }
    }

    // handle key press
    handleKeyPressed(event){
        let keyValue = event.key.toUpperCase();
        if (this.state.audioMap[keyValue] != null){
            this.setState({
                audioMap: this.state.audioMap,
                currentAudioName: this.state.audioMap[keyValue].name,
            });
            this.playSound(this.state.audioMap[keyValue].src);
        }
    }

    // handle mouse key event 
    handleOnClick(keyLetter){
        this.setState({
            audioMap: this.state.audioMap,
            currentAudioName: this.state.audioMap[keyLetter].name,
        });
        // play sound 
        this.playSound(this.state.audioMap[keyLetter].src);
    }

    renderDrumPad(k) {
        return (
            <DrumPad 
                keyLetter={k} 
                audioName={this.state.audioMap[k].name}
                source={this.state.audioMap[k].src}
                onClick={() => this.handleOnClick(k)} 
            />
        );
    }

    render() {
        return (
            <div id='drum-machine' tabIndex="0" onKeyDown={this.handleKeyPressed} className='container'>
                <div className='row'>
                    {this.renderDrumPad('Q')}
                    {this.renderDrumPad('W')}
                    {this.renderDrumPad('E')}
                </div>
                <div className='row'>
                    {this.renderDrumPad('A')}
                    {this.renderDrumPad('S')}
                    {this.renderDrumPad('D')}
                </div>
                <div className='row'>
                    {this.renderDrumPad('Z')}
                    {this.renderDrumPad('X')}
                    {this.renderDrumPad('C')}
                </div>
                <div id='display'>
                    {this.state.currentAudioName}
                </div>
            </div>
        );
    }

}

class DrumPad extends React.Component {

    render(){
        //let audioLocation = AUDIODIR + this.props.audioName + ".m4a";
        return (
            <div className='drum-pad col-sm' id={this.props.audioName} onClick={this.props.onClick}>
                <h1>{this.props.keyLetter}</h1>
                <audio src={this.props.source} className='clip' id={this.props.key}></audio>
            </div>
        )
    }
}


// ============================================
ReactDOM.render(
    <DrumMachine />,
    document.getElementById('root')
);