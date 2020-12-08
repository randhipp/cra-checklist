import React, { useState } from "react";
import ky from "ky";
import { getToken } from "../../../Utils/Common";

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function ChecklistForm(props) {
    const objectDomain = useFormInput('');
    const objectId = useFormInput('');
    const description = useFormInput('');
    const dueTime = useFormInput('');
    const dueDate = useFormInput('');
    const urgency = useFormInput('');
    const taskId = useFormInput('');
    const items = useFormInput('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const MySwal = withReactContent(Swal)
  
    const handleSubmit = async () => {
        setError(null);
        setLoading(true);
        try {
            const headers = {
                authorization: "Bearer " + getToken(),
            };          
            let URL = `https://checklists.wafvel.com/api/v1/checklists`;
            
            // let dueDate = new Date();

            const response = await ky.post(URL, {headers: headers, json: {
                    data: {
                      attributes: {
                        object_domain: objectDomain.value,
                        object_id: objectId.value,
                        due: '2019-01-25T07:50:14+00:00',
                        urgency: urgency.value,
                        description: description.value,
                        items: [
                            "Visit his house",
                            "Capture a photo",
                            "Meet him on the house"
                          ],
                        task_id: taskId.value
                      }
                    }
            }}).json();
            
            console.log(response)
            setLoading(false);
            MySwal.fire({
                title: <p>Checklist Created<br></br><code>{response.data.id} - {response.data.attributes.description}</code></p>,
                }).then(() => window.location.reload())

        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(JSON.stringify(error));
        }
       }

  return (
    <Container>
        <Row>
            <Col xs lg="2"></Col>
            <Col>
                <Form>
                    <Form.Group controlId="formBasicObjectDomain">
                        <Form.Label>Object Domain</Form.Label>
                        <Form.Control type="text" {...objectDomain} placeholder="Object Domain" required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicObjectId">
                        <Form.Label>Object ID</Form.Label>
                        <Form.Control type="text" {...objectId} placeholder="Object Id" required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" {...description} placeholder="Checklist Description" required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicUrgency">
                        <Form.Label>Urgency</Form.Label>
                        <Form.Control type="number" min="1" {...urgency} placeholder="Checklist Urgency" required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicTaskId">
                        <Form.Label>Task ID</Form.Label>
                        <Form.Control type="number" min="1" {...taskId} placeholder="Task Id" required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicDueDate">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control type="date" {...dueDate} placeholder="Due" required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicDueTime">
                        <Form.Label>Due Time</Form.Label>
                        <Form.Control type="time" {...dueTime} placeholder="Due" required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicItems">
                        <Form.Label>Items</Form.Label>
                        <Form.Control type="string" {...items} placeholder="Items" required/>
                    </Form.Group>
                    <Button 
                    variant="primary" 
                    onClick={handleSubmit} 
                    disabled={loading}
                    >{loading ? 'Saving...' : 'Submit'}</Button>
                </Form>
            </Col>
            <Col xs lg="2"></Col>
        </Row>
    </Container>
  );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
  
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }

export default ChecklistForm;
