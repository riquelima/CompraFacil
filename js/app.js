// Helper to handle navigation delay for animations
window.navigate = async function (url, skipAnimation = false) {
    if (!document.body) {
        window.location.href = url;
        return;
    }

    // SPA Router Logic
    const targetUrl = new URL(url, window.location.origin);

    // If external link, let it proceed
    if (targetUrl.origin !== window.location.origin) {
        window.location.href = url;
        return;
    }

    // SESSION PERSISTENCE CHECK (Fixed)
    // Runs on every navigation but strictly guarded
    if (!sessionStorage.getItem('app_session_initialized')) {
        // Default to FALSE (do NOT keep session) if not set.
        const keepSession = localStorage.getItem('keep_session_active') === 'true';
        const currentPath = targetUrl.pathname;
        const isPublicPage = currentPath.endsWith('index.html') || currentPath.endsWith('login.html') || currentPath === '/' || currentPath === '';

        // Mark as initialized so we don't loop
        sessionStorage.setItem('app_session_initialized', 'true');

        if (!keepSession && window.supabaseClient) {
            console.log('Session persistence is strict OFF. Checking session...');
            // Check if there is an active session
            const { data: { session } } = await window.supabaseClient.auth.getSession();

            if (session) {
                console.log('Active session found but persistence is OFF. Signing out...');
                await window.supabaseClient.auth.signOut();
                // If we are on internal page, go to index. Public pages are fine (we just logged out).
                if (!isPublicPage) {
                    window.location.href = 'index.html';
                    return;
                }
            }
        }
    }

    // Update History
    window.history.pushState({}, '', targetUrl);

    // Update Navbar State (Immediate visual feedback)
    updateNavbarState(targetUrl.pathname);

    // Fetch and Swap Content
    await loadPageContent(targetUrl.href);
}

// Handle Browser Back/Forward
window.addEventListener('popstate', () => {
    loadPageContent(window.location.href);
    updateNavbarState(window.location.pathname);
});

function updateNavbarState(pathname) {
    // Clean pathname (remove leading slash if needed or handle root)
    const path = pathname.split('/').pop() || 'index.html';

    // Define active states
    const navItems = {
        'listas': ['usuario.html', 'index.html', '', 'usuario', 'index'],
        'estoque': ['inventario.html', 'assistente.html', 'receita.html', 'inventario', 'assistente', 'receita'], // Assistant is part of Inventory flow
        'novalista': ['novalista.html', 'novalista']
    };

    // Logic to highlight correct icon
    const navButtons = document.querySelectorAll('.fixed.bottom-0 button');

    navButtons.forEach(btn => {
        const onclick = btn.getAttribute('onclick');
        if (!onclick) return;

        // FAB Button (always active/opaque)
        if (onclick.includes('novalista.html')) {
            setActive(btn, true);
            return;
        }

        if (onclick.includes('usuario.html') && navItems['listas'].some(p => path.includes(p))) {
            setActive(btn, true);
        } else if (onclick.includes('inventario.html') && navItems['estoque'].some(p => path.includes(p))) {
            setActive(btn, true);
        } else {
            setActive(btn, false);
        }
    });
}

function setActive(btn, isActive) {
    if (isActive) {
        btn.classList.remove('opacity-40');
        btn.classList.add('opacity-100');
    } else {
        btn.classList.remove('opacity-100');
        btn.classList.add('opacity-40');
    }
}

// Toast Notification Helper
window.showToast = function(message, type = 'error') {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl border-2 border-black shadow-neo font-bold text-sm transform transition-all duration-300 translate-y-[-150%]';
        document.body.appendChild(toast);
    }

    // Styles based on type
    if (type === 'error') {
        toast.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl border-2 border-black shadow-neo font-bold text-sm transform transition-all duration-300 translate-y-0 bg-red-400 text-black';
        toast.innerHTML = `<div class="flex items-center gap-2"><span class="material-symbols-outlined">error</span><span>${message}</span></div>`;
    } else {
        toast.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl border-2 border-black shadow-neo font-bold text-sm transform transition-all duration-300 translate-y-0 bg-green-400 text-black';
        toast.innerHTML = `<div class="flex items-center gap-2"><span class="material-symbols-outlined">check_circle</span><span>${message}</span></div>`;
    }

    // Hide after 3s
    setTimeout(() => {
        toast.classList.add('translate-y-[-150%]');
    }, 3000);
}

async function loadPageContent(url) {
    const mainContent = document.getElementById('main-content');
    const appHeader = document.getElementById('app-header');
    
    // Fallback: If current page has no main-content (e.g. legacy structure), reload full page
    if (!mainContent) {
        console.warn('No #main-content found in current DOM, forcing reload.');
        window.location.href = url;
        return;
    }

    // Ensure global loader exists and is correctly positioned
    let globalLoader = document.getElementById('global-loading');
    
    // Cleanup any duplicate loaders that might have slipped in
    const allLoaders = document.querySelectorAll('#global-loading');
    if (allLoaders.length > 1) {
        // Keep the last one or remove all and recreate
        allLoaders.forEach(l => l.remove());
        globalLoader = null;
    }

    if (!globalLoader) {
        globalLoader = document.createElement('div');
        globalLoader.id = 'global-loading';
        // Use z-40 to sit above content (z-10) but below header (z-50)
        globalLoader.className = 'absolute inset-0 bg-white/80 dark:bg-black/50 z-40 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300';
        globalLoader.innerHTML = '<div class="size-12 rounded-full border-4 border-nb-black border-t-transparent animate-spin"></div>';
    }

    // Always try to put loader in main-content to respect layout boundaries
    // If main-content is missing (legacy), fallback to body but try to avoid covering header
    if (mainContent && mainContent.style.position !== 'relative' && mainContent.style.position !== 'absolute' && mainContent.style.position !== 'fixed') {
        mainContent.classList.add('relative');
    }

    if (mainContent) {
        if (globalLoader.parentElement !== mainContent) {
            mainContent.appendChild(globalLoader);
        }
        globalLoader.classList.remove('fixed', 'z-[100]');
        globalLoader.classList.add('absolute', 'z-40');
    } else {
        // Fallback for pages without main-content (should be rare if refactored)
        if (globalLoader.parentElement !== document.body) {
            document.body.appendChild(globalLoader);
        }
        globalLoader.classList.remove('absolute', 'z-40');
        globalLoader.classList.add('fixed', 'z-[100]');
    }

    // Show Loader
    globalLoader.classList.remove('hidden');

    // Animation Out (Only Main Content)
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(-10px)';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        const text = await response.text();

        // Parse HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        
        // Target new content
        const newMain = doc.getElementById('main-content'); // New ID
        const newHeader = doc.getElementById('app-header'); // New ID

        // Fallback for pages not yet refactored (e.g. they use #app-content)
        const legacyContent = doc.getElementById('app-content');

        if (!newMain && !legacyContent) {
            console.error('No #main-content found in target page, forcing reload.');
            window.location.href = url; 
            return;
        }

        // Wait for animation
        setTimeout(() => {
            // Update Header (if exists in new page)
            if (newHeader && appHeader) {
                appHeader.innerHTML = newHeader.innerHTML;
                appHeader.className = newHeader.className; // Update classes in case of specific styling
            }

            // Update Main Content
            if (newMain) {
                mainContent.innerHTML = newMain.innerHTML;
                mainContent.className = newMain.className;
            } else if (legacyContent) {
                // Temporary adapter for pages not yet refactored
                mainContent.innerHTML = legacyContent.innerHTML;
            }

            // Restore Styles - Clear transform to avoid stacking context issues
            mainContent.style.opacity = '';
            mainContent.style.transform = '';
            
            // Hide Loader
            globalLoader.classList.add('hidden');

            // Initialize Logic based on URL
            const path = new URL(url).pathname.split('/').pop();
            initPageLogic(path, new URL(url).searchParams);

        }, 300);

    } catch (err) {
        console.error('Navigation error:', err);
        showToast('Erro ao carregar página. Tente recarregar.', 'error');
        globalLoader.classList.add('hidden');
    }
}

