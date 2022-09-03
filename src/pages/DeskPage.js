import React, {useState, useContext} from 'react'
import { Row, Col, Typography, Button, Divider } from 'antd'
import { CloseCircleOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { useHideMenu } from './../hooks/useHideMenu';
import { getUserStorage } from './../helpers/getUserStorage';
import { Redirect, useHistory } from 'react-router';
import { SocketContext } from './../context/SocketContext';

const { Title, Text } = Typography;  

export const DeskPage = () => {

  useHideMenu(false);

  const history = useHistory();
  const [user] = useState( getUserStorage() );
  const [ticket, setTicket] = useState(null);
  const { socket } = useContext( SocketContext );

  
  const leave = () => {
    localStorage.clear();
    history.replace('/enter')
  }

  const nextTicket = () => {
    socket.emit('next-ticket', user, ( ticket ) => {
      setTicket(ticket);
    });
  }

  if (!user.seller || !user.desk) {
    return <Redirect to="/enter" />
  }

  return (
    <>
      <Row>
        <Col span={ 20 }>
          <Title level= { 2 }>{ user.seller }</Title>
          <Text>Desk number: </Text>
          <Text
            style={{fontSize: 30}}
            type="success">
              { user.desk }
            </Text>
        </Col>
        <Col span = { 4 } align = "right">
          <Button
            shape="round"
            type="danger"
            onClick={ leave }
          >
            <CloseCircleOutlined />
            Leave
          </Button>
        </Col>
      </Row>
      <Divider />

      {
        ticket ? (
          <Row>
            <Col>
              <Text>Serving ticket number: </Text>
              <Text
                style={{fontSize: 30}}
                type='danger'
              >
                { ticket.number }
              </Text>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <Text
                style={{fontSize: 30}}
                type='danger'
              >
                No tickets!
              </Text>
            </Col>
          </Row>
        )  
      }

      <Row>
        <Col offset={18} span={6} align="right">
          <Button
            onClick={ nextTicket }
            shape="round"
            type='primary'
          > 
            <DoubleRightOutlined />Next
          </Button>
        </Col>
      </Row>
    </>
  )
}
