const updatePostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const post_content = document.querySelector('#post-content').value.trim();
    const id = location.pathname.split('/')[2];

    if (title && post_content) {
        const response = await fetch(`/api/post/updatepost/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, post_content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
            res.json({ message: 'Post updated' });
        } else {
            alert('Failed to update post.');
        }
    }
    if (title === "" || post_content === "") {
        document.getElementById('formValidation').innerHTML = `
    <div class="alert alert-danger" role="alert">
    You must fill out all required fields on the form.
    </div>`;
    }
};

const updatePost = document.getElementById('update-postBtn');

updatePost.addEventListener('click', updatePostFormHandler);