function initPageLogic(path, searchParams, attempt = 0) {
    console.log('Initializing page logic for:', path); // DEBUG

    // Wait for Supabase to be ready if needed
    if (!window.supabaseClient && !path.includes('login')) {
        if (attempt > 50) { // 5 seconds max
            console.error('Supabase initialization timeout. Force reloading...');
            window.location.reload();
            return;
        }
        console.warn(`Supabase client not ready, waiting... (${attempt})`);
        setTimeout(() => initPageLogic(path, searchParams, attempt + 1), 100);
        return;
    }

    // Route matching - Updated to handle Vercel clean URLs (no .html)
    if (path.includes('usuario') || path === '' || path.includes('index')) {
        // Double check if we are actually on the home page structure
        if (document.getElementById('listsGrid') || document.getElementById('loadingState')) {
            initHome();
        } else {
            console.log('Path matches Home but DOM missing, possibly redirecting or wrong match');
        }
    } else if (path.includes('lista') && !path.includes('novalista') && !path.includes('lista.html')) {
        // Clean URL 'lista' or 'lista?id=...'
        initListDetail(searchParams.get('id'));
    } else if (path.includes('lista.html')) {
        initListDetail(searchParams.get('id'));
    } else if (path.includes('inventario')) {
        initInventory();
    } else if (path.includes('novalista')) {
        initNewList();
    } else if (path.includes('configuracoes')) {
        initSettings();
    } else if (path.includes('assistente')) {
        initAssistant();
    } else if (path.includes('receita')) {
        initRecipe(searchParams.get('id'));
    }
}


// --- Global Data ---
const recipes = {
    "torrada": {
        title: "Torrada<br/>Abacate",
        category: "Café",
        time: "15 Min",
        calories: "320 Kcal",
        protein: "12g",
        difficulty: "Fácil",
        icon: "bakery_dining",
        color: "bg-accent-yellow",
        ingredients: ["2 Fatias de Pão", "1 Abacate Maduro", "1 Ovo (Opcional)", "Sal e Pimenta"],
        steps: [
            { title: "Tostar", desc: "Coloque as fatias de pão na torradeira ou frigideira até dourarem." },
            { title: "Amassar", desc: "Em uma tigela, amasse o abacate com um garfo até obter uma pasta rústica." },
            { title: "Temperar", desc: "Adicione sal, pimenta e um fio de azeite. Misture bem." },
            { title: "Montar", desc: "Espalhe a pasta sobre as torradas e sirva imediatamente." }
        ]
    },
    "salmao": {
        title: "Salmão<br/>Grelhado",
        category: "Almoço",
        time: "25 Min",
        calories: "450 Kcal",
        protein: "35g",
        difficulty: "Médio",
        icon: "set_meal",
        color: "bg-accent-blue",
        ingredients: ["1 Filé de Salmão", "Limão Siciliano", "Alecrim Fresco", "Azeite de Oliva", "Sal Grosso"],
        steps: [
            { title: "Temperar", desc: "Tempere o salmão com sal, pimenta e suco de limão." },
            { title: "Aquecer", desc: "Aqueça uma frigideira com um fio de azeite em fogo médio-alto." },
            { title: "Grelhar", desc: "Coloque o salmão com a pele para baixo e deixe por 5 minutos." },
            { title: "Finalizar", desc: "Vire e cozinhe por mais 3-4 minutos até dourar." }
        ]
    },
    "risoto": {
        title: "Risoto<br/>Cogumelo",
        category: "Jantar",
        time: "40 Min",
        calories: "580 Kcal",
        protein: "18g",
        difficulty: "Difícil",
        icon: "ramen_dining",
        color: "bg-accent-orange",
        ingredients: ["Arroz Arbóreo", "Mix de Cogumelos", "Caldo de Legumes", "Vinho Branco", "Queijo Parmesão"],
        steps: [
            { title: "Refogar", desc: "Refogue a cebola e o alho na manteiga até ficarem translúcidos." },
            { title: "Tostar Arroz", desc: "Adicione o arroz e o vinho, mexendo até evaporar o álcool." },
            { title: "Cozinhar", desc: "Adicione o caldo quente aos poucos, mexendo sempre." },
            { title: "Finalizar", desc: "Desligue o fogo e misture o queijo e os cogumelos salteados." }
        ]
    },
    "smoothie": {
        title: "Smoothie<br/>Tropical",
        category: "Lanche",
        time: "05 Min",
        calories: "180 Kcal",
        protein: "5g",
        difficulty: "Fácil",
        icon: "blender",
        color: "bg-accent-pink",
        ingredients: ["1 Banana Congelada", "1 xícara de Manga", "200ml Leite de Coco", "Mel a gosto"],
        steps: [
            { title: "Preparar", desc: "Descasque e corte as frutas em pedaços menores." },
            { title: "Bater", desc: "Coloque todos os ingredientes no liquidificador." },
            { title: "Servir", desc: "Bata até ficar cremoso e sirva em um copo alto." }
        ]
    }
};


// --- Page Logic Functions ---

