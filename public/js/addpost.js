const addPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const post_content = document.querySelector('#post-content').value.trim();
  
    if (title && post_content) {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, post_content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        document.getElementById('formValidation').innerHTML = `
        <div class="alert alert-danger" role="alert">Failed to add post.</div>`;      }
    }
    if (title === '' || post_content === '') {
      document.getElementById('formValidation').innerHTML = `
          <div class="alert alert-danger" role="alert">
          You must fill out all required fields on the form. 
          </div>`;
    }
  };
  
  document
    .querySelector('#submit-post')
    .addEventListener('submit', addPostFormHandler);