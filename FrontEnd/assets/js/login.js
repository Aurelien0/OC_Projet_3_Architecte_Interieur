
    // Récupérer les éléments du formulaire
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('submitButton');

// Ajouter un gestionnaire d'événement au clic du bouton de soumission
submitButton.addEventListener('click', (event) => {
  event.preventDefault(); // Empêcher le rechargement de la page

  // Récupérer les valeurs du formulaire
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  // Créer l'objet de données à envoyer dans la requête POST
  const data = {
    email: emailValue,
    password: passwordValue
  };

  // Effectuer la requête POST avec fetch()
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(responseData => {
      // Comparer les valeurs obtenues avec celles du formulaire
if (responseData.token) {

  localStorage.setItem('token', responseData.token)
  // if (emailValue === "sophie.bluel@test.tld" && passwordValue === "S0phie") {
// Afficher un message de connexion réussie
window.location.href = 'index.html';
// window.location.href = 'index.html?mode=admin';
console.log('Connecté');
console.log(localStorage.getItem('token'));

} else {
      //   // Afficher une erreur
      const formContainer = document.getElementById('formulaireLogin');
      const messageErreur = document.createElement('p');
      messageErreur.classList.add('message-erreur');
      messageErreur.textContent = 'Erreur dans l\'identifiant ou le mot de passe';

      const cinquiemeEnfant = formContainer.children[4];

      formContainer.insertBefore(messageErreur, cinquiemeEnfant)
        console.log(responseData);
}
    })
    .catch(error => {
      // Traiter les erreurs éventuelles
      console.error('Une erreur s\'est produite:', error);
    });
});
