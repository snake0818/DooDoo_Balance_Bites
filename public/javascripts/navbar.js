const webPath = window.location.pathname.split('/').slice(0, -1).join('/') + '/';

// 產生一個導覽列(Navigation Bar)
const navbar = `
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-info">
    <div class="container-fluid">
      <a class="navbar-brand fs-4" id="webTitle">
        <img src="./public/images/Title.png" height="30px">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item"> <a class="nav-link" id="home">首頁</a></li>
          <li class="nav-item"> <a class="nav-link" id="record">紀錄</a></li>
        </ul>
        <div class="fs-5 fw-bold">康寧大學幼保系陳麗珠團隊製作</div>
      </div>
    </div>
  </nav>
`

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('afterbegin', navbar);
  document.getElementById('webTitle').href = webPath;
  document.getElementById('home').href = webPath;
  document.getElementById('record').href = `${webPath}record.html`;
}, { once: true })