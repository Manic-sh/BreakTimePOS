import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Card } from 'antd';



class CategorySelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: this.props.categories || [],
            selected_categories: ''
        }
    }


    static propTypes = {
        categories: PropTypes.array.isRequired,
        clearFilters: PropTypes.func.isRequired,
        handleSelectedCategories: PropTypes.func.isRequired
    };

    handleClear = () => {
        this.setState({
            selected_categories: ''
        });
        this.props.clearFilters()

    };

    handleSelectedCategories = (id) => {
        this.setState({
            selected_categories: id
        });
        this.props.handleSelectedCategories(id);
    };

    render() {
        const categories = this.state.categories;
        return (
            <Form
                style={{ marginTop: 15 }}
            >
                <Button type="primary" onClick={this.handleClear} danger>Clear Filters</Button>
                <Card clicked>
                    {categories.map((category, index) => (
                        <CardButton
                            key={index}
                            field={category}
                            handleSelectedCategories={this.handleSelectedCategories}
                            clicked={category.id === this.state.selected_categories ? true : false}
                        />
                    ))}
                </Card>
            </Form>
        )
    }
}

class CardButton extends React.Component {

    state = {
        field: this.props.field || ''
    };

    static propTypes = {
        handleSelectedCategories: PropTypes.func,
        field: PropTypes.object,
        clicked: PropTypes.bool
    };

    handleChange = (e) => {
        this.props.handleSelectedCategories(this.state.field.id)
    };

    render() {
        const { field } = this.state;
        const gridStyle = {
            width: '25%',
            textAlign: 'center',
            backgroundColor: '#08979c',
        };
        return (
            <Card.Grid style={gridStyle} onClick={this.handleChange} >{field.title}</Card.Grid>
        )
    }

}

export default CategorySelect;