import React, { useContext } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { context } from '../App';

export default function FullArticleModal({ show }) {
  const [onCloseModal, state] = useContext(context);
  return (
    <>
      <Modal show={show} onHide={() => onCloseModal('fullPost')} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{state.currentPost.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <img src={state.currentPost.image} alt="Что-то пошло не так..." />
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>{state.currentPost.text}</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
