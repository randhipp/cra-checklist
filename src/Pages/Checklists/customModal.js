import React, { useState } from "react";

import ReactJsonView from "react-json-view";
import { FaEye, FaTimes } from "react-icons/fa";
import deleteChecklist from './services';
// import SweetAlert from 'sweetalert2-react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const CustomModal = (props) => {
    const MySwal = withReactContent(Swal)
  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () => {
          MySwal.fire({
              title: <p>Delete Checklist ? <br></br><code>{props.data.id} - {props.description}</code></p>,
              footer: "You've been warned!",
              showCancelButton: true
            }).then((result) => {
                console.log(result);
              if (result.value === true) {
                  deleteChecklist(props.data.id);
                  MySwal.fire('Deleted!', '', 'success').then(() => window.location.reload())
                } else {
                  MySwal.fire('Action Canceled!', '', 'info')
                }
            })
      };
  
    return (
      <tr key={props.data.id}>
        <td>{props.description}</td>
        <td>{props.urgency}</td>
        <td>{props.items ? props.items.length : null}</td>
        <td>
          <Button size="sm" onClick={handleShow}>
            <FaEye></FaEye>
          </Button>&nbsp;
          <Button variant="danger" size="sm" onClick={handleDelete}>
            <FaTimes></FaTimes>
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                Items for <code>{props.description}</code>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {props.items.map((item) => {
                return (
                  <div>
                    {item.description} - {item.due_interval} {item.due_unit} -{" "}
                    {item.created_at}
                  </div>
                );
              })}
              <br></br>
              <ReactJsonView
                collapsed="false"
                theme="monokai"
                src={props.data}
              ></ReactJsonView>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
          </Button> */}
            </Modal.Footer>
          </Modal>
        </td>
      </tr>
    );
  };