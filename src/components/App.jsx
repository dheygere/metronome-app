import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { init } from '../utils/metronome';

import MeterControl from './MeterControl';
import MeterDisplay from './MeterDisplay';
import TempoDisplay from './TempoDisplay';
import TempoSlider from './TempoSlider';
import PlayPauseBtn from './PlayPauseBtn';
import VolumeControls from './VolumeControls';

class App extends Component {
  static propTypes = {
    meter: PropTypes.number.isRequired,
    setMeter: PropTypes.func.isRequired,
    setTempo: PropTypes.func.isRequired,
    tempo: PropTypes.number.isRequired,
    togglePlayPause: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    init();
  }

  render() {
    const { isPlaying, meter, setMeter, setTempo, tempo, togglePlayPause } = this.props;
    return (
      <div className="App">
        <div className="top-controls-panel">
          <TempoDisplay tempo={tempo} />
          <PlayPauseBtn isPlaying={isPlaying} handleClick={togglePlayPause} />
        </div>
        <TempoSlider handleChange={setTempo} tempo={tempo} />
        <div className="meter-panel">
          <h3 className="title">Meter</h3>
          <div>
            <MeterDisplay meter={meter} />
            <MeterControl handleChange={setMeter} meter={meter} />
          </div>
        </div>
        <VolumeControls {...this.props} />
      </div>
    );
  }
}

export default App;
