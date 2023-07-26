const bodyContainer = document.body

// Créer la modale Admin
function createModal() {
   const modalManageProjectAdmin = document.createElement('aside')
   modalManageProjectAdmin.id = 'modale-manage-project-admin'

   const modalManageProjectAdminWrapper = document.createElement('div')
   modalManageProjectAdminWrapper.classList = 'modale-manage-project-admin-wrapper'

   const buttonCloseModal = document.createElement('button')
   buttonCloseModal.id = 'button-close-modal'

   const iconButtonCloseModal = document.createElement('img')
   iconButtonCloseModal.src = './assets/icons/button-close.png'

   const titleModal = document.createElement('h1')
   titleModal.textContent = 'Galerie photo'

   bodyContainer.appendChild(modalManageProjectAdmin)
   modalManageProjectAdmin.appendChild(modalManageProjectAdminWrapper)
   modalManageProjectAdminWrapper.appendChild(buttonCloseModal)
   buttonCloseModal.appendChild(iconButtonCloseModal)
   modalManageProjectAdminWrapper.appendChild(titleModal)

   // Créer les aperçus des projets dans la modale via l'API
   async function createApercuImages() {
      try {
         const response = await fetch('http://localhost:5678/api/works')
         if (!response.ok) {
            throw new Error('Erreur lors des liens des images des projets pour la version admin')
         }
         const apercuImageData = await response.json()

         const grilleApercuImageModal = document.createElement('ul')
         grilleApercuImageModal.classList = 'grille-apercu-image-modal'

         for (const apercuImageLinkData of apercuImageData) {

            const liApercuImageModal = document.createElement('li')
            liApercuImageModal.classList = 'apercu-image'
            liApercuImageModal.dataset.id = apercuImageLinkData.id

            const apercuImageModal = document.createElement('img')
            apercuImageModal.src = apercuImageLinkData.imageUrl
            apercuImageModal.classList = 'apercu-image-modal'

            const linkIconDeleteImageModal = document.createElement('a')
            linkIconDeleteImageModal.id = 'link-icon-delete-admin-modal'
            linkIconDeleteImageModal.dataset.id = apercuImageLinkData.id

            const iconDeleteImageModal = document.createElement('img')
            iconDeleteImageModal.src = './assets/icons/icon-delete.png'
            iconDeleteImageModal.classList = 'icon-delete-admin-modal'

            const linkApercuImageModal = document.createElement('a')
            linkApercuImageModal.textContent = 'éditer'

            grilleApercuImageModal.appendChild(liApercuImageModal)
            liApercuImageModal.appendChild(apercuImageModal)
            liApercuImageModal.appendChild(linkIconDeleteImageModal)
            linkIconDeleteImageModal.appendChild(iconDeleteImageModal)
            liApercuImageModal.appendChild(linkApercuImageModal)

            // Ajouter l'évènement de chaques boutons de suppression sur tous les aperçus de projet
            linkIconDeleteImageModal.addEventListener('click', (event) => {

               // Message de confirmation avant la suppression de tous les projets
               const confirmationAvantSuppression = confirm("Êtes-vous sûr de vouloir supprimer ce projet du portfolio ?");
               if (confirmationAvantSuppression) {

                  let actuelDataCompteurModal = apercuImageLinkData.id

                  let projetLi = document.getElementsByTagName('projet')
                  const projetToDeleteId = document.querySelector(`.projet[data-id="${actuelDataCompteurModal}"]`);

                  // Requète fetch pour supprimer un projet avec le tohen d'anthentification
                  fetch(`http://localhost:5678/api/works/${actuelDataCompteurModal}`, {
                        method: 'DELETE',
                        headers: {
                           'Content-Type': 'application/json',
                           'Authorization': `Bearer ${token}`
                        },
                     })
                     .then(response => {
                        // Récupérer le code d'état de la réponse
                        const statusCode = response.status
                        if (statusCode === 200 || statusCode === 204) {

                           projetToDeleteId.remove()

                           liApercuImageModal.remove() // Supprime l'élément de la liste
                           alert(`Vous avez bien supprimer la photo avec l'id ${actuelDataCompteurModal}`)
                        } else if (statusCode === 401) {
                           alert(`Token d'authentification invalide, veuillez vous reconnecter`)
                        }
                     })
                     .catch(error => {
                        alert(`Il y a une erreur pour supprimer la photo avec l'id ${actuelDataCompteurModal}`)
                     })
               }
            })

         } // Fin de la boucle de création des aperçu des projets

         modalManageProjectAdminWrapper.appendChild(grilleApercuImageModal)
         modalManageProjectAdminWrapper.appendChild(buttonAddImage)

         // Ajout de l'évènement sur le bouton "Ajouter une photo" pour ouvrir la modale formulaire d'ajout d'un projet
         buttonAddImage.addEventListener('click', (event) => {
            closeModal()
            openModalAddImage()
         })

         modalManageProjectAdminWrapper.appendChild(buttonDeleteAllImage)

      } catch (error) {
         console.log(error)
      }
   } // fin de la fonction createApercuImages

   // Créer les éléments de la fin de la modal après les aperçus de projets
   const buttonAddImage = document.createElement('button')
   buttonAddImage.id = 'button-add-image-modal'
   buttonAddImage.textContent = 'Ajouter une photo'

   const buttonDeleteAllImage = document.createElement('a')
   buttonDeleteAllImage.id = 'delete-all-image'
   buttonDeleteAllImage.textContent = 'Supprimer la galerie'

   // Attendre la réponse de la requète
   async function loadContent() {
      await createApercuImages()
   }

   loadContent()

   // Créer une fonction pour fermer la modale
   function closeModal() {
      const modalManageProjectAdmin = document.getElementById('modale-manage-project-admin')
      modalManageProjectAdmin.remove()
   }

   // Ajouter un gestionnaire d'événement au bouton de fermeture
   buttonCloseModal.addEventListener('click', (event) => {
      closeModal()
   })

   // Ajouter un gestionnaire d'événement à la fenêtre pour fermer la modale en cliquant à l'extérieur
   window.addEventListener('click', (event) => {
      if (event.target === modalManageProjectAdmin) {
         closeModal()
      }
   })

   // Ajout de l'évènement pour supprimer tous les projets avec le button "Supprimer la galerie"
   buttonDeleteAllImage.addEventListener('click', async (event) => {
      // Message de confirmation avant la suppression de tous les projets
      const confirmationAvantSuppression = confirm("Êtes-vous sûr de vouloir supprimer tous les projets du portfolio ?");
      if (confirmationAvantSuppression) {

         const elementsToDelete = document.querySelectorAll('.apercu-image')

         const deletePromises = Array.from(elementsToDelete).map((element) => {
            const actuelDataCompteurModal2 = element.dataset.id

            return fetch(`http://localhost:5678/api/works/${actuelDataCompteurModal2}`, {
                  method: 'DELETE',
                  headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                  },
               })
               .then(response => {
                  const statusCode = response.status
                  if (statusCode === 200 || statusCode === 204) {
                     element.remove()
                     alert('Vous avez supprimé toutes les photos avec succès.')
                  } else if (statusCode === 401) {
                     alert(`Token d'authentification invalide, veuillez vous reconnecter`)
                  }
               })
               .catch(error => {
                  console.error(`Erreur lors de la suppression de l'image avec l'ID ${actuelDataCompteurModal2}`, error)
               })
         })

         try {
            await Promise.all(deletePromises)
         } catch (error) {
            alert('Une erreur s\'est produite lors de la suppression des photos.')
         }
      }
   }) // fin du addEventListener du buttonDeleteAllImage

} // fin de la function createModal


