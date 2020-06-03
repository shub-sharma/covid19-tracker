import React from 'react';

import { Table, Cards } from './components';
import { fetchCountriesSummary } from './api';
import styles from './App.module.css';
import { Loader } from 'semantic-ui-react'

class App extends React.Component {
    state = {
        countriesData: {},
        globalData: {},
        isFetching: true
    }
    async componentWillMount() {
        try {
            const data = await fetchCountriesSummary();
            this.setState({ countriesData: data.Countries, globalData: data.Global, isFetching: false });
        } catch {
            console.log("error");
        }
    }

    render() {
        if (this.state.isFetching) return (<Loader active inline='centered' />);

        return (
            <div className={styles.container}>
                <h1>COVID-19 Tracker</h1>
                <div className={styles.cards}>
                    <Cards data={this.state.globalData}/>
                </div>

                <Table data={this.state.countriesData}/>

            </div>
        )
    }
}
export default App;