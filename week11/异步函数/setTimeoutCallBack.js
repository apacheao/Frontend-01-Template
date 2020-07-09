<style>
  div {
    background-color: gray;
    display: inline-block;
    margin: 30px;
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }

  .green.light {
    background-color: green;
  }

  .yellow.light {
    background-color: yellow;
  }

  .red.light {
    background-color: red;
  }
</style>

<div class="green"></div>
<div class="yellow"></div>
<div class="red"></div>

<script>
function green() {
  var lights = document.getElementsByTagName("div");
  for (var i = 0; i < lights.length; i++) {
    lights[i].classList.remove("light")
  }
  document.getElementsByClassName("green")[0].classList.add("light")
}

function red() {
  var lights = document.getElementsByTagName("div");
  for (var i = 0; i < lights.length; i++) {
    lights[i].classList.remove("light")
  }
  document.getElementsByClassName("red")[0].classList.add("light")
}

function yellow() {
  var lights = document.getElementsByTagName("div");
  for (var i = 0; i < lights.length; i++) {
    lights[i].classList.remove("light")
  }
  document.getElementsByClassName("yellow")[0].classList.add("light")
}

//setTimeout 非嵌套
// function go() {
//   green();
//   setTimeout(() => yellow(), 1000);
//   setTimeout(() => red(), 1200);
//   setTimeout(() => go(), 1700)
// }

//callback 嵌套
function go() {
  green();
  setTimeout(function () {
    yellow();
    setTimeout(function () {
      red();
      setTimeout(function () {
        go()
      }, 500)
    }, 200)
  }, 1000)
}

</script>
