import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Result } from 'antd';
import {MENU_ENDPOINT, CATEGORYS_ENDPOINT} from "../helpers/endpoints.js";
import {fetchData} from "../helpers/fetch-common.js";


class Products extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categories: [],
            doneLoading: false
        }
    }

    getProducts() {
        const endpoint = MENU_ENDPOINT;
        const thisComp = this;
        let lookUpOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }   
        };
        fetch(endpoint, lookUpOptions).then(
            function(response){
                return response.json()
            }
        ).then(
            function(responseData){
                thisComp.setState({
                    products: responseData,
                    doneLoading: true
                })
            }
        )
    }

    getCategories(){
        const endpoint = CATEGORYS_ENDPOINT;
        const thisComp = this;
        fetchData(endpoint, thisComp, 'categories');
    }
    
    componentDidMount(){
        this.getCategories();
        this.getProducts()
    }

    render() {

        return (
            <div>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={
                        <Link to={{
                            pathname: `/homepage`
                            }}>
                           <Button type='primary'>Back Home</Button>
                       </Link>
                    }
                />
          </div>
        )
    }
}

export default withRouter(Products);