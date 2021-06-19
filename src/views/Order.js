import React from "react";
import { withRouter, Redirect } from "react-router-dom";

import axiosInstance from "../helpers/axios-service";
import { Layout, Spin } from "antd";

import {
  KOT_ENDPOINT,
  ORDERS_ENDPOINT,
  KOT_DETAIL_ENDPOINT,
  ORDER_ITEMS_ENDPOINT,
  ORDER_ENDPOINT,
} from "../helpers/endpoints.js";
import {
  fetchData,
  postQtyChange,
  addOrEditProduct,
} from "../helpers/fetch-common.js";

import SideBar from "../components/SideBar.js";
import ProductGrid from "../components/MenuCard.js";

const { Content, Sider } = Layout;

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order_data: "",
      order_items: [],
      order_id: "",
      doneLoading: false,
      new_order: false,
    };
  }
  getOrderItems(id) {
    const endpoint = ORDER_ITEMS_ENDPOINT + "?order_related=" + id;
    const thisComp = this;
    fetchData(endpoint, thisComp, "order_items", true);
  }

  getOrder(id) {
    const endpoint = ORDER_ENDPOINT + id + "/";
    const thisComp = this;
    fetchData(endpoint, thisComp, "order_data", true);
  }

  changeQty = (action, item_id) => {
    postQtyChange(action, item_id, this);
  };

  handleAddOrEditProduct = (menu_id, quantity) => {
    addOrEditProduct(this.state.order_data.id, menu_id, quantity, this);
  };

  handleProductActions = (action) => {
    const thisComp = this;
    const order = this.state.order_data;
    let data = {
      id: order.id,
      title: order.title,
      kot: order.kot,
      active: false,
    };
    let kotdata = {
      id: order.id,
      title: order.title,
      kot: order.kot,
      active: true,
    };
    let kotUpdate = {
      active: false,
    };
    const kot_endpoint = KOT_DETAIL_ENDPOINT + order.kot + "/";
    const endpoint = ORDER_ENDPOINT + order.id + "/";
    switch (action) {
      case "CLOSE":
        axiosInstance.put(endpoint, kotdata).then((resp) => {
          thisComp.props.history.push("/homepage");
          // eslint-disable-next-line
          /*const new_kot = {
            is_settled: false,
            active: true,
            active_order_id: order.id,
          };
          axiosInstance.post(KOT_ENDPOINT, new_kot).then((repsData) => {
            thisComp.props.history.push("/homepage");
          }); */
        });

        break;
      case "SETTLE":
        axiosInstance
          .put(endpoint, data)
          .then((resp) => resp.data)
          .then(function (repsData) {
            axiosInstance.put(kot_endpoint, kotUpdate).then((res) => {
              const new_kot = {
                is_settled: false,
                active: true,
              };
              axiosInstance.post(KOT_ENDPOINT, new_kot).then((resp) => {
                const kot_id = resp.data.id;
                const new_order = {
                  title: `ORDER ${kot_id}`,
                  kot: kot_id,
                  active: true,
                };
                axiosInstance
                  .post(ORDERS_ENDPOINT, new_order)
                  .then((response) => {
                    thisComp.setState({
                      order_id: response.data.id,
                      new_order: true,
                    });
                  });
              });
            });
          });
        break;
      default:
        thisComp.props.history.push("/homepage");
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getOrder(id);
    this.getOrderItems(id);
  }
  render() {
    const { new_order } = this.state;
    if (new_order) {
      window.location.reload();
      const new_url = `/order/${this.state.order_id}/`;
      return <Redirect to={new_url} />;
    }
    return (
      <div className="pos-dashboard">
        <Layout>
          <Content style={{ margin: 10 }}>
            {this.state.doneLoading ? (
              <ProductGrid
                handleSelectedCategories={this.handleSelectedCategories}
                handleAddOrEditProduct={this.handleAddOrEditProduct}
              />
            ) : (
              <div className="spinner">
                <Spin />
              </div>
            )}
          </Content>

          <Sider
            width={500}
            className="site-layout-background"
            style={{ margin: 10, height: 708 }}
          >
            <SideBar
              order_data={this.state.order_data}
              order_items={this.state.order_items}
              handleProductActions={this.handleProductActions}
              handleAddOrEditProduct={this.handleAddOrEditProduct}
              changeQty={this.changeQty}
            />
          </Sider>
        </Layout>
      </div>
    );
  }
}
export default withRouter(Order);
