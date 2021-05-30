import React, { useState, useEffect, useMemo } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Jumbotron,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { SelectField } from '../../common/components/SelectField';
import { Table } from '../../common/components/Table';
import { TextField } from '../../common/components/TextField';
import { TextFieldVertical } from '../../common/components/TextFieldVertical';
import { createBet, fetchBets } from '../../services/bets/api';
import { calculateCoefficient } from '../../services/bets/helpers';
import { Bet } from '../../services/bets/types';
import { Country } from '../../services/covidData/types';
import { useGlobalContext } from '../../services/providers/GlobalProvider';

export const BettingPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const { countries, covidData } = useGlobalContext();

  const { country, value, amount } = watch();

  const [bets, setBets] = useState<Bet[]>([]);
  const selectedCovidData = useMemo(() => {
    if (country) {
      return covidData.find((c) => c.countryId === country.id);
    }
    return covidData.find((c) => c.countryName === 'Global')!;
  }, [country, covidData]);

  const coefficient = useMemo(
    () => calculateCoefficient(selectedCovidData?.avg || 0, parseInt(value)),
    [selectedCovidData, value]
  );

  const payout = useMemo(
    () => ((amount || 0) * parseFloat(coefficient)).toFixed(4),
    [coefficient, amount]
  );

  useEffect(() => {
    const initialCountry = countries.find((c) => c.name === 'Global')!;

    setValue('country', initialCountry);
  }, [countries]);

  useEffect(() => {
    (async () => {
      try {
        const betsData = await fetchBets();
        setBets(betsData);
      } catch (e) {
        //ignore error
      }
    })();
  }, []);
  const onSubmit = async (data: any) => {
    try {
      await createBet({ ...data, coefficient: coefficient });
    } catch (e) {
      // ignore error
    }
  };
  return (
    <div className="landingPage">
      <Form
        id="form"
        style={{ width: '100%' }}
        onSubmit={handleSubmit(onSubmit)}
        className="form"
      >
        <Container fluid className="bettingPage">
          <Row
            style={{
              width: '100%',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <Col xs="6" style={{ textAlign: 'center' }}>
              <h1>Create Bet</h1>
            </Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col xs={12} lg={4}>
              <Card className="infoCard">
                <Card.Header>
                  <b>Average Last Week:</b>
                </Card.Header>
                <Card.Body>
                  <p> {selectedCovidData?.avg}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} lg={4}>
              <Card className="infoCard">
                <Card.Header>
                  <b>Today Last Week:</b>
                </Card.Header>
                <Card.Body>
                  {' '}
                  <p>{selectedCovidData?.todayLastWeek}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} lg={4}>
              <Card className="infoCard">
                <Card.Header>
                  <b>Yesterday:</b>
                </Card.Header>
                <Card.Body>
                  {' '}
                  <p>{selectedCovidData?.yesterday}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col xs={12} lg={6}>
              <Card className="betCard">
                <Card.Header>
                  <b>Betting info</b>
                </Card.Header>
                <Card.Body>
                  <TextField
                    name={'value'}
                    placeholder="Number of Cases"
                    control={control}
                    error={!!errors.value}
                  />
                  <TextField
                    name={'amount'}
                    placeholder="Bet Amount"
                    control={control}
                    error={!!errors.amount}
                  />
                  <SelectField
                    options={countries}
                    getOption={(opt: Country) => opt.name || ''}
                    label="Country"
                    name={'country'}
                    placeholder="Global"
                    control={control}
                    error={!!errors.amount}
                  />
                  <Button type="submit">Create Bet</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} lg={6}>
              <Card className="infoCard">
                <Card.Header>
                  <b>Coefficient</b>
                </Card.Header>
                <Card.Body>
                  <p>{coefficient}</p>
                </Card.Body>
              </Card>
              <Card className="infoCard">
                <Card.Header>
                  <b>Payout</b>
                </Card.Header>
                <Card.Body>
                  <p>{payout}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Form>
      <Table columns={columns()} data={bets} />
    </div>
  );
};

export const route = '/betting';

const columns: any = () => {
  return [
    {
      Header: 'ID',
      accessor: 'status',
    },
    {
      Header: 'Value',
      accessor: 'value',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
    },
    {
      Header: 'Coefficient',
      accessor: 'coefficient',
    },
    {
      Header: 'Country',
      accessor: 'statu4s',
    },
    {
      Header: 'Date',
      accessor: 'stat5us',
    },
    {
      Header: 'Result',
      accessor: 'statu3s',
    },
  ];
};
