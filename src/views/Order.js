import React from 'react';
import { withRouter } from 'react-router-dom';

import axios from 'axios';
import { Layout, Spin } from 'antd';

import { KOT_DETAIL_ENDPOINT, ORDER_ITEMS_ENDPOINT, ORDER_ENDPOINT } from '../helpers/endpoints.js';
import { fetchData, postQtyChange, addOrEditProduct } from '../helpers/fetch-common.js';

import SideBar from '../components/SideBar.js';
import ProductGrid from '../components/MenuCard.js';

const { Content, Sider } = Layout;

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_categories: [],
            order_data: '',
            order_items: [],
            order_id: '',
            doneLoading: false
        }
    }

    getOrderItems(id) {
        const endpoint = ORDER_ITEMS_ENDPOINT + '?order_related=' + id;
        const thisComp = this;
        fetchData(endpoint, thisComp, 'order_items', true)
    }

    getOrder(id) {
        const endpoint = ORDER_ENDPOINT + id + '/';
        const thisComp = this;
        fetchData(endpoint, thisComp, 'order_data', false);
    }

    changeQty = (action, item_id) => {
        postQtyChange(action, item_id, this);
    };

    handleAddOrEditProduct = (menu_id, quantity) => {
        addOrEditProduct(this.state.order_data.id, menu_id, quantity, this);
    };

    handleProductActions = (action) => {
        const thisComp = this;
        const order = this.state.order_data;
        let data = {
            id: order.id,
            title: order.title,
            kot: order.kot,
            active: false,
        };

        let kotUpdate = {
            active: false,
        }
        const kot_endpoint = KOT_DETAIL_ENDPOINT + order.kot + '/';
        const endpoint = ORDER_ENDPOINT + order.id + '/';
        switch (action) {
            case 'CLOSE':
                axios.put(endpoint, data)
                    .then(resp => resp.data)
                    .then(repsData => {
                        thisComp.props.history.push('/homepage')
                    })
                break;
            case 'PRINT':
                axios.put(endpoint, data)
                    .then(resp => resp.data)
                    .then(
                        function (repsData) {
                            axios.put(kot_endpoint, kotUpdate).then(res => {
                                thisComp.props.history.push('/homepage')
                            })
                        })
                break;
            default:
                thisComp.props.history.push('/homepage')
        }
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        this.getOrder(id);
        this.getOrderItems(id);
    }

    render() {
        return (
            <div>
                {this.state.doneLoading ?
                    <Layout>
                        <Content>
                                <ProductGrid
                                    handleSelectedCategories={this.handleSelectedCategories}
                                    handleAddOrEditProduct={this.handleAddOrEditProduct}
                                />
                        </Content>
                        <Sider width={600} className="site-layout-background">
                                <SideBar
                                    order_data={this.state.order_data}
                                    order_items={this.state.order_items}
                                    handleProductActions={this.handleProductActions}
                                    handleAddOrEditProduct={this.handleAddOrEditProduct}
                                    changeQty={this.changeQty}
                                />
                        </Sider>
                    </Layout>
                    : <div className="spinner">
                        <Spin />
                    </div>
                }
            </div>
        )
    }

}
export default withRouter(Order);