// Hardcoded list of courses
const courses = [
    {
        name: 'C++ for advanced',
        price: 4.85,
    },
    {
        name: 'Python for beginners',
        price: 3.25,
    },
    {
        name: 'JavaScript pt. 1',
        price: 5.95,
    },
    {
        name: 'JavaScript complete course',
        price: 9.95,
    },
    {
        name: 'JavaScript pt. 2',
        price: 4.15,
    },
    {
        name: 'C# and .NET',
        price: 8.75,
    },
]

// Our target <ul>
const list = document.getElementById('list');

// Creating list items on load of the web page.
window.addEventListener('load', () => addCourses(courses, list));

// Search for a buttons in document
const addCourseButton = document.getElementById('addCourse');
const sortButton = document.getElementById('sort');

// If true - ascending, else - descending
let ascending = true;

// SortButton initially sorts the array, and then re-renders the contents of target (<ul>)
sortButton.addEventListener('click', () => {
    sortCoursesByPrice(courses);
    addCourses(courses, list);
})

// Clears the target HTML Element and insert HTML Elements from array
function renderHTMLElements(elements, target) {
    // Just to be sure we have something to render
    if (!elements.length) return;

    // Just to be sure we have where to render
    if (!target) return;

    // Clear the target HTML Element
    target.innerHTML = '';

    // Creating fragment so we don't need to create 'real' node/HTML Element
    // It is the same as <div> but doesn't exists in real DOM tree
    const documentFragment = document.createDocumentFragment();

    // Loop through array of HTML Elements and append each to the fragment
    elements.forEach(element => {
        documentFragment.appendChild(element);
    });
    
    // Appending a fragment to the existing <ul>
    list.appendChild(documentFragment);
};

// Creates and wrapping single list item
function generateListItem ({ name, price }) {
    // Creating <li> element
    const li = document.createElement('li');

    // Set classes for styling
    li.setAttribute('class', 'list-group-item');

    // Setting inner text for <li> as course name
    li.innerText = name;

    // Creating <span> that contains the price of the course
    const span = document.createElement('span');

    // Set classes for styling
    span.setAttribute('class', 'float-right');

    // Setting inner text for <span> as course price
    // Don't forget about $ sign
    span.innerText = `$${price}`;

    // Inserting span into <li> element
    li.appendChild(span);
    
    // Returning resulting <li> for further use
    return li;
}

// Initiates the process
function addCourses (courses, target) {

    // Loop through array of courses and call generateListItem
    const listItemsArray = courses.map((course) => generateListItem(course));

    // Calls render function with given array
    renderHTMLElements(listItemsArray, target);
}

// Simply sort courses array 
function sortCoursesByPrice (courses) {
    if (ascending) {

        // Ascending order
        courses.sort((a, b) => a.price > b.price ? 1 : -1);
        ascending = false;
    } else {
        // Descending order
        courses.sort((a, b) => a.price < b.price ? 1 : -1);
        ascending = true;
    }
}