import React, { useState } from 'react'
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Redirect, useHistory } from 'react-router';
import { useHideMenu } from './../hooks/useHideMenu';
import { getUserStorage } from './../helpers/getUserStorage';

const { Title, Text } = Typography;  

export const Enter = () => {

  useHideMenu(false);

  const history = useHistory();
  const [user] = useState( getUserStorage() );

  const onFinish = ({seller, desk}) => {

    localStorage.setItem('seller', seller);
    localStorage.setItem('desk', desk);
    history.push('/desk');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (user.seller && user.desk) {
    return <Redirect to="/desk" />
  }

  return (
    <>
      <Title level={2}>Enter</Title>
      <Text>Please enter your name and desk number</Text>
      <Divider/>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Seller"
          name="seller"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Desk"
          name="desk"
          rules={[{ required: true, message: 'Please input your desk number!' }]}
        >
          <InputNumber min={1} max={10} />
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
          <Button type="primary" htmlType="submit" shape="round">
            <SaveOutlined/>
            Enter
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
