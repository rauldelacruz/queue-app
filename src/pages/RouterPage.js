import React, { useContext } from 'react'
import { Layout, Menu } from 'antd';

import {
  TeamOutlined,
  TagsOutlined,
  UserOutlined,
} from '@ant-design/icons';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { Enter } from './Enter';
import { QueuePage } from './QueuePage';
import { CreateTicket } from './CreateTicket';
import { DeskPage } from './DeskPage';
import { UIContext } from '../context/UIContext';


const { Sider, Content } = Layout;

export const RouterPage = () => {

  const { hide } = useContext(UIContext)

  return (
    <Router>
      <Layout style={{ height: '100vh'}}>
        <Sider 
          collapsedWidth="0"
          breakpoint="md"
          hidden={ hide }
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={
              <UserOutlined />
            }>
              <Link to="/enter">
                Enter
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={
              <TeamOutlined />
            }>
              <Link to="/queue">
                Queue
              </Link> 
            </Menu.Item>
            <Menu.Item key="3" icon={
              <TagsOutlined />
            }>
              <Link to="/create">
                Create Ticket
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">

          <Content
          className="site-layout-background"
          style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
          }}
          >
            <Switch>
              <Route path="/enter" component={ Enter }/>
              <Route path="/queue" component={ QueuePage }/>
              <Route path="/create" component={ CreateTicket }/>
              <Route path="/desk" component={ DeskPage }/>
              <Redirect to="/enter" />
            </Switch>
            
          </Content>
        </Layout>
      </Layout>
    </Router>
  )
}
