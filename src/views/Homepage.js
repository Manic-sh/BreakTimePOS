import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Card, Row, Col } from 'antd';
import KOTCard from '../components/KOTCard.js';
import { fetchData } from '../helpers/fetch-common.js'
import { KOT_ENDPOINT, ORDERS_ENDPOINT } from '../helpers/endpoints.js';

import axiosInstance from '../helpers/axios-service';

class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            kots: [],
            doneLoading: false,
            kot: undefined,
        };
    }

    getKOTs() {
        const thisComp = this;
        fetchData(KOT_ENDPOINT, thisComp, 'kots', true);
    }

    updateKOTs = () => {
        this.getKOTs()
    };

    handleSubmit = event => {
        event.preventDefault();
        const data = {
            is_settled: false,
            active: true,
        };
        axiosInstance.post(KOT_ENDPOINT, data)
            .then(resp => {
                if(resp.data){
                    const newOrder = {
                        title: `KOT ${resp.data.id}`,
                        kot: resp.data.id,
                        active: true,
                    };
                    axiosInstance.post(ORDERS_ENDPOINT, newOrder)
                    .then(response => {
                        const new_order_id = response.data.id;
                        const new_url = `/order/${new_order_id}/`;
                        this.props.history.push(new_url)
                    })     
                }
            })
    }
    componentDidMount() {
        this.getKOTs();
        setInterval(this.updateKOTs, 1000);  
    }
    render() {
        const doneLoading = this.state.doneLoading;
        const kots = this.state.kots;
        return (
            <div style={{
                margin: 10,
            }}>
                <Card key={1}>
                    {doneLoading !== false ?
                        <MyContainer key={323} kots={kots} />
                        : <p>No data</p>
                    }
                </Card>
                <div style={{marginTop: 20}}>
                    <Card className="new-order-card">
                        <Button type='primary' size='large' onClick={this.handleSubmit} color='success'>New Order </Button>
                    </Card>
                </div>
            </div>
        )
    }
}


class MyContainer extends React.Component {

    static propTypes = {
        kots: PropTypes.array
    };

    render() {
        const { kots } = this.props;
        return (
            <div>
                <Row>
                    {kots.map((kot, index) => (
                        <KOTCard key={index} kot={kot} />
                    ))
                    }
                </Row>
            </div>

        )
    }
}

export default withRouter(Homepage);
