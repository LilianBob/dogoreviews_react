import React, {Component} from 'react';
import {Modal, Row, Col, Form, Button} from 'react-bootstrap';

export class AddBkModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);    
    }
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_DR_API+'book',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                BookId:null,
                BookTitle:event.target.BookTitle.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return(
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Book
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group className ="mb-3" controlId="BookCover">
                                        <Form.Label> Book Cover </Form.Label>
                                        <Form.Control 
                                        name="BookCover" type="file" required placeholder="Upload cover">
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className ="mb-3" controlId="BookTitle">
                                        <Form.Label> Book Title </Form.Label>
                                        <Form.Control 
                                        name="BookTitle" type="text" required placeholder="BookTitle">
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className ="mb-3" controlId="BookDescription">
                                        <Form.Label> Book Description </Form.Label>
                                        <Form.Control as="textarea" rows={4} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button type="submit" variant="primary"> 
                                        Add Book 
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}> 
                    Close 
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )      
    }
}