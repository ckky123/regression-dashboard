import React from 'react'
import Button from './Button'
import Plot from './Plot'
import computeRegression from '../lib/computeRegressions'

const tempMockData = [
  [1,2,3,4,5,6,7,8,9,10], //X value
  [1,2,3,4,5,6,7,8,9,10], //Dataset1
  [1,1,3,3,5,5,7,7,9,9], //Dataset2
  [10,9,8,7,6,5,4,3,2,1]  //Dataset3
]


export default class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeDatasets: {
        1: false,
        2: false,
        3: false
      },
      datasets: [],
      regressionResult: [],
      regressionLinesOn: false,
      dataLoaded: false
    }
  }

  componentDidMount(){
    this.getData()
  }

  render(){
    return (
      <div>
        {/* Toggle Buttons */}
        <Button buttonText="Dataset 1" clickHandler={() => this.toggleDatasetActive(1)}/>
        <Button buttonText="Dataset 2" clickHandler={() => this.toggleDatasetActive(2)}/>
        <Button buttonText="Dataset 3" clickHandler={() => this.toggleDatasetActive(3)}/>

        {/* Chart */}
        <Plot datasets={this.state.datasets}/>

        {/* Activate regressions */}
        <Button buttonText = "Show Regression lines" clickHandler={() => this.toggleRegressionLines()}/>
      </div>
    )
  }

  toggleDatasetActive(setNumber){
    let activeDatasets = this.state.activeDatasets
    activeDatasets[setNumber] = !activeDatasets[setNumber]
    this.setState({activeDatasets: activeDatasets})
  }

  toggleRegressionLines(){
    let regressionLinesOn = this.state.regressionLinesOn
    regressionLinesOn = !regressionLinesOn
    this.setState({regressionLinesOn: regressionLinesOn})
  }

  getData(){
    const receivedData = tempMockData // Should be call to backend for random data
    const regressionResult = computeRegression(receivedData)
    this.setState({datasets:tempMockData, regressionResult:regressionResult, dataLoaded: true})
    console.log(regressionResult)
  }
}