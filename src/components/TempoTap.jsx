import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TempoTap extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      clickTimes: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let { clickTimes } = this.state;
    const now = Date.now();
    clickTimes = [...clickTimes, now];
    let averageDelay = null;
    if (clickTimes.length > 0) {
      const delays = clickTimes
        .map((clickTime, index) => {
          if (index === 0) return null;
          return clickTime - clickTimes[index - 1];
        })
        .filter(delay => delay !== null);
      const sum = delays.reduce((a, b) => a + b, 0);
      averageDelay = sum / delays.length;
      console.log({ clickTimes, delays, averageDelay });

      // if last delay > prev averageDelay + 1s, then Reset
      if (clickTimes.length > 2) {
        const lastDelay = now - clickTimes[clickTimes.length - 2];
        const prevAverageDelay = (averageDelay * delays.length - lastDelay) / (delays.length - 1);
        if (lastDelay > prevAverageDelay + 1000) {
          averageDelay = null;
          clickTimes = [now];
        }
      }
    }
    this.setState({
      clickTimes: [...clickTimes]
    });

    const { handleChange } = this.props;
    const tempo = Math.round((1000 * 60) / averageDelay);
    // console.log({ tempo, averageDelay });
    if (averageDelay) handleChange(tempo);
  }

  render() {
    // const { averageDelay } = this.state;
    // const displayDelay = averageDelay ? `${averageDelay.toFixed(2)} ms` : 'N/A';
    return (
      <div className="tempoTap">
        <button onClick={this.handleClick}>Tap</button>
      </div>
    );
  }
}

export default TempoTap;
