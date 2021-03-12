/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
Global Variables
*/
const perPage = 9;
const header = document.querySelector('.header');
const ulStudentList = document.querySelector('.student-list');
const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('button');
const studentCollection = ulStudentList.children;

/*
Dynamically insert search bar
*/
header.insertAdjacentHTML('beforeend',
   `<label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>`
 );

/*
`showPage` function
   * This function will create and insert/append the elements needed to display a "page" of nine students
   * list - object - student data
   * page - number - page number which will determine the 9 students selected from list
   * Conditional will check for instance where an 'empty' list is passed
*/
function showPage(list, page){
   const startIndex = (page*perPage) - perPage;
   const endIndex = page*perPage;
   ulStudentList.innerHTML = '';
   if(list.length != 0){
      for(let i = 0; i < list.length; i++) {
         if(i >= startIndex && i < endIndex){
            ulStudentList.insertAdjacentHTML('beforeend',
            `<li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>`);
         }
      }
   }else{
      ulStudentList.innerHTML = 'No results found';
   } 
}

/*
Create the `addPagination` function
   * This function will create and insert/append the elements needed for the pagination buttons
   * Functionality of buttons included with a 'click'  handler
   * list - object - student data
*/
function addPagination(list){
   const numButtons = Math.ceil(list.length/perPage);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   if(list.length != 0){
      for(let i = 1; i < numButtons+1; i++){
         linkList.insertAdjacentHTML('beforeend',
            `<li>
               <button type="button">${i}</button>
            </li>`);
      }
   
      const firstButton = linkList.firstElementChild.firstElementChild;
      firstButton.className = 'active';
   
      linkList.addEventListener('click', (e) => {
         if(e.target.tagName ==='BUTTON'){
            const activeButtons = document.getElementsByClassName('active');
            for(let i = 0; i < activeButtons.length; i++){
               activeButtons[i].classList.remove('active');
            }
            e.target.className= 'active';
            showPage(list, e.target.textContent);
         }
      });
   }
}

/*
`searchNames` function
   * This function returns a filtered list of student data based on user input
   * userInput - input
   * list - object - student data
*/
function searchNames(userInput, list){
   const filteredList = [];
   for(let i = 0; i < list.length; i++){
      const firstName = list[i].name.first.toLowerCase();
      const lastName = list[i].name.last.toLowerCase();
      const fullName = firstName + lastName;
      if(userInput.value.length != 0){
         if(firstName.includes(userInput.value.toLowerCase()) || lastName.includes(userInput.value.toLowerCase()) || fullName.includes(userInput.value.toLowerCase())){
            filteredList.push(list[i]);
         } 
      }else{
         filteredList.push(list[i]);
      }
   }
   return filteredList;
}

/*
Event listener for search button
*/
searchButton.addEventListener('click', () => {
   const matchList = searchNames(searchInput, data);
   showPage(matchList, 1);
   addPagination(matchList);
});

/*
Event listener for input
*/
searchInput.addEventListener('keyup', () => {
   const matchList = searchNames(searchInput, data);
   showPage(matchList, 1);
   addPagination(matchList);
});

/*
Call functions
*/
showPage(data, 1);
addPagination(data);