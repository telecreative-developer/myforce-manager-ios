import React, { Component } from 'react'
import StepIndicator from 'react-native-step-indicator'

const labels = ["Visit","Propose Product","Order Summary","Deal","Payment","Finished"]

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#2d3ad2',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#2d3ad2',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#2d3ad2',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#2d3ad2',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#2d3ad2',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#2d3ad2',
}

export default class PipelineProgress extends Component {
  onPageChange(position) {
    this.setState({currentPosition: position});
  }

  onPress() {
    this.props.navigate
  }

  render() {
    return (
      <StepIndicator
        customStyles={customStyles}
        currentPosition={this.props.currentPosition}
        stepCount={6}
        labels={labels}
        onPress={this.props.modal}
      />
    )
  }
}
