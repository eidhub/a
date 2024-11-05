// يحدد المحتوى والفلاتر لكل صفحة على حدة
const pageData = {




    page1: {
        title: "البطاقات - الصفحة 1",
        filters: ["A", "B"],
        cards: [
            { image: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/gldn-MSFT-CP-Edge?wid=406&hei=230&fit=crop', title: 'برنامج 1', text: 'وصف البرنامج 1.', link: '#1', category: 'A' },
            { image: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/gldn-MSFT-CP-Edge?wid=406&hei=230&fit=crop', title: 'برنامج 2', text: 'وصف البرنامج 2.', link: '#2', category: 'B' }
        ]
        
        
        
        
    },
    page2: {
        title: "البطاقات - الصفحة 2",
        filters: ["A", "B"],
        cards: [
            { image: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Content-Card-Visual-Studio-Icon?wid=406&hei=230&fit=crop', title: 'برنامج 3', text: 'وصف البرنامج 3.', link: '#3', category: 'A' },
            { image: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Content-Card-Visual-Studio-Icon?wid=406&hei=230&fit=crop', title: 'برنامج 4', text: 'وصف البرنامج 4.', link: '#4', category: 'B' }
        ]
    }
    
    
    
    
};

// استخراج معلمات URL لتحديد الصفحة
const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get('page') || 'page1';
const defaultCategory = urlParams.get('defaultCategory') || pageData[page].filters[0];
let currentFilter = defaultCategory;

// ضبط العنوان وعرض الفلاتر الخاصة بالصفحة
function setupPage() {
    const pageContent = pageData[page];
    document.getElementById('page-title').textContent = pageContent.title;

    // إنشاء أزرار الفلاتر
    const container = document.getElementById('filters-container');
    pageContent.filters.forEach(filter => {
        const button = document.createElement('button');
        button.className = `filter-btn ${filter === currentFilter ? 'active' : ''}`;
        button.textContent = `فئة ${filter}`;
        button.onclick = () => applyFilter(filter);
        container.appendChild(button);
    });

    // تحميل البطاقات الافتراضية
    loadCards();
}

// تطبيق الفلتر وعرض البطاقات
function applyFilter(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.classList.toggle('active', button.textContent.includes(filter));
    });
    loadCards();
}

// تحميل وعرض البطاقات بناءً على الفلتر الحالي
function loadCards() {
    const pageContent = pageData[page];
    const programList = document.getElementById('program-list');
    programList.innerHTML = pageContent.cards
        .filter(card => card.category === currentFilter)
        .map(createCardHTML)
        .join('');
}

// إنشاء HTML للبطاقة
function createCardHTML({ image, title, text, link }) {
    return `
        <div class="col-md-6 mb-4">
            <div class="card">
                <img src="${image}" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${text}</p>
                    <a href="${link}">استكشف المزيد</a>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', setupPage);
