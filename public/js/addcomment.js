const addCommentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment_content = document.querySelector('#comment-content').value.trim();
    const id = location.pathname.split('/')[2];

    if (comment_content) {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ post_id: id, comment_content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to add comment.');
      }
    }
    if (comment_content === '') {
      document.getElementById('formValidation').innerHTML = `
          <div class="alert alert-danger" role="alert">
          You must fill out all required fields on the form. 
          </div>`;
    }
  };
  
  document
    .querySelector('#submit-comment')
    .addEventListener('submit', addCommentFormHandler);