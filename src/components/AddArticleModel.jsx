import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

export default function AddArticleModel({ show, onAddArticle, onCloseModal }) {
  const [data, setData] = useState({
    title: '',
    image: '',
    text: '',
  });

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  async function fetchArticle(postObj) {
    const response = (
      await axios.post('https://5c3755177820ff0014d92711.mockapi.io/articles', postObj)
    ).data;
    onAddArticle({ ...response });
  }

  const onClickAdd = () => {
    if (data.title.trim() !== '' && data.image.trim() !== '' && data.text.trim() !== '') {
      setData({
        title: '',
        image: '',
        text: '',
      });
      const postObj = {
        title: data.title,
        image: data.image,
        text: data.text,
      };
      fetchArticle(postObj);
    }
  };

  return (
    <>
      <Modal show={show} onHide={() => onCloseModal('addArticle')} animation={false}>
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
                value={data.title}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Изображение</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChangeInput}
                name="image"
                value={data.image}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Текст</Form.Label>
              <Form.Control
                as="textarea"
                onChange={handleChangeInput}
                name="text"
                value={data.text}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onCloseModal('addArticle')}>
            Закрыть
          </Button>
          <Button variant="success" onClick={onClickAdd}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
