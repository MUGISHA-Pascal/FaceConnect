document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementsByClassName('ex');
    button.addEventListener('click',()=>{
        document.body.style.backgroundColor = 'blue';
    });
});