import React, { useReducer, createContext, useEffect, useState } from 'react';
import Article from './components/Article';
import { Container, CardColumns, Button } from 'react-bootstrap';
import AddAricleModel from './components/AddArticleModel';
import { initialState, reducer } from './components/reducer';
import axios from 'axios';
export const context = createContext();

function App() {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const onOpenModal = (name, obj = {}) => dispatch({ type: 'OPEN_MODAL', payload: { name, obj } });
  const onCloseModal = (name) => dispatch({ type: 'CLOSE_MODAL', payload: name });
  const onAddArticle = (data) => dispatch({ type: 'ADD_ARTICLE', payload: data });
  const onRemoveArticle = (id) => {
    if (window.confirm('Уверен?')) {
      dispatch({ type: 'REMOVE_ARTICLE', payload: id });
      axios.delete(`https://5c3755177820ff0014d92711.mockapi.io/articles/${id}`);
    }
  };

  async function fetchData() {
    try {
      const response = await axios.get('https://5c3755177820ff0014d92711.mockapi.io/articles');
      dispatch({ type: 'RENEWAL_STATE', payload: response.data });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container className="articles">
        <Button onClick={() => onOpenModal('addArticle')}>Добавить статью</Button>
        <AddAricleModel
          show={state.visibleModal.addArticle}
          onAddArticle={onAddArticle}
          onCloseModal={onCloseModal}
        />
        <CardColumns className="mt-4">
          <context.Provider value={[onCloseModal, state]}>
            {loading ? (
              <h5>Loading...</h5>
            ) : (
              state.articles.map((obj) => (
                <Article
                  state={state}
                  key={obj.id}
                  title={obj.title}
                  img={obj.image}
                  text={obj.text}
                  onRemoveArticle={onRemoveArticle}
                  obj={obj}
                  onOpenModal={onOpenModal}
                />
              ))
            )}
          </context.Provider>
        </CardColumns>
      </Container>
    </>
  );
}

export default App;
