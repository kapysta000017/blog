export const initialState = {
  modalArticle: {},
  articles: [],
}

export function reducer(state, action) {
  switch (action.type) {
    case "RENEWAL_STATE":
      return {
        ...state,
        articles: action.payload,
      }
    case "ADD_ARTICLE":
      return {
        ...state,
        articles: [
          ...state.articles,
          {
            title: action.payload.title,
            text: action.payload.text,
            image: action.payload.image,
            id: action.payload.id,
          },
        ],
      }
    case "REMOVE_ARTICLE":
      return {
        ...state,
        articles: state.articles.filter(
          (article) => article.id !== action.payload
        ),
      }
    case "SHOW_ARTICLE":
      return {
        ...state,
        modalArticle: { ...action.payload },
      }
    default:
      return state
  }
}
