$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/greeting?name=Bizon4ik"
    }).then(function(data) {
        $('.greeting-id').append(data.id);
        $('.greeting-content').append(data.content);
    });
});