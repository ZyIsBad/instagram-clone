// script.js

// Data Models
const currentUser = {
    username: 'sarah_johnson',
    fullName: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
};

const stories = [
    { id: 1, username: 'alex_design', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop', hasStory: true },
    { id: 2, username: 'mia_photo', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop', hasStory: true },
    { id: 3, username: 'travel_joe', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=800&fit=crop', hasStory: true },
    { id: 4, username: 'foodie_lisa', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=800&fit=crop', hasStory: true },
    { id: 5, username: 'art_mike', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800&fit=crop', hasStory: true },
    { id: 6, username: 'nature_kate', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=800&fit=crop', hasStory: true }
];

const posts = [
    {
        id: 1,
        username: 'alex_design',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        location: 'New York, USA',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=1000&fit=crop',
        likes: 2341,
        caption: 'Creating art with code and coffee ☕️✨ What inspires you today?',
        comments: 45,
        time: '2 HOURS AGO',
        isLiked: false,
        isSaved: false
    },
    {
        id: 2,
        username: 'mia_photo',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        location: 'Kyoto, Japan',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=1000&fit=crop',
        likes: 5672,
        caption: 'Golden hour in the ancient streets 🏮🌸',
        comments: 128,
        time: '4 HOURS AGO',
        isLiked: true,
        isSaved: true
    },
    {
        id: 3,
        username: 'travel_joe',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        location: 'Santorini, Greece',
        image: 'https://images.unsplash.com/photo-1613395877344-13d4c280d288?w=800&h=1000&fit=crop',
        likes: 8901,
        caption: 'Blue domes and endless seas 🌊🇬🇷',
        comments: 234,
        time: '6 HOURS AGO',
        isLiked: false,
        isSaved: false
    }
];

const suggestions = [
    { username: 'design_daily', followedBy: 'alex_design + 3 more', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop' },
    { username: 'photo_world', followedBy: 'mia_photo + 5 more', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop' },
    { username: 'tech_insider', followedBy: 'sarah_johnson + 2 more', avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop' },
    { username: 'art_gallery', followedBy: 'art_mike + 8 more', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop' },
    { username: 'food_lovers', followedBy: 'foodie_lisa + 4 more', avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop' }
];

// DOM Elements
const storiesWrapper = document.querySelector('.stories-wrapper');
const feedContainer = document.querySelector('.feed-container');
const suggestionsList = document.querySelector('.suggestions-list');
const navItems = document.querySelectorAll('.nav-item');
const createModal = document.getElementById('createModal');
const storyModal = document.getElementById('storyModal');
const lightboxModal = document.getElementById('lightboxModal');

// Initialize App
function init() {
    renderStories();
    renderPosts();
    renderSuggestions();
    setupEventListeners();
}

// Render Stories
function renderStories() {
    stories.forEach(story => {
        const storyEl = document.createElement('div');
        storyEl.className = 'story-item';
        storyEl.innerHTML = `
            <div class="story-ring">
                <img src="${story.avatar}" alt="${story.username}">
            </div>
            <span class="story-username">${story.username}</span>
        `;
        storyEl.addEventListener('click', () => openStory(story));
        storiesWrapper.appendChild(storyEl);
    });
}

// Render Posts
function renderPosts() {
    feedContainer.innerHTML = '';
    posts.forEach(post => {
        const postEl = createPostElement(post);
        feedContainer.appendChild(postEl);
    });
}

// Create Post Element
function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post';
    article.dataset.postId = post.id;
    
    article.innerHTML = `
        <div class="post-header">
            <div class="post-user">
                <img src="${post.userAvatar}" alt="${post.username}">
                <div class="post-user-info">
                    <span class="post-username">${post.username}</span>
                    <span class="post-location">${post.location}</span>
                </div>
            </div>
            <i class="fas fa-ellipsis-h post-more"></i>
        </div>
        
        <div class="post-image-container">
            <img src="${post.image}" alt="Post" class="post-image">
            <i class="fas fa-heart double-tap-heart"></i>
        </div>
        
        <div class="post-actions">
            <div class="post-actions-left">
                <i class="${post.isLiked ? 'fas liked' : 'far'} fa-heart like-btn"></i>
                <i class="far fa-comment"></i>
                <i class="far fa-paper-plane"></i>
            </div>
            <i class="${post.isSaved ? 'fas saved' : 'far'} fa-bookmark save-btn"></i>
        </div>
        
        <div class="post-likes">${formatNumber(post.likes)} likes</div>
        
        <div class="post-caption">
            <span class="username">${post.username}</span>
            ${post.caption}
        </div>
        
        <div class="post-comments-preview">View all ${post.comments} comments</div>
        <div class="post-time">${post.time}</div>
        
        <div class="post-add-comment">
            <input type="text" placeholder="Add a comment..." class="comment-input">
            <button class="post-btn">Post</button>
        </div>
    `;
    
    // Event Listeners for this post
    const likeBtn = article.querySelector('.like-btn');
    const saveBtn = article.querySelector('.save-btn');
    const postImage = article.querySelector('.post-image');
    const doubleTapHeart = article.querySelector('.double-tap-heart');
    const commentInput = article.querySelector('.comment-input');
    const postBtn = article.querySelector('.post-btn');
    
    // Like functionality
    likeBtn.addEventListener('click', () => toggleLike(post, likeBtn, article));
    
    // Double tap to like
    let lastTap = 0;
    postImage.addEventListener('click', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
            doubleTapHeart.classList.add('active');
            setTimeout(() => doubleTapHeart.classList.remove('active'), 800);
            if (!post.isLiked) toggleLike(post, likeBtn, article);
        }
        lastTap = currentTime;
        
        // Open lightbox on single click (with delay check)
        setTimeout(() => {
            if (lastTap === currentTime) {
                openLightbox(post.image);
            }
        }, 300);
    });
    
    // Save functionality
    saveBtn.addEventListener('click', () => toggleSave(post, saveBtn));
    
    // Comment input
    commentInput.addEventListener('input', (e) => {
        if (e.target.value.trim()) {
            postBtn.classList.add('active');
        } else {
            postBtn.classList.remove('active');
        }
    });
    
    commentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            addComment(post, e.target.value);
            e.target.value = '';
            postBtn.classList.remove('active');
        }
    });
    
    postBtn.addEventListener('click', () => {
        if (commentInput.value.trim()) {
            addComment(post, commentInput.value);
            commentInput.value = '';
            postBtn.classList.remove('active');
        }
    });
    
    return article;
}

// Toggle Like
function toggleLike(post, btn, article) {
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
    
    btn.className = post.isLiked ? 'fas fa-heart like-btn liked' : 'far fa-heart like-btn';
    article.querySelector('.post-likes').textContent = `${formatNumber(post.likes)} likes`;
}

// Toggle Save
function toggleSave(post, btn) {
    post.isSaved = !post.isSaved;
    btn.className = post.isSaved ? 'fas fa-bookmark save-btn saved' : 'far fa-bookmark save-btn';
}

// Add Comment
function addComment(post, text) {
    post.comments++;
    const postEl = document.querySelector(`[data-post-id="${post.id}"]`);
    postEl.querySelector('.post-comments-preview').textContent = `View all ${post.comments} comments`;
    
    // Show temporary notification
    showToast('Comment posted!');
}

// Render Suggestions
function renderSuggestions() {
    suggestions.forEach((suggestion, index) => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `
            <img src="${suggestion.avatar}" alt="${suggestion.username}">
            <div class="suggestion-info">
                <span class="suggestion-username">${suggestion.username}</span>
                <span class="suggestion-followed-by">Followed by ${suggestion.followedBy}</span>
            </div>
            <button class="follow-btn">Follow</button>
        `;
        
        const followBtn = item.querySelector('.follow-btn');
        followBtn.addEventListener('click', () => {
            if (followBtn.textContent === 'Follow') {
                followBtn.textContent = 'Following';
                followBtn.classList.add('following');
                showToast(`You are now following ${suggestion.username}`);
            } else {
                followBtn.textContent = 'Follow';
                followBtn.classList.remove('following');
            }
        });
        
        suggestionsList.appendChild(item);
    });
}

// Open Story
function openStory(story) {
    const storyViewer = storyModal.querySelector('.story-viewer');
    storyModal.querySelector('.story-user-img').src = story.avatar;
    storyModal.querySelector('.story-user-name').textContent = story.username;
    storyModal.querySelector('.story-content img').src = story.image;
    
    storyModal.classList.add('active');
    
    // Auto close after 5 seconds
    setTimeout(() => {
        storyModal.classList.remove('active');
    }, 5000);
}

// Open Lightbox
function openLightbox(imageSrc) {
    lightboxModal.querySelector('img').src = imageSrc;
    lightboxModal.classList.add('active');
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            
            // Remove active from all
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Handle special pages
            if (page === 'create') {
                createModal.classList.add('active');
                item.classList.remove('active');
                document.querySelector('[data-page="home"]').classList.add('active');
            } else if (page === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                showToast(`${page.charAt(0).toUpperCase() + page.slice(1)} coming soon!`);
            }
        });
    });
    
    // Close modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('active');
        });
    });
    
    // Close modal on outside click
    [createModal, storyModal, lightboxModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
        }
        if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            const firstPost = posts[0];
            const likeBtn = document.querySelector(`[data-post-id="1"] .like-btn`);
            if (firstPost && likeBtn) toggleLike(firstPost, likeBtn, likeBtn.closest('.post'));
        }
    });
    
    // Infinite scroll simulation
    let loading = false;
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && !loading) {
            loading = true;
            setTimeout(() => {
                loadMorePosts();
                loading = false;
            }, 1000);
        }
    });
}

// Load More Posts (Infinite Scroll)
function loadMorePosts() {
    const newPosts = [
        {
            id: posts.length + 1,
            username: 'new_user_' + (posts.length + 1),
            userAvatar: `https://images.unsplash.com/photo-${1500000000000 + posts.length * 1000}?w=150&h=150&fit=crop`,
            location: 'Somewhere on Earth',
            image: `https://images.unsplash.com/photo-${1600000000000 + posts.length * 1000}?w=800&h=1000&fit=crop`,
            likes: Math.floor(Math.random() * 5000),
            caption: 'New content loaded! 🎉',
            comments: Math.floor(Math.random() * 100),
            time: 'JUST NOW',
            isLiked: false,
            isSaved: false
        }
    ];
    
    newPosts.forEach(post => {
        posts.push(post);
        const postEl = createPostElement(post);
        postEl.style.animation = 'fadeIn 0.5s ease';
        feedContainer.appendChild(postEl);
    });
}

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--bg-tertiary);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
        border: 1px solid var(--border-color);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', init);