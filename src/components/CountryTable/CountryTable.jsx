import React, { Component } from 'react';
import { Table, Image, Container, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import styles from './CountryTable.module.css';

export default class CountryTable extends Component {
	constructor(props) {
		super(props);
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
		this.setState(
			{
				column: 'TotalConfirmed',
				data: _.sortBy(this.props.data, ['TotalConfirmed']).reverse(),
				direction: 'descending',
			});
		var keys = Object.keys(localStorage),
			i = keys.length;
		while (i--) {
			this.props.favoriteCountry(localStorage[keys[i]]);
		}

	}
	/**
	 * Sort the column of the table
	 * @param {*} clickedColumn the column to be sorted
	 */
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
	/**
	 * Render favorite table, very similar to country table
	 */
	renderFavTable = () => {
		if (this.props.favoriteCountriesData.length === 0) return null;
		let data = this.props.favoriteCountriesData;
		for (var country in data) {
			data[country]['CurrentlyInfected'] = data[country].TotalConfirmed - data[country].TotalRecovered;
		}
		return (

			<div>
				<h2 className={styles.header}>Favorite Countries</h2>
				<Container className={styles.container}>
					<Table className={styles.table} unstackable celled inverted selectable>
						<Table.Header className={styles.tableTop}>
							<Table.Row>

								<Table.HeaderCell
									textAlign="left"
								>
									Country
                			</Table.HeaderCell>

								<Table.HeaderCell
									textAlign="right"
								>
									Total Confirmed
                			</Table.HeaderCell>

								<Table.HeaderCell
									textAlign="right"
								>
									Total Recovered
                			</Table.HeaderCell>

								<Table.HeaderCell
									textAlign="right"
								>
									Total Deaths
                			</Table.HeaderCell>

								<Table.HeaderCell
									textAlign="right"
								>
									Confirmed Today
                			</Table.HeaderCell>

								<Table.HeaderCell
									textAlign="right"
								>
									Recovered Today
                			</Table.HeaderCell>

								<Table.HeaderCell
									textAlign="right"
								>
									Deaths Today
                			</Table.HeaderCell>

								<Table.HeaderCell
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
										<Image src={require(`../../countryFlags/images/${CountryCode}.png`)} alt={`${Country}`} verticalAlign="middle" size='mini' />
										{this.props.favoriteCountriesData.find(countryData => countryData.Country === Country)
											?
											<Icon className={styles.star} color="yellow" name='star' onClick={() => {
												this.props.favoriteCountry(Country);
												localStorage.removeItem(CountryCode);

											}
											} />
											:
											<Icon className={styles.star} color="white" name='star outline' onClick={() => {

												this.props.favoriteCountry(Country);
												localStorage[CountryCode] = Country;
											}
											} />
										}
										<div>{Country}</div>

									</Table.Cell>
									<Table.Cell className={styles.orangeText} textAlign="right">{TotalConfirmed.toLocaleString()}</Table.Cell>
									<Table.Cell className={styles.greenText} textAlign="right">{TotalRecovered.toLocaleString()}</Table.Cell>
									<Table.Cell className={styles.redText} textAlign="right">{TotalDeaths.toLocaleString()}</Table.Cell>
									<Table.Cell className={styles.orangeText} textAlign="right">{NewConfirmed.toLocaleString()}</Table.Cell>
									<Table.Cell className={styles.greenText} textAlign="right">{NewRecovered.toLocaleString()}</Table.Cell>
									<Table.Cell className={styles.redText} textAlign="right">{NewDeaths.toLocaleString()}</Table.Cell>
									<Table.Cell className={styles.greyText} textAlign="right">{(TotalConfirmed - TotalRecovered - TotalDeaths).toLocaleString()}</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				</Container>
			</div>
		)
	}


	render() {
		const { column, data, direction } = this.state;
		for (var country in data) {
			data[country]['CurrentlyInfected'] = data[country].TotalConfirmed - data[country].TotalRecovered;
		}
		return (
			<Container>

				{this.renderFavTable()}
				<h2 className={styles.header}>Countries List</h2>
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
									textAlign="right"
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
										<Image src={require(`../../countryFlags/images/${CountryCode}.png`)} alt={`${Country}`} verticalAlign="middle" size='mini' />

										{this.props.favoriteCountriesData.find(countryData => countryData.Country === Country)
											?
											<Icon className={styles.star} color="yellow" name='star' onClick={() => {
												this.props.favoriteCountry(Country);
												localStorage.removeItem(CountryCode);

											}
											} />
											:
											<Icon className={styles.star} color="white" name='star outline' onClick={() => {

												this.props.favoriteCountry(Country);
												localStorage[CountryCode] = Country;
											}
											} />
										}
										<div>{Country}</div>

									</Table.Cell>
									<Table.Cell className={styles.orangeText} textAlign="right">{TotalConfirmed.toLocaleString()}</Table.Cell>
									<Table.Cell className={styles.greenText} textAlign="right">{TotalRecovered.toLocaleString()}</Table.Cell>
									<Table.Cell className={styles.redText} textAlign="right">{TotalDeaths.toLocaleString()}</Table.Cell>
									<Table.Cell className={styles.orangeText} textAlign="right">{NewConfirmed.toLocaleString()}</Table.Cell>
									<Table.Cell className={styles.greenText} textAlign="right">{NewRecovered.toLocaleString()}</Table.Cell>
									<Table.Cell className={styles.redText} textAlign="right">{NewDeaths.toLocaleString()}</Table.Cell>
									<Table.Cell className={styles.greyText} textAlign="right">{(TotalConfirmed - TotalRecovered - TotalDeaths).toLocaleString()}</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				</Container>
			</Container>

		)
	}
}