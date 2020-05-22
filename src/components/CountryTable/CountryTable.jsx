import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';
import styles from './CountryTable.module.css';
const YEETDATA = [

  { name: 'John', age: 15, gender: 'Male' },
  { name: 'Amber', age: 40, gender: 'Female' },
  { name: 'Leslie', age: 25, gender: 'Other' },
  { name: 'Ben', age: 70, gender: 'Male' },
]

export default class CountryTable extends Component {
  state = {
    column: null,
    data: YEETDATA,
    direction: null,
  }

  componentDidMount () {
    console.log("yeet");
  }

  handleSort = (clickedColumn) => () => {
    const { column, data, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  render() {
    const { column, data, direction } = this.state

    return (

      <div className={styles.container}>
        <div className="ui container">
          <Table sortable celled fixed selectable>
            <Table.Header>
              <Table.Row>

                <Table.HeaderCell
                  sorted={column === 'name' ? direction : null}
                  onClick={this.handleSort('name')}
                >
                  Country
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={column === 'age' ? direction : null}
                  onClick={this.handleSort('age')}
                >
                  Total Confirmed
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={column === 'gender' ? direction : null}
                  onClick={this.handleSort('gender')}
                >
                  Total Recovered
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={column === 'gender' ? direction : null}
                  onClick={this.handleSort('gender')}
                >
                  Total Deaths
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={column === 'gender' ? direction : null}
                  onClick={this.handleSort('gender')}
                >
                  Confirmed Today
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={column === 'gender' ? direction : null}
                  onClick={this.handleSort('gender')}
                >
                  Recovered Today
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={column === 'gender' ? direction : null}
                  onClick={this.handleSort('gender')}
                >
                  Deaths Today
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={column === 'gender' ? direction : null}
                  onClick={this.handleSort('gender')}
                >
                  Deaths Today
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={column === 'gender' ? direction : null}
                  onClick={this.handleSort('gender')}
                >
                  Currently Infected 
                </Table.HeaderCell>
                
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(data, ({ age, gender, name }) => (
                <Table.Row key={name}>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>{age}</Table.Cell>
                  <Table.Cell>{gender}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>


    )
  }
}