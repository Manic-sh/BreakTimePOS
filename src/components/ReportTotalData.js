import React from 'react';
import {Statistic} from 'antd';
import Filters from "../components/Filters";

export default class ReportTotalData extends React.Component{

    constructor(props){
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

    handleSelectedCategories = (selected_categories) => {
        this.props.handleSelectedCategories(selected_categories);
        this.props.updateReport(selected_categories)
    };

    handleClearFilters = () => {
        this.props.handleClearFilters()
    };

    render(){
        const statusContent = (
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
        );
        const filterContent = (
            <Filters
                categories={this.props.categories}
                handleSelectedCategories={this.handleSelectedCategories}
                clearFilters={this.handleClearFilters}
            />
        );
        return statusContent;
    }

}