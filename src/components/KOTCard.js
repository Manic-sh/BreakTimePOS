import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { EditOutlined, CloseOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Col, Card, message } from 'antd'
import { KOT_DETAIL_ENDPOINT, ORDER_ENDPOINT } from '../helpers/endpoints.js';
import axios from 'axios';

export default class KOTCard extends React.Component {

    static propTypes = {
        kot: PropTypes.object
    };

    handleNewOrder = () => {
        this.props.newOrder(this.props.kot.id)
    };

    handleCloseOrder = () => {
        message.info('Close Order');
        const order = this.props.kot;
        let data = {
            id: order.active_order_id,
            active: false,
        }; 
        let kotUpdate = {
            active: false,
        }
        const endpoint = ORDER_ENDPOINT + this.props.kot.active_order_id + '/';
        const kot_endpoint = KOT_DETAIL_ENDPOINT + this.props.kot.id + '/';
        axios.put(endpoint, data)
        .then((resp) => {
            axios.put(kot_endpoint, kotUpdate).then(res => {
                console.log("Order Closed Successfully!");
            })
            
        })
        console.log(kot_endpoint);
    };
    handlePrintBill = () => {
        message.info('Print Bill');
    };


    render() {
        const { kot } = this.props;

        return (
            <>
                <Col>
                    {kot.active ?
                        <Card
                            actions={[
                                <PrinterOutlined onClick={this.handlePrintBill} />,
                                <CloseOutlined onClick={this.handleCloseOrder} />,
                            ]}>
                            <h5>KOT No: {kot.id}</h5>
                            <h5 as="h7">Total: {kot.tag_value}</h5>
                            <Link to={{
                                pathname: `/order/${kot.active_order_id}/`
                            }}>
                                <Button type='primary' icon={<EditOutlined />}>Details {kot.active_order_id} </Button>
                            </Link>
                        </Card>
                        : ''

                    }
                </Col>
            </>
        )
    }

}
