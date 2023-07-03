
/* Section Portfolio, récupération et affichage des projets */ 

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

      // Ajouter dynamiquement au html en data-value l'id de la catégorie de chaque bouton filtre et projet

      projetLi.dataset.value = projetData.category.id;
      const projet = projetData.category.id;


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


/* Filter-bar pour trier les projets selon leur catégorie */ 

// Récupérer les catégories depuis l'API
fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(categories => {
    const filterBar = document.getElementById('filter-bar');

    // Créer l'option "Tous" par défaut
    const allOption = document.createElement('button');
    allOption.classList.add('filter-option');
    allOption.textContent = 'Tous';

    allOption.id = 'active-filter-option'; // Ajoutez cette ligne pour pré-sélectionner l'option "Tous"

    filterBar.appendChild(allOption);

    // Parcourir les catégories et générer les options de filtrage
    categories.forEach(category => {
      const option = document.createElement('button');
      option.classList.add('filter-option');
      option.textContent = category.name;
      option.dataset.categoryId = category.id;
      filterBar.appendChild(option);
    });

    // Filtrer les projets lorsqu'une option est sélectionnée
    filterBar.addEventListener('click', event => {
      const selectedOption = event.target;
      if (selectedOption.classList.contains('filter-option')) {

        // const option = document.getElementsByClassName('filter-option');
        // console.log('option');
        // option.removeAttribute('id');
        // selectedOption.id = ('active-filter-option');

        const categoryId = selectedOption.dataset.categoryId;


        // Afficher uniquement les projets correspondant à la catégorie sélectionnée
        const projects = document.getElementsByClassName('projet');
        Array.from(projects).forEach(project => {
          if (categoryId === undefined || project.dataset.value === categoryId) {
            project.style.display = 'block';
          } else {
            project.style.display = 'none';
          }
        });
      }

      const clickedOption = event.target;
      if (clickedOption.classList.contains('filter-option')) {
        const categoryId = clickedOption.dataset.categoryId;
    
        // Supprimez l'ID de l'option précédemment sélectionnée
        const previousOption = filterBar.querySelector('#active-filter-option');
        if (previousOption) {
          previousOption.removeAttribute('id');
        }
    
        // Mettez à jour l'option sélectionnée
        clickedOption.id = 'active-filter-option';
    
        // Reste du code...
      }

    });
  })
  .catch(error => {
    console.error('Il y a une erreur pour récupérer et ajouter les catégories', error);
  });