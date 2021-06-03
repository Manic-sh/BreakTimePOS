import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { EditOutlined, CloseOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Col, Card, message } from 'antd'
import { KOT_DETAIL_ENDPOINT, ORDER_ENDPOINT } from '../helpers/endpoints.js';
import axiosInstance from '../helpers/axios-service';

export default class KOTCard extends React.Component {

    static propTypes = {
        kot: PropTypes.object
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
        axiosInstance.put(endpoint, data)
        .then((resp) => {
            axiosInstance.put(kot_endpoint, kotUpdate).then(res => {
                console.log("Order Closed Successfully!");
            })
            
        })
    };
    handlePrintBill = () => {
        message.info('Print Bill');
    };


    render() {
        const { kot } = this.props;

        return (
            <>   
                    {kot.active ?
                        <Card
                            style={{margin: 2}}
                            actions={[
                                <PrinterOutlined onClick={this.handlePrintBill} />,
                                <CloseOutlined onClick={this.handleCloseOrder} />,
                            ]}>
                            <h5>KOT No: {kot.id}</h5>
                            <h5 as="h7">Total: {kot.tag_value}</h5>
                            <Link to={{
                                pathname: `/order/${kot.active_order_id}/`
                            }}>
                                <Button type='primary' size="small" icon={<EditOutlined />}>Details {kot.active_order_id} </Button>
                            </Link>
                        </Card>
                        : ''

                    }
            </>
        )
    }

}
