function setCurrentPage(currentPage){
    localStorage.setItem("currentPage", currentPage);
}

function setPreviousPlace(previousPlace){
    localStorage.setItem("previousPlace", previousPlace);
}

function goToPreviousPlace(){
    let previousPlace = localStorage.getItem("previousPlace");
    
    if(previousPlace !== null){
        localStorage.setItem("previousPlace", null)
        location.href = `#${previousPlace}`;
    }
}