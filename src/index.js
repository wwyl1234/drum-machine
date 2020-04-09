import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const AUDIODIR = '/public/media/'

class DrumMachine extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            audioMap : {
                'Q': 'Bang',
                'W': 'Beat',
                'E': 'Bling',
                'A': 'Bloop',
                'S': 'Boom',
                'D': 'Clap',
                'Z': 'Ding',
                'X': 'Drumbeat',
                'C': 'Zap',
            },
            currentAudioName: "",
        };
        this.handleKeyPressed = this.handleKeyPressed.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    // play sound 
    playSound(audioName){
        let sound = new Audio(AUDIODIR + audioName + '.m4a');
        sound.play();
    }

    // handle key press
    handleKeyPressed(event){
        let keyValue = event.key.toUpperCase();
        if (this.state.audioMap[keyValue] != null){
            this.setState({
                audioMap: this.state.audioMap,
                currentAudioName: this.state.audioMap[keyValue],
            });
            this.playSound(this.state.audioMap[keyValue]);
        }
    }

    // handle mouse key event 
    handleOnClick(keyLetter){
        this.setState({
            audioMap: this.state.audioMap,
            currentAudioName: this.state.audioMap[keyLetter],
        });
        // play sound 
        this.playSound(this.state.audioMap[keyLetter]);
    }

    renderDrumPad(k) {
        return (
            <DrumPad 
                keyLetter={k} 
                audioName={this.state.audioMap[k]}
                onClick={() => this.handleOnClick(k)} 
            />
        );
    }

    render() {
        return (
            <div id='drum-machine' tabIndex="0" onKeyDown={this.handleKeyPressed}>
                {this.renderDrumPad('Q')}
                {this.renderDrumPad('W')}
                {this.renderDrumPad('E')}
                {this.renderDrumPad('A')}
                {this.renderDrumPad('S')}
                {this.renderDrumPad('D')}
                {this.renderDrumPad('Z')}
                {this.renderDrumPad('X')}
                {this.renderDrumPad('C')}
                <div id='display'>
                    {this.state.currentAudioName}
                </div>
            </div>
        );
    }

}

class DrumPad extends React.Component {

    render(){
        let audioLocation = AUDIODIR + this.props.audioName + ".m4a";
        return (
            <div className='drum-pad' id={this.props.audioName} onClick={this.props.onClick} >
                <h1>{this.props.keyLetter}</h1>
                <audio src={audioLocation} className='clip' id={this.props.key} type="audio/mp4"></audio>
            </div>
        )
    }
}


// ============================================
ReactDOM.render(
    <DrumMachine />,
    document.getElementById('root')
);