import React, { Component } from 'react'
import MaterialTable from 'material-table'

export default class ActionsOnSelectedRows extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, key: 1 },
                { name: 'ab Betül', surname: 'Baran', birthYear: 2017, birthCity: 34, key: 2 },
                { name: 'cd Betül', surname: 'Baran', birthYear: 2017, birthCity: 34, key: 3 },
                { name: 'ef Betül', surname: 'Baran', birthYear: 2017, birthCity: 34, key: 4 },
              ]
        }
    }

    render() {
      return (
        <MaterialTable
          title="Actions On Selected Rows Preview"
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Surname', field: 'surname' },
            { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
            {
              title: 'Birth Place',
              field: 'birthCity',
              lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            },
          ]}
          data={this.state.data}        
          options={{
            selection: true
          }}
          actions={[
            {
              tooltip: 'Remove All Selected Users',
              icon: 'delete',
              onClick: (evt, data) => {
                  //alert('You want to delete ' + data.length + ' rows')
                  console.log(data)
                  data.forEach((it) => {
                    console.log(it.key)
                    this.setState((prevState) => {
                        let prevData = [...prevState.data]
                        prevData = prevData.filter(instrument => instrument.key !== it.key)
                        console.log(prevData.length)
                        return{data: prevData}
                    })
                  })
              }
            }
          ]}
        />
      )
    }
  }