import React from 'react';
import PropTypes from 'prop-types';


import { List, Card, Button, Space, Descriptions } from 'antd';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';

import InfiniteScroll from 'react-infinite-scroll-component';
import SearchFilterAdd from '../components/SearchFilterAdd.js';

import PrintModel from './PrintModel.js';

const ButtonGroup = Button.Group;

export default class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalPrintKot: false,
            show: false,
            loading: false,
            action: "",
        }
    }

    static propTypes = {
        handleProductActions: PropTypes.func,
        handleAddOrEditProduct: PropTypes.func,
        handleBack: PropTypes.func,
        order_items: PropTypes.array,
        order_data: PropTypes.object,
        changeQty: PropTypes.func.isRequired
    };

    handleCloseKOT = (action) => {
        this.props.handleProductActions(action)
    };

    handleBack = () => {
        this.props.handleProductActions('BACK')
    };

    changeQty = (action, item_id) => {
        this.props.changeQty(action, item_id)
    }

    handleAddOrEditProduct = (menu_id, quantity) => {
        this.props.handleAddOrEditProduct(menu_id,quantity);
    }
    handleInfiniteOnLoad = () => {
        this.setState({
            loading: true,
        });
    };
    setmodalPrintKot(modalPrintKot) {
        this.setState({ modalPrintKot });
    }

    showModal = (show, action) => {
        this.setState({ show: show, action: action }); 
    }
    
    render() {
        const { order_items } = this.props;
        const { order_data } = this.props;
        return (
            <div>
                    <Card>
                        <SearchFilterAdd
                                handleAddOrEditProduct={this.handleAddOrEditProduct}
                                order_data={order_data}
                        />
                    </Card>
                    <div className="item-infinite-container">
                        <InfiniteScroll
                            initialLoad={false}
                            dataLength={order_items.length}
                            pageStart={0}
                            loadMore={this.handleInfiniteOnLoad}
                            useWindow={false}
                        >
                            <List
                                dataSource={order_items}
                                renderItem={item => (
                                    <OrderItem
                                        item={item}
                                        changeQty={this.changeQty}
                                    />
                                )}
                            >
                            </List>
                        </InfiniteScroll>
                    </div>
                    <Card className="item-total-info">
                        <Descriptions size="small" bordered>
                            <Descriptions.Item label="KOT">{order_data.tag_kot}</Descriptions.Item>
                            <Descriptions.Item label="Total">{order_data.tag_value}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                    <Card style={{marginTop: 20}}>
                        <Space size={[10, 8]} wrap>
                            <Button style={{ width: 160 }} type="primary" onClick={() => this.showModal(true, "CLOSE")}>Print KOT</Button>
                            <Button style={{ width: 130 }} type="primary" onClick={() => this.showModal(true, "PRINT")}>Print Bill</Button>
                            <PrintModel 
                                show={this.state.show}   
                                action={this.state.action} 
                                showModal={this.showModal} 
                                order_data={this.props.order_data} 
                                order_items={this.props.order_items} 
                                handleCloseKOT={this.handleCloseKOT}                    
                            />                    
                            <Button style={{ width: 130 }} type="primary" onClick={this.handleBack} danger>Back </Button>
                        </Space>
                    </Card>
              
            </div>
        )
    }
}

class OrderItem extends React.Component {

    static propTypes = {
        changeQty: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired
    }

    addQty = () => {
        this.props.changeQty('ADD', this.props.item.id)
    };

    removeQty = () => {
        this.props.changeQty('REMOVE', this.props.item.id)
    };

    handleDeleteItem = () => {
        this.props.changeQty('DELETE', this.props.item.id)
    };

    render() {
        const item = this.props.item;
        return (

            <List.Item
                key={item.id}
                actions={[
                    <ButtonGroup>
                        <Button onClick={this.addQty}>
                            <PlusOutlined />
                        </Button>
                        <Button onClick={this.removeQty}>
                            <MinusOutlined />
                        </Button>
                        <Button onClick={this.handleDeleteItem}>
                            <DeleteOutlined />
                        </Button>
                    </ButtonGroup>
                ]}
            >
                <List.Item.Meta
                    title={item.tag_menu_related}
                    description={item.tag_total_value}
                />

                <div>
                    {item.qty}
                    <span> x </span>
                    {item.tag_value}

                </div>
            </List.Item>
        )
    }

}
