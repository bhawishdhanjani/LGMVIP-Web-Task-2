import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Button, Col, Row } from 'react-bootstrap';
import '../App.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

function GetData() {
    const [users, setUsers] = useState([])
    const [loading, setloading] = useState(false)

    let [color, setColor] = useState("#ffffff");
    const fetchData = async () => {
        try {
            setloading(true)
            console.log('fetch')
            const response = await fetch('https://reqres.in/api/users?page=2');
            const data = await response.json();
            setUsers(data.data)
            setloading(false)

        }
        catch (error) {
            console.log('Error fetching data:', error)
        }

    }




    return (
        <>
            <Container className="contain">
                <div style={{ display: "flex", justifyContent: "center", marginTop: '20px' }}>
                    <div style={{ padding: "0px 5px" }}>
                        <h3> User's Information</h3>
                    </div>

                    <div style={{ padding: "0px 5px" }}>
                        <Button onClick={fetchData} className="btn"> Get Data</Button>
                    </div>

                </div>
                <Row className="Row">

                    {loading ? ( // Render the loader if loading state is true
                        <div style={{ display: "flex", justifyContent: "center", marginTop: '20px' }}>
                            <ClipLoader
                                color={color}
                                loading={loading}
                                cssOverride={override}
                                size={150}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>) : (

                        users.map(user => (

                            <Col key={user.id} sm={12} lg={4} md={3} className="Col">
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={user.avatar}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {user.first_name}  {user.last_name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {user.email}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Col>

                        ))

                    )}


                </Row>




            </Container>
        </>
    )
}

export default GetData