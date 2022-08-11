import { useReducer, createContext, useEffect, useState } from "react"
import { Container, CardColumns, Button } from "react-bootstrap"
import Article from "./components/Article"
import AddAricleModel from "./components/AddArticleModel"
import { initialState, reducer } from "./components/reducer"
import axios from "axios"
export const Context = createContext()

function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isModal, setIsModal] = useState(false)
  const [isArticleModal, setIsArticleModal] = useState(false)

  useEffect(() => {
    async function getFetchData() {
      try {
        const response = await axios.get(
          "https://5c3755177820ff0014d92711.mockapi.io/articles"
        )
        dispatch({ type: "RENEWAL_STATE", payload: response.data })
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }
    getFetchData()
  }, [])

  if (error) {
    return error
  }
  return (
    <Container className="articles">
      <Button onClick={() => setIsModal(true)}>Добавить статью</Button>
      <AddAricleModel
        show={isModal}
        onCloseModal={setIsModal}
        dispatch={dispatch}
      />
      <CardColumns className="mt-4">
        <Context.Provider
          value={[isArticleModal, setIsArticleModal, { ...state.modalArticle }]}
        >
          {loading ? (
            <h5>Loading...</h5>
          ) : (
            state.articles.map((article) => (
              <Article
                key={article.id}
                article={article}
                dispatch={dispatch}
                setIsArticleModal={setIsArticleModal}
              />
            ))
          )}
        </Context.Provider>
      </CardColumns>
    </Container>
  )
}

export default App
