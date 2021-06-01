import React from 'react';
import { Statistic } from 'antd';

export default class ReportTotalData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleForm: false
        }
    }

    handleToggleForm = (e) => {
        e.preventDefault();
        this.setState({
            toggleForm: !this.state.toggleForm
        })
    };

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    width: 'max-content',
                    justifyContent: 'flex-end',
                }}
            >
                <Statistic
                    title="Daily Average Sale"
                    value={this.props.reports.avg}
                    style={{
                        marginRight: 32,
                    }}
                />
                <Statistic title="Total Sale" value={this.props.reports.total} />
            </div>
        )
    }
}