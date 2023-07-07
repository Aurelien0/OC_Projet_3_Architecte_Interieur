
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


      // id active-filter-option in active filter
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

      }

    });
  })
  .catch(error => {
    console.error('Il y a une erreur pour récupérer et ajouter les catégories', error);
  });


  // version admin 

  // récupérer le token
  let token = localStorage.getItem('token');

	var url = window.location.href;

  // Si on est connecté
	if (token) {
    // if (url.includes("?mode=admin") && token) {
		document.addEventListener("DOMContentLoaded", function() {
			let bodyContainer = document.body;
      bodyContainer.style.paddingTop = "50px";
			const headerAdmin = document.createElement("div");
			headerAdmin.classList.add('header-admin');

      let iconHeaderAdmin = document.createElement('img');
      iconHeaderAdmin.src = './assets/icons/group.png';
      iconHeaderAdmin.alt = 'icon';

      let texteHeaderAdmin = document.createElement('p');
      texteHeaderAdmin.textContent = 'Mode édition';

      let buttonHeaderAdmin = document.createElement('button');
      buttonHeaderAdmin.textContent = 'publier les changements';

			bodyContainer.insertBefore(headerAdmin, bodyContainer.firstChild);
      headerAdmin.appendChild(iconHeaderAdmin);
      headerAdmin.appendChild(texteHeaderAdmin);
      headerAdmin.appendChild(buttonHeaderAdmin);



		// Récupérer la référence du bouton de déconnexion
    let loginButton = document.getElementById('button-login');
    loginButton.textContent = 'logout';
    loginButton.href = 'http://127.0.0.1:5501/index.html';

		// Ajouter un gestionnaire d'événements pour le clic sur le bouton
		loginButton.addEventListener("click", function() {
			// Appeler la fonction de déconnexion
			logout();
		});

		// Fonction de déconnexion
		function logout() {
      localStorage.removeItem("token");
		}
	

    // Buttons Modifier
    const projetContainer = document.getElementById('titre-portfolio');
    const buttonModifier = document.createElement('button');
    buttonModifier.id = 'button-modifier-admin';
    const texteButtonModifier = document.createElement('p');
    texteButtonModifier.textContent = 'modifier';

    let iconHeaderAdminBlack = document.createElement('img');
    iconHeaderAdminBlack.src = './assets/icons/group-black.png';
    iconHeaderAdminBlack.alt = 'icon';

    buttonModifier.appendChild(iconHeaderAdminBlack);
    buttonModifier.appendChild(texteButtonModifier);

    const troisiemeEnfantPortfolio = projetContainer.children[1];
    projetContainer.insertBefore(buttonModifier, troisiemeEnfantPortfolio);

    // créer la modale

    buttonModifier.addEventListener('click', (event) => {
      const modalManageProjectAdmin = document.createElement('aside');
      modalManageProjectAdmin.id = 'modale-manage-project-admin';

      const modalManageProjectAdminWrapper = document.createElement('div');
      modalManageProjectAdminWrapper.classList = 'modale-manage-project-admin-wrapper';

      const buttonCloseModal = document.createElement('button');
      buttonCloseModal.id = 'button-close-modal';
      const iconButtonCloseModal = document.createElement('img');
      iconButtonCloseModal.src = './assets/icons/button-close.png';

      const titleModal = document.createElement('h2');
      titleModal.textContent = 'Galerie photo';

      bodyContainer.appendChild(modalManageProjectAdmin);
      modalManageProjectAdmin.appendChild(modalManageProjectAdminWrapper);
      modalManageProjectAdminWrapper.appendChild(buttonCloseModal);
      buttonCloseModal.appendChild(iconButtonCloseModal);
      modalManageProjectAdminWrapper.appendChild(titleModal);

    //   fetch('http://localhost:5678/api/works')
    // .then(response => response.json())
    // .then(apercuImageData => {
    //   const grilleApercuImageModal = document.createElement('ul')
    //   grilleApercuImageModal.classList = 'grille-apercu-image-modal';

    //   apercuImageData.forEach(apercuImageLinkData => {
    //     const apercuImageModal = document.createElement('img');
    //     apercuImageModal.src = apercuImageLinkData.imageUrl;
    //     apercuImageModal.classList = 'apercu-image-modal';

    //     modalManageProjectAdminWrapper.appendChild(grilleApercuImageModal);
    //     grilleApercuImageModal.appendChild(apercuImageModal);
    //   });
    // });


    // const buttonAddImage = document.createElement('button');
    // buttonAddImage.id = 'button-add-image-modal';

    // modalManageProjectAdminWrapper.appendChild(buttonAddImage);

    async function createApercuImages() {
      try {
        const response = await fetch('http://localhost:5678/api/works');
        if (!response.ok) {
          throw new Error('Erreur lors des liens des images des projets pour la version admin');
        }
        const apercuImageData = await response.json();
    
        const grilleApercuImageModal = document.createElement('ul');
        grilleApercuImageModal.classList = 'grille-apercu-image-modal';
    
        for (const apercuImageLinkData of apercuImageData) {
          const apercuImageModal = document.createElement('img');
          apercuImageModal.src = apercuImageLinkData.imageUrl;
          apercuImageModal.classList = 'apercu-image-modal';
    
          grilleApercuImageModal.appendChild(apercuImageModal);
        }
    
        modalManageProjectAdminWrapper.appendChild(grilleApercuImageModal);
        modalManageProjectAdminWrapper.appendChild(buttonAddImage);
      } catch (error) {
        console.log(error);
      }
    }
    
    const buttonAddImage = document.createElement('button');
    buttonAddImage.id = 'button-add-image-modal';
    
    async function loadContent() {
      await createApercuImages();
    }
    
    loadContent();
    

    })

		});
	}