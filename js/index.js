// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

document
  .querySelectorAll(".dropdown-toggle")
  .forEach(function (dropdownToggle) {
    dropdownToggle.addEventListener("click", function () {
      var dropdownMenu = this.parentElement.querySelector(".dropdown-menu");
      toggleDropdown(dropdownMenu);
    });
  });

// Menutup dropdown yang lain ketika suatu dropdown dibuka
function toggleDropdown(dropdownMenu) {
  document.querySelectorAll(".dropdown-menu").forEach(function (menu) {
    if (menu !== dropdownMenu) {
      menu.style.display = "none";
    }
  });

  // Toggle dropdown yang dipilih
  dropdownMenu.style.display =
    dropdownMenu.style.display === "none" || dropdownMenu.style.display === ""
      ? "block"
      : "none";
}

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Klik di luar elemen
const sb = document.querySelector("#search-button");

document.addEventListener("click", function (e) {
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
});

function submitContactUs(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  // Kirim data form ke server menggunakan Fetch API
  fetch("https://api-revou.mrizkiw.com/submit-contactus", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => response.text())
    .then((data) => {
      // Tampilkan SweetAlert dengan ikon sukses
      Swal.fire({
        icon: "success",
        title: "Terima Kasih!",
        text: "Pesan Anda telah berhasil dikirim.",
      });

      // Atau, jika Anda ingin mengarahkan pengguna ke halaman lain setelah sukses:
      // window.location.href = '/halaman-sukses.html';
    })
    .catch((error) => {
      console.error("Error:", error);
      // Tampilkan SweetAlert dengan ikon error jika terjadi kesalahan
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan. Silakan coba lagi.",
      });
    });
}

function submitFormPengaduan(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  fetch("https://api-revou.mrizkiw.com/submit-formpengaduan", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => {
      if (response.ok) {
        return response.text().then((data) => {
          Swal.fire({
            title: "Terima Kasih!",
            text: "Keluhan Anda sangat berarti bagi kami. Kami akan segera menindaklanjuti dan memberikan tanggapan.",
            icon: "success",
          });
        });
      } else {
        return response.json().then((errorData) => {
          Swal.fire({
            title: "Error",
            text: "Nomor telepon harus berupa angka dan dimulai dengan 08 serta minimal 10 angka dan tidak lebih dari 15 angka.",
            icon: "error",
          });
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);

      Swal.fire({
        title: "Error",
        text: "Nomor telepon harus berupa angka dan dimulai dengan 08 serta minimal 10 angka dan tidak lebih dari 15 angka.",
        icon: "error",
      });
    });
}
