const dom = `<!DOCTYPE html>
<head>
<style type="text/css">
div {text-align: center}
#fragment1, #fragment2, #fragment3 {
  min-height: 15vh; display:flex; align-items: center; flex-direction: column; justify-content: center
}
#fragment1 {background-color: #EDFFEC;}
#fragment2 {background-color: #61E786;}
#fragment3{ background-color: #48435C;}
</style>
</head>
<body>
<div id="fragment1" class="javascript"></div>
<div id="fragment2"></div>
<div id="fragment3" class="javascript"></div>
<div id="fragment4" class="react"></div>
</body>`;

export default dom;
