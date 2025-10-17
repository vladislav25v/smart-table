// @todo: #4.3 — настроить компаратор

export function initFiltering(elements) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach((elementName) => {
      elements[elementName].append(
        ...Object.values(indexes[elementName]).map((name) => {
          const el = document.createElement("option");
          el.textContent = name;
          el.value = name;
          return el;
        })
      );
    });
  };

  // @todo: #4.2 — обработать очистку поля
  const applyFiltering = (query, state, action) => {
    // код с обработкой очистки поля
    if (action && action.name === "clear") {
      const field = action.dataset.field;
      const parent = action.parentElement;
      if (parent) {
        const input = parent.querySelector("input, select");
        if (input) {
          input.value = "";
          state[field] = "";
        }
      }
    }

    // @todo: #4.5 — отфильтровать данные используя компаратор

    const filter = {};
    Object.keys(elements).forEach((key) => {
      if (elements[key]) {
        if (
          ["INPUT", "SELECT"].includes(elements[key].tagName) &&
          elements[key].value
        ) {
          // ищем поля ввода в фильтре с непустыми данными
          filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
        }
      }
    });

    return Object.keys(filter).length
      ? Object.assign({}, query, filter)
      : query; // если в фильтре что-то добавилось, применим к запросу
  };

  return {
    updateIndexes,
    applyFiltering,
  };
}