// Helper to render icon with standardized style and fallback
function renderIcon(iconValue, containerClasses = "flex items-center justify-center size-12 rounded-lg bg-nb-white border-2 border-nb-black text-nb-black shadow-sm") {
    // Standardize "shopping_cart" to the specific image URL
    if (!iconValue || iconValue === 'shopping_cart') {
        iconValue = "https://cdn-icons-png.flaticon.com/512/2203/2203183.png";
    }

    // Check if icon is a URL (image)
    if (iconValue && (iconValue.startsWith('http') || iconValue.startsWith('/'))) {
        return `
            <div class="${containerClasses}">
                <img src="${iconValue}" class="size-8 object-contain" alt="List Icon" 
                     onerror="this.onerror=null; this.parentElement.innerHTML='<span class=\'material-symbols-outlined text-[28px]\'>shopping_cart</span>'">
            </div>
        `;
    } 
    // Fallback or specific text icon
    else {
        return `
            <div class="${containerClasses}">
                <span class="material-symbols-outlined text-[28px]">${iconValue}</span>
            </div>
        `;
    }
}

// 1. HOME (usuario.html)
window.initHome = async function () {
    console.log('initHome called'); // DEBUG
    const loadingState = document.getElementById('loadingState');
    const mainContent = document.getElementById('mainContent');
    const listsGrid = document.getElementById('listsGrid');
    const userNameEl = document.getElementById('userName');
    const userAvatarEl = document.getElementById('userAvatar');
    const newListCard = listsGrid ? listsGrid.lastElementChild : null;

    // Show loading state initially
    if (loadingState) loadingState.classList.remove('hidden');
    if (mainContent) mainContent.classList.add('hidden');

    // Safety check but allows logic to proceed if elements are missing to clear loading
    if (!listsGrid && !loadingState) {
        console.warn('Elements missing for Home, likely redirected.');
        return;
    }

    // Safety timeout to force UI state if Supabase hangs
    const safetyTimeout = setTimeout(() => {
        console.warn('initHome safety timeout reached. Forcing UI.');
        if (loadingState) {
            loadingState.classList.add('hidden');
            loadingState.style.display = 'none';
        }
        if (mainContent) {
            mainContent.classList.remove('hidden');
            mainContent.classList.add('flex');
            mainContent.style.display = 'flex';
        }
    }, 5000);

    try {
        console.log('Checking session...'); // DEBUG
        const { data: { session }, error: authError } = await window.supabaseClient.auth.getSession();

        if (authError || !session) {
            console.log('No session, redirecting to login'); // DEBUG
            window.location.href = 'login.html';
            return;
        }

        console.log('Session found for:', session.user.email); // DEBUG

        const userMeta = session.user.user_metadata;
        if (userNameEl) {
            if (userMeta && userMeta.full_name) {
                userNameEl.textContent = userMeta.full_name.split(' ')[0];
            } else {
                userNameEl.textContent = session.user.email.split('@')[0];
            }
        }

        if (userAvatarEl && userMeta && userMeta.avatar_url) {
            userAvatarEl.style.backgroundImage = `url("${userMeta.avatar_url}")`;
            userAvatarEl.innerHTML = '';
        }

        if (listsGrid) {
            console.log('Fetching lists...'); // DEBUG
            const { data: lists, error: listsError } = await window.supabaseClient
                .from('shopping_lists')
                .select('*')
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false });

            if (listsError) throw listsError;

            console.log('Lists fetched:', lists ? lists.length : 0); // DEBUG

            // Identify the static "Create New" card first.
            // Use a more robust selector or fallback
            let staticAddCard = Array.from(listsGrid.children).find(c => c.innerHTML.includes('novalista.html'));

            // Re-create static card if missing (fallback)
            if (!staticAddCard) {
                const div = document.createElement('div');
                div.onclick = () => navigate('novalista.html');
                div.className = "group flex flex-col items-center justify-center h-56 rounded-nb border-2 border-dashed border-nb-black bg-white p-4 hover:bg-nb-green transition-all duration-200 cursor-pointer shadow-hard-sm hover:shadow-hard hover:border-solid";
                div.innerHTML = `
                    <div class="flex items-center justify-center size-16 rounded-full bg-nb-black text-white mb-4 group-hover:scale-110 transition-transform duration-200 border-2 border-transparent group-hover:border-black group-hover:bg-white group-hover:text-black">
                        <span class="material-symbols-outlined text-[32px]">add</span>
                    </div>
                    <h4 class="text-nb-black text-base font-black text-center uppercase">NOVA LISTA</h4>
                 `;
                staticAddCard = div;
            }

            listsGrid.innerHTML = ''; // Clear all
            if (staticAddCard) listsGrid.appendChild(staticAddCard); // Add back static card

            if (lists && lists.length > 0) {
                lists.forEach(list => {
                    // ... (existing list rendering logic) ...
                    const wrapper = document.createElement('div');
                    wrapper.className = "relative w-full h-56 rounded-nb mb-0 select-none overflow-hidden group/wrapper";

                    const bg = document.createElement('div');
                    bg.className = "absolute inset-0 bg-red-500 flex items-center justify-end px-8 rounded-nb z-0";
                    bg.innerHTML = `<span class="material-symbols-outlined text-white text-4xl font-bold">delete</span>`;

                    const card = document.createElement('div');
                    const total = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(list.total_amount || 0);

                    const colorMap = {
                        'nb-yellow': 'bg-nb-yellow',
                        'nb-purple': 'bg-nb-purple',
                        'nb-pink': 'bg-nb-pink',
                        'nb-blue': 'bg-nb-blue',
                        'nb-green': 'bg-nb-green',
                        'nb-orange': 'bg-nb-orange',
                        'nb-red': 'bg-nb-red',
                        'nb-gray': 'bg-nb-gray'
                    };
                    const bgClass = colorMap[list.color] || 'bg-white';

                    card.className = `relative z-10 w-full h-full flex flex-col justify-between rounded-nb ${bgClass} border-2 border-nb-black p-4 shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] transition-transform duration-200 cursor-pointer`;

                    let startX = 0, currentX = 0, isSwiping = false;

                    card.addEventListener('touchstart', (e) => {
                        startX = e.touches[0].clientX;
                        currentX = startX;
                        card.style.transition = 'none';
                        isSwiping = false;
                    });

                    card.addEventListener('touchmove', (e) => {
                        currentX = e.touches[0].clientX;
                        const diff = currentX - startX;
                        if (diff < 0) {
                            card.style.transform = `translateX(${diff}px)`;
                            isSwiping = true;
                            if (Math.abs(diff) > 10) e.preventDefault();
                        }
                    });

                    card.addEventListener('touchend', (e) => {
                        card.style.transition = 'transform 0.3s ease-out';
                        const diff = currentX - startX;
                        if (diff < -120) {
                            card.style.transform = `translateX(-100%)`;
                            setTimeout(() => deleteList(list.id), 300);
                        } else {
                            card.style.transform = `translateX(0)`;
                            if (Math.abs(diff) < 10 && !isSwiping) {
                                navigate(`lista.html?id=${list.id}`);
                            }
                        }
                    });

                    card.onclick = (e) => {
                        if (e.pointerType === 'mouse') navigate(`lista.html?id=${list.id}`);
                    };

                    const iconContent = renderIcon(list.icon);

                    card.innerHTML = `
                        <div class="flex justify-between items-start pointer-events-none">
                            ${iconContent}
                        </div>
                        <div class="flex flex-col gap-1 mt-3 pointer-events-none">
                            <h4 class="text-nb-black text-lg font-extrabold leading-tight line-clamp-2 uppercase">${list.title}</h4>
                            <p class="text-nb-black font-semibold text-xs opacity-80">${list.item_count || 0} itens</p>
                        </div>
                        <div class="pt-3 border-t-2 border-nb-black mt-auto flex justify-between items-center bg-white/30 -mx-4 -mb-4 p-4 rounded-b-[10px] pointer-events-none">
                            <span class="text-xs font-bold uppercase">Total</span>
                            <p class="text-nb-black text-xl font-black">${total}</p>
                        </div>
                    `;

                    wrapper.appendChild(bg);
                    wrapper.appendChild(card);
                    // Insert before the static add card
                    if (staticAddCard) {
                        listsGrid.insertBefore(wrapper, staticAddCard);
                    } else {
                        listsGrid.appendChild(wrapper);
                    }
                });
            }
        }

    } catch (err) {
        console.error('Error loading home:', err);
    } finally {
        console.log('initHome finally block executed. Removing loading state.');
        // ALWAYS remove loading state, even if errors occur
        if (loadingState) {
            loadingState.classList.add('hidden');
            loadingState.style.display = 'none'; // Force hide
        }
        if (mainContent) {
            mainContent.classList.remove('hidden');
            mainContent.classList.add('flex');
            mainContent.style.display = 'flex'; // Force show
        }
    }
}

