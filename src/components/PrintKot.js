import React from 'react';
import PropTypes from 'prop-types';

import { List } from 'antd';

export default  class PrintKOT extends React.Component {

    static propTypes = {
        item: PropTypes.object.isRequired
    }
    render() {
        const item = this.props.item;
        return (

            <List.Item
                key={item.id}
            >
                <List.Item.Meta style={{color: 'black'}}
                    title={item.tag_menu_related}
                />
                <div style={{color:'black'}}>
                    {item.qty}
                    {item.tag_value}
                    <span>      = </span>
                    {item.tag_total_value}

                </div>
            </List.Item>
        )
    }
}