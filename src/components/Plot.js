import React from 'react'
import {Line} from 'react-chartjs-2'



export default class Plot extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    console.log('showLine',this.props.regressionLinesOn)
  	return (
      <div>
      <div style={{width: "70%"}}>
          <Line data={this.props.datasets}/>
      </div>
    </div>
    )
  }
}
