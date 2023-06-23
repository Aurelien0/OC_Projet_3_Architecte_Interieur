// fetch('http://localhost:5678/api/works')
//   .then(response => response.json())
//   .then(data => {
//     // Traitement des données reçues
//     console.log(data);
//   })
//   .catch(error => {
//     // Gestion des erreurs
//     console.error('Une erreur s\'est produite:', error);
//   });




// fetch('http://localhost:5678/api/works')
//   .then(response => response.json())
//   .then(data => {
//     // Manipulation du DOM pour afficher les données
//     const product1 = document.getElementById('portfolio');
//     const productTitle1 = product1.querySelector('.product-title');
//     const productDescription1 = product1.querySelector('.product-description');
//     const productImage1 = product1.querySelector('.product-image');
//     const productPrice1 = product1.querySelector('.product-price');

//     // Injecter les données dans les éléments correspondants
//     productTitle1.textContent = data[0].title;
//     productDescription1.textContent = data[0].description;
//     productImage1.src = data[0].image;
//     productPrice1.textContent = data[0].price;

//     // Répéter les étapes ci-dessus pour les autres produits (product2, product3, ...)
//   })
//   .catch(error => {
//     // Gestion des erreurs
//     console.error('Une erreur s\'est produite:', error);
//   });


fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const projetContainer = document.getElementById('portfolio');

    const projetUl = document.createElement('ul');
      projetUl.classList.add('gallery');

    // Parcourir les données et générer les cases de produits
    data.forEach(projetData => {
      const projetLi = document.createElement('li');
      projetLi.classList.add('projet');

      const projetTitle = document.createElement('h3');
      projetTitle.classList.add('projet-title');
      projetTitle.textContent = projetData.title;

      const projetImage = document.createElement('img');
      projetImage.classList.add('projet-image');
      projetImage.src = projetData.imageUrl;
      projetImage.alt = projetData.title;


      projetLi.dataset.value = projetData.category.id;
      console.log(projetLi)

      const projet = projetData.category.id;
      console.log(projet)


      // Ajouter les éléments à la case de produit

      projetLi.appendChild(projetImage);
      projetLi.appendChild(projetTitle);

      // Ajouter la case de produit au conteneur principal
      projetContainer.appendChild(projetUl);
      projetUl.appendChild(projetLi);
    });
  })
  .catch(error => {
    console.error('Il y a une erreur pour récupérer et ajouter les projets au portfolio', error);
  });



  fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => {
    const filterContainer = document.getElementById('filter-bar')

    data.forEach(categoryData => {
      const projetCategory = document.createElement('button')
      projetCategory.classList.add('filter-button');
      projetCategory.textContent = categoryData.name

      projetCategory.dataset.value = categoryData.id;
      console.log(projetCategory)
    //   projetCategory.addEventListener("click", function () {
    //     const projetFiltre = pieces.filter(function (piece) {
    //         return piece.prix <= 35;
    //     });
    //    console.log(projetFiltre)
    // });


      filterContainer.appendChild(projetCategory)

      console.log(categoryData)
      //console.log(projetCategory)

    });
  })
  .catch(error => {
    console.error('Il y a une erreur pour récupérer et ajouter les filtres par catégories', error);
  });


  // fetch('http://localhost:5678/api/categories')
  //   .then(response => response.json())
  //   .then(data => {
  //     // Étape 2 : Extraire les catégories distinctes
  //     const categories = [...new Set(data.map(category => category.name))];
  //     console.log(categories)
  
  //     // Étape 3 : Générer les filtres de catégorie
  //     const filterBar = document.getElementById('filter-bar');
  
  //     categories.forEach(category => {
  //       const filterItem = document.createElement('button');
  //       filterItem.classList.add('filter-item');
  //       filterItem.textContent = category;
  //       filterItem.addEventListener('click', () => {
  //         filterProductsByCategory(category);
  //       });
  
  //       filterBar.appendChild(filterItem);
  //     });
  
  //     // Étape 4 : Filtrer les produits par catégorie
  //     function filtrerElementsParCategorie(categorie) {
  //       const elements = listeElements.getElementsByClassName('projet');
        
  //       for (let i = 0; i < elements.length; i++) {
  //         const element = elements[i];
          
  //         if (categorie === 'tous' || element.classList.contains(categorie)) {
  //           element.style.display = 'block'; // Afficher l'élément
  //         } else {
  //           element.style.display = 'none'; // Masquer l'élément
  //         }
  //       }
  //     }
      
  
  //     // Afficher les produits initialement
  //     displayProducts(data);
  //   })
  //   .catch(error => {
  //     // Gestion des erreurs
  //     console.error('Une erreur s\'est produite:', error);
  //   });
  
  // // Fonction pour afficher les produits dans le DOM
  // function displayProducts(products) {
  //   const productContainer = document.getElementById('portfolio');
  //   productContainer.innerHTML = '';
  
  //   products.forEach(product => {
  //     const productDiv = document.createElement('div');
  //     productDiv.classList.add('product');
  //   }