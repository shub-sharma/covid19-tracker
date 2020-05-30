import React, { Component } from 'react';
import { Header, Table, Image } from 'semantic-ui-react';
import _ from 'lodash';
import styles from './CountryTable.module.css';
import { fetchCountriesSummary } from '../../api';

export default class CountryTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      column: 'null',
      data: this.props.data,
      direction: null,
    }
  }

  async componentDidMount() {
    try {
      const data = await fetchCountriesSummary();
      this.setState({ data: data.Countries });
      this.handleSort('TotalConfirmed');
    } catch(err) {
      console.log(err);
    }
  }


  handleSort = (clickedColumn) => () => {
    console.log(clickedColumn);
    const { column, data, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })
      console.log(this.props);
      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  render() {
    const { column, data, direction } = this.state;
    for(var country in data) {
      data[country]['CurrentlyInfected'] = data[country].TotalConfirmed - data[country].TotalRecovered;
    }
    console.log(this.state);

    return (

      <div className={styles.container}>
        <div className="ui container">
          <Table sortable celled fixed selectable>
            <Table.Header>
              <Table.Row>

                <Table.HeaderCell
                  sorted={column === 'Country' ? direction : null}
                  onClick={this.handleSort('Country')}
                >
                  Country
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={column === 'TotalConfirmed' ? direction : null}
                  onClick={this.handleSort('TotalConfirmed')}
                >
                  Total Confirmed
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={column === 'TotalRecovered' ? direction : null}
                  onClick={this.handleSort('TotalRecovered')}
                >
                  Total Recovered
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={column === 'TotalDeaths' ? direction : null}
                  onClick={this.handleSort('TotalDeaths')}
                >
                  Total Deaths
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={column === 'NewConfirmed' ? direction : null}
                  onClick={this.handleSort('NewConfirmed')}
                >
                  Confirmed Today
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={column === 'NewRecovered' ? direction : null}
                  onClick={this.handleSort('NewRecovered')}
                >
                  Recovered Today
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={column === 'NewDeaths' ? direction : null}
                  onClick={this.handleSort('NewDeaths')}
                >
                  Deaths Today
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={column === 'CurrentlyInfected' ? direction : null}
                  onClick={this.handleSort('CurrentlyInfected')}
                >
                  Currently Infected
                </Table.HeaderCell>

              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(data, ({ Country, CountryCode, NewConfirmed, NewDeaths, NewRecovered, TotalConfirmed, TotalDeaths, TotalRecovered }) => (
                <Table.Row key={Country}>
                  <Table.Cell>
                  <Image src={"https://www.countryflags.io/"+ CountryCode + "/shiny/64.png"} verticalAlign="middle" size='mini' />
                  {/* <Header.Content>{Country}</Header.Content> */}
                  
                  <div>{Country}</div>
                  

                  </Table.Cell>
                  <Table.Cell>{TotalConfirmed.toLocaleString()}</Table.Cell>
                  <Table.Cell>{TotalRecovered}</Table.Cell>
                  <Table.Cell>{TotalDeaths}</Table.Cell>
                  <Table.Cell>{NewConfirmed}</Table.Cell>
                  <Table.Cell>{NewRecovered}</Table.Cell>
                  <Table.Cell>{NewDeaths}</Table.Cell>
                  <Table.Cell>{TotalConfirmed - TotalRecovered}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>


    )
  }
}