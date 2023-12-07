const fetchData = async (category) => {
  try {
    let response = await fetch(
      `https://api-revou.mrizkiw.com//data/articles/category/${category}?pageSize=100`
    );

    let data = await response.json();

    if (Array.isArray(data)) {
      return data;
    } else {
      console.error("Data is not an array");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const displayData = (data) => {
  const mainArticle = document.createElement("div");
  mainArticle.classList.add("main-article");

  const mainLink = document.createElement("a");
  mainLink.href = `./detail.html?id=${data[0].id}`;
  mainLink.classList.add("article-link");
  mainArticle.appendChild(mainLink);

  const mainImage = document.createElement("img");
  mainImage.classList.add("image-main-article");
  mainImage.src = data[0].img_url;
  mainLink.appendChild(mainImage);

  const mainTitle = document.createElement("h1");
  mainTitle.classList.add("news-title");
  mainTitle.textContent = data[0].title;
  mainLink.appendChild(mainTitle);

  const mainDesc = document.createElement("p");
  mainDesc.textContent = data[0].desc;
  mainArticle.appendChild(mainDesc);

  const combinedInfoParagraph = document.createElement("p");

  combinedInfoParagraph.textContent = `${data[0].category} `;
  combinedInfoParagraph.style.color = "#ad2139";
  combinedInfoParagraph.style.fontSize = "14px";
  combinedInfoParagraph.style.fontWeight = "700";

  // Add publication date
  const publishDate = new Date(data[0].publish_at);
  const currentDate = new Date();
  const timeDifference = currentDate - publishDate;
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const publishDateSpan = document.createElement("span");
  publishDateSpan.classList.add("publish-date");
  publishDateSpan.textContent = `• ${daysAgo} hari yang lalu`;

  combinedInfoParagraph.appendChild(publishDateSpan);

  mainArticle.appendChild(combinedInfoParagraph);

  container.appendChild(mainArticle);

  // Display secondary articles
  const secondaryArticlesContainer = document.querySelector(
    ".secondary-articles"
  );

  for (let i = 1; i < data.length; i++) {
    const secondaryArticle = document.createElement("article");
    secondaryArticle.classList.add("secondary-article");

    // Tambahkan elemen <a> di sekitar gambar dan judul sekunder
    const secondaryLink = document.createElement("a");
    secondaryLink.href = `./detail.html?id=${data[i].id}`;
    secondaryLink.classList.add("article-link");
    secondaryArticle.appendChild(secondaryLink);

    const secondaryImage = document.createElement("img");
    secondaryImage.classList.add("image-secondary-article");
    secondaryImage.src = data[i].img_url;
    secondaryLink.appendChild(secondaryImage);

    const secondaryTitle = document.createElement("h1");
    secondaryTitle.classList.add("secondary-title");
    secondaryTitle.textContent = data[i].title;
    secondaryLink.appendChild(secondaryTitle);

    const combinedInfoParagraph = document.createElement("p");

    combinedInfoParagraph.textContent = `${data[0].category}`;

    // Add publication date
    const publishDate = new Date(data[0].publish_at);
    const currentDate = new Date();
    const timeDifference = currentDate - publishDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const publishDateSpan = document.createElement("span");
    publishDateSpan.classList.add("publish-date");
    publishDateSpan.textContent = ` • ${daysAgo} hari yang lalu`;

    combinedInfoParagraph.appendChild(publishDateSpan);

    secondaryArticle.appendChild(combinedInfoParagraph);

    secondaryArticlesContainer.appendChild(secondaryArticle);
    if (i === 2) {
      break;
    }
  }

  const popularArticlesContainer = document.querySelector(".article-list");

  for (let i = 3; i < Math.min(data.length, 8); i++) {
    const popularArticle = document.createElement("article");
    popularArticle.classList.add("article-list-item");

    // Tambahkan elemen <a> di sekitar gambar dan judul populer
    const popularLink = document.createElement("a");
    popularLink.href = `./detail.html?id=${data[i].id}`;
    popularLink.classList.add("article-link");
    popularArticle.appendChild(popularLink);

    const popularImage = document.createElement("img");
    popularImage.src = data[i].img_url;
    popularLink.appendChild(popularImage);

    const popularTitle = document.createElement("h1");
    popularTitle.textContent = data[i].title;
    popularLink.appendChild(popularTitle);

    const categoryParagraph = document.createElement("p");
    categoryParagraph.textContent = `${data[i].category}`;
    popularArticle.appendChild(categoryParagraph);
    categoryParagraph.style.fontSize = "12px";
    categoryParagraph.style.color = "#ad2139";
    categoryParagraph.style.fontWeight = "700";

    popularArticlesContainer.appendChild(popularArticle);
    if (i === 7) {
      break;
    }
  }

  const newsSection = document.querySelector(".berita");

  // Display berita terbaru
  for (let i = 8; i < Math.min(data.length, 13); i++) {
    const beritaTerbaru = document.createElement("article");
    beritaTerbaru.classList.add("berita-terbaru");

    const newsSectionArticle = document.createElement("article");
    newsSectionArticle.classList.add("berita-article");

    // Create an anchor element
    const articleLink = document.createElement("a");

    // Set the href attribute to the desired URL
    articleLink.href = `./detail.html?id=${data[i].id}`;

    const articleImage = document.createElement("img");
    articleImage.src = data[i].img_url;
    articleLink.appendChild(articleImage);

    const articleTitle = document.createElement("h1");
    articleTitle.classList.add("terbaru-title");
    articleTitle.textContent = data[i].title;

    const publishDate = new Date(data[i].publish_at);

    const currentDate = new Date();
    const timeDifference = currentDate - publishDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const combinedInfoParagraph = document.createElement("p");

    const publishDateSpan = document.createElement("span");
    publishDateSpan.classList.add("publish-date");
    publishDateSpan.textContent = `• ${daysAgo} hari yang lalu`;

    combinedInfoParagraph.innerHTML = `${data[i].category}  `;
    combinedInfoParagraph.appendChild(publishDateSpan);

    articleTitle.appendChild(combinedInfoParagraph);
    articleLink.appendChild(articleTitle);

    newsSectionArticle.appendChild(articleLink);

    beritaTerbaru.appendChild(newsSectionArticle);
    newsSection.appendChild(beritaTerbaru);

    if (i === 12) {
      break;
    }
  }

  const beritaUtamaArticlesContainer = document.querySelector(".berita-utama");

  for (let i = 13; i < Math.min(data.length, 17); i++) {
    const beritaUtamaArticle = document.createElement("article");
    beritaUtamaArticle.classList.add("berita-utama-article");

    const utamaLink = document.createElement("a");
    utamaLink.href = `./detail.html?id=${data[i].id}`;
    utamaLink.classList.add("article-link");
    beritaUtamaArticle.appendChild(utamaLink);

    const utamaImage = document.createElement("img");
    utamaImage.classList.add("img-utama");
    utamaImage.src = data[i].img_url;
    utamaLink.appendChild(utamaImage);

    const utamaTitle = document.createElement("h1");
    utamaTitle.textContent = data[i].title;
    utamaLink.appendChild(utamaTitle);

    beritaUtamaArticlesContainer.appendChild(beritaUtamaArticle);

    if (i === 16) {
      break;
    }
  }

  const rekomendasiBeritaArticlesContainer = document.querySelector(
    ".rekomendasi-berita"
  );

  for (let i = 17; i < Math.min(data.length, 21); i++) {
    const rekomendasiBeritaArticle = document.createElement("article");
    rekomendasiBeritaArticle.classList.add("berita-utama-article");

    const rekomendasiLink = document.createElement("a");
    rekomendasiLink.href = `./detail.html?id=${data[i].id}`;
    rekomendasiLink.classList.add("article-link");
    rekomendasiBeritaArticle.appendChild(rekomendasiLink);

    const rekomendasiImage = document.createElement("img");
    rekomendasiImage.classList.add("img-utama");
    rekomendasiImage.src = data[i].img_url;
    rekomendasiLink.appendChild(rekomendasiImage);

    const rekomendasiTitle = document.createElement("h1");
    rekomendasiTitle.textContent = data[i].title;
    rekomendasiLink.appendChild(rekomendasiTitle);

    rekomendasiBeritaArticlesContainer.appendChild(rekomendasiBeritaArticle);

    if (i === 21) {
      break;
    }
  }
};

const displayOtomotif = async () => {
  const otomotifData = await fetchData("otomotif");
  if (otomotifData) {
    displayData(otomotifData);
  }
};

const displayGayaHidup = async () => {
  const gayaHidupData = await fetchData("Gaya Hidup");
  if (gayaHidupData) {
    displayData(gayaHidupData);
  }
};

const displayOlahraga = async () => {
  const olahragaData = await fetchData("olahraga");
  if (olahragaData) {
    displayData(olahragaData);
  }
};

const displayHiburan = async () => {
  const hiburanData = await fetchData("hiburan");
  if (hiburanData) {
    displayData(hiburanData);
  }
};

const displayTeknologi = async () => {
  const teknologiData = await fetchData("teknologi");
  if (teknologiData) {
    displayData(teknologiData);
  }
};

const displayPolitik = async () => {
  const politikData = await fetchData("politik");
  if (politikData) {
    displayData(politikData);
  }
};

const displayEkonomi = async () => {
  const ekonomiData = await fetchData("ekonomi");
  if (ekonomiData) {
    displayData(ekonomiData);
  }
};

const displayHome = async () => {
  const categories = [
    "otomotif",
    "olahraga",
    "gaya hidup",
    "hiburan",
    "teknologi",
    "politik",
    "ekonomi",
  ];
  let combinedData = [];

  for (const category of categories) {
    const categoryData = await fetchData(category);

    if (categoryData) {
      combinedData = combinedData.concat(categoryData);
    } else {
      console.error(`No data available for category: ${category}`);
    }
  }

  // Shuffle the combined data array
  combinedData = shuffleArray(combinedData);

  // Display combined data
  displayData(combinedData);
};

// Function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
