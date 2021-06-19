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
            <List.Item key={item.id}>
                <List.Item.Meta style={{color: 'black', fontWeight:'bold'}}
                    title={item.tag_menu_related}
                />
                <div style={{color:'black', fontWeight:'bold'}}>
                    {item.qty} <span style={{marginRight:55}} />
                    {item.tag_total_value}
                </div>
            </List.Item>
        )
    }
}