// Fonction pour ouvrir la modale d'ajout de projet
function openModalAddImage() {

   const modalAddImageAdmin = document.createElement('aside')
   modalAddImageAdmin.id = 'modale-add-image-admin'

   const modalAddImageAdminWrapper = document.createElement('div')
   modalAddImageAdminWrapper.classList = 'modale-add-image-admin-wrapper'

   const buttonGoBackModalAddImage = document.createElement('button')
   buttonGoBackModalAddImage.id = 'button-go-back-modal'
   const iconButtonGoBackModalAddImage = document.createElement('img')
   iconButtonGoBackModalAddImage.src = './assets/icons/arrow-left.png'

   const buttonCloseModalAddImage = document.createElement('button')
   buttonCloseModalAddImage.id = 'button-close-modal-add-image'
   const iconButtonCloseModalAddImage = document.createElement('img')
   iconButtonCloseModalAddImage.src = './assets/icons/button-close.png'

   const titleModalAddImage = document.createElement('h2')
   titleModalAddImage.textContent = 'Ajout photo'

   const formModalAddImage = document.createElement('form')
   formModalAddImage.id = 'form-modal-add-image'
   formModalAddImage.setAttribute('enctype', 'multipart/form-data');

   const divFileAddImage = document.createElement('div')
   divFileAddImage.id = 'div-file-add-image'

   const inputFileAddimage = document.createElement('input')
   inputFileAddimage.id = 'input-file-add-image'
   inputFileAddimage.type = 'file'
   inputFileAddimage.accept = '.png, .jpg'

   const buttonFileAddImage = document.createElement('button')
   buttonFileAddImage.id = 'button-file-add-image'
   buttonFileAddImage.textContent = '+ Ajouter photo'

   buttonFileAddImage.addEventListener('click', (event) => {
      event.preventDefault()
      document.getElementById('input-file-add-image').click()
   })

   const imageDefaultModalAddImage = document.createElement('img')
   imageDefaultModalAddImage.src = './assets/icons/image-default.png'

   const textAddImageModal = document.createElement('p')
   textAddImageModal.textContent = 'jpg, png : 4mo max'

   const labelAddImageModal = document.createElement('label')
   labelAddImageModal.textContent = 'Titre'

   const inputTitleAddImageModal = document.createElement('input')
   inputTitleAddImageModal.type = 'text'

   const secondLabelAddImageModal = document.createElement('label')
   secondLabelAddImageModal.textContent = 'Catégorie'

   const selectCategoriesAddImageModal = document.createElement('select')
   selectCategoriesAddImageModal.id = 'select-categories-add-image-modal'

   const separationBar = document.createElement('div')
   separationBar.classList = 'bar'

   const inputSubmitAddImage = document.createElement('input')
   inputSubmitAddImage.type = 'submit'
   inputSubmitAddImage.value = 'Valider'

   bodyContainer.appendChild(modalAddImageAdmin)
   modalAddImageAdmin.appendChild(modalAddImageAdminWrapper)
   modalAddImageAdminWrapper.appendChild(buttonGoBackModalAddImage)
   buttonGoBackModalAddImage.addEventListener('click', (event) => {
      closeModalAddImage()
      createModal()
   })
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
   formModalAddImage.appendChild(inputTitleAddImageModal)

   formModalAddImage.appendChild(secondLabelAddImageModal)
   formModalAddImage.appendChild(selectCategoriesAddImageModal)

   async function categoriesAddImageModal() {
      await fetch('http://localhost:5678/api/categories')
         .then(response => response.json())
         .then(categories => {
            const inputCategoriesAddImageModal = document.getElementById('select-categories-add-image-modal')
            categories.forEach(category => {
               const optionCategoriesAddImageModal = document.createElement('option')
               optionCategoriesAddImageModal.id = 'option-categories-add-image-modal'
               optionCategoriesAddImageModal.textContent = category.name
               optionCategoriesAddImageModal.dataset.categoryId = category.id


               selectCategoriesAddImageModal.appendChild(optionCategoriesAddImageModal)
            })
         })
   }

   async function loadCategoryAddImageModal() {
      await categoriesAddImageModal()
   }

   loadCategoryAddImageModal()

   // Ajouter les derniers éléments à la modale d'ajout de projet
   formModalAddImage.appendChild(separationBar)
   formModalAddImage.appendChild(inputSubmitAddImage)

   const inputFileAddImage = document.getElementById('input-file-add-image');

   let imageElement = null;

   inputFileAddImage.addEventListener('change', function (event) {

      event.preventDefault();
      const file = event.target.files[0];

      if (file) {
         // Supprimer l'image par défaut et la balise p
         const defaultImage = divFileAddImage.querySelector('img');
         const paragraph = divFileAddImage.querySelector('p');

         if (defaultImage && paragraph) {
            // Supprimer l'image par défaut et la balise p
            divFileAddImage.removeChild(defaultImage);
            divFileAddImage.removeChild(paragraph);
         }

         if (imageElement) {
            // Supprimer l'image existante s'il y en a une
            buttonFileAddImage.removeChild(imageElement);
         }

         imageElement = document.createElement('img');
         imageElement.id = ('image-preview')


         // Ajouter le bouton avec l'image en tant qu'enfant

         buttonFileAddImage.id = 'button-file-add-image-preview';
         buttonFileAddImage.textContent = ''

         buttonFileAddImage.appendChild(imageElement);
         divFileAddImage.appendChild(buttonFileAddImage);


         localStorage.setItem('file', file);

         const reader = new FileReader();

         reader.addEventListener('load', () => {
            imageElement.src = reader.result; // Met à jour l'attribut src de l'élément <img> avec l'URL du fichier
         });

         reader.readAsDataURL(file); // Lit le fichier en tant que données URL

      }
   });

   formModalAddImage.addEventListener('submit', (event) => {
      event.preventDefault() // Empêche l'envoi du formulaire par défaut

      const optionCategoriesAddImageModal = document.getElementById('option-categories-add-image-modal')

      // Récupérer les valeurs des champs du formulaire
      const file = localStorage.getItem('file')
      const fileImageUpload = document.getElementById('input-file-add-image')
      const title = inputTitleAddImageModal.value

      // Vérifier si il y a une photo pour l'ajout du projet
      if (!fileImageUpload.files || fileImageUpload.files.length === 0) {
         alert("Veuillez ajouter une photo pour le projet.");
         return;
      }

      // Vérifier si il y a un titre pour l'ajout du projet
      if (!title.trim()) {
         alert("Veuillez saisir un titre pour le projet.");
         return;
      }

      const selectedOption = selectCategoriesAddImageModal.options[selectCategoriesAddImageModal.selectedIndex];
      const category = selectedOption.getAttribute('data-category-id');

      const formData = new FormData();
      formData.append('image', fileImageUpload.files[0]);
      formData.append('title', title);
      formData.append('category', category);

      // Effectuer la requête Fetch pour envoyer les données
      fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
               // 'Content-Type': 'multipart/form-data',
               'Authorization': `Bearer ${token}`
            },
            body: formData
         })
         .then(response => {
            if (response.status === 201) {
               alert('Projet ajouté avec succès.')
            } else if (response.status === 401) {
               alert(`Token d'authentification invalide, veuillez vous reconnecter`)
            } else if (response.status === 500) {
               alert('il y a une erreur pour ajouter le projet')
            }
         })
         .catch(error => {
            console.error('Erreur lors de l\'envoi de la requête:', error)
            alert('Une erreur s\'est produite lors de l\'ajout du projet.')
         })

      // Réinitialiser le formulaire d'ajout de projet
      formModalAddImage.reset()
   })

   // Créer une fonction pour fermer la modale d'ajout de projet
   function closeModalAddImage() {
      const modalAddImageAdmin = document.getElementById('modale-add-image-admin')
      modalAddImageAdmin.remove()
   }

   // Ajout d'un événement au bouton de fermeture pour fermer la modale d'ajout de projet
   buttonCloseModalAddImage.addEventListener('click', (event) => {
      closeModalAddImage()
   })

   // Ajouter un gestionnaire d'événement à la fenêtre pour fermer la modale en cliquant à l'extérieur
   window.addEventListener('click', (event) => {
      if (event.target === modalAddImageAdmin) {
         closeModalAddImage()
      }
   })

} // Fin de la fonction pour créer la modale d'ajout de projet