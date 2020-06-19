import React, { Component } from 'react';
import { Table, Image, Container } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import _ from 'lodash';
import styles from './FavoriteTable.module.css';



export default class FavoriteTable extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		this.state = {
			column: null,
			data: {},
			direction: null,
		}
	}
	/**
	 * Initially sort the total confirmed cases in a descending order
	 */
	componentWillMount() {
		console.log(this.props);
		this.setState(
			{
				column: 'TotalConfirmed',
				data: _.sortBy(this.props.data, ['TotalConfirmed']).reverse(),
				direction: 'descending'
			});
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
			return
		}

		this.setState({
			data: data.reverse(),
			direction: direction === 'ascending' ? 'descending' : 'ascending',
		})
	}
	generateTable = (data) => {
		return (
			<h1>yeet</h1>
		)
	}

	render() {
		return this.generateTable('as');
		const { column, data, direction } = this.state;
		for (var country in data) {
			data[country]['CurrentlyInfected'] = data[country].TotalConfirmed - data[country].TotalRecovered;
		}
		console.log(this.state);
		return (

			<Container className={styles.container}>
				<Table className={styles.table} unstackable sortable celled inverted selectable>
					<Table.Header className={styles.tableTop}>
						<Table.Row>

							<Table.HeaderCell
								sorted={column === 'Country' ? direction : null}
								onClick={this.handleSort('Country')}
								textAlign="left"
							>
								Country
                			</Table.HeaderCell>

							<Table.HeaderCell
								sorted={column === 'TotalConfirmed' ? direction : null}
								onClick={this.handleSort('TotalConfirmed')}
								textAlign="right"
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
								textAlign="right"
							>
								Total Deaths
                			</Table.HeaderCell>

							<Table.HeaderCell
								sorted={column === 'NewConfirmed' ? direction : null}
								onClick={this.handleSort('NewConfirmed')}
								textAlign="right"
							>
								Confirmed Today
                			</Table.HeaderCell>

							<Table.HeaderCell
								sorted={column === 'NewRecovered' ? direction : null}
								onClick={this.handleSort('NewRecovered')}
								textAlign="right"
							>
								Recovered Today
                			</Table.HeaderCell>

							<Table.HeaderCell
								sorted={column === 'NewDeaths' ? direction : null}
								onClick={this.handleSort('NewDeaths')}
								textAlign="right"
							>
								Deaths Today
                			</Table.HeaderCell>

							<Table.HeaderCell
								sorted={column === 'CurrentlyInfected' ? direction : null}
								onClick={this.handleSort('CurrentlyInfected')}
								textAlign="right"
							>
								Currently Infected
                			</Table.HeaderCell>

						</Table.Row>
					</Table.Header>
					<Table.Body>
						{_.map(data, ({ Country, CountryCode, NewConfirmed, NewDeaths, NewRecovered, TotalConfirmed, TotalDeaths, TotalRecovered }) => (
							<Table.Row key={Country}>
								<Table.Cell textAlign="left">
									<Image src={"https://www.countryflags.io/" + CountryCode + "/shiny/64.png"} verticalAlign="middle" size='mini' />

									{this.state.data.find(countryData => countryData.Country === Country) 
									? 
									 <Icon className={styles.star} color="yellow" name='star' onClick={() => this.props.favoriteCountry(Country)}/>
									:
									 <Icon className={styles.star} name='star outline' onClick={() => this.props.favoriteCountry(Country)}/>

									 }
									<div>{Country}</div>

								</Table.Cell>
								<Table.Cell className={styles.orangeText} textAlign="right">{TotalConfirmed.toLocaleString()}</Table.Cell>
								<Table.Cell className={styles.greenText} textAlign="right">{TotalRecovered.toLocaleString()}</Table.Cell>
								<Table.Cell className={styles.redText} textAlign="right">{TotalDeaths.toLocaleString()}</Table.Cell>
								<Table.Cell className={styles.orangeText} textAlign="right">{NewConfirmed.toLocaleString()}</Table.Cell>
								<Table.Cell className={styles.greenText} textAlign="right">{NewRecovered.toLocaleString()}</Table.Cell>
								<Table.Cell className={styles.redText} textAlign="right">{NewDeaths.toLocaleString()}</Table.Cell>
								<Table.Cell className={styles.greyText} textAlign="right">{(TotalConfirmed - TotalRecovered).toLocaleString()}</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</Container>


		)
	}
}