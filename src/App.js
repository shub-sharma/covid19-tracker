import React from 'react';

import { Table, Cards } from './components';
import { fetchCountriesSummary } from './api';
import styles from './App.module.css';
class App extends React.Component {
    state = {
        countriesData: {},
        globalData: {}
    }
    async componentDidMount() {
        const data = await fetchCountriesSummary();
        this.setState({ countriesData: data.Countries, globalData: data.Global });
    }

    render() {
        console.log(this.state);
        return (
            <div className={styles.container}>
                <h1>COVID-19 Tracker</h1>
                <div className={styles.cards}>
                    <Cards />
                    <Cards />
                    <Cards />
                    <Cards />
                </div>

                <Table data={this.countriesData.data} />

            </div>
        )
    }
}
export default App;