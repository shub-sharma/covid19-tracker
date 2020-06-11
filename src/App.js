import React from 'react';

import { Table, Cards, FavoriteTable } from './components';
import { fetchCountriesSummary } from './api';
import styles from './App.module.css';
import { Header, Loader } from 'semantic-ui-react'

class App extends React.Component {
    state = {
        countriesData: {},
        globalData: {},
        isFetching: true,
        error: '',
        favoriteCountriesData: []
    }

    favoriteCountry = (country) =>  {
        var countryData = this.state.countriesData.find(countryObject => countryObject.Country === country)

        var favorited = this.state.favoriteCountriesData.filter(cData => cData.Country === country);
        if (favorited.length) { // Already favorited, delete from favorite.
            this.setState(prevState => ({
                favoriteCountriesData: prevState.favoriteCountriesData.filter(cData => cData.Country !== country)
            }))
        } else {
            this.setState(prevState => ({
                favoriteCountriesData: [...prevState.favoriteCountriesData, countryData]
            }));
        }
        console.log(this.state.favoriteCountriesData);
	}

    async componentWillMount() {
        try {
            const data = await fetchCountriesSummary();
            this.setState({ countriesData: data.Countries, globalData: data.Global, isFetching: false });
                        // this.setState({ countriesData: data.Countries, globalData: data.Global, isFetching: false });
        } catch {
            this.setState(
                {
                    error: "Error occurred executing api request. Please refresh to try again.",
                    isFetching: false
                });
        }
    }

    render() {
        if (this.state.isFetching) { // Loading while fetching API request
            return (
                <div className={styles.container}>
                    <Loader className={styles.loader} inverted size="large" active inline='centered' />

                </div>
            );
        } else if (this.state.error !== '') {
            return (
                <div className={styles.container}>
                    <h1 className={styles.error}>{this.state.error}</h1>
                </div>
            );
        }
        console.log(this.state);
        return (
            <div className={styles.container}>
                <h1 className={styles.h1}>COVID-19 Tracker</h1>

                <div className={styles.cards}>
                    <Cards data={this.state.globalData} />
                </div>
                <FavoriteTable data={this.state.favoriteCountriesData} favoriteCountry={this.favoriteCountry} />

                <Table className={styles.table} data={this.state.countriesData} favoriteCountry={this.favoriteCountry} favoriteCountriesData={this.state.favoriteCountriesData}/>

            </div>
        )
    }
}
export default App;