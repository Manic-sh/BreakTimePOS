import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { ORDER_ITEM_ENDPOINT, ORDER_ITEMS_ENDPOINT } from "./endpoints";

export function putData(endpoint, data) {
    axios.put(endpoint, data).then((response) => {
            return response.data;
        }).then((responseData) => {
            return <Redirect to='/' />;
        })
}

export function fetchData(endpoint, thisComp, state, doneLoading) {
    axios.get(endpoint)
        .then((res) => {
            return res.data;
        }).then((response) => {
            thisComp.setState({
                [state]: response,
                doneLoading: doneLoading
            })

        });
}

export async function postQtyChange(action, id, thisComp) {
    let item;
    let data;
    const endpoint = ORDER_ITEM_ENDPOINT + `${id}/`;

    switch (action) {
        case 'ADD':
            axios.get(endpoint)
                .then((res) => {
                    return res.data;
                })
                .then((resp) => {
                    item = resp;
                    data = {
                        id: item.id,
                        menu_related: item.menu_related,
                        order_related: item.order_related,
                        qty: item.qty + 1
                    };
                    axios.put(endpoint, data)
                        .then((response) => {
                            return response.data;
                        })
                        .then((responseData) => {
                            thisComp.getOrderItems(item.order_related);
                            thisComp.getOrder(item.order_related)
                        })
                   }
                );
            break;
        case 'REMOVE':
            axios.get(endpoint)
                .then((res) => {
                    return res.data;
                })
                .then((resp) => {
                    item = resp;
                    if(item.qty > 0) { 
                        data = {
                            id: item.id,
                            menu_related: item.menu_related,
                            order_related: item.order_related,
                            qty: item.qty - 1
                        };
                        axios.put(endpoint, data).then(
                            (response) => {
                                return response.data;
                            }).then((responseData) => {
                                thisComp.getOrderItems(item.order_related);
                                thisComp.getOrder(item.order_related)
                            })
                    } else {
                        axios.delete(endpoint)
                        .then(() => {
                            thisComp.componentDidMount()
                        });
                    }   
                });
            break;
        case 'DELETE':
            axios.delete(endpoint)
                .then(() => {
                    thisComp.componentDidMount()
                });
            break;
        default:
            thisComp.componentDidMount()
    }
}


export function addOrEditProduct(order_id, menu_id, quantity, thisComp) {
    const endpoint = ORDER_ITEMS_ENDPOINT + `?menu_related=${menu_id}&order_related=${order_id}`;
    console.log(endpoint);
    if(!quantity){
        quantity = 1;
    }
    axios.get(endpoint)
        .then((res) => {
            console.log(res.data);
            return res.data;
            
        }).then((resp) => {
            let data = {};
            if (resp.length > 0) {
                console.log('edit product', resp);
                data = {
                    id: resp[0].id,
                    menu_related: resp[0].menu_related,
                    order_related: resp[0].order_related,
                    qty: resp[0].qty + quantity,
                };
                console.log('edit product data', data);

                axios.put(ORDER_ITEM_ENDPOINT + `${resp[0].id}/`, data)
                    .then((response)  =>{
                        return response.data;
                    })
                    .then((responseData) => { 
                        thisComp.componentDidMount() 
                    })
            } else {
                console.log('new product');
                const new_data = {
                    menu_related: menu_id,
                    order_related: order_id,
                    qty: quantity
                };

                axios.post(ORDER_ITEMS_ENDPOINT, new_data)
                    .then((response) => {
                        return response.data;
                    })
                    .then((responseData) => {
                        thisComp.componentDidMount()
                    })
            }
        })
}
