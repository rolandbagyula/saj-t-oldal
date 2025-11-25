// Blog functionality
console.log('Blog script loaded!');

(function() {
  // Blog posts data
  let posts = [
    {
      id: 'hello-world',
      title: 'Üdvözöllek a blogomon!',
      date: '2025-11-25',
      excerpt: 'Bemutatkozás és a blog célja, ahol megosztom tapasztalataimat a webfejlesztés világából.',
      category: 'bevezető',
      tags: ['üdvözlés', 'bevezetés', 'blog'],
      image: 'főkép.jpg',
      featured: true
    },
    {
      id: 'react-hooks-alapok',
      title: 'React Hooks alapok',
      date: '2025-11-20',
      excerpt: 'Ismerd meg a React Hooks alapjait és hogyan használhatod hatékonyan alkalmazásaidban.',
      category: 'react',
      tags: ['react', 'hooks', 'frontend'],
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      featured: true
    },
    {
      id: 'css-grid-tutorial',
      title: 'CSS Grid alapok',
      date: '2025-11-15',
      excerpt: 'Tanulj meg modern elrendezéseket készíteni a CSS Grid segítségével.',
      category: 'css',
      tags: ['css', 'grid', 'reszponzív'],
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'javascript-es6-features',
      title: 'JavaScript ES6+ újítások',
      date: '2025-11-10',
      excerpt: 'Nézzük meg a legfontosabb ES6+ funkciókat, amiket minden fejlesztőnek érdemes ismernie.',
      category: 'javascript',
      tags: ['javascript', 'es6', 'frontend'],
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'reszponziv-design',
      title: 'Reszponzív webdesign alapok',
      date: '2025-11-05',
      excerpt: 'Hogyan készítsünk tökéletesen reszponzív weboldalakat a mai eszközök számára.',
      category: 'css',
      tags: ['css', 'reszponzív', 'design'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'react-performance',
      title: 'React alkalmazások optimalizálása',
      date: '2025-10-30',
      excerpt: 'Tippek és trükkök a React alkalmazások teljesítményének javításához.',
      category: 'react',
      tags: ['react', 'teljesítmény', 'optimalizálás'],
      image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'css-animations',
      title: 'CSS animációk',
      date: '2025-10-25',
      excerpt: 'Hozz életre a weboldaladon CSS animációkkal és átmenetekkel.',
      category: 'css',
      tags: ['css', 'animáció', 'design'],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  // DOM Elements
  const postsGrid = document.querySelector('.posts-grid');
  const categoryFilter = document.getElementById('category-filter');
  const tagFilter = document.getElementById('tag-filter');
  const loadMoreBtn = document.querySelector('.load-more-btn');
  
  // Number of posts to show initially and per load
  let visiblePosts = 3;
  const postsPerLoad = 3;

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('hu-HU', options);
  };

  // Create post card HTML
  const createPostCard = (post) => {
    const isFeatured = post.featured ? 'featured' : '';
    const categoryClass = post.category ? post.category.toLowerCase().replace(/\s+/g, '-') : '';
    
    return `
      <article class="post-card ${isFeatured} ${categoryClass}" data-category="${categoryClass}" data-tags='${JSON.stringify(post.tags)}'>
        <div class="post-image">
          <img src="${post.image || 'blog-képek/default.jpg'}" alt="${post.title}">
        </div>
        <div class="post-content">
          <div class="post-meta">
            <span class="post-date">${formatDate(post.date)}</span>
            <span class="post-category">${post.category}</span>
          </div>
          <h3 class="post-title">${post.title}</h3>
          <p class="post-excerpt">${post.excerpt}</p>
          <div class="post-tags">
            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <a href="post.html?slug=${post.id}" class="read-more">Tovább olvasom <i class="fi fi-rr-arrow-right"></i></a>
        </div>
      </article>
    `;
  };

  // Display posts
  const displayPosts = (postsToShow) => {
    console.log('Displaying posts...');
    
    // Make sure postsGrid exists
    if (!postsGrid) {
      console.error('postsGrid element not found!');
      return;
    }
    
    // Clear the grid
    postsGrid.innerHTML = '';
    
    // Determine which posts to show
    const postsToDisplay = postsToShow || posts.slice(0, visiblePosts);
    
    console.log('Number of posts to display:', postsToDisplay.length);
    
    if (postsToDisplay.length === 0) {
      console.log('No posts to display');
      postsGrid.innerHTML = '<p class="no-posts">Nincs megjeleníthető bejegyzés.</p>';
      return;
    }

    // Add each post to the grid
    postsToDisplay.forEach(post => {
      console.log('Adding post:', post.title);
      const postHTML = createPostCard(post);
      postsGrid.insertAdjacentHTML('beforeend', postHTML);
    });

    // Show/hide load more button
    if (loadMoreBtn) {
      loadMoreBtn.style.display = visiblePosts.length < posts.length ? 'block' : 'none';
    }
  };

  // Filter posts by category
  const filterByCategory = (category) => {
    if (!category) {
      displayPosts();
      return;
    }
    
    const filteredPosts = posts.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    );
    
    displayPosts(filteredPosts);
  };

  // Filter posts by tag
  const filterByTag = (tag) => {
    if (!tag) {
      displayPosts();
      return;
    }
    
    const filteredPosts = posts.filter(post => 
      post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
    );
    
    displayPosts(filteredPosts);
  };

  // Load more posts
  const loadMorePosts = () => {
    visiblePosts += postsPerLoad;
    displayPosts(posts.slice(0, visiblePosts));
  };

  // Initialize the blog
  const init = () => {
    console.log('Blog initialization started');
    
    // Debug: Check if posts array is populated
    console.log('Number of posts:', posts.length);
    
    // Debug: Check if postsGrid exists
    console.log('Posts grid element:', document.getElementById('posts-grid'));
    
    // Display initial posts
    displayPosts();
    
    // Event listeners
    if (categoryFilter) {
      console.log('Category filter found');
      categoryFilter.addEventListener('change', (e) => {
        console.log('Category filter changed:', e.target.value);
        filterByCategory(e.target.value);
      });
    } else {
      console.warn('Category filter element not found!');
    }
    
    if (tagFilter) {
      console.log('Tag filter found');
      tagFilter.addEventListener('change', (e) => {
        console.log('Tag filter changed:', e.target.value);
        filterByTag(e.target.value);
      });
    } else {
      console.warn('Tag filter element not found!');
    }
    
    if (loadMoreBtn) {
      console.log('Load more button found');
      loadMoreBtn.addEventListener('click', loadMorePosts);
    } else {
      console.warn('Load more button not found!');
    }
    
    // Handle back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          backToTopBtn.classList.add('show');
        } else {
          backToTopBtn.classList.remove('show');
        }
      });
      
      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  // Run when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