async function deleteList(id) {
    if (!confirm("Tem certeza que deseja excluir esta lista?")) {
        if (!window.location.href.includes('lista.html')) {
             initHome();
        }
        return;
    }
    const { error } = await window.supabaseClient.from('shopping_lists').delete().eq('id', id);
    if (!error) initHome();
}


// 2. LIST DETAIL (lista.html)
window.initListDetail = async function (listId) {
    const listContentEl = document.getElementById('listContent');
    const loadingEl = document.getElementById('loading');

    // Show loading initially
    if (loadingEl) loadingEl.classList.remove('hidden');
    if (listContentEl) listContentEl.classList.add('hidden');

    // IMPROVED ERROR HANDLING
    if (!listId) {
        loadingEl.classList.add('hidden');
        if (listContentEl) {
            listContentEl.classList.remove('hidden');
            listContentEl.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full gap-4 opacity-50">
                    <span class="material-symbols-outlined text-6xl">error</span>
                    <p class="font-bold text-center">Lista não encontrada.</p>
                    <button onclick="navigate('usuario.html')" class="px-4 py-2 bg-black text-white rounded-lg font-bold">Voltar</button>
                </div>`;
        }
        return;
    }

    const listTitleEl = document.getElementById('listTitle');
    const btnDelete = document.getElementById('btnDeleteList');
    if (btnDelete) {
        btnDelete.onclick = () => deleteList(listId);
    }

    const totalAmountEl = document.getElementById('totalAmount');
    const itemsCountEl = document.getElementById('itemsCount');
    const addItemForm = document.getElementById('addItemForm');
    const newItemInput = document.getElementById('newItemInput');

    let currentUserId = null;

    const { data: { session } } = await window.supabaseClient.auth.getSession();
    if (!session) { navigate('login.html'); return; }
    currentUserId = session.user.id;

    const { data, error } = await window.supabaseClient.from('shopping_lists').select('*').eq('id', listId).single();
    if (error || !data) {
        listTitleEl.innerText = "Erro";
        loadingEl.classList.add('hidden');
        listContentEl.classList.remove('hidden');
        listContentEl.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full gap-4 opacity-50">
                <span class="material-symbols-outlined text-6xl">broken_image</span>
                <p class="font-bold text-center">Lista inexistente ou excluída.</p>
                <button onclick="navigate('usuario.html')" class="px-4 py-2 bg-black text-white rounded-lg font-bold">Voltar</button>
            </div>`;
        return;
    } else {
        listTitleEl.innerText = data.title;
    }

    await fetchListItems();

    loadingEl.classList.add('hidden');
    listContentEl.classList.remove('hidden');

    async function fetchListItems() {
        const { data: items, error } = await window.supabaseClient.from('list_items').select('*').eq('list_id', listId).order('name', { ascending: true });
        if (!error) {
            renderItems(items);
            await calculateTotals(items);
        }
    }

    function renderItems(items) {
        listContentEl.innerHTML = '';
        const pending = items.filter(i => !i.is_checked);
        const completed = items.filter(i => i.is_checked);

        if (pending.length === 0 && completed.length === 0) {
            listContentEl.innerHTML = `<div class="flex flex-col items-center justify-center gap-4 mt-20 opacity-50"><span class="material-symbols-outlined text-6xl">shopping_basket</span><p class="font-bold text-center">Lista vazia.</p></div>`;
            return;
        }

        if (pending.length > 0) {
            const label = document.createElement('div');
            label.className = "flex items-center gap-2 mb-2";
            label.innerHTML = `<div class="h-8 px-3 bg-yellow-300 border-2 border-black rounded-md flex items-center shadow-neo-sm"><span class="text-xs font-bold uppercase tracking-wider text-black">A fazer</span></div>`;
            listContentEl.appendChild(label);
            pending.forEach(i => listContentEl.appendChild(createItemElement(i)));
        }

        if (completed.length > 0) {
            const label = document.createElement('div');
            label.className = "flex items-center gap-2 mt-6 mb-2";
            label.innerHTML = `<div class="h-8 px-3 bg-green-300 border-2 border-black rounded-md flex items-center shadow-neo-sm"><span class="text-xs font-bold uppercase tracking-wider text-black">Concluídos</span></div>`;
            listContentEl.appendChild(label);
            completed.forEach(i => listContentEl.appendChild(createItemElement(i)));
        }
    }

    function createItemElement(item) {
        const isChecked = item.is_checked;
        const wrapper = document.createElement('div');
        wrapper.className = "relative w-full mb-4 rounded-xl overflow-hidden select-none";

        const bg = document.createElement('div');
        bg.className = "absolute inset-y-0 right-0 w-full bg-red-500 flex items-center justify-end px-6 rounded-xl -z-0";
        bg.innerHTML = `<span class="material-symbols-outlined text-white text-3xl font-bold">delete</span>`;

        const div = document.createElement('div');
        div.className = isChecked ?
            "relative z-10 w-full flex items-center gap-4 bg-slate-100 dark:bg-card-dark/40 p-4 rounded-xl border-2 border-slate-400 dark:border-white/10 transition-transform duration-200 ease-out" :
            "relative z-10 w-full flex items-center gap-4 bg-white dark:bg-card-dark p-4 rounded-xl shadow-neo border-2 border-black transition-transform duration-200 ease-out";

        let startX = 0, currentX = 0;
        div.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; currentX = startX; div.style.transition = 'none'; });
        div.addEventListener('touchmove', (e) => { currentX = e.touches[0].clientX; if (currentX - startX < 0) div.style.transform = `translateX(${currentX - startX}px)`; });
        div.addEventListener('touchend', (e) => {
            div.style.transition = 'transform 0.3s ease-out';
            if (currentX - startX < -120) {
                div.style.transform = `translateX(-100%)`;
                setTimeout(() => deleteItem(item.id), 300);
            } else {
                div.style.transform = `translateX(0)`;
            }
        });

        div.innerHTML = `
            <input class="neo-checkbox shrink-0 ${isChecked ? 'grayscale opacity-60' : ''}" type="checkbox" ${isChecked ? 'checked' : ''} />
            <div class="flex-1 min-w-0 flex flex-col"><p class="text-slate-900 dark:text-white text-lg font-bold truncate leading-tight ${isChecked ? 'line-through decoration-2 decoration-slate-400 text-slate-500' : ''}">${item.name}</p></div>
            <div class="shrink-0 px-3 py-1.5 rounded-lg border-2 border-transparent hover:border-black transition-all cursor-pointer ${isChecked ? 'opacity-60' : 'bg-white'}" onclick="event.stopPropagation(); window.promptPrice('${item.id}', ${item.price})">
                <p class="text-sm font-bold ${isChecked ? 'text-slate-500 line-through decoration-2' : 'text-primary-dark'}">${item.price ? `R$ ${new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(item.price)}` : 'R$ --,--'}</p>
            </div>
        `;

        const checkbox = div.querySelector('input[type="checkbox"]');
        checkbox.onchange = () => toggleItem(item.id, checkbox.checked);

        wrapper.appendChild(bg);
        wrapper.appendChild(div);
        return wrapper;
    }

    async function toggleItem(id, status) {
        const { error } = await window.supabaseClient.from('list_items').update({ is_checked: status }).eq('id', id);
        if (!error) {
            if (status) await addToInventory(id);
            else await removeFromInventory(id);
            await fetchListItems();
        }
    }

    async function deleteItem(id) {
        await window.supabaseClient.from('list_items').delete().eq('id', id);
        await fetchListItems();
    }

    async function addToInventory(itemId) {
        const { data: item } = await window.supabaseClient.from('list_items').select('*').eq('id', itemId).single();
        if (!item) return;
        const { data: invItem } = await window.supabaseClient.from('inventory_items').select('*').eq('user_id', currentUserId).ilike('name', item.name).maybeSingle();
        const qty = item.quantity || 1;
        if (invItem) {
            await window.supabaseClient.from('inventory_items').update({ quantity: (invItem.quantity || 0) + qty }).eq('id', invItem.id);
        } else {
            await window.supabaseClient.from('inventory_items').insert({ user_id: currentUserId, name: item.name, category: item.category || 'Outros', quantity: qty, unit: 'unid.', added_date: new Date().toISOString() });
        }
    }

    async function removeFromInventory(itemId) {
        const { data: item } = await window.supabaseClient.from('list_items').select('*').eq('id', itemId).single();
        if (!item) return;
        const { data: invItem } = await window.supabaseClient.from('inventory_items').select('*').eq('user_id', currentUserId).ilike('name', item.name).maybeSingle();
        if (!invItem) return;
        const newQty = (invItem.quantity || 0) - (item.quantity || 1);
        if (newQty <= 0) await window.supabaseClient.from('inventory_items').delete().eq('id', invItem.id);
        else await window.supabaseClient.from('inventory_items').update({ quantity: newQty }).eq('id', invItem.id);
    }

    async function calculateTotals(items) {
        let total = 0, count = 0, checked = 0;
        items.forEach(i => { count++; if (i.is_checked) checked++; if (i.price) total += Number(i.price); });
        itemsCountEl.innerText = `${checked} de ${count}`;
        totalAmountEl.innerText = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(total);
        await window.supabaseClient.from('shopping_lists').update({ item_count: count, total_amount: total }).eq('id', listId);
    }

    addItemForm.onsubmit = async (e) => {
        e.preventDefault();
        const name = newItemInput.value.trim();
        if (!name) return;
        newItemInput.disabled = true;
        await window.supabaseClient.from('list_items').insert({ list_id: listId, user_id: currentUserId, name: name, is_checked: false });
        newItemInput.disabled = false;
        newItemInput.value = '';
        newItemInput.focus();
        await fetchListItems();
    };

    window.promptPrice = async (id, current) => {
        const p = prompt("Editar preço:", current || "");
        if (p !== null) {
            const val = parseFloat(p.replace(',', '.'));
            if (!isNaN(val)) {
                await window.supabaseClient.from('list_items').update({ price: val }).eq('id', id);
                await fetchListItems();
            }
        }
    }
}


