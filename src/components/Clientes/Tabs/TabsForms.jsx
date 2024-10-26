import React, { useState } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  Button
} from 'reactstrap';
import TabEditItem1 from './TabEditItem1';
import TabEditItem2 from './TabEditItem2';

function TabsForms(props) {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === '1' ? 'active' : ''}
            onClick={() => toggle('1')}
          >
            Cliente
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '2' ? 'active' : ''}
            onClick={() => toggle('2')}
          >
            Fiador
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '3' ? 'active' : ''}
            onClick={() => toggle('3')}
          >
            Referencias
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink
            className={activeTab === '4' ? 'active' : ''}
            onClick={() => toggle('4')}
          >
            Documentación
          </NavLink>
        </NavItem> */}
      </Nav>
      {/* Contenido de las tabs */}
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Card body>
                {/* Tab 1 */}
                <TabEditItem1 idCliente={props.idCliente} 
                actualizarListaCliente={props.actualizarListaCliente}/>
                
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <Card body>
                <TabEditItem2 />
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
            <TabEditItem2 />
              {/* <h4>Tab 3 Contents</h4> */}
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="4">
          <Row>
            <Col sm="12">
              <h4>Tab 4 Contents</h4>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default TabsForms;