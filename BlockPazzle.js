function refreshPage(){
    window.location.reload();
}

function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("transferedObj", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("transferedObj");
    console.log(ev);
    console.log(ev.dataTransfer);
    console.log(data);
    console.log(ev.target);
    // ev.target.style.background = rgb(172, 11, 221);
    ev.target.appendChild(document.getElementById(data));
    // console.log(ev.target)
}