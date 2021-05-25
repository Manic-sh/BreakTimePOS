import React from 'react';
import PropTypes from 'prop-types';

import { Select,  Space, InputNumber, Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {MENU_ENDPOINT} from "../helpers/endpoints";
import {fetchData} from "../helpers/fetch-common.js";

const { Option } = Select;

export default class SearchFilterAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            value: undefined,
            qty: undefined,
            doneLoading: false,
        };
    }

    static propTypes = {
        handleAddOrEditProduct: PropTypes.func,
        order_data: PropTypes.object,
    };

    getProducts(endpoint){
        const thisComp = this;
        fetchData(endpoint, thisComp, 'products')
    };

    search = async val => {
        const thisComp = this;
        thisComp.setState({ loading: true });
        fetchData(MENU_ENDPOINT, thisComp, 'products')
        const products = thisComp.products;
    
        this.setState({ products, loading: false });
      };

    handleSearch = value => {
        if (value) {
            fetch(value, products => this.setState({ products }));
          } else {
            this.setState({ products: [] });
        }
    };
    
    handleChange = value => {
       console.log( this.setState({ value }));
    };

    handleChangeQty = qty =>  {
        this.setState({ qty });
    };

    handleProduct= () => {
        console.log('Menu ID');
        this.props.handleAddOrEditProduct(this.value);
    };
    componentDidMount(){
        const endpoint = MENU_ENDPOINT;
        this.getProducts(endpoint);
    };

    onFinish = (values) => {
        if(!values.qty){
            values.qty = 1;
        }
        this.props.handleAddOrEditProduct(values.menu_id, values.qty);
    };

    render() {
        const options = this.state.products.map(d => <Option key={d.id}><Space><span>{d.title}</span><span>{d.tag_value}</span></Space></Option>);
        
        return (   
            <Space direction="horizontal">
                <Form
                    name="customized_form_controls"
                    layout="inline"
                    className="ant-advanced-search-form"
                    onFinish={this.onFinish}
                >
                <Form.Item name="menu_id">
                    <Select
                        showSearch
                        placeholder="Search Menu..."
                        style={{width: 280}}
                        filterOption={false}
                        onSearch={this.handleSearch}
                        onChange={this.handleChange}
                        notFoundContent={null}
                    >
                        {options}
                    </Select>
                </Form.Item>
                <Form.Item name="qty">
                    <InputNumber min={1} max={99} value={1} defaultValue={1} onChange={this.handleChangeQty} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit"  icon={<PlusOutlined />}>
                        Add
                    </Button>
                </Form.Item>
               </Form> 
            </Space>
        );
    }
}    

