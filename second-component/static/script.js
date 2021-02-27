(() => {
  const div = document.getElementById('div2')
  const newDiv = document.createElement('div');
  const text = document.createTextNode('JS from component 2 was executed!');
  newDiv.appendChild(text);
  div.insertAdjacentElement('afterend', newDiv);
})();
