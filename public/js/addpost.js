const addPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const post_content = document.querySelector('#post-content').value.trim();
    const date_created = document.querySelector('#date-created').value.trim();
    const user_id = document.querySelector('#user-id').value.trim();
  
    if (title && post_content && date_created && user_id) {
      const response = await fetch('/api/post/add', {
        method: 'POST',
        body: JSON.stringify({ title, post_content, date_created, user_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to add post.');
      }
    }
    if (title === '' || post_content === '' || date_created === '' || user_id === '') {
      document.getElementById('formValidation').innerHTML = `
          <div class="alert alert-danger" role="alert">
          You must fill out all required fields on the form. 
          </div>`;
    }
  };
  
  document
    .querySelector('#submit-post')
    .addEventListener('submit', addPostFormHandler);