
let divMenu = document.getElementById('menu')
const menu = `
<nav class="navbar navbar-expand-md bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Saphony</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/dashboard.html">Dashboard</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/formLine.html">Create Line</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/login">login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/test">test</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
`

function getMenu() {
    return menu
}
divMenu.innerHTML = menu