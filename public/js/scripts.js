const postAuthorizationInfo = () => {
  const email = $('#email-box').val();
  const app = $('#app-box').val();

  if(email && app) {
    fetch('/api/v1/authenticate', {
      method: 'POST',
      body: JSON.stringify({ email, app }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(response => showToken(response.token))
    .catch(error => console.log('No token generated'))
  }
}

const showToken = (response) => {
  $('#token-box').text(response)
}

$('#submit').on('click', postAuthorizationInfo);
