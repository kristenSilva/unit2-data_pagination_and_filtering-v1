/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const perPage = 9;
const header = document.querySelector('.header');
const ulStudentList = document.querySelector('.student-list');

//Dynamically insert search form
header.insertAdjacentHTML('beforeend',
   `<label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>`
 );

/*Variables to reference <input> and search <button> elements */
const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('button');
/*Variable to store object of li elements containing student info */
const studentCollection = ulStudentList.children;

//function to search names from input
//userInput grabed from input field
//list param = student ddata
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

//event listener for search button
searchButton.addEventListener('click', () => {
   const matchList = searchNames(searchInput, data);
   showPage(matchList, 1);
   addPagination(matchList);
});

//event listener for keys
searchInput.addEventListener('keyup', () => {
   const matchList = searchNames(searchInput, data);
   showPage(matchList, 1);
   addPagination(matchList);
});


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
list param = student data OBJECT
page param = page number which will determine the 9 students selected from list
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
This function will create and insert/append the elements needed for the pagination buttons
list param = student data
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


// Call functions
showPage(data, 1);
addPagination(data);