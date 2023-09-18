const apiUrl = "http://localhost:3000";

// Fonction pour récupérer les articles
function getArticles(take = 10, skip = 0) {
  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}/articles?take=${take}&skip=${skip}`)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

function getComments(id) {
  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}/comments/${id}`)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

// Fonction pour récupérer un article par ID
function getArticleById(id) {
  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}/articles/${id}`)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

// Fonction pour créer un nouvel article
function createArticle(articleData) {
  return new Promise((resolve, reject) => {
    // Effectuez une requête AJAX ou utilisez une bibliothèque comme axios pour effectuer une requête HTTP POST vers l'API backend
    // Utilisez les données de l'article pour construire la requête et créer le nouvel article
    // Traitez la réponse de l'API et résolvez la promesse avec les données appropriées

    // Exemple avec fetch :
    fetch('/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(articleData)
    })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

// Fonction pour mettre à jour un article
function updateArticle(id, articleData) {
  return new Promise((resolve, reject) => {
    // Effectuez une requête AJAX ou utilisez une bibliothèque comme axios pour effectuer une requête HTTP PATCH vers l'API backend
    // Utilisez l'ID de l'article et les données de l'article pour construire la requête et mettre à jour l'article
    // Traitez la réponse de l'API et résolvez la promesse avec les données appropriées

    // Exemple avec fetch :
    fetch(`/articles/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(articleData)
    })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

// Fonction pour supprimer un article
function deleteArticle(id) {
  return new Promise((resolve, reject) => {
    // Effectuez une requête AJAX ou utilisez une bibliothèque comme axios pour
    fetch(`/articles/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

function getCategories() {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/categories`)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

async function renderCategories(id) {
  const categoriesContainer = document.getElementById(id);
  const categories = await getCategories();
  let categoriesHTML = '';

  categories.forEach(category => {
    categoriesHTML += `<li>${category.nom} (${category._count.articles})</li>`;
  });

  categoriesContainer.innerHTML = categoriesHTML;
}

async function renderCategoriesSelect(id) {
  const categoriesContainer = document.getElementById(id);
  const categories = await getCategories();
  let categoriesHTML = '';

  categories.forEach(category => {
    categoriesHTML += `<option value="${category.id}">${category.nom}</option>`;
  });

  categoriesContainer.innerHTML = categoriesHTML;

}

async function renderArticles(id) {
  const articlesContainer = document.getElementById(id);
  const articles = await getArticles(4);

  let html = '';
  articles.forEach((article, index) => {
    html += `
        <article class="col-md-6 mb-5">
        <div class= imageWithH1>
          <img src="${article.image}"  class="article-image-${index}">
          <div class="contenuArticle">
          <h1>${article.titre}</h1>
          <h2>${article.auteur.nom}</h2>
          <h3 class="Date">${article.createdAt.substring(0, 10)}</h3>
          <h4>Commentaire:${article._count.commentaires}</h4>
          <a href="article.html?id=${article.id}" class="btn btn-primary">Read</a>
          </div>
        </div>
        </article>`;
  });

  articlesContainer.innerHTML = html;

}

async function renderArticle(id) {
  const articleContainer = document.getElementById("article-content");
  const article = await getArticleById(id);

  articleContainer.innerHTML = `<h1>${article.titre}</h1>`;
  articleContainer.innerHTML += `<h4>${article.auteur.nom}</h4>`;
  articleContainer.innerHTML += `<p>${article.contenu}</p>`;
  articleContainer.innerHTML+=` <img src="${article.image}" >`

}

async function sendComment() {
  const contentInput = document.getElementById('content-input');

  const content = contentInput.value

  var urlParams = new URLSearchParams(window.location.search);
  var article = urlParams.get('id');

  await
    fetch(`${apiUrl}/comments/${article}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: "test@hhh.cc", content
      })
    });

  contentInput.value = ""

  renderComments(article)
}

async function renderComments(id) {
  const commentsContainer = document.getElementById("comments-container");
  const comments = await getComments(id);

  let html = "<ul class='comments-list'>";
  comments.forEach(comment => {
    html += "<li class='comment'>"
    html += `<p>${comment.contenu}</p>`
    html += "</li>";
  });
    html+="</ul>"

  commentsContainer.innerHTML = html;
}

//Sections
function scrollToSection(sectionId) {
  var section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}



