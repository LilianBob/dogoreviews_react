import React, {Component} from 'react';
// import { render } from 'react-dom';
import {Button, Card, Row, Col, ButtonToolbar} from 'react-bootstrap';
import { AddBkModal} from './AddBkModal';

export class Book extends Component{
    constructor(props){
        super(props);
        this.state = {bks:[], addModalShow:false}
    }
    refreshList(){
        fetch(process.env.REACT_DR_API+'book')
        .then(response=>response.json())
        .then(data=>{
            this.setState({bks:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
    componentDidUpdate(){
        this.refreshList();
    }
    render(){
        const {bks}= this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        return(
            <div>
                <Row xs={1} md={4} lg={6} className="g-18">
                {Array.from({ length: 12 }).map((_, idx) => (
                    <Col>
                    {bks.map(bk=>
                        <Card key="{bk.BookId"> style={{ width: '18rem' }}
                            <Card.Img variant="top" src="{bk.BookCover}" />
                            <Card.Body>
                                <Card.Title>{bk.BookTitle}</Card.Title>
                                <Card.Text>{bk.BookDescription}</Card.Text>
                                <Card.Link href="#"> Add a review </Card.Link>
                                <Card.Link href="#"> More on this book </Card.Link>
                            </Card.Body>
                        </Card>
                    )};
                    </Col>
                ))}
                </Row>
                <ButtonToolbar>
                    <Button variant='primary' onClick={()=>this.setState({addModalShow:true})}>
                    Add Book
                    </Button>
                    <AddBkModal show={this.state.addModalShow} onHide={addModalClose}/>
                </ButtonToolbar>
            </div>    
        )      
    }
}