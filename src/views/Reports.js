import React from 'react';
import Moment from 'moment';
import { PageHeader, Tabs, Dropdown, message, Layout, Menu, Spin } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { fetchData } from '../helpers/fetch-common.js'
import { withRouter } from "react-router-dom";
import ReportGrid from '../components/ReportGrid.js'
import ReportTotalData from "../components/ReportTotalData";
import { ORDER_REPORT_ENDPOINT, KOT_ENDPOINT, ORDERS_ENDPOINT } from "../helpers/endpoints";
import axiosInstance from '../helpers/axios-service';
import { CSVLink } from "react-csv";


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

    getAllOrders() {
        const thisComp = this;
        fetchData(ORDERS_ENDPOINT, thisComp, 'orders', true)
    }

    getKots() {
        const thisComp = this;
        fetchData(KOT_ENDPOINT, thisComp, 'kots', true)
    }


    async getReports(endpoint) {
        const thisComp = this;
        axiosInstance.get(endpoint)
            .then(reps => {
                return reps.data
            })
            .then(responseData => {
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

    updateReport (period) {
        const endpoint = ORDER_REPORT_ENDPOINT + "?tag_timestamp=2021-06-01 20:52:46";
        this.getReports(endpoint)
    }

    handleSelectedCategories = (selectedCategories) => {
        if (selectedCategories) {
            const endpoint = ORDERS_ENDPOINT + '?kot=' + selectedCategories;
            this.getOrders(endpoint)
        }
    };
    handleTabChange(e) {
      /*  if(e == 2){
            this.updateReport("2021-06-01 20:52:46");
        }else if(e == 3){

        }else{

        } */
        message.info("No access!!!")
    }

    handleMenuClick(e) {
        message.info('Click on menu item.');
    }

    componentDidMount() {
        this.getAllOrders();
        this.getReports(ORDER_REPORT_ENDPOINT);
        this.getKots();
    }

    render() {
        //const pos_month = format(startDate, 'L')
        const { orders } = this.state;
        const today = Moment().format('YYYY-MM-DD');
        const thisMonth = Moment().format('YYYY-MM');
        const thisWeek = Moment().format('GGGG-[W]WW');
        const thisYear = Moment().format('YYYY');
        const daily_orders = orders.filter(order => Moment(order.tag_timestamp).format('YYYY-MM-DD') === today);
        const weekly_orders = orders.filter(order => Moment(order.tag_timestamp).format('GGGG-[W]WW') === thisWeek);
        const monthly_orders = orders.filter(order => Moment(order.tag_timestamp).format('YYYY-MM') === thisMonth);
        const yearly_orders = orders.filter(order => Moment(order.tag_timestamp).format('YYYY') === thisYear);

        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1" icon={<DownloadOutlined />}>
                    <CSVLink data={daily_orders}> Daily </CSVLink>
                </Menu.Item>
                <Menu.Item key="2" icon={<DownloadOutlined />}>
                    <CSVLink data={weekly_orders}> Weekly </CSVLink>
                </Menu.Item>
                <Menu.Item key="3" icon={<DownloadOutlined />}>
                    <CSVLink data={monthly_orders}> Monthly </CSVLink>
                </Menu.Item>
                <Menu.Item key="3" icon={<DownloadOutlined />}>
                    <CSVLink data={yearly_orders}> Yearly </CSVLink>
                </Menu.Item>
                <Menu.Item key="4" icon={<DownloadOutlined />}>
                    <CSVLink data={orders}> All </CSVLink>
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

                    <Tabs defaultActiveKey="1" centered onChange={this.handleTabChange}>
                        <TabPane tab="Daily" key="1">
                            {this.state.doneLoading ?
                                <div>
                                    <ReportGrid orders={daily_orders} />
                                </div>
                                :
                                <div className="spinner">
                                    <Spin />
                                </div>
                            }
                        </TabPane>
                        <TabPane tab="Monthly" key="2" >
                            <div>
                                <ReportGrid orders={monthly_orders} />
                            </div>
                        </TabPane>
                        <TabPane tab="All Sale" key="3" >
                            {this.state.doneLoading ?
                                <div>
                                    <ReportGrid orders={orders} />
                                </div>
                                :
                                <div className="spinner">
                                    <Spin />
                                </div>
                            }
                        </TabPane>

                    </Tabs>

                }
            >
                <Content>
                    <ReportTotalData
                        reports={this.state.reports}
                    />
                </Content>
            </PageHeader>
        )
    }

}
export default withRouter(Report);
