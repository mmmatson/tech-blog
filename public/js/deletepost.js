const deletePostFormHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  const deletePost = document.querySelectorAll('.delete-post');
  
  deletePost.forEach((element) => {
    element.addEventListener('click', deletePostFormHandler);
  });