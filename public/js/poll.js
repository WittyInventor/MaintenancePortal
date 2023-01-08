function closeModal(obj){
    $("#modal").modal("hide");
}


setInterval(function() {
    fetch('/poll', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).then(data => {
        if(data.message === "update"){
            $("#modal").modal("show");
        }
    });
}, 5000);