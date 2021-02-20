const button = document.getElementById('button1');
const runScript = () => {
  const div = document.createElement('div');
  const text = document.createTextNode('JS from component 1 executed!');
  div.appendChild(text);
  button.insertAdjacentElement('afterend', div);
};
button.addEventListener('click', runScript);