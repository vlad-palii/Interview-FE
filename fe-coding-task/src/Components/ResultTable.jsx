function ResultTable(props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            {props.resultData != {} &&
              props.resultData.dimension?.Tid?.category?.label &&
              Object.keys(props.resultData.dimension.Tid.category.label).map(
                (key) => {
                  return <th key={key}>{key}</th>
                }
              )}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            {props.resultData != {} &&
              props.resultData.value &&
              props.resultData.value.map(function (name, index) {
                return (
                  <td key={index} value={name}>
                    {name}
                  </td>
                )
              })}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ResultTable
