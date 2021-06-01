import React from 'react';
import { Row, Col } from 'antd';

export default class Landing extends React.Component {
    render() {
        return (
            <div className="landing-page">
                <div className="card">
                    <div className="container">
                        <div className="content">
                            <Row>
                                <Col span={24}>
                                    <div className="photo"></div>
                                </Col>     
                                <Col span={24}>
                                    <div className="text">
                                    <h1>Welcome to BreakTime.</h1>  
                                    <p >Kick-start your next restaurant with BreakTime POS.</p>
                                    <a href="/login">Login Here</a>
                                    </div> 
                                </Col>                  
                            </Row> 
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}
