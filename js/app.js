// Variable
let courses = document.querySelector('#courses-list'),
    shoppingCartContent = document.querySelector('#cart-content tbody');





// Events 

loadEventListener();

function loadEventListener() {

    // When a new course is added
    courses.addEventListener('click', buyCourse);
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

}