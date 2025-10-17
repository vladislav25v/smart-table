export function initSearching(searchField) {
  // @todo: #5.1 — настроить компаратор

  return (query, state, action) => {
    // result заменили на query
    // @todo: #5.2 — применить компаратор
    return state[searchField]
      ? Object.assign({}, query, {
          // проверяем, что в поле поиска было что-то введено
          search: state[searchField], // устанавливаем в query параметр
        })
      : query; // если поле с поиском пустое, просто возвращаем query без изменений
  };
}
