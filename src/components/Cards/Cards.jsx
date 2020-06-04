import React from 'react';
import { Card, Container } from 'semantic-ui-react'
import CountUp from 'react-countup';
import styles from './Cards.module.css';


const Cards = ({ data: { TotalDeaths, TotalConfirmed, TotalRecovered } }) => {
  if (!TotalDeaths) {
    return 'Spinner';
  }
  return (
    <Container className={styles.container}>
      <Card.Group itemsPerRow="4" centered ui two doubling stackable cards>

        <Card className={styles.totalConfirmed}>
          <Card.Content>
            <Card.Header>
              <CountUp start={0} end={TotalConfirmed} duration={1} separator="," />
            </Card.Header>
            <Card.Description>
              Total Confirmed
          </Card.Description>
          </Card.Content>
        </Card>

        <Card className={styles.totalRecovered}>
          <Card.Content>
            <Card.Header>
              <CountUp start={0} end={TotalRecovered} duration={1} separator="," />
            </Card.Header>
            <Card.Description>
              Total Recovered
          </Card.Description>
          </Card.Content>
        </Card>

        <Card className={styles.totalDeaths}>
          <Card.Content>
            <Card.Header>
              <CountUp start={0} end={TotalDeaths} duration={1} separator="," />
            </Card.Header>
            <Card.Description>
              Total Deaths
          </Card.Description>
          </Card.Content>
        </Card>

        <Card className={styles.currentInfected}>
          <Card.Content>
            <Card.Header>
              <CountUp start={0} end={TotalConfirmed - TotalRecovered} duration={1} separator="," />
            </Card.Header>
            <Card.Description>
              Currently Infected
          </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>

</Container>
  )


}
export default Cards;