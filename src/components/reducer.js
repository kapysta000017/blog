export const initialState = {
  currentPost: {},
  visibleModal: {
    addArticle: false,
    fullPost: false,
  },
  articles: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, visibleModal: { ...state.visivleModal, [action.payload.name]: true }, currentPost: action.payload.obj };
    case 'CLOSE_MODAL':
      return { ...state, visibleModal: { ...state.visivleModal, [action.payload]: false } };
    case 'ADD_ARTICLE':
      return {
        ...state,
        visibleModal: { ...state.visivleModal, addArticle: false },
        articles: [
          ...state.articles,
          {
            title: action.payload.title,
            text: action.payload.text,
            image: action.payload.image,
            id: action.payload.id,
          },
        ],
      };
    case 'REMOVE_ARTICLE':
      return {
        ...state,
        visibleModal: { ...state.visibleModal },
        articles: state.articles.filter((article) => article.id !== action.payload),
      };
    case 'RENEWAL_STATE':
      return {
        ...state,
        articles: action.payload
      }
    default:
      return state;
  }
}