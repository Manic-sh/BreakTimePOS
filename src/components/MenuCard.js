import React from 'react';
import PropTypes from 'prop-types';
import CategorySelect from './CategorySelect.js';

import { fetchData } from "../helpers/fetch-common.js";
import { CATEGORYS_ENDPOINT, MENU_ENDPOINT } from "../helpers/endpoints";

import { Skeleton, Card, Avatar } from 'antd';


const { Meta } = Card;

export default class ProductGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categories: [],
            doneLoading: false
        }
    }

    static propTypes = {
        handleAddOrEditProduct: PropTypes.func.isRequired,
        handleSelectedCategories: PropTypes.func.isRequired
    }

    getCategories() {
        const endpoint = CATEGORYS_ENDPOINT;
        const thisComp = this;
        fetchData(endpoint, thisComp, 'categories')
    }

    getProducts(endpoint) {
        const thisComp = this;
        fetchData(endpoint, thisComp, 'products')
    }

    handleSelectedCategories = (categories_list) => {
        if (categories_list) {
            const endpoint = MENU_ENDPOINT + '?category=' + categories_list;
            console.log(endpoint);
            this.getProducts(endpoint)
        }
    };

    handleClearFilters = () => {
        const endpoint = MENU_ENDPOINT;
        this.getProducts(endpoint)
    };

    handleAddOrEditProduct = (id) => {
        this.props.handleAddOrEditProduct(id)
    }

    componentDidMount() {
        const endpoint = MENU_ENDPOINT;
        this.getCategories();
        this.getProducts(endpoint);
        this.setState({
            doneLoading: true
        })
    }

    render() {
        const { categories } = this.state;
        if (categories.length > 0) {
            return (
                <div>
                    <MenuCard
                        products={this.state.products}
                        handleAddOrEditProduct={this.handleAddOrEditProduct}

                    />
                    <CategorySelect
                        categories={categories}
                        handleSelectedCategories={this.handleSelectedCategories}
                        handleClearFilters={this.handleClearFilters}
                        clearFilters={this.handleClearFilters}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <MenuCard
                        products={this.state.products}
                        handleAddOrEditProduct={this.handleAddOrEditProduct}

                    />
                </div>
            )
        }
    }
}
class MenuCard extends React.Component {

    static propTypes = {
        handleAddOrEditProduct: PropTypes.func.isRequired,
        products: PropTypes.string.isRequired
    };

    handleAddOrEditProduct = (id) => {
        this.props.handleAddOrEditProduct(id)
    };

    render() {
        const products = this.props.products;
        const gridStyle = {
            width: '16.5%',
            textAlign: 'center',
            padding: '10px',
        };
        return (
            <Card>
                {products.map((product, index) => (
                    <Card.Grid hoverable={true}
                        style={gridStyle}
                    >
                        <ProductCardItem
                            product={product}
                            handleAddOrEditProduct={this.handleAddOrEditProduct}
                        />
                    </Card.Grid>
                ))}

            </Card>
        )
    }
}

class ProductCardItem extends React.Component {

    static propTypes = {
        handleAddOrEditProduct: PropTypes.func.isRequired,
        product: PropTypes.object.isRequired
    }

    addProduct = () => {
        this.props.handleAddOrEditProduct(this.props.product.id)
    };

    render() {
        const { product } = this.props;
        return (
            <Skeleton loading={false} avatar active>
                <Card
                    style={{ padding: 8 }}
                    onClick={this.addProduct}>
                    <Meta
                        avatar={<Avatar src="https://i1.wp.com/www.raynauds.org/wp-content/uploads/2019/07/Cold-Drink.jpg?resize=272%2C300&ssl=1" />}
                        description={product.tag_value}
                    /><br />
                    <div className="additional">
                        <p className="title">{product.title}</p>
                    </div>
                </Card>
            </Skeleton>
        )
    }
}