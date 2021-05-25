import React from 'react';
import { PageHeader, Tabs, Dropdown, message, Layout, Card, Menu, Spin } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { fetchData } from '../helpers/fetch-common.js'
import { withRouter } from "react-router-dom";
import ReportGrid from '../components/ReportGrid.js'
import ReportTotalData from "../components/ReportTotalData";
import { ORDER_REPORT_ENDPOINT, KOT_ENDPOINT, ORDERS_ENDPOINT } from "../helpers/endpoints";
import axios from 'axios';


const { Content } = Layout;
const { TabPane } = Tabs;

class Report extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            kots: [],
            date_start: new Date(),
            date_end: new Date(),
            reports: {
                total: 0,
                count: 0,
                avg: 0
            },
            doneLoading: false
        }
    }

    getOrders(endpoint, type_ = false) {
        const thisComp = this;
        fetchData(endpoint, thisComp, 'orders', type_)
    }

    getKots() {
        const endpoint = KOT_ENDPOINT;
        const thisComp = this;
        fetchData(endpoint, thisComp, 'kots', true)
    }


    getReports(endpoint) {
        const thisComp = this;
        axios.get(endpoint).then(
            function (reps) {
                return reps.data
            }
        ).then(
            function (responseData) {
                const reports = {
                    total: responseData.total,
                    count: responseData.count,
                    avg: responseData.avg
                };
                thisComp.setState({
                    reports: reports
                })
            }
        )
    }

    handleClearFilters = () => {
        this.componentDidMount()
    };

    updateReport = (selected_category) => {
        const endpoint = ORDER_REPORT_ENDPOINT + '?kot=' + selected_category;
        this.getReports(endpoint)
    };

    handleSelectedCategories = (selectedCategories) => {
        if (selectedCategories) {
            const endpoint = ORDERS_ENDPOINT + '?kot=' + selectedCategories;
            this.getOrders(endpoint)
        }
    };

    componentDidMount() {
        this.getOrders(ORDERS_ENDPOINT, false);
        this.getReports(ORDER_REPORT_ENDPOINT);
        this.getKots();
    }

    handleButtonClick(e) {
        message.info('Click on left button.');
        console.log('click left button', e);
    }

    handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
    }
    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1" icon={<DownloadOutlined />}>
                    Daily
              </Menu.Item>
                <Menu.Item key="2" icon={<DownloadOutlined />}>
                    Weekly
              </Menu.Item>
                <Menu.Item key="3" icon={<DownloadOutlined />}>
                    Monthly
              </Menu.Item>
            </Menu>
        );
        return (

            <PageHeader
                className="site-page-header-responsive"
                onBack={() => window.history.back()}
                title="Back"
                subTitle="Break Time Home"
                extra={[
                    <Dropdown.Button overlay={menu} icon={<DownloadOutlined />}>
                        Download
                            </Dropdown.Button>
                ]}
                footer={

                    <Tabs defaultActiveKey="1" centered>

                        <TabPane tab="All Sale" key="1">

                            {this.state.doneLoading ?
                                <Card>
                                    <ReportGrid orders={this.state.orders} />
                                </Card>

                                :
                                <div className="spinner">
                                    <Spin />
                                </div>
                            }

                        </TabPane>

                        <TabPane tab="Daily" key="2" />
                        <TabPane tab="Monthly" key="3" />

                    </Tabs>

                }
            >
                <Content>
                    <ReportTotalData
                        categories={this.state.kots}
                        handleSelectedCategories={this.handleSelectedCategories}
                        updateReport={this.updateReport}
                        reports={this.state.reports}
                        handleClearFilters={this.handleClearFilters}
                    />
                </Content>
            </PageHeader>
        )
    }

}

export default withRouter(Report);
