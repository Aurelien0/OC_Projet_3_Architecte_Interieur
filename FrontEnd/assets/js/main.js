
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

      // récupérer l'id de chaque projet 
      // let dataIdImageModal = projetData.id;
      // console.log(dataIdImageModal)

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
      localStorage.clear();
      location.reload()
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

      // fermer la modale
      // buttonCloseModal.addEventListener('click', (event) => {
      //   modalManageProjectAdmin.remove()
      // });

// Créer une fonction pour fermer la modale
function closeModal() {
  const modalManageProjectAdmin = document.getElementById('modale-manage-project-admin');
  modalManageProjectAdmin.remove();
}

// Ajouter un gestionnaire d'événement au bouton de fermeture
buttonCloseModal.addEventListener('click', (event) => {
  closeModal();
});

// Ajouter un gestionnaire d'événement à la fenêtre pour fermer la modale en cliquant à l'extérieur
window.addEventListener('click', (event) => {
  if (event.target === modalManageProjectAdmin) {
    closeModal();
  }
});







      const titleModal = document.createElement('h1');
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


          const liApercuImageModal = document.createElement('li');

          const apercuImageModal = document.createElement('img');
          apercuImageModal.src = apercuImageLinkData.imageUrl;
          apercuImageModal.classList = 'apercu-image-modal';




          const linkIconDeleteImageModal = document.createElement('a');
          linkIconDeleteImageModal.id = 'link-icon-delete-admin-modal';
          linkIconDeleteImageModal.dataset.id = apercuImageLinkData.id;


          const iconDeleteImageModal = document.createElement('img');
          iconDeleteImageModal.src = './assets/icons/icon-delete.png';
          iconDeleteImageModal.classList = 'icon-delete-admin-modal';

          const linkApercuImageModal = document.createElement('a');
          linkApercuImageModal.textContent = 'éditer';
    
          grilleApercuImageModal.appendChild(liApercuImageModal);
          liApercuImageModal.appendChild(apercuImageModal);
          liApercuImageModal.appendChild(linkIconDeleteImageModal);
          linkIconDeleteImageModal.appendChild(iconDeleteImageModal);
          liApercuImageModal.appendChild(linkApercuImageModal);



          linkIconDeleteImageModal.addEventListener('click', (event) => {

            let actuelDataCompteurModal = linkIconDeleteImageModal.dataset.id;

            console.log(actuelDataCompteurModal);

            fetch(`http://localhost:5678/api/works/${actuelDataCompteurModal}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Ajout du jeton d'authentification dans l'en-tête
              },
            })
              .then(response => {
                const statusCode = response.status; // Récupération du code d'état de la réponse
                console.log(statusCode); // Affichage du code d'état dans la console
                if (statusCode === 200 || statusCode === 204) {
                  liApercuImageModal.remove(); // Supprime l'élément de la liste
                  alert(`Vous avez bien supprimer la photo ${actuelDataCompteurModal}`)
                } else {
                  alert(`Il y a une erreur pour supprimer la photo ${actuelDataCompteurModal}`)
                }
              })
              .catch(error => {
                // Gérez les erreurs ici
              });
        });

        } //fin de la boucle for
    
        modalManageProjectAdminWrapper.appendChild(grilleApercuImageModal);
        modalManageProjectAdminWrapper.appendChild(buttonAddImage);
        modalManageProjectAdminWrapper.appendChild(buttonDeleteAllImage);
      } catch (error) {
        console.log(error);
      }
    }
    
    const buttonAddImage = document.createElement('button');
    buttonAddImage.id = 'button-add-image-modal';
    buttonAddImage.textContent = 'Ajouter une photo';

    const buttonDeleteAllImage = document.createElement('a');
    buttonDeleteAllImage.id = 'delete-all-image';
    buttonDeleteAllImage.textContent = 'Supprimer la galerie'
    
    async function loadContent() {
      await createApercuImages();
    }
    
    loadContent();
    

    // ouvrir modale ajouter une photo

    function openModalAddImage() {

      const modalAddImageAdmin = document.createElement('aside');
      modalAddImageAdmin.id = 'modale-add-image-admin';

      const modalAddImageAdminWrapper = document.createElement('div');
      modalAddImageAdminWrapper.classList = 'modale-add-image-admin-wrapper';

      const buttonGoBackModalAddImage = document.createElement('button');
      buttonGoBackModalAddImage.id = 'button-go-back-modal';
      const iconButtonGoBackModalAddImage = document.createElement('img');
      iconButtonGoBackModalAddImage.src = './assets/icons/arrow-left.png';

      const buttonCloseModalAddImage = document.createElement('button');
      buttonCloseModalAddImage.id = 'button-close-modal-add-image';
      const iconButtonCloseModalAddImage = document.createElement('img');
      iconButtonCloseModalAddImage.src = './assets/icons/button-close.png';

      const titleModalAddImage = document.createElement('h2');
      titleModalAddImage.textContent = 'Ajout photo'

      const formModalAddImage = document.createElement('form')
      formModalAddImage.id = 'form-modal-add-image'

      const divFileAddImage = document.createElement('div')
      divFileAddImage.id = 'div-file-add-image'

      const inputFileAddimage = document.createElement('input')
      inputFileAddimage.id = 'input-file-add-image'
      inputFileAddimage.type = 'file'
      inputFileAddimage.accept = '.png, .jpg'
      // inputFileAddimage.maxLength = '4'

      const buttonFileAddImage = document.createElement('button')
      buttonFileAddImage.id = 'button-file-add-image'
      buttonFileAddImage.textContent = '+ Ajouter photo'
      buttonFileAddImage.addEventListener ('click', (event) => {
        event.preventDefault();
        document.getElementById('input-file-add-image').click()
      })

      const imageDefaultModalAddImage = document.createElement('img')
      imageDefaultModalAddImage.src = './assets/icons/image-default.png'

      const textAddImageModal = document.createElement('p')
      textAddImageModal.textContent = 'jpg, png : 4mo max'


// Ajouter un gestionnaire d'événement pour vérifier la taille du fichier lors de la sélection
inputFileAddimage.addEventListener('change', function(event) {
  event.preventDefault();
  const file = event.target.files[0];
  
  // Vérifier la taille du fichier
  const maxSize = 4 * 1024 * 1024; // 4 Mo en octets
  if (file.size > maxSize) {
    alert('La taille du fichier est supérieure à 4 Mo.');
    inputFileAddimage.value = ''; // Réinitialiser la valeur de l'input pour effacer le fichier sélectionné
  }
});

const labelAddImageModal = document.createElement('label')
labelAddImageModal.textContent = 'titre'

const secondLabelAddImageModal = document.createElement('label')
secondLabelAddImageModal.textContent = 'Catégorie'

const inputSubmitAddImage = document.createElement('input');
inputSubmitAddImage.type = 'submit'
inputSubmitAddImage.value = 'Valider'

// form.addEventListener('submit', (event) => {
//   event.preventDefault(); // Empêche l'envoi du formulaire par défaut

//   const file = imageInput.files[0];

//   if (file) {
//     // Vérifier le type de fichier
//     const fileType = file.type;
//     if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
//       alert('Veuillez sélectionner un fichier PNG ou JPEG.');
//       return;
//     }

//     // Vérifier la taille du fichier
//     const maxSize = parseInt(imageInput.getAttribute('max-size'), 10) * 1024 * 1024; // Convertir la taille maximale en octets
//     if (file.size > maxSize) {
//       alert('La taille du fichier est supérieure à 4 Mo.');
//       return;
//     }

//     // Le fichier est valide, vous pouvez le traiter ou l'envoyer au serveur ici
//     // Utilisez la variable "file" pour accéder au fichier

//     // Réinitialiser le formulaire
//     form.reset();
//   } else {
//     alert('Veuillez sélectionner un fichier.');
//   }
// });



      bodyContainer.appendChild(modalAddImageAdmin)
      modalAddImageAdmin.appendChild(modalAddImageAdminWrapper)
      modalAddImageAdminWrapper.appendChild(buttonGoBackModalAddImage)
      buttonGoBackModalAddImage.appendChild(iconButtonGoBackModalAddImage)
      modalAddImageAdminWrapper.appendChild(buttonCloseModalAddImage)
      buttonCloseModalAddImage.appendChild(iconButtonCloseModalAddImage)
      modalAddImageAdminWrapper.appendChild(titleModalAddImage)

      modalAddImageAdminWrapper.appendChild(formModalAddImage)

      formModalAddImage.appendChild(divFileAddImage)
      divFileAddImage.appendChild(imageDefaultModalAddImage)
      divFileAddImage.appendChild(inputFileAddimage)
      divFileAddImage.appendChild(buttonFileAddImage)
      divFileAddImage.appendChild(textAddImageModal)
      formModalAddImage.appendChild(labelAddImageModal)
      formModalAddImage.appendChild(secondLabelAddImageModal)
      formModalAddImage.appendChild(inputSubmitAddImage)


// Créer une fonction pour fermer la modale
function closeModalAddImage() {
  const modalAddImageAdmin = document.getElementById('modale-add-image-admin');
  modalAddImageAdmin.remove();
}

// Ajouter un gestionnaire d'événement au bouton de fermeture
buttonCloseModalAddImage.addEventListener('click', (event) => {
  closeModalAddImage();
});

// Ajouter un gestionnaire d'événement à la fenêtre pour fermer la modale en cliquant à l'extérieur
window.addEventListener('click', (event) => {
  if (event.target === modalAddImageAdmin) {
    closeModalAddImage();
  }
});

    }


      // ajouter une photo

  buttonAddImage.addEventListener('click', (event) => {
    closeModal()
    openModalAddImage()
  })

    })

		});
	}
