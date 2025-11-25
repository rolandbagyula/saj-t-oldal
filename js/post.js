// Post page functionality
(function() {
    // Get post slug from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get('slug');
    
    // Blog posts data (this should match the data in blog.js)
    const posts = [
        {
            id: 'hello-world',
            title: 'Üdvözöllek a blogomon!',
            date: '2025-11-25',
            content: `
                <p>Üdvözöllek a blogomon! Ez az első bejegyzésem, ahol bemutatkozom és bemutatom a blog célját.</p>
                
                <h2>Miért indítottam ezt a blogot?</h2>
                
                <p>Szeretném megosztani a tapasztalataimat, tanulmányaimat a webfejlesztés világából. Főként React, JavaScript és más modern webes technológiákról fogok írni.</p>
                
                <h2>Mire számíthatsz a jövőben?</h2>
                
                <ul>
                    <li>Hasznos tanácsok és trükkök</li>
                    <li>Új technológiák bemutatása</li>
                    <li>Projekt bemutatók</li>
                    <li>Érdekes kódrészletek</li>
                </ul>
                
                <p>Köszönöm, hogy elolvastad az első bejegyzésemet! Ha kérdésed van, ne habozz megkeresni.</p>
            `,
            category: 'bevezető',
            tags: ['üdvözlés', 'bevezetés'],
            image: 'főkép.jpg',
            author: 'Roland Bágyula'
        }
        // Add more posts here as you create them
    ];
    
    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('hu-HU', options);
    };
    
    // Display post
    const displayPost = () => {
        if (!postSlug) {
            document.getElementById('post-title').textContent = 'Bejegyzés nem található';
            document.getElementById('post-content').innerHTML = '<p>A kért bejegyzés nem található. <a href="blog.html">Vissza a blogra</a></p>';
            return;
        }
        
        const post = posts.find(p => p.id === postSlug);
        
        if (!post) {
            document.getElementById('post-title').textContent = 'Bejegyzés nem található';
            document.getElementById('post-content').innerHTML = '<p>A kért bejegyzés nem található. <a href="blog.html">Vissza a blogra</a></p>';
            return;
        }
        
        // Update page title
        document.title = `${post.title} – Blog`;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = post.content.replace(/<[^>]*>?/gm, '').substring(0, 155) + '...';
        }
        
        // Update post content
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-date').textContent = formatDate(post.date);
        document.getElementById('post-category').textContent = post.category;
        document.getElementById('post-tags').innerHTML = post.tags.map(tag => 
            `<span class="tag">${tag}</span>`
        ).join(' ');
        
        const postImage = document.getElementById('post-image');
        if (post.image) {
            postImage.src = post.image;
            postImage.alt = post.title;
        } else {
            postImage.style.display = 'none';
        }
        
        document.getElementById('post-content').innerHTML = post.content;
        
        // Add syntax highlighting to code blocks
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    };
    
    // Initialize the post page
    const init = () => {
        displayPost();
        
        // Add smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    // Run when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
