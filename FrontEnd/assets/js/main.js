// Section Portfolio, récupération et affichage des projets
// Récupérer les projets via l'API
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {

        const projetContainer = document.getElementById('portfolio')

        const projetUl = document.createElement('ul')
        projetUl.classList.add('gallery')

        // Parcourir les données et générer images et titre de chaque projet
        data.forEach(projetData => {
            
            const projetLi = document.createElement('li')
            projetLi.classList.add('projet')
            projetLi.dataset.value = projetData.category.id

            const projetTitle = document.createElement('h3')
            projetTitle.classList.add('projet-title')
            projetTitle.textContent = projetData.title

            const projetImage = document.createElement('img')
            projetImage.classList.add('projet-image')
            projetImage.src = projetData.imageUrl
            projetImage.alt = projetData.title

            // projetLi.dataset.value = projetData.category.id
            // const projet = projetData.category.id

            // Ajouter les éléments
            projetLi.appendChild(projetImage)
            projetLi.appendChild(projetTitle)
            projetContainer.appendChild(projetUl)
            projetUl.appendChild(projetLi)
        })
    })
    .catch(error => {
        console.error('Il y a une erreur pour récupérer et ajouter les projets au portfolio', error)
    })

// Filter-bar pour seulement les projets d'une catégorie seulement
// Récupérer les catégories depuis l'API
fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(categories => {

        const filterBar = document.getElementById('filter-bar')

        // Créer l'option "Tous" par défaut
        const allOption = document.createElement('button')
        allOption.classList.add('filter-option')
        allOption.textContent = 'Tous'

        // Pré-sélectionner l'option "Tous" par défaut
        allOption.id = 'active-filter-option' 

        filterBar.appendChild(allOption)

        // Parcourir les catégories pour créer les buttons de filtrage par catégorie
        categories.forEach(category => {
            const option = document.createElement('button')
            option.classList.add('filter-option')
            option.textContent = category.name
            option.dataset.categoryId = category.id
            filterBar.appendChild(option)
        })

        // Filtrer les projets lorsqu'une option est sélectionnée
        filterBar.addEventListener('click', event => {
            const selectedOption = event.target
            if (selectedOption.classList.contains('filter-option')) {

                const categoryId = selectedOption.dataset.categoryId

                // Afficher uniquement les projets correspondant à la catégorie sélectionnée
                const projects = document.getElementsByClassName('projet')
                Array.from(projects).forEach(project => {
                    if (categoryId === undefined || project.dataset.value === categoryId) {
                        project.style.display = 'block'
                    } else {
                        project.style.display = 'none'
                    }
                })
            }

            // Ajouter l'id active-filter-option sur le filtre actif
            const clickedOption = event.target
            if (clickedOption.classList.contains('filter-option')) {

                const categoryId = clickedOption.dataset.categoryId

                // Supprimez l'ID de l'option précédemment sélectionnée
                const previousOption = filterBar.querySelector('#active-filter-option')
                if (previousOption) {
                    previousOption.removeAttribute('id')
                }

                // Mettez à jour l'option sélectionnée
                clickedOption.id = 'active-filter-option'

            }

        })
    })
    .catch(error => {
        console.error('Il y a une erreur pour récupérer et ajouter les catégories', error)
    })


// Version admin - Utilisateur connecté

// Récupérer le token d'authentification de la page login.html
let token = localStorage.getItem('token')

var url = window.location.href

