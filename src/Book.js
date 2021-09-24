import React, {Component} from 'react';
// import { render } from 'react-dom';
import {Card, Row, Col} from 'react-bootstrap';

export class Book extends Component{
    constructor(props){
        super(props);
        this.state = {bks:[]}
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
        return(
            <Row xs={1} md={2} l={4} className="g-12">
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
        )      
    }
}