// 3. INVENTORY (inventario.html)
window.initInventory = async function () {
    const itemsListEl = document.getElementById('itemsList');
    const loadingEl = document.getElementById('loading');
    const totalCountEl = document.getElementById('totalCount');
    const searchInput = document.getElementById('searchInput');
    const filterContainer = document.getElementById('filterContainer');

    // Show loading initially
    if (loadingEl) loadingEl.classList.remove('hidden');

    let allItems = [];
    let currentFilter = 'all';
    let currentUserId = null;

    const { data: { session } } = await window.supabaseClient.auth.getSession();
    if (!session) { navigate('login.html'); return; }
    currentUserId = session.user.id;

    await fetchInventory();

    searchInput.addEventListener('input', (e) => renderItems(e.target.value));

    if (filterContainer) {
        filterContainer.onclick = (e) => {
            if (e.target.classList.contains('filter-btn')) {
                currentFilter = e.target.dataset.cat;
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                renderItems(searchInput.value);
            }
        }
    }

    async function fetchInventory() {
        loadingEl.classList.remove('hidden');
        itemsListEl.innerHTML = '';
        const { data, error } = await window.supabaseClient.from('inventory_items').select('*').order('name', { ascending: true });
        loadingEl.classList.add('hidden');
        if (!error) {
            allItems = data || [];
            renderItems();
        }
    }

    function renderItems(term = '') {
        itemsListEl.innerHTML = '';
        const t = term.toLowerCase();
        const filtered = allItems.filter(i =>
            i.name.toLowerCase().includes(t) && (currentFilter === 'all' || i.category === currentFilter)
        );
        totalCountEl.innerText = allItems.length;

        if (filtered.length === 0) {
            itemsListEl.innerHTML = `<div class="p-8 text-center opacity-50"><p>Nenhum item.</p></div>`;
            return;
        }

        filtered.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.className = "relative w-full mb-4 rounded-xl overflow-hidden select-none";

            const bg = document.createElement('div');
            bg.className = "absolute inset-y-0 right-0 w-full bg-red-500 flex items-center justify-end px-6 rounded-xl -z-0";
            bg.innerHTML = `<span class="material-symbols-outlined text-white text-3xl font-bold">delete</span>`;

            const div = document.createElement('div');
            div.className = "relative z-10 w-full bg-white dark:bg-card-dark p-4 rounded-xl border-2 border-black shadow-neo flex items-center justify-between transition-transform duration-200 ease-out";

            let startX = 0, currentX = 0;
            div.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; currentX = startX; div.style.transition = 'none'; });
            div.addEventListener('touchmove', (e) => { currentX = e.touches[0].clientX; if (currentX - startX < 0) div.style.transform = `translateX(${currentX - startX}px)`; });
            div.addEventListener('touchend', (e) => {
                div.style.transition = 'transform 0.3s ease-out';
                if (currentX - startX < -120) {
                    div.style.transform = `translateX(-100%)`;
                    setTimeout(async () => {
                        if (confirm("Excluir item?")) {
                            await window.supabaseClient.from('inventory_items').delete().eq('id', item.id);
                            fetchInventory();
                        } else {
                            fetchInventory(); // reset
                        }
                    }, 300);
                } else {
                    div.style.transform = `translateX(0)`;
                }
            });

            let icon = 'inventory_2';
            let color = 'bg-gray-200';
            if (item.category === 'Comida') { icon = 'bakery_dining'; color = 'bg-yellow-300'; }
            else if (item.category === 'Limpeza') { icon = 'cleaning_services'; color = 'bg-blue-300'; }
            else if (item.category === 'Higiene') { icon = 'soap'; color = 'bg-green-300'; }

            div.innerHTML = `
                <div class="flex items-center gap-4 z-10 relative flex-1 min-w-0">
                    <div class="size-14 ${color} rounded-lg border-2 border-black flex items-center justify-center shrink-0 shadow-sm">
                        <span class="material-symbols-outlined text-2xl text-black">${icon}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-extrabold text-lg leading-tight text-slate-900 dark:text-white truncate">${item.name}</h3>
                        <div class="flex items-center gap-2 mt-1 flex-wrap">
                            <span class="bg-white/50 border border-black px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">${item.category || 'Geral'}</span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-end pl-4 border-l-2 border-dashed border-slate-200 dark:border-slate-700 ml-2" ontouchstart="event.stopPropagation()">
                    <div class="flex items-center gap-2">
                        <button onclick="window.updateInvQty('${item.id}', ${item.quantity - 1})" class="size-6 bg-slate-200 rounded border border-black flex items-center justify-center hover:bg-slate-300 font-bold">-</button>
                        <span class="text-xl font-black w-6 text-center">${item.quantity}</span>
                        <button onclick="window.updateInvQty('${item.id}', ${item.quantity + 1})" class="size-6 bg-slate-200 rounded border border-black flex items-center justify-center hover:bg-slate-300 font-bold">+</button>
                    </div>
                    <span class="text-[10px] font-bold text-slate-500 uppercase mt-1">${item.unit || 'unid.'}</span>
                </div>
            `;
            wrapper.appendChild(bg);
            wrapper.appendChild(div);
            itemsListEl.appendChild(wrapper);
        });
    }

    window.updateInvQty = async (id, newQty) => {
        if (newQty < 0) return;
        if (newQty === 0) {
            if (!confirm("Remover item?")) return;
            await window.supabaseClient.from('inventory_items').delete().eq('id', id);
        } else {
            await window.supabaseClient.from('inventory_items').update({ quantity: newQty }).eq('id', id);
        }
        fetchInventory();
    }

    window.handleAddItem = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newItem = {
            user_id: currentUserId,
            name: formData.get('name'),
            quantity: formData.get('quantity'),
            unit: formData.get('unit'),
            category: formData.get('category'),
            added_date: formData.get('added_date')
        };
        await window.supabaseClient.from('inventory_items').insert([newItem]);
        document.getElementById('addItemModal').classList.add('hidden');
        fetchInventory();
    }
}

