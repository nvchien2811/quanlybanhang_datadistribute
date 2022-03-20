import React ,{useState} from 'react';
import './assets/scss/App.scss';
import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  UserOutlined,
  InboxOutlined
} from '@ant-design/icons';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import {Customers,Bill,WareHouse} from './page/admin';
const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [collapsed , setcollapsed ] = useState(false);


  const onCollapse  = (e)=>{
    setcollapsed(e)
  }

  const Nav = ()=>(
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        <Link to={"/bill"}>
          Quản lý hóa đơn
        </Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        <Link to={"/customers"}>
          Quản lý khách hàng
        </Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<InboxOutlined />}>
        <Link to={"/warehouse"}>
          Quản lý kho hàng
        </Link>
      </Menu.Item>
    </Menu>
  )

  const ContentWeb = ()=>(
    <div className="site-layout-background" style={{ padding: 24, minHeight: 590,marginTop:16 }}>
    <Routes>
      <Route path="/" element={<Bill/>}/>
      <Route path="/bill" element={<Bill />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/warehouse" element={<WareHouse />} />
    </Routes>
    </div>
  )
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          <p>Logo</p>
        </div>
        {Nav()}
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          {ContentWeb()}
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2022</Footer>
      </Layout>
    </Layout>
  )
}

export default App;
