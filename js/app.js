// Variable
let courses = document.querySelector('#courses-list'),
    shoppingCartContent = document.querySelector('#cart-content tbody'),
    clearCartBtn =  document.querySelector('#clear-cart');





// Events 

loadEventListener();

function loadEventListener() {

    // When a new course is added
    courses.addEventListener('click', buyCourse);

    // When the remove button is clicked
    shoppingCartContent.addEventListener('click', removeCourse);

    // Print the Data From the localStorage on Page Load

    document.addEventListener('DOMContentLoaded', printCoursesFromLocalStorage);
};





// Functions

function buyCourse (e) {
    e.preventDefault();
    
    // Use Delegation to find the course that was added
    if (e.target.classList.contains('add-to-cart')) {
        // Read the course Values 
        let course = e.target.parentElement.parentElement;

        // Read the Values

        getCourseInfo( course )
    } else {
        console.log('No it doesn\'t contain add-to-cart')
    }
}

// Read the HTML info of the selected Course

function getCourseInfo(course) {
    
    // Create an Object with the Course Data
    const courseData = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    };
    // Insert Course Data to the Shopping Cart
    addToCart(courseData)
};


// Add Course to Cart
function addToCart(course) {
    // Create a <tr> to insert to the table body in the cart section.

    const row = document.createElement('tr');

    // Build Row Template with the data from the course object passed as an argument.

    row.innerHTML = `
        <tr>
            <td>
                <img src='${course.image}' width="100px">
            </td>
            <td>
                ${course.title}
            </td>
            <td>
            ${course.price}
            </td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td> 
        </tr>
    
    `
    shoppingCartContent.appendChild(row);

    // Add into Storage

    addToLocalStorage(course)

};

// Remove Single course from the DOM
function removeCourse(e) {
    let course, courseId;

    // Removes Course From the DOM
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id') 
    }

    // Remove Course from the Local Storage
    console.log(course, courseId)
    removeCourseFromLocalStorage(courseId);
}
// Remove all Course with the clear cart Btn

clearCartBtn.addEventListener('click', () => {

    while (shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild)
    }

    // Clears All courses from the Local Storage

    localStorage.clear();
});

// Add Course Data Into Local Storage

function addToLocalStorage(courseData) {
    let courses = getDataFromStorage();

    courses.push(courseData);

    // Since Local Storage doesn't support more than one item we use the JSON.stringify methos to pass the array as a string

    let stringifiedCourse = JSON.stringify(courses);

    localStorage.setItem('courses', stringifiedCourse);
}

// Get the content from Storage

function getDataFromStorage() {
    let courses;

    // If courses exists on storage we get the value otherwise we create an empty array 

    if (localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
};

function printCoursesFromLocalStorage() {
    let course = getDataFromStorage();

    // Loop through the Courses from the Local Storage and Print into the cart
    course.forEach((c) => {
        const row = document.createElement('tr');

        // Build Row Template with the data from the course object passed as an argument.
    
        row.innerHTML = `
            <tr>
                <td>
                    <img src='${c.image}' width="100px">
                </td>
                <td>
                    ${c.title}
                </td>
                <td>
                ${c.price}
                </td>
                <td>
                    <a href="#" class="remove" data-id="${c.id}">X</a>
                </td> 
            </tr>
        
        `
        shoppingCartContent.appendChild(row);
    })
};

// Removes Selected Course From Local Storage

function removeCourseFromLocalStorage(id) {
    // Get the Courses from Local Storage
    let coursesFromLocalStorage = getDataFromStorage();

    // Loop through the Courses and find the Course that matches the data-id attribute
    coursesFromLocalStorage.forEach((e, index) => {
        if(e.id == id) {
            console.log('Course Found')
            // Romove the course that matches the data-id attribute
            coursesFromLocalStorage.splice(index, 1);
        } else{
            console.log('Course Not Found')
        }
    });
    // Print the remaining course to the console
    console.log(coursesFromLocalStorage)

    // Add the remaining course back to the Local Storage
    localStorage.setItem('courses' ,JSON.stringify(coursesFromLocalStorage));

}