window.openAddModal = function () {
    const m = document.getElementById('addItemModal');
    if (m) {
        m.classList.remove('hidden');
        m.querySelector('input[name="added_date"]').value = new Date().toISOString().split('T')[0];
    }
}
window.closeAddModal = function () {
    const m = document.getElementById('addItemModal');
    if (m) m.classList.add('hidden');
}


// 4. NEW LIST (novalista.html)
window.initNewList = function () {
    const form = document.getElementById('createListForm');
    if (!form) return;

    form.onsubmit = async (e) => {
        e.preventDefault();
        const btn = document.getElementById('createBtn');
        btn.querySelector('span').innerText = 'Criando...';

        try {
            const formData = new FormData(e.target);
            const { data: { user } } = await window.supabaseClient.auth.getUser();
            if (!user) { navigate('login.html'); return; }

            const newList = {
                title: formData.get('title'),
                icon: formData.get('icon'),
                color: formData.get('color'),
                user_id: user.id,
                status: 'pending',
                total_amount: 0,
                item_count: 0
            };

            const { error } = await window.supabaseClient.from('shopping_lists').insert([newList]);
            if (error) throw error;
            navigate('usuario.html');

        } catch (err) {
            alert('Erro: ' + err.message);
            btn.querySelector('span').innerText = 'Criar Lista';
        }
    }
}

