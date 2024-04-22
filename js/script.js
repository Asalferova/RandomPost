'use strict';

// Получаем ссылки на элементы DOM
const container = document.querySelector('.container');

// Токен для доступа к API Unsplash
const token = 'i0L1B-zwQcvsPC4erXHqqMdMSUoE-Vfo-992hTU3bHI';

// Запрашиваем изображение при загрузке страницы
getImage();

// Функция для получения случайного изображения с Unsplash
async function getImage(){
    try{
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${token}&_=${Date.now()}`);
        if(!response.ok){
            throw new Error(response.status)
        }
        const data = await response.json();
        let post = {
            id: Date.now(),
            url: data.urls.small,
            name:  data.user.name, 
            likes: data.likes,
        }
        container.insertAdjacentHTML('beforeend', createPost(post));
    } catch(error) {
        console.log(error);
    } 
};

// Обработчик клика по кнопке "like"
document.body.addEventListener('click', (e) => {
    if(e.target.classList.contains('post__like-btn')){
        if(!e.target.classList.contains('active')){
            e.target.classList.add('active');
            let likeCount = parseInt(e.target.textContent);
            likeCount++;
            e.target.textContent = likeCount;
        } else {
            e.target.classList.remove('active');
            let likeCount = parseInt(e.target.textContent);
            likeCount--;
            e.target.textContent = likeCount;
        }
    }
});

// Функция для создания HTML-разметки поста
function createPost(post){
    return `<div class="post" data-post-id="${post.id}"><img src="${post.url}" class="post__image"></img ><h3 class="post__author">Автор: ${post.name}</h3><button class="${'post__like-btn'}"> ${post.likes}</button></div>`;
};









