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
         // Ajouter l'id de chaque projet
         projetLi.dataset.id = projetData.id

         const projetTitle = document.createElement('h3')
         projetTitle.classList.add('projet-title')
         projetTitle.textContent = projetData.title

         const projetImage = document.createElement('img')
         projetImage.classList.add('projet-image')
         projetImage.src = projetData.imageUrl
         projetImage.alt = projetData.title

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
   document.addEventListener("DOMContentLoaded", function () {

      // Ajouter le fichier js pour la version admin
      const adminScript = document.createElement('script')
      adminScript.src = './assets/js/admin.js'
      document.body.appendChild(adminScript);

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
      loginButton.addEventListener("click", function () {
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


      // Ajout de l'évènement pour créer la modale lors du clic sur le bouton "Modifier"
      buttonModifier.addEventListener('click', (event) => {
         createModal()
      })

   }) // Fin du gestionnaire d'évènement pour attendre que la page soit chargée

} // Fin de la version admin si l'on est connecté