// 5. SETTINGS (configuracoes.html)
window.initSettings = async function () {
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    if (!session) {
        navigate('login.html');
        return;
    }

    console.log('User metadata:', session.user.user_metadata); // DEBUG

    // Initial Fallback using session data
    const sessionName = session.user.user_metadata.full_name || session.user.email.split('@')[0];
    const sessionEmail = session.user.email;
    const sessionAvatar = session.user.user_metadata.avatar_url;

    const nameEl = document.querySelector('h2.text-xl.font-black');
    if (nameEl) nameEl.innerText = sessionName;

    const emailEl = document.querySelector('p.text-sm.font-bold.opacity-60');
    if (emailEl) emailEl.innerText = sessionEmail;

    const avatarEl = document.querySelector('[data-alt="User profile picture"]');
    if (avatarEl && sessionAvatar) avatarEl.style.backgroundImage = `url("${sessionAvatar}")`;


    // Fetch Profile from DB (if exists)
    const { data: profile, error } = await window.supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

    if (profile && !error) {
        const displayName = profile.full_name || sessionName;
        const displayEmail = sessionEmail; // Usually email comes from auth, not profile
        const avatar = profile.avatar_url || sessionAvatar;

        // Update UI again if DB has better data
        if (nameEl) nameEl.innerText = displayName;
        if (avatarEl && avatar) avatarEl.style.backgroundImage = `url("${avatar}")`;
    }

    // Bind Logout Logic Programmatically
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        console.log('Binding logout button event');
        logoutBtn.onclick = handleLogout;
    } else {
        console.error('Logout button not found in DOM');
    }

    // Bind "Keep Session" Toggle
    const sessionToggle = document.getElementById('keep-session-toggle');
    if (sessionToggle) {
        // Init state
        // Init state (Default to false if null)
        sessionToggle.checked = localStorage.getItem('keep_session_active') === 'true';

        // Change listener
        sessionToggle.addEventListener('change', (e) => {
            localStorage.setItem('keep_session_active', e.target.checked);
            console.log('Keep Session Active set to:', e.target.checked);
        });
    }
}

window.handleLogout = async function () {
    if (confirm("Tem certeza que deseja sair?")) {
        try {
            console.log('Logging out...');
            // Attempt to clear Supabase local storage token explicitly if known
            // Note: The key depends on the project ID.

            const { error } = await window.supabaseClient.auth.signOut();
            // Explicitly clear checking flag
            sessionStorage.removeItem('app_session_initialized');
            if (error) {
                console.error('Logout error:', error);
            }
        } catch (err) {
            console.error('Logout exception:', err);
        } finally {
            // Always redirect to index.html
            console.log('Redirecting to index.html');
            window.location.href = 'index.html';
        }
    }
}

// 6. ASSISTANT (assistente.html)
window.initAssistant = async function () {
    window.currentCategory = 'Tudo';
    window.showingFavorites = false;

    // Bind search logic explicitly to ensure it works in SPA mode
    const searchInput = document.getElementById('aiSearchInput');
    if (searchInput) {
        // Remove existing listeners to be safe (though DOM replacement usually handles this)
        const newInp = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(newInp, searchInput);

        newInp.addEventListener('keypress', function (e) {
            console.log('Key pressed:', e.key); // Debug
            if (e.key === 'Enter') {
                const query = e.target.value;
                console.log('Enter detected. Query:', query); // Debug
                if (query.trim()) {
                    generateRecipe(query);
                }
            }
        });

        // Keep focus if needed, though replaceChild might lose it
        newInp.focus();
    }
}

// Window scoped handler as fallback is not strictly needed if we bind in initAssistant, 
// but we keep the logic centralized.
// Removed window.handleSearch to rely on the explicit binding above which is more robust for SPAs.

window.toggleFavoritesFilter = function () {
    window.showingFavorites = !window.showingFavorites;
    const btn = document.getElementById('favoritesFilterBtn');

    if (window.showingFavorites) {
        btn.classList.remove('bg-white', 'dark:bg-card-dark', 'text-black', 'dark:text-white');
        btn.classList.add('bg-nb-pink', 'text-black');
    } else {
        btn.classList.add('bg-white', 'dark:bg-card-dark', 'text-black', 'dark:text-white');
        btn.classList.remove('bg-nb-pink', 'text-black');
    }
    applyFilters();
}

window.setFilter = function (category) {
    window.currentCategory = category;
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        if (btn.id === `btn-${category}`) {
            btn.classList.remove('bg-white', 'dark:bg-card-dark', 'text-black', 'dark:text-white');
            btn.classList.add('bg-black', 'text-white');
        } else {
            btn.classList.add('bg-white', 'dark:bg-card-dark', 'text-black', 'dark:text-white');
            btn.classList.remove('bg-black', 'text-white');
        }
    });
    applyFilters();
}

function applyFilters() {
    const cards = document.querySelectorAll('.recipe-card');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        const cardId = card.getAttribute('data-id');

        const matchesCategory = window.currentCategory === 'Tudo' || cardCat === window.currentCategory;
        const matchesFavorite = !window.showingFavorites || favorites.includes(cardId);

        if (matchesCategory && matchesFavorite) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

const GEMINI_API_KEY = "AIzaSyDDOAkGR1y9OdVW5LK91TUz3oVYX78g-u8";

async function generateRecipe(query) {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.remove('hidden');
        loading.classList.add('flex');
    }

    try {
        const prompt = `
            Crie uma receita baseada em: "${query}".
            Responda APENAS com um JSON estrito seguindo este formato exato, sem markdown:
            {
                "title": "Nome da Receita (curto, max 2 palavras por linha, use <br/>)",
                "category": "Escolha entre Café, Almoço, Jantar, Lanche",
                "time": "tempo estim (ex: 30 Min)",
                "calories": "calorias (ex: 500 Kcal)",
                "protein": "proteína (ex: 20g)",
                "difficulty": "Fácil, Médio ou Difícil",
                "color": "bg-accent-yellow (ou blue, green, pink, orange)",
                "icon": "material symbol icon name (ex: restaurant)",
                "ingredients": ["ingrediente 1", "ingrediente 2"],
                "steps": [
                    {"title": "Passo 1", "desc": "Descrição curta"},
                    {"title": "Passo 2", "desc": "Descrição curta"}
                ]
            }
        `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();

        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error("Resposta inválida da API");
        }

        let text = data.candidates[0].content.parts[0].text;

        // Cleanup Json - Remove Markdown code blocks if present
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
            text = text.substring(jsonStart, jsonEnd + 1);
        }

        const recipe = JSON.parse(text);
        saveAndRenderRecipe(recipe);

    } catch (error) {
        console.error("AI Error:", error);
        alert("Erro ao receber resposta da IA. Tente novamente.");
    } finally {
        if (loading) {
            loading.classList.add('hidden');
            loading.classList.remove('flex');
        }
    }
}

