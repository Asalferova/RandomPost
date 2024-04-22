'use strict';

// Получаем ссылки на элементы DOM
const container = document.querySelector('.container');
const historyPostsEl = document.querySelector('.history-posts');
const historyBtn = document.querySelector('.history-btn');

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
            isUserLikes: false
        }
        container.insertAdjacentHTML('beforeend', createPost(post));
        previousPosts.push(post);
        saveLikeToLocalStorage(previousPosts);
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
            // Находим индекс поста в массиве previousPosts
            const postId = parseInt(e.target.parentNode.dataset.postId);
            const index = previousPosts.findIndex(post => post.id === postId);
            // Обновляем количество лайков в массиве previousPosts
            previousPosts[index].likes = likeCount;
            previousPosts[index].isUserLikes = true;
    
            // Сохраняем обновленные данные в localStorage
            saveLikeToLocalStorage(previousPosts);
        } else {
            e.target.classList.remove('active');
            let likeCount = parseInt(e.target.textContent);
            likeCount--;
            e.target.textContent = likeCount;
            const postId = parseInt(e.target.parentNode.dataset.postId);
            const index = previousPosts.findIndex(post => post.id === postId);
            previousPosts[index].likes = likeCount;
            previousPosts[index].isUserLikes = false;
    
            saveLikeToLocalStorage(previousPosts);
        }
    }
});

// Функция для создания HTML-разметки поста
function createPost(post){
    return `<div class="post" data-post-id="${post.id}"><img src="${post.url}" class="post__image"></img ><h3 class="post__author">Автор: ${post.name}</h3><button class="${'post__like-btn'}"> ${post.likes}</button></div>`;
};

// Функция для создания HTML-разметки поста в истории
function createPostForHistory(post){
    return `<div class="post history-posts__post" data-post-id="${post.id}"><img src="${post.url}"></img><h3 class="post__author">${post.name}</h3><button class="${post.isUserLikes ? 'post__like-btn active': 'post__like-btn'}"> ${post.likes}</button></div>`;
};

// Функция для отображения истории постов
function showHistory(posts){
    posts.forEach(element => {
     historyPostsEl.insertAdjacentHTML('beforeend', createPostForHistory(element));
    });
 };
 
 // Получаем данные из localStorage
 const storedPosts = localStorage.getItem('previousPosts');
 let previousPosts = [];
 if(storedPosts){
     previousPosts = JSON.parse(storedPosts);
 } else {
     previousPosts = [];
 };
 
 // Функция для сохранения данных в localStorage
 function saveLikeToLocalStorage(previousPosts){
   if(previousPosts.length > 6){
     previousPosts.shift();
     localStorage.setItem('previousPosts', JSON.stringify(previousPosts));
   } 
 localStorage.setItem('previousPosts', JSON.stringify(previousPosts));
 };
 
 // Обработчик клика по кнопке "history"
 historyBtn.addEventListener('click', () => {
     showHistory(previousPosts);
 });









