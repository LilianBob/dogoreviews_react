import React, {Component} from 'react';
// import { render } from 'react-dom';
import {Button, Card, Row, Col, ButtonToolbar} from 'react-bootstrap';
import {AddBkModal} from './AddBkModal';
import {EditBkModal} from './EditBkModal';

export class Book extends Component{
    constructor(props){
        super(props);
        this.state = {bks:[], addModalShow:false, editModalShow:false}
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
    deleteBk(bkid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_DR_API+'bk/'+bkid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {bks, bkid, bkcover, bktitle, bkdesc, bkauthor, bkgenre, bkpubyr, bkslug}= this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Row xs={1} md={4} lg={6} className="g-18">
                {Array.from({ length: 12 }).map((_, idx) => (
                    <Col>
                    {bks.map(bk=>
                        <Card key="{bk.bookId"> style={{ width: '18rem' }}
                            <Card.Img variant="top" src="{bk.cover}" />
                            <Card.Body>
                                <Card.Title>{bk.bookId}</Card.Title>
                                <Card.Text>{bk.title}</Card.Text>
                                <Card.Text>{bk.author}</Card.Text>
                                <Card.Text>{bk.description}</Card.Text>
                                <Card.Text>{bk.pub_year}</Card.Text>
                                <Card.Text>{bk.genre}</Card.Text>
                                <Card.Text>{bk.slug}</Card.Text>
                                <Card.Link href="#"> Add a review </Card.Link>
                                <Card.Link href="#"> Edit/Delete </Card.Link>
                                <Card.Link href="#"> More on this book </Card.Link>
                                <Card.Link>
    <ButtonToolbar>
        <Button className="mr-2" variant="info"
        onClick={()=>this.setState({editModalShow:true,
            bkid:bk.bookId, bkcover:bk.cover, bktitle:bk.title, bkauthor:bk.author,
            bkpubyr:bk.pub_year, bkdesc:bk.description, bkgenre:bk.genre, bkslug:bk.slug})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
        onClick={()=>this.deleteBk(bk.bookId)}>
            Delete
        </Button>

            <EditBkModal show={this.state.editModalShow}
            onHide={editModalClose}
            bkid={bkid}
            bkcover={bkcover}
            bktitle={bktitle}
            bkdesc={bkdesc}
            bkauthor={bkauthor}
            bkgenre={bkgenre}
            bkpubyr={bkpubyr}
            bkslug={bkslug}
            />
    </ButtonToolbar>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    )};
                    </Col>
                ))}
                </Row>
                <ButtonToolbar>
                    <Button variant='primary' onClick={()=>this.setState({addModalShow:true,
                    
                    })}>
                    Add Book
                    </Button>
                    <AddBkModal show={this.state.addModalShow} onHide={addModalClose}/>
                </ButtonToolbar>
            </div>    
        )      
    }
}