function saveAndRenderRecipe(recipe) {
    const id = 'gen_' + Date.now();

    // Ensure timestamp
    if (!recipe.created_at) {
        recipe.created_at = Date.now();
    }

    const generated = JSON.parse(localStorage.getItem('generated_recipes') || '{}');
    generated[id] = recipe;
    localStorage.setItem('generated_recipes', JSON.stringify(generated));

    const container = document.getElementById('resultsSection');
    const safeColor = recipe.color.includes('bg-accent') ? recipe.color : 'bg-accent-yellow';

    let hoverColor = 'hover:bg-yellow-300';
    if (safeColor.includes('blue')) hoverColor = 'hover:bg-blue-300';
    if (safeColor.includes('green')) hoverColor = 'hover:bg-green-300';
    if (safeColor.includes('pink')) hoverColor = 'hover:bg-pink-300';
    if (safeColor.includes('orange')) hoverColor = 'hover:bg-orange-300';

    const card = document.createElement('article');
    card.className = `recipe-card group relative ${safeColor} border-3 border-black rounded-2xl p-6 shadow-neo active:shadow-neo-hover active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer ${hoverColor}`;
    card.setAttribute('data-category', recipe.category);
    card.setAttribute('data-id', id);
    card.onclick = () => navigate(`receita.html?id=${id}`);

    const now = Date.now();
    const isNew = recipe.created_at && (now - recipe.created_at < 24 * 60 * 60 * 1000);

    card.innerHTML = `
        <div class="flex justify-between items-start mb-8">
            <div class="flex gap-2">
                <span class="bg-white border-3 border-black px-4 py-1.5 rounded-lg font-black text-xs uppercase tracking-widest text-black">${recipe.category}</span>
                ${isNew ? '<span class="bg-nb-pink border-3 border-black px-3 py-1.5 rounded-lg font-black text-xs uppercase tracking-widest text-black animate-pulse">NOVO</span>' : ''}
            </div>
            <span class="material-symbols-outlined text-5xl text-black transition-transform group-hover:rotate-12 group-hover:scale-110">${recipe.icon}</span>
        </div>
        <h2 class="text-5xl font-black uppercase leading-[0.85] tracking-tight mb-8 text-black break-words">${recipe.title}</h2>
        <div class="flex items-end justify-between border-t-3 border-black pt-4">
            <div class="flex flex-col">
                <span class="text-xs font-bold uppercase mb-0.5 text-black/80">Tempo</span>
                <span class="text-2xl font-black text-black">${recipe.time}</span>
            </div>
            <button class="size-12 bg-black text-white rounded-lg flex items-center justify-center border-2 border-transparent hover:scale-105 transition-transform">
                <span class="material-symbols-outlined text-2xl">arrow_outward</span>
            </button>
        </div>
    `;

    container.insertBefore(card, container.firstChild);
    document.getElementById('aiSearchInput').value = '';
    setFilter('Tudo');
}


// 7. RECIPE DETAIL (receita.html)
window.initRecipe = function (recipeId) {
    recipeId = recipeId || 'torrada';

    // Merge recipes
    const generatedRecipes = JSON.parse(localStorage.getItem('generated_recipes') || '{}');
    const allRecipes = { ...recipes, ...generatedRecipes };
    const data = allRecipes[recipeId] || allRecipes['torrada'];

    // Update Fav UI
    updateFavUI(recipeId);
    window.currentRecipeId = recipeId;

    // Render
    document.getElementById('recipeTitle').innerHTML = data.title;
    document.getElementById('recipeCategory').innerText = data.category;
    document.getElementById('recipeTime').innerText = data.time;
    document.getElementById('recipeCalories').innerText = data.calories;
    document.getElementById('recipeProtein').innerText = data.protein;
    document.getElementById('recipeDifficulty').innerText = data.difficulty;
    document.getElementById('recipeIcon').innerText = data.icon;

    const heroCard = document.getElementById('heroCard');
    heroCard.classList.remove('bg-accent-yellow', 'bg-accent-blue', 'bg-accent-orange', 'bg-accent-pink');
    heroCard.classList.add(data.color);

    const ingList = document.getElementById('ingredientsList');
    document.getElementById('ingredientsCount').innerText = data.ingredients.length;
    ingList.innerHTML = data.ingredients.map(ing => `
        <li class="flex items-center gap-3 group cursor-pointer">
            <div class="size-6 rounded border-3 border-black bg-transparent group-hover:bg-accent-green transition-colors flex items-center justify-center">
                <span class="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 font-bold">check</span>
            </div>
            <span class="font-bold text-lg text-black dark:text-white">${ing}</span>
        </li>
    `).join('');

    const stepsList = document.getElementById('stepsList');
    stepsList.innerHTML = `<div class="absolute left-[19px] top-4 bottom-4 w-1 bg-black/20 -z-10 rounded-full"></div>` +
        data.steps.map((step, index) => `
        <div class="flex gap-4">
            <div class="size-10 flex-none bg-white text-black border-3 border-black rounded-full flex items-center justify-center font-black text-lg z-10 shadow-sm">${index + 1}</div>
            <div class="pt-1">
                <h4 class="font-black text-lg text-black uppercase mb-1">${step.title}</h4>
                <p class="font-medium text-black leading-snug">${step.desc}</p>
            </div>
        </div>
    `).join('');
}

window.updateFavUI = function (id) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFav = favorites.includes(id);
    const btn = document.getElementById('favBtn');

    if (isFav) {
        btn.classList.add('bg-nb-pink'); // Changed from accent-pink to match theme if needed, but accent-pink is defined in config
        btn.classList.remove('bg-white', 'dark:bg-card-dark', 'text-black', 'dark:text-white');
    } else {
        btn.classList.remove('bg-nb-pink');
        btn.classList.add('bg-white', 'dark:bg-card-dark', 'text-black', 'dark:text-white');
    }
}

window.toggleFavorite = function () {
    const id = window.currentRecipeId;
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(id)) {
        favorites = favorites.filter(fid => fid !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavUI(id);
}

// Initial Load
document.addEventListener('DOMContentLoaded', async () => {
    // Strict Session Check on Load
    const keepSession = localStorage.getItem('keep_session_active') === 'true';
    if (!keepSession && window.supabaseClient) {
        const { data: { session } } = await window.supabaseClient.auth.getSession();
        if (session) {
            console.log('Startup: Persistence OFF, clearing session.');
            await window.supabaseClient.auth.signOut();
            if (!window.location.pathname.includes('index.html') && !window.location.pathname.includes('login.html') && window.location.pathname !== '/' && window.location.pathname !== '') {
                window.location.href = 'index.html';
                return;
            }
        }
    }

    // Determine current page and init
    const path = window.location.pathname.split('/').pop();
    const params = new URLSearchParams(window.location.search);
    initPageLogic(path, params);
});
