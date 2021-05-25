import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { Button, Card, Row, Col } from 'antd';
import KOTCard from '../components/KOTCard.js';
import { fetchData } from '../helpers/fetch-common.js'
import { KOT_ENDPOINT, ORDERS_ENDPOINT } from '../helpers/endpoints.js';

import AuthService from "../helpers/axios-services/auth-service";
import axios from 'axios';

class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            kots: [],
            doneLoading: false,
            kot: undefined,
            new_order: false,
            new_order_id: '',
            currentUser: AuthService.getCurrentUser()
        };
    }

    getKOTs() {
        const thisComp = this;
        fetchData(KOT_ENDPOINT, thisComp, 'kots', true);
    }

    updateKOTs = () => {
        this.getKOTs()
    };

    newOrder = (id) => {
        const thisComp = this;
        const data = {
            title: `KOT ${id}`,
            kot: id,
            active: true,
        };
        axios.post(ORDERS_ENDPOINT, data)
            .then((response) => {
                return response.data
            })
            .then((responseData) => {
                thisComp.setState({
                    new_order: true,
                    new_order_id: responseData.id
                })
            })
    };

    handleSubmit = event => {
        event.preventDefault();
        const thisComp = this;
        const data = {
            is_settled: false,
            active: true,
        };
        axios.post(KOT_ENDPOINT, data)
            .then((resp) => {
                return resp.data
            })
            .then((res) =>{
                thisComp.newOrder(res.id);
            })
    }
    componentDidMount() {
            this.getKOTs();
            setInterval(this.updateKOTs, 1000);  
    }
    render() {
        const doneLoading = this.state.doneLoading;
        const kots = this.state.kots;
        const { new_order } = this.state;

        if (new_order) {
            const new_url = `/order/${this.state.new_order_id}/`;
            return <Redirect to={new_url} />
        }
        return (
            <div>
                <Card key={1}>
                    {doneLoading !== false ?
                        <MyContainer key={323} kots={kots} newOrder={this.newOrder} />
                        : <p>No data</p>
                    }
                </Card>
                <div>
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
                    <Col>

                        <Row>
                            {kots.map((kot, index) => (
                                <KOTCard key={index} kot={kot} newOrder={this.props.newOrder} />
                            ))
                            }
                        </Row>
                    </Col>
                </Row>
            </div>

        )
    }
}

export default withRouter(Homepage);