// Si on a un token d'authentification, alors affichier la version admin
if (token) {
    // Attendre que la page soit chargée
    document.addEventListener("DOMContentLoaded", function() {

        let bodyContainer = document.body
        bodyContainer.style.paddingTop = "50px"
        const headerAdmin = document.createElement("div")
        headerAdmin.classList.add('header-admin')

        let iconHeaderAdmin = document.createElement('img')
        iconHeaderAdmin.src = './assets/icons/group.png'
        iconHeaderAdmin.alt = 'icon'

        let texteHeaderAdmin = document.createElement('p')
        texteHeaderAdmin.textContent = 'Mode édition'

        let buttonHeaderAdmin = document.createElement('button')
        buttonHeaderAdmin.textContent = 'publier les changements'

        bodyContainer.insertBefore(headerAdmin, bodyContainer.firstChild)
        headerAdmin.appendChild(iconHeaderAdmin)
        headerAdmin.appendChild(texteHeaderAdmin)
        headerAdmin.appendChild(buttonHeaderAdmin)

        // Récupérer le bouton "login" dans le header, pour changer nom en "logout" et son lien
        let loginButton = document.getElementById('button-login')
        loginButton.textContent = 'logout'
        loginButton.href = '../index.html'

        // Ajouter un addEventListener sur le bouton loginButton pour se déconnecter
        loginButton.addEventListener("click", function() {
            logout()
        })

        // Fonction de déconnexion
        function logout() {
            localStorage.clear()
            location.reload()
        }

        // Ajout des "button" modifier en version admin
        const projetContainer = document.getElementById('titre-portfolio')

        const introContainer = document.getElementById('img-intro')

        const buttonModifier = document.createElement('button')
        buttonModifier.id = 'button-modifier-admin'
        const texteButtonModifier = document.createElement('p')
        texteButtonModifier.textContent = 'modifier'

        let iconHeaderAdminBlack = document.createElement('img')
        iconHeaderAdminBlack.src = './assets/icons/group-black.png'
        iconHeaderAdminBlack.alt = 'icone de modification'


        const buttonModifierIntro = document.createElement('button')
        buttonModifierIntro.id = 'button-modifier-intro-admin'

        const texteButtonModifierIntro = document.createElement('p')
        texteButtonModifierIntro.textContent = 'modifier'

        const iconHeaderAdminBlackIntro = document.createElement('img')
        iconHeaderAdminBlackIntro.src = './assets/icons/group-black.png'
        iconHeaderAdminBlackIntro.alt = 'icone de modification'
        

        buttonModifier.appendChild(iconHeaderAdminBlack)
        buttonModifier.appendChild(texteButtonModifier)

        introContainer.appendChild(buttonModifierIntro)
        buttonModifierIntro.appendChild(iconHeaderAdminBlackIntro)
        buttonModifierIntro.appendChild(texteButtonModifierIntro)

        const troisiemeEnfantPortfolio = projetContainer.children[1]
        projetContainer.insertBefore(buttonModifier, troisiemeEnfantPortfolio)

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
    
                                let actuelDataCompteurModal = apercuImageLinkData.id
    
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
                                            liApercuImageModal.remove() // Supprime l'élément de la liste
                                            alert(`Vous avez bien supprimer la photo avec l'id ${actuelDataCompteurModal}`)
                                        } else if (statusCode === 401) {
                                            alert(`Token d'authentification invalide, veuillez vous reconnecter`)
                                        }
                                    })
                                    .catch(error => {
                                        alert(`Il y a une erreur pour supprimer la photo avec l'id ${actuelDataCompteurModal}`)
                                    })
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
                    if(confirmationAvantSuppression){

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
                    //   alert('Vous avez supprimé toutes les photos avec succès.')
                    } catch (error) {
                      alert('Une erreur s\'est produite lors de la suppression des photos.')
                    }
                }
                  })// fin du addEventListener du buttonDeleteAllImage


            } // fin de la function createModal

            // Ajout de l'évènement pour créer la modale lors du clic sur le bouton "Modifier"
            buttonModifier.addEventListener('click', (event) => {
                createModal()
            })

            // Fonction pour ouvrir modale d'ajout de projet
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

                // Ajouter un gestionnaire d'événement pour vérifier la taille du fichier lors de la sélection
                inputFileAddimage.addEventListener('change', function(event) {
                    event.preventDefault()
                    const file = event.target.files[0]

                    if (file) {

                        localStorage.setItem('file', file)

                        const divFileAddImage = document.getElementById('div-file-add-image')
                        const buttonFileAddImage = document.getElementById('button-file-add-image')

                        const reader = new FileReader()
                    
                        reader.addEventListener('load', () => {
                          const imageElement = document.createElement('img')
                          imageElement.src = reader.result // Met à jour l'attribut src de l'élément <img> avec l'URL du fichier
                    
                          // Efface les anciennes images prévisualisées
                          divFileAddImage.remove()
                          // Ajoute la nouvelle image prévisualisée
// Sélectionner l'élément formModalAddImage
const formModalAddImage = document.getElementById("form-modal-add-image");

// Créer une nouvelle div
const newDivFileAddImage = document.createElement("div");
newDivFileAddImage.id = 'div-file-add-image'


                        const inputFileAddimage = document.createElement('input')
                        inputFileAddimage.id = 'input-file-add-image'
                        inputFileAddimage.type = 'file'
                        inputFileAddimage.accept = '.png, .jpg'

                          const newButtonFileAddImage = document.createElement('button')
                          newButtonFileAddImage.id = 'new-button-file-add-image'

                          buttonFileAddImage.addEventListener('click', (event) => {
                            event.preventDefault()
                            document.getElementById('input-file-add-image').click()
                        })

                        newButtonFileAddImage.addEventListener('click', (event) => {
                            event.preventDefault()
                            document.getElementById('input-file-add-image').click()
                        })

                          formModalAddImage.insertBefore(newDivFileAddImage, formModalAddImage.firstChild);
                          newDivFileAddImage.appendChild(newButtonFileAddImage)
                          newDivFileAddImage.appendChild(inputFileAddimage)
                          newButtonFileAddImage.appendChild(imageElement)
                        })
                    
                        reader.readAsDataURL(file) // Lit le fichier en tant que données URL
                      }

                    const newButtonFileAddImage = document.getElementById('new-button-file-add-image')
                    // // Réinitialise l'input de type file lors du clic sur le bouton "Ajouter l'image"
                    newButtonFileAddImage.addEventListener('click', function() {
                        
                      inputFileAddimage.value = ''
                      newButtonFileAddImage.innerHTML = '' // Efface l'image prévisualisée
                    })


                    // Vérifier la taille du fichier
                    const maxSize = 4 * 1024 * 1024 // 4 Mo en octets
                    if (file.size > maxSize) {
                        alert('La taille du fichier est supérieure à 4 Mo.')
                        inputFileAddimage.value = '' // Réinitialiser la valeur de l'input pour effacer le fichier sélectionné
                    }

                    
                })

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


                formModalAddImage.addEventListener('submit', (event) => {
                    event.preventDefault() // Empêche l'envoi du formulaire par défaut

                    const optionCategoriesAddImageModal = document.getElementById('option-categories-add-image-modal')

                   // Récupérer les valeurs des champs du formulaire
                    // const file = localStorage.getItem('file')
                    const file = localStorage.getItem('file')
                    console.log(file)

                    const fileImageUpload = document.getElementById('input-file-add-image')

                    // const file = event.target.files[0];
                    // const reader = new FileReader()

                    //           reader.onload = function(e) {
                    //             // e.target.result contient l'URL de l'image en tant que données au format base64
                    //             const imageDataUrl = e.target.result
                    //             localStorage.setItem('imageUrl', imageDataUrl)
                    //             console.log(imageUrl)
                    //           }

                    //           reader.readAsDataURL(file)



                    const title = inputTitleAddImageModal.value
                    // const category = selectCategoriesAddImageModal
                    // const category = optionCategoriesAddImageModal.dataset.categoryId

                    const selectedOption = selectCategoriesAddImageModal.options[selectCategoriesAddImageModal.selectedIndex];
                    const category = selectedOption.getAttribute('data-category-id');



                    // localStorage.getItem('imageUrl')

                    // const imageUrlAfterLocalStorage = imageUrl

                    // Créer un objet data pour envoyer les données du formulaire
                    // const data = {
                    //     image: file,
                    //     title: title,
                    //     category: parseInt(category)
                    // }

                    // console.log(data)

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


        }) // Fin du gestionnaire d'évènement pour attendre que la page soit chargée

} // Fin de la version admin si l'on est connecté