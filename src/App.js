import React from 'react';

import { Table, Cards } from './components';
import { fetchCountriesSummary } from './api';
import styles from './App.module.css';
import { Header, Loader } from 'semantic-ui-react'

class App extends React.Component {
    state = {
        countriesData: {},
        globalData: {},
        isFetching: true,
        error: ''
    }


    async componentWillMount() {
        try {
            const data = await fetchCountriesSummary();
            this.setState({ countriesData: data.Countries, globalData: data.Global, isFetching: false });
        } catch {
            this.setState(
                {
                    error: "Error occurred executing api request. Please refresh to try again.",
                    isFetching: false
                });
        }
    }

    render() {
        if (this.state.isFetching) {
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

        return (
            <div className={styles.container}>
                <h1 className={styles.h1}>COVID-19 Tracker</h1>

                <div className={styles.cards}>
                    <Cards data={this.state.globalData} />
                </div>

                <Table data={this.state.countriesData} />

            </div>
        )
    }
}
export default App;