import React from 'react';
import { Card, Button } from 'react-bootstrap';
import FullArticleModal from './FullArticleModal';

export default function Article({ title, img, text, onRemoveArticle, obj, onOpenModal, state }) {
  return (
    <>
      <Card>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          <Button
            onClick={() => onOpenModal('fullPost', obj)}
            variant="outline-primary"
            className="mr-3">
            Просмотр
          </Button>
          <FullArticleModal show={state.visibleModal.fullPost} />
          <Button variant="danger" onClick={() => onRemoveArticle(obj.id)}>
            Удалить
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
