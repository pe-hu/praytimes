<?php
function h($str) {
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

$date = (string)filter_input(INPUT_POST, 'date'); // $_POST['date']
$title = (string)filter_input(INPUT_POST, 'title'); // $_POST['title']
$img = (string)filter_input(INPUT_POST, 'img'); // $_POST['img']
$link = (string)filter_input(INPUT_POST, 'link'); // $_POST['link']

$fp = fopen('live.csv', 'a+b');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    flock($fp, LOCK_EX);
    fputcsv($fp, [$date, $title, $img, $link]);
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
<link href="styles.css" rel="stylesheet">
<link href="/img/onmouse.css" rel="stylesheet">
<title>プレイタイムズ | a place of pray/play for us</title>
<style>
.column #text a {
	font-size:1.25rem;
	background:#f3c5c6;
	border-radius:5rem;
    line-height:5rem;
    text-align:center;
    color:#fff;
	margin:0;
	position:absolute;
	z-index:100;
	top:5%; right:5%;
	width:5rem; height:5rem;
}
.column #text a:hover {
    zoom:2;
}
.column #text a:after {
  content: "”";
  color:#fff;
  font-size:5rem;
  position:absolute;
  top:75%; left:50%;
  -webkit-transform:translate(-50%,50%);
   transform:translate(-50%,-50%);
}
.column #text a:before {
  content: "";
  position: absolute;
  bottom: -0.75rem;
  left: 1.75rem;
  border: 1.5rem solid transparent;
  border-left: 2.5rem solid #f3c5c6;
  z-index: 0;
  -webkit-transform: rotate(90deg);
  transform: rotate(0deg);
}
.column:not(:first-child) #text a {
  display:none;
}
#onmouse_button {
  bottom:2.5%;
  left:2.5%;
}
</style>
</head>

<body onload="PageLoad();">
<ul id="columns">
<?php if (!empty($rows)): ?>
<?php foreach ($rows as $row): ?>
<span class="column" draggable="true">
<div id="text">
<a href="<?=h($row[3])?>" target="_blank" rel="noopener noreferrer"></a>
</div>
<iframe src="https://www.youtube.com/embed/<?=h($row[2])?>?autoplay=1&mute=1&playsinline=1&loop=1&playlist=<?=h($row[2])?>&controls=0&disablekb=1" frameborder="0" allowfullscreen></iframe>
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
