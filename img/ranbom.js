<script type="text/javascript">
$(function() {
    var arr = [];
    $("#columns span").each(function() {
        arr.push($(this).html());
    });
    arr.sort(function() {
        return Math.random() - Math.random();
    });
    $("#columns").empty();
    for(i=0; i < arr.length; i++) {
        $("#columns").append('<span class="column" draggable="true">' + arr[i] + '</span>');
    }
});
</script>