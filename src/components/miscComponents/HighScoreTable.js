import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { getHighScores } from '../../services/api'

class HighScoreTable extends Component{
  state = {
    scores: []
  }

  componentDidMount = () => {
    getHighScores()
      .then(json => this.setState({scores: json}))
  }

  render(){
    const rows = this.state.scores.map((user, idx) => {
      return(
        <Table.Row key={idx}>
          <Table.Cell>{idx + 1}</Table.Cell>
          <Table.Cell>{user.name}</Table.Cell>
          <Table.Cell>{user.high_score}</Table.Cell>
        </Table.Row>
      )
    })
    return(
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Rank</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows}
        </Table.Body>
      </Table>
    )
  }
}
export default HighScoreTable;
