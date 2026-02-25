const deleteBtns = document.getElementsByClassName('delete-btn');

for(let deleteBtn of deleteBtns){
    deleteBtn.addEventListener('click', function(event){
      const card = event.target.parentNode.parentNode;
      cardSection.removeChild(card);
      
      calculateCount();
      
    })
    
}


// for(let deleteBtn of deleteBtns){
//     deleteBtn.addEventListener('click', function(event){
//       const card = event.target.parentNode.parentNode;
//       filteredSection.removeChild(card);
      
      
//       calculateCount();
      
//     })
    
// }