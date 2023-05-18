
// Fonction pour récupérer les articles
function getArticles(take = 10, skip = 0) {
    return new Promise((resolve, reject) => {

      fetch(`http://localhost:3000/articles?take/=${take}&skip=${skip}`)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }
  
  // Fonction pour récupérer un article par ID
  function getArticleById(id) {
    return new Promise((resolve, reject) => {
      fetch(`/articles/${id}`)
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
    