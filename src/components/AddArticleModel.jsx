import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import axios from "axios"

export default function AddArticleModel({ show, onCloseModal, dispatch }) {
  const [article, setArticle] = useState({
    title: "",
    image: "",
    text: "",
  })

  const handleChangeInput = (event) => {
    const { name, value } = event.target
    setArticle({
      ...article,
      [name]: value,
    })
  }

  async function addArticleFetch(addArticle) {
    const response = await axios.post(
      "https://5c3755177820ff0014d92711.mockapi.io/articles",
      addArticle
    )
    if (response.statusText === "Created") {
      await dispatch({ type: "ADD_ARTICLE", payload: response.data })
      onCloseModal(false)
    }
  }

  const onClickAddArticle = () => {
    if (
      article.title.trim() !== "" &&
      article.image.trim() !== "" &&
      article.text.trim() !== ""
    ) {
      setArticle({
        title: "",
        image: "",
        text: "",
      })
      const addArticle = {
        title: article.title,
        image: article.image,
        text: article.text,
      }
      addArticleFetch(addArticle)
    }
  }

  return (
    <Modal show={show} onHide={() => onCloseModal(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Добавление статьи</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Заголовок</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChangeInput}
              name="title"
              value={article.title}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Изображение</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChangeInput}
              name="image"
              value={article.image}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Текст</Form.Label>
            <Form.Control
              as="textarea"
              onChange={handleChangeInput}
              name="text"
              value={article.text}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onCloseModal(false)}>
          Закрыть
        </Button>
        <Button variant="success" onClick={onClickAddArticle}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
