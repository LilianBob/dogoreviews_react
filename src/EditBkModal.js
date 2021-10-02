import React,{Component} from 'react';
import {Modal, Row, Col, Button, Form, Image} from 'react-bootstrap';

export class EditBkModal extends Component{
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
        fetch(process.env.REACT_DR_API+'book',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                bookId:event.target.bookId.value,
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
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_DR_API+'Book/SaveFile',{
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
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Book
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className ="mb-3" controlId="bookId">
                        <Form.Label>BookId</Form.Label>
                        <Form.Control type="text" name="bookId" required 
                        placeholder="bookId"
                        disabled
                        defaultValue={this.props.bookId}/>
                    </Form.Group>
                    <Form.Group className ="mb-3" controlId="title">
                        <Form.Label> Book title</Form.Label>
                        <Form.Control type="text" name="title" required 
                        defaultValue={this.props.bktitle}
                        placeholder="title"/>
                    </Form.Group>
                    <Form.Group className ="mb-3" controlId="author">
                        <Form.Label> Book author</Form.Label>
                        <Form.Control type="text" name="author" required 
                        defaultValue={this.props.bkauthor}
                        placeholder="author"/>
                    </Form.Group>
                    <Form.Group className ="mb-3" controlId="description">
                        <Form.Label> Book Description </Form.Label>
                        <Form.Control as="textarea" name="description" rows={4} required 
                        defaultValue={this.props.bkdesc}/>
                    </Form.Group>
                    <Form.Group className ="mb-3" controlId="genre">
                        <Form.Label> Genre </Form.Label>
                        <Form.Control as="select" name="genre" defaultValue={this.props.genre} required>
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
                        defaultValue={this.props.bkpubyr}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Book
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
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}