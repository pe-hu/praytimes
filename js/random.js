$(function () {
    var arr = [];
    $(".random li").each(function () {
        arr.push($(this).html());
    });
    arr.sort(function () {
        return Math.random() - Math.random();
    });
    $(".random").empty();
    for (i = 0; i < arr.length; i++) {
        $(".random").append('<li draggable="true">' + arr[i] + '</li>');
    }
});
