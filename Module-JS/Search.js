(function () {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    function formatPrice(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function getSearchContainer(input) {
        let container = input.parentElement.querySelector('.search-results');
        if (!container) {
            container = document.createElement('div');
            container.className = 'search-results hidden';
            input.parentElement.appendChild(container);
        }
        return container;
    }

    function clearResults(container) {
        container.innerHTML = '';
        container.classList.add('hidden');
    }

    function renderResults(results, container) {
        if (!results.length) {
            container.innerHTML = '<div class="search-result-item">Nenhum resultado encontrado.</div>';
            container.classList.remove('hidden');
            return;
        }

        container.innerHTML = results.map(product => {
            return `
                <div class="search-result-item" data-product-id="${product.id}" data-product-url="${product.url}">
                    <div class="search-result-title">${product.name}</div>
                    <div class="search-result-meta">${product.category} · ${formatPrice(product.price)}</div>
                </div>
            `;
        }).join('');
        container.classList.remove('hidden');
    }

    function findProducts(query) {
        const normalized = query.trim().toLowerCase();
        if (!normalized) return [];

        return window.ALL_PRODUCTS
            .filter(product => {
                return product.name.toLowerCase().includes(normalized)
                    || product.category.toLowerCase().includes(normalized);
            })
            .slice(0, 6);
    }

    function selectProduct(resultElement) {
        if (!resultElement) return;
        const id = resultElement.dataset.productId;
        const url = resultElement.dataset.productUrl;
        if (!id || !url) return;

        if (url.split('/').pop() === currentPage) {
            window.location.hash = id;
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            window.location.href = `${url}#${id}`;
        }
    }

    function initSearch() {
        const input = document.getElementById('searchInput');
        if (!input) return;
        const container = getSearchContainer(input);
        const searchBox = input.closest('.search-box');

        input.addEventListener('input', () => {
            const query = input.value;
            if (!query.trim()) {
                clearResults(container);
                return;
            }

            const results = findProducts(query);
            renderResults(results, container);
        });

        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const results = findProducts(input.value);
                if (results.length) {
                    selectProduct({ dataset: { productId: results[0].id, productUrl: results[0].url } });
                }
                clearResults(container);
            }
        });

        container.addEventListener('click', (event) => {
            const item = event.target.closest('.search-result-item');
            if (!item) return;
            selectProduct(item);
            clearResults(container);
        });

        document.addEventListener('click', (event) => {
            if (!searchBox.contains(event.target)) {
                clearResults(container);
            }
        });
    }

    window.abrirBuscaMobile = function () {
        const input = document.getElementById('searchInput');
        if (!input) return;

        const collapse = document.querySelector('.navbar-collapse');
        if (collapse && !collapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapse, { toggle: false });
            bsCollapse.show();
        }

        input.focus({ preventScroll: true });
    };

    window.scrollToProduct = function (id) {
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    document.addEventListener('DOMContentLoaded', initSearch);
})();
