<?php
function h($str) {
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

$img = (string)filter_input(INPUT_POST, 'img'); // $_POST['img']

$fp = fopen('piece.csv', 'a+b');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    flock($fp, LOCK_EX);
    fputcsv($fp, [$img,]);
    rewind($fp);
}

flock($fp, LOCK_SH);
while ($row = fgetcsv($fp)) {
    $rows[] = $row;
}
flock($fp, LOCK_UN);
fclose($fp);

?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<meta name="viewport" content="width=device-width">
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
<link href="/img/columns.css
" rel="stylesheet">
<title>プレイタイムズ | a place of pray/play for us</title>
<style>
body {background:#f3c5c6;}
</style>
</head>

<body onload="PageLoad();">

<ul id="columns">
<?php if (!empty($rows)): ?>
<?php foreach ($rows as $row): ?>
<span class="column" draggable="true">
<div id="text">
</div>
<img src="<?=h($row[0])?>.JPG">
</span>
<?php endforeach; ?>
<?php else: ?>
<?php endif; ?>
</ul>
</body>
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

<script type="text/javascript">
  var dragSrcEl = null;

    function handleDragStart(e) {
      dragSrcEl = this;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.outerHTML);
      this.classList.add('dragElem');
    }

    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      this.classList.add('over');
      e.dataTransfer.dropEffect = 'move'; 
      return false;
    }

    function handleDragEnter(e) {
    }

    function handleDragLeave(e) {
      this.classList.remove('over'); 
    }

    function handleDrop(e) {
      if (e.stopPropagation) {
        e.stopPropagation(); 
      }

      if (dragSrcEl != this) {
        this.parentNode.removeChild(dragSrcEl);
        var dropHTML = e.dataTransfer.getData('text/html');
        this.insertAdjacentHTML('beforebegin', dropHTML);
        var dropElem = this.previousSibling;
        addDnDHandlers(dropElem);

      }
      this.classList.remove('over');
      return false;
    }

    function handleDragEnd(e) {
      this.classList.remove('over');
    }

    function addDnDHandlers(elem) {
      elem.addEventListener('dragstart', handleDragStart, false);
      elem.addEventListener('dragenter', handleDragEnter, false)
      elem.addEventListener('dragover', handleDragOver, false);
      elem.addEventListener('dragleave', handleDragLeave, false);
      elem.addEventListener('drop', handleDrop, false);
      elem.addEventListener('dragend', handleDragEnd, false);
    }

    function PageLoad() {
      var cols = document.querySelectorAll('#columns .column');
      [].forEach.call(cols, addDnDHandlers);
    }
</script>
</html>