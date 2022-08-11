import React, { useContext } from "react"
import { Form, Modal } from "react-bootstrap"
import { Context } from "../App"

export default function FullArticleModal() {
  const [isArticleModal, setIsArticleModal, modalArticle] = useContext(Context)
  return (
    <Modal
      show={isArticleModal}
      onHide={() => setIsArticleModal(false)}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalArticle.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <img src={modalArticle.image} alt="Что-то пошло не так..." />
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>{modalArticle.text}</Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
