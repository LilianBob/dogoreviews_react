import React, {Component} from 'react';
import {Modal, Row, Col, Form, Image, Button} from 'react-bootstrap';

export class AddBkModal extends Component{
    constructor(props){
        super(props);
        this.state={bks:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);    
    }
    cover = "default.png";
    imagesrc = process.env.REACT_DR_PHOTOPATH+this.cover;

    componentDidMount(){
        fetch(process.env.REACT_DR_API+'book')
        .then(response=>response.json())
        .then(data=>{
            this.setState({bks:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_DR_API+ 'book',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                bookId:null,
                cover:this.cover,
                title:event.target.title.value,
                author:event.target.author.value,
                pub_year:event.target.pub_year.value,
                description:event.target.description.value,
                genre:event.target.genre.value,
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
    handleFileSelected(event){
        event.preventDefault();
        this.cover=event.target.files[0].name;
        const formData= new FormData();
        formData.append(
            "cover",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_DR_API+'Book/saveImage',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_DR_PHOTOPATH+result;
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
                                    <Form.Group className ="mb-3" controlId="formControlsFile">
                                        <Form.Label> Book Cover </Form.Label>
                                        <Form.Control 
                                        name="cover" type="file" required placeholder="Upload cover">
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className ="mb-3" controlId="title">
                                        <Form.Label> Book Title </Form.Label>
                                        <Form.Control name="title" type="text" required 
                                        placeholder="title">
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className ="mb-3" controlId="author">
                                        <Form.Label> Book author</Form.Label>
                                        <Form.Control type="text" name="author" required 
                                        placeholder="author"/>
                                    </Form.Group>
                                    <Form.Group className ="mb-3" controlId="description">
                                        <Form.Label> Book Description </Form.Label>
                                        <Form.Control as="textarea" rows={4} />
                                    </Form.Group>
                                    <Form.Group className ="mb-3" controlId="formControlsSelect">
                                        <Form.Label> Select Genre </Form.Label>
                                        <Form.Control as="select">
                                        {this.state.bks.map(bk=>
                                            <option key={bk.bookId}>{bk.genre}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className ="mb-3" controlId="pub_year">
                                        <Form.Label> Publication year </Form.Label>
                                        <Form.Control 
                                        type="date"
                                        name="pub_year"
                                        required
                                        placeholder="pub_year"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button type="submit" variant="primary"> 
                                        Add Book 
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col sm={6}>
                                <Image width="200px" height="200px" 
                                src={process.env.REACT_DR_PHOTOPATH+this.props.cover}/>
                                <input onChange={this.handleFileSelected} type="File"/>
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