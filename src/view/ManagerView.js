import React from "react";
import HeaderInfo from "../component/HeaderInfo";
import {Layout, theme} from "antd";
import SideBar from "../component/manager/SideBar";
import {Outlet} from "react-router-dom";
import "../css/managerview.css"
import NavBar_Manager from "../component/manager/NavBar_Manager";
const { Header, Content, Sider } = Layout;
const ManagerView = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return(
      <div>
          <div className="manager-pc">
              <HeaderInfo/>
              <NavBar_Manager/>
              <Layout>
                  <Sider
                      width={200}
                      style={{
                          background:colorBgContainer
                      }}
                  >
                      <SideBar/>
                  </Sider>

                  <Content
                      style={{
                          padding: 10,
                          background:colorBgContainer
                      }}
                  >
                      <Outlet/>
                  </Content>

              </Layout>
          </div>
      </div>
    );
}

export default ManagerView;