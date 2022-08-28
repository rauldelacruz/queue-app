import React, { useContext, useEffect, useState } from 'react'
import { List, Typography, Row, Col, Card, Tag, Divider } from 'antd';
import { useHideMenu } from './../hooks/useHideMenu';
import { SocketContext } from './../context/SocketContext';
import { getLastTickets } from './../helpers/getLastTickets';

const { Title, Text } = Typography;  

export const QueuePage = () => {

  useHideMenu(true);

  const { socket } = useContext( SocketContext );
  const [ tickets, setTickets ] = useState([]);

  useEffect(() => {
    socket.on('assigned-ticket', (assigned) => {
      setTickets(assigned);
    });
    return () => {
      socket.off('assigned-ticket');
    }
  }, [socket]);

  useEffect(() => {
    getLastTickets().then(tickets => setTickets(tickets));
    
  }, [])

  return (
    <>
      <Title level={ 1 }>Serving client:</Title>
      <Row>
        <Col span={ 12 }>
          <List 
            dataSource={ tickets.slice(0,3) }
            renderItem={ item => (
              <List.Item>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag color="magenta"> Desk: { item.desk }</Tag>
                  ]}
                >
                  <Title>
                    #{ item.number }
                  </Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={ 12 }>
        <Divider>History</Divider>
        <List 
            dataSource={ tickets.slice(3) }
            renderItem={ item => (
              <List.Item>
                <List.Item.Meta
                  title={ `Ticket # ${item.number}`}
                  description={
                    <>
                      <Text type='secondary'>In desk: </Text>
                      <Tag color="magenta"> Desk: { item.desk }</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  )
}
