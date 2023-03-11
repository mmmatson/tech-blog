const addCommentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment_content = document.querySelector('#comment-content').value.trim();
    const date_created = document.querySelector('#date-created').value.trim();
    const user_id = document.querySelector('#user-id').value.trim();
  
    if (date_created && comment_content && user_id) {
      const response = await fetch('/api/comment/add', {
        method: 'POST',
        body: JSON.stringify({ comment_content, date_created, user_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to add comment.');
      }
    }
    if (comment_content === '' || date_created === '' || user_id === '') {
      document.getElementById('formValidation').innerHTML = `
          <div class="alert alert-danger" role="alert">
          You must fill out all required fields on the form. 
          </div>`;
    }
  };
  
  document
    .querySelector('#submit-comment')
    .addEventListener('submit', addCommentFormHandler);