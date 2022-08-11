import axios from "axios"
import { Card, Button } from "react-bootstrap"
import FullArticleModal from "./FullArticleModal"

export default function Article({ article, dispatch, setIsArticleModal }) {
  async function onRemoveArticle(id) {
    const respose = await axios.delete(
      `https://5c3755177820ff0014d92711.mockapi.io/articles/${id}`
    )
    if (respose.statusText === "OK") {
      await dispatch({ type: "REMOVE_ARTICLE", payload: id })
    }
  }
  function showModalArticle() {
    dispatch({ type: "SHOW_ARTICLE", payload: article })
    setIsArticleModal(true)
  }
  return (
    <Card>
      <Card.Img variant="top" src={article.image} />
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>{article.text}</Card.Text>
        <Button
          onClick={showModalArticle}
          variant="outline-primary"
          className="mr-3"
        >
          Просмотр
        </Button>
        <FullArticleModal />
        <Button variant="danger" onClick={() => onRemoveArticle(article.id)}>
          Удалить
        </Button>
      </Card.Body>
    </Card>
  )
}
