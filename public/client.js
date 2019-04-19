'use strict';

let allUnicorns = [];

const locations = ['Barn', 'Pasture', 'Trails'];

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const loadUnicorns = async() => {

  fetch('/data/unicorns.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      allUnicorns = data.unicorns;
      renderUnicorns();
    });
}

// function avaiable if you want to create a new unicorn
function createUnicorn (name, location){
  allUnicorns.push({
    id: uuidv4(),
    name: name,
    location: location
  });
};

function renderUnicorns(){
  console.log({allUnicorns})
  allUnicorns.forEach(unicornObj => {
    renderUnicorn(unicornObj);
  });
}

// helper render function
function addElement(element, content, parent, value, selected) {
  var newElement = document.createElement(element);
  if (content) {
    var newContent = document.createTextNode(content);
    newElement.appendChild(newContent);
  }
  if (value) {
    newElement.setAttribute('value', value);
  }
  if (selected){
    newElement.setAttribute('selected', "selected");
  }
  parent.appendChild(newElement);
  return newElement;
}

// renders unicorns to the DOM
function renderUnicorn(unicorn){
  let container = document.getElementById('container');
  
  // make div wrapper
  let divEl = addElement('div', '', container);
  divEl.setAttribute('class', 'unicorn');
  
  // unicorn name
  addElement('h2', `name: ${unicorn.name}`, divEl);
  
  // form with select
  let formEl = addElement('from', '', divEl);
  let selectEl = addElement('select', '', formEl);
  selectEl.setAttribute('data-name', unicorn.name);
  
  // option elements

  locations.forEach(location => {
    addElement(
      'option', 
      location, 
      selectEl, 
      location,
      unicorn.location===location
    );
  });

  // event listener callback function
  const updateLocation = (e) => {
    e.preventDefault();
  
    let location = e.target.value;
    unicorn.location = location;
    
    saveUnicorns();
    
  }
  
  selectEl.addEventListener('change', updateLocation);
}

function saveUnicorns(){
  console.log('saving', allUnicorns, JSON.stringify(allUnicorns));
  const datafile = {
    unicorns: allUnicorns
  };
  fetch('/unicorns', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(datafile), 
  })
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => {
      console.error('Error:', error);
    });
}

loadUnicorns();


