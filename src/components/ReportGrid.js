
import React from 'react';
import PropTypes from 'prop-types';
import {Table, Input, Button, Space, message} from 'antd'; 
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

class ReportGrid extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        searchText: '',
        searchedColumn: '',
    };
  }
  PropTypes = {
        orders: PropTypes.array
  };

  getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                this.setState({
                  searchText: selectedKeys[0],
                  searchedColumn: dataIndex,
                });
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select(), 100);
        }
      },
      render: text =>
        this.state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };

    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };
    handlePrint = () => {
      message.info('Printing....');
    };

    render(){
        const columns = [
            {
              title: 'Order No',
              dataIndex: 'id',
              key: 'id',
              ...this.getColumnSearchProps('id'),
            },
            {
              title: 'Date',
              dataIndex: 'tag_timestamp',
              key: 'tag_timestamp',
              ...this.getColumnSearchProps('tag_timestamp'),
            },
            {
              title: 'Kot No',
              dataIndex: 'tag_kot',
              key: 'kot_tag',
              ...this.getColumnSearchProps('kot_tag'),
            },
            {
                title: 'Status',
                dataIndex: 'tag_active',
                key: 'tag_active',
                ...this.getColumnSearchProps('tag_active'),
            },
            {
                title: 'Value',
                dataIndex: 'tag_value',
            },
            {
              title: 'Action',
              dataIndex: '',
              key: 'x',
              render: () => <Button type="primary" onClick={this.handlePrint}>Print</Button>
            },

          ];
          
        const orders = this.props.orders;
        return(
          <>
           <Table dataSource={orders} columns={columns} size="small" pagination={{ pageSize: 40 }} scroll={{ y: 440 }} />
          </>
        )
    }
}

export default ReportGrid;