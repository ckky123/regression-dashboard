import regression from 'regression'

export default function computeRegression(datasets){
    const xValues = datasets[0]
    let results = []
    for (let i = 1; i < datasets.length; i++){
        const yValues = datasets[i]
        const zippedArray = xValues.map((el, j) => {
            return [el, yValues[j]]
        })
        const res = regression.linear(zippedArray)
        const regressedYValues = res.points.map(el=>{
            return el[1]
        })
        results.push(regressedYValues)
    }

    return results
}