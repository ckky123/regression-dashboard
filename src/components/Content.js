import React from 'react'
import Button from './Button'
import Plot from './Plot'
import computeRegression from '../lib/computeRegressions'
import axios from 'axios'


const tempMockData = [
  [1,2,3,4,5,6,7,8,9,10], //X value
  [11,22,3,4,55,6,7,48,19,10], //Dataset1
  [10,12,33,13,15,52,17,57,39,89], //Dataset2
  [120,119,148,114,110,112,144,135,152,110]  //Dataset3
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
      regressionLinesOn: true,
      dataLoaded: false,
      colorList:[]
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
        <Plot datasets={this.state.datasets} regressionResult={this.state.regressionResult} />

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
    console.log(this.state.colorList)
    for(let i =0; i<this.state.datasets.datasets.length; i++){
      if(this.state.datasets.datasets[i].label==='regression'){
        if(this.state.regressionLinesOn){
          this.state.datasets.datasets[i].borderColor = 'transparent'
        }
        else{
          this.state.datasets.datasets[i].borderColor = this.state.colorList[(i-1)/2]
        }
      }
    }
    this.setState({datasets: this.state.datasets, regressionLinesOn: !this.state.regressionLinesOn })
    console.log('this.state.datasets',this.state.datasets)
  }

  async getData(){

    const api = axios.create({
      baseURL: 'http://localhost:4000',
      headers: { 'Content-Type': 'application/json' }
    })
    const res = await api.get('/data')

    console.log('res',res)
    const receivedData = res.data // Should be call to backend for random data

    let originalData = {
      labels:receivedData[0],
      datasets: []
    }
    let originalDataRegression = {
      labels:receivedData[0],
      datasets: []
    }
    const regressionResult = computeRegression(receivedData)

    const data = {
      labels: receivedData[0],
      datasets: []
    }
    let colorList = []
    let o = Math.round, r = Math.random, s = 255;
    for(let i=0; i<regressionResult.length;i++){
      let color = 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')'
      colorList.push(color)

      let dataset = {
        label: `dataset${i}`,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'transparent',
        pointBorderColor: color,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: []
      }

      for(let j=0; j<receivedData[i].length;j++){

        dataset.data.push({
          x: receivedData[0][j],
          y: receivedData[i+1][j],
        })
          
      }

      let datasetRegression={
        label: `regression`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: color,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent',
        pointBorderWidth: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: regressionResult[i]
      }

      originalData.datasets.push(dataset)
      originalData.datasets.push(datasetRegression)
    } 


    
    this.setState({datasets:originalData, regressionResult:regressionResult, dataLoaded: true, colorList: colorList})
    console.log('data', this.state.datasets)
    console.log('regression',regressionResult)
  }
}