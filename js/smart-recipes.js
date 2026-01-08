const seedRecipes = [
    {
        title: "Tapioca com<br/>Queijo",
        category: "Café",
        time: "10 Min",
        calories: "250 Kcal",
        protein: "5g",
        difficulty: "Fácil",
        color: "bg-accent-yellow",
        icon: "breakfast_dining",
        ingredients: ["Goma de Tapioca", "Queijo Mussarela", "Manteiga", "Sal"],
        steps: [
            { title: "Preparo", desc: "Peneire a goma em uma frigideira quente." },
            { title: "Recheio", desc: "Adicione o queijo e dobre a tapioca." }
        ],
        created_at: Date.now()
    },
    {
        title: "Arroz com<br/>Ovo",
        category: "Almoço",
        time: "20 Min",
        calories: "350 Kcal",
        protein: "12g",
        difficulty: "Fácil",
        color: "bg-accent-blue",
        icon: "rice_bowl",
        ingredients: ["Arroz", "Ovo", "Sal", "Óleo"],
        steps: [
            { title: "Arroz", desc: "Cozinhe o arroz com sal e alho." },
            { title: "Ovo", desc: "Frite o ovo com a gema mole." }
        ],
        created_at: Date.now()
    },
    {
        title: "Macarrão com<br/>Almôndegas",
        category: "Jantar",
        time: "30 Min",
        calories: "500 Kcal",
        protein: "20g",
        difficulty: "Médio",
        color: "bg-accent-orange",
        icon: "restaurant",
        ingredients: ["Macarrão", "Almôndegas", "Molho de Tomate", "Queijo Ralado"],
        steps: [
            { title: "Massa", desc: "Cozinhe o macarrão al dente." },
            { title: "Molho", desc: "Aqueça as almôndegas no molho e sirva." }
        ],
        created_at: Date.now()
    },
    {
        title: "Brigadeiro<br/>Clássico",
        category: "Lanche",
        time: "15 Min",
        calories: "100 Kcal",
        protein: "2g",
        difficulty: "Fácil",
        color: "bg-accent-pink",
        icon: "cookie",
        ingredients: ["Leite Condensado", "Achocolatado", "Manteiga"],
        steps: [
            { title: "Mistura", desc: "Misture tudo na panela." },
            { title: "Ponto", desc: "Mexa até desgrudar do fundo." }
        ],
        created_at: Date.now()
    },
    {
        title: "Omelete de<br/>Queijo",
        category: "Café",
        time: "10 Min",
        calories: "200 Kcal",
        protein: "15g",
        difficulty: "Fácil",
        color: "bg-accent-yellow",
        icon: "egg_alt",
        ingredients: ["Ovos", "Queijo", "Sal", "Orégano"],
        steps: [
            { title: "Bater", desc: "Bata os ovos com sal." },
            { title: "Fritar", desc: "Coloque na frigideira e adicione o queijo." }
        ],
        created_at: Date.now()
    },
    {
        title: "Frango<br/>Grelhado",
        category: "Almoço",
        time: "15 Min",
        calories: "180 Kcal",
        protein: "30g",
        difficulty: "Fácil",
        color: "bg-accent-green",
        icon: "kebab_dining",
        ingredients: ["Filé de Frango", "Sal", "Azeite", "Limão"],
        steps: [
            { title: "Temperar", desc: "Tempere o frango com sal e limão." },
            { title: "Grelhar", desc: "Grelhe no azeite até dourar." }
        ],
        created_at: Date.now()
    },
    {
        title: "Purê de<br/>Batata",
        category: "Jantar",
        time: "25 Min",
        calories: "220 Kcal",
        protein: "4g",
        difficulty: "Fácil",
        color: "bg-accent-yellow",
        icon: "soup_kitchen",
        ingredients: ["Batata", "Leite", "Manteiga", "Sal"],
        steps: [
            { title: "Cozinhar", desc: "Cozinhe e amasse as batatas." },
            { title: "Misturar", desc: "Misture com leite e manteiga no fogo." }
        ],
        created_at: Date.now()
    },
    {
        title: "Banana com<br/>Aveia",
        category: "Café",
        time: "2 Min",
        calories: "150 Kcal",
        protein: "3g",
        difficulty: "Fácil",
        color: "bg-accent-orange",
        icon: "nutrition",
        ingredients: ["Banana", "Aveia", "Mel"],
        steps: [
            { title: "Montar", desc: "Amasse ou corte a banana." },
            { title: "Finalizar", desc: "Salpique aveia e mel." }
        ],
        created_at: Date.now()
    },
    {
        title: "Arroz<br/>Doce",
        category: "Lanche",
        time: "30 Min",
        calories: "300 Kcal",
        protein: "6g",
        difficulty: "Médio",
        color: "bg-accent-pink",
        icon: "icecream",
        ingredients: ["Arroz", "Leite", "Açúcar", "Canela"],
        steps: [
            { title: "Cozinhar", desc: "Cozinhe o arroz no leite." },
            { title: "Adoçar", desc: "Adicione açúcar e finalize com canela." }
        ],
        created_at: Date.now()
    },
    {
        title: "Macarrão Alho<br/>e Óleo",
        category: "Almoço",
        time: "15 Min",
        calories: "400 Kcal",
        protein: "10g",
        difficulty: "Fácil",
        color: "bg-accent-yellow",
        icon: "restaurant",
        ingredients: ["Macarrão", "Alho", "Azeite", "Sal"],
        steps: [
            { title: "Fritar", desc: "Doure o alho no azeite." },
            { title: "Misturar", desc: "Misture a massa cozida." }
        ],
        created_at: Date.now()
    },
    {
        title: "Doce de<br/>Leite",
        category: "Lanche",
        time: "40 Min",
        calories: "320 Kcal",
        protein: "7g",
        difficulty: "Médio",
        color: "bg-accent-blue",
        icon: "cookie",
        ingredients: ["Leite Condensado"],
        steps: [
            { title: "Pressão", desc: "Cozinhe a lata na panela de pressão." },
            { title: "Esfriar", desc: "Espere esfriar totalmente antes de abrir." }
        ],
        created_at: Date.now()
    },
    {
        title: "Feijão<br/>Tropeiro",
        category: "Almoço",
        time: "30 Min",
        calories: "550 Kcal",
        protein: "25g",
        difficulty: "Médio",
        color: "bg-accent-orange",
        icon: "soup_kitchen",
        ingredients: ["Feijão", "Farinha", "Ovo", "Linguiça"],
        steps: [
            { title: "Fritar", desc: "Frite as carnes e o ovo." },
            { title: "Misturar", desc: "Adicione o feijão e a farinha." }
        ],
        created_at: Date.now()
    },
    {
        title: "Panqueca de<br/>Frango",
        category: "Jantar",
        time: "40 Min",
        calories: "380 Kcal",
        protein: "22g",
        difficulty: "Médio",
        color: "bg-accent-yellow",
        icon: "restaurant",
        ingredients: ["Farinha", "Leite", "Ovo", "Frango"],
        steps: [
            { title: "Massa", desc: "Bata a massa e frite os discos." },
            { title: "Rechear", desc: "Recheie com frango e enrole." }
        ],
        created_at: Date.now()
    },
    {
        title: "Salada de<br/>Tomate",
        category: "Almoço",
        time: "5 Min",
        calories: "80 Kcal",
        protein: "1g",
        difficulty: "Fácil",
        color: "bg-accent-green",
        icon: "eco",
        ingredients: ["Tomate", "Cebola", "Azeite", "Orégano"],
        steps: [
            { title: "Cortar", desc: "Corte os tomates e cebola." },
            { title: "Temperar", desc: "Tempere com azeite e sal." }
        ],
        created_at: Date.now()
    },
    {
        title: "Batata<br/>Frita",
        category: "Lanche",
        time: "20 Min",
        calories: "300 Kcal",
        protein: "3g",
        difficulty: "Fácil",
        color: "bg-accent-yellow",
        icon: "fastfood",
        ingredients: ["Batata", "Óleo", "Sal"],
        steps: [
            { title: "Cortar", desc: "Corte em palitos." },
            { title: "Fritar", desc: "Frite em óleo quente até dourar." }
        ],
        created_at: Date.now()
    },
    {
        title: "Cuscuz com<br/>Ovo",
        category: "Café",
        time: "15 Min",
        calories: "300 Kcal",
        protein: "10g",
        difficulty: "Fácil",
        color: "bg-accent-yellow",
        icon: "breakfast_dining",
        ingredients: ["Flocão de Milho", "Ovo", "Manteiga", "Sal"],
        steps: [
            { title: "Hidratar", desc: "Hidrate o flocão e cozinhe no vapor." },
            { title: "Acompanhar", desc: "Sirva com ovo frito." }
        ],
        created_at: Date.now()
    },
    {
        title: "Mingau de<br/>Aveia",
        category: "Café",
        time: "10 Min",
        calories: "200 Kcal",
        protein: "8g",
        difficulty: "Fácil",
        color: "bg-accent-pink",
        icon: "soup_kitchen",
        ingredients: ["Aveia", "Leite", "Açúcar"],
        steps: [
            { title: "Cozinhar", desc: "Misture tudo no fogo até engrossar." },
            { title: "Servir", desc: "Polvilhe canela se gostar." }
        ],
        created_at: Date.now()
    },
    {
        title: "Frango<br/>Acebolado",
        category: "Jantar",
        time: "20 Min",
        calories: "250 Kcal",
        protein: "28g",
        difficulty: "Fácil",
        color: "bg-accent-orange",
        icon: "skillet",
        ingredients: ["Frango", "Cebola", "Azeite", "Shoyu"],
        steps: [
            { title: "Fritar", desc: "Frite o frango em tiras." },
            { title: "Acebolar", desc: "Adicione a cebola até murchar." }
        ],
        created_at: Date.now()
    },
    {
        title: "Caldo de<br/>Feijão",
        category: "Jantar",
        time: "30 Min",
        calories: "180 Kcal",
        protein: "10g",
        difficulty: "Fácil",
        color: "bg-accent-blue",
        icon: "soup_kitchen",
        ingredients: ["Feijão Cozido", "Cebola", "Alho", "Cheiro Verde"],
        steps: [
            { title: "Bater", desc: "Bata o feijão no liquidificador." },
            { title: "Temperar", desc: "Refogue os temperos e ferva o caldo." }
        ],
        created_at: Date.now()
    },
    {
        title: "Queijo<br/>Quente",
        category: "Café",
        time: "5 Min",
        calories: "280 Kcal",
        protein: "10g",
        difficulty: "Fácil",
        color: "bg-accent-yellow",
        icon: "bakery_dining",
        ingredients: ["Pão de Forma", "Queijo", "Manteiga"],
        steps: [
            { title: "Montar", desc: "Faça o sanduíche com queijo." },
            { title: "Tostar", desc: "Doure na frigideira com manteiga." }
        ],
        created_at: Date.now()
    }
];

const moreRecipes = [
    {
        title: "Linguiça<br/>Acebolada",
        category: "Almoço",
        time: "15 Min",
        calories: "450 Kcal",
        protein: "18g",
        difficulty: "Fácil",
        color: "bg-accent-orange",
        icon: "skillet",
        ingredients: ["Linguiça Fininha", "Cebola", "Óleo"],
        steps: [
            { title: "Fritar", desc: "Frite a linguiça em rodelas." },
            { title: "Acebolar", desc: "Adicione a cebola em pétalas." }
        ],
        created_at: Date.now()
    },
    {
        title: "Bolo de<br/>Caneca",
        category: "Lanche",
        time: "5 Min",
        calories: "250 Kcal",
        protein: "4g",
        difficulty: "Fácil",
        color: "bg-accent-pink",
        icon: "cake",
        ingredients: ["Achocolatado", "Farinha", "Leite", "Óleo"],
        steps: [
            { title: "Misturar", desc: "Misture tudo na caneca." },
            { title: "Micro-ondas", desc: "Asse por 3 minutos." }
        ],
        created_at: Date.now()
    },
    {
        title: "Miojo<br/>Gourmet",
        category: "Jantar",
        time: "10 Min",
        calories: "400 Kcal",
        protein: "8g",
        difficulty: "Fácil",
        color: "bg-accent-yellow",
        icon: "ramen_dining",
        ingredients: ["Miojo", "Ovo", "Cebolinha", "Requeijão"],
        steps: [
            { title: "Cozinhar", desc: "Faça o miojo com menos água." },
            { title: "Cremoso", desc: "Misture requeijão e finalize com ovo cozido." }
        ],
        created_at: Date.now()
    },
    {
        title: "Cenoura<br/>Refogada",
        category: "Almoço",
        time: "15 Min",
        calories: "120 Kcal",
        protein: "2g",
        difficulty: "Fácil",
        color: "bg-accent-green",
        icon: "nutrition",
        ingredients: ["Cenoura", "Manteiga", "Salsinha"],
        steps: [
            { title: "Ralar", desc: "Rale ou corte a cenoura." },
            { title: "Refogar", desc: "Refogue na manteiga até amaciar." }
        ],
        created_at: Date.now()
    },
    {
        title: "Strogonoff<br/>Fácil",
        category: "Almoço",
        time: "25 Min",
        calories: "480 Kcal",
        protein: "30g",
        difficulty: "Médio",
        color: "bg-accent-orange",
        icon: "stew",
        ingredients: ["Filé de Frango", "Creme de Leite", "Ketchup", "Batata Palha"],
        steps: [
            { title: "Frango", desc: "Doure o frango picado." },
            { title: "Molho", desc: "Adicione creme de leite e ketchup. Sirva com batata palha." }
        ],
        created_at: Date.now()
    },
    {
        title: "Iogurte com<br/>Banana",
        category: "Lanche",
        time: "3 Min",
        calories: "180 Kcal",
        protein: "8g",
        difficulty: "Fácil",
        color: "bg-accent-blue",
        icon: "icecream",
        ingredients: ["Iogurte", "Banana", "Mel"],
        steps: [
            { title: "Picar", desc: "Pique a banana." },
            { title: "Misturar", desc: "Misture ao iogurte e adoce." }
        ],
        created_at: Date.now()
    },
    {
        title: "Pipoca<br/>Doce",
        category: "Lanche",
        time: "10 Min",
        calories: "350 Kcal",
        protein: "3g",
        difficulty: "Médio",
        color: "bg-accent-pink",
        icon: "theaters",
        ingredients: ["Milho de Pipoca", "Açúcar", "Óleo", "Água"],
        steps: [
            { title: "Estourar", desc: "Coloque tudo na panela e mexa até estourar." }
        ],
        created_at: Date.now()
    },
    {
        title: "Escondidinho<br/>Rápido",
        category: "Jantar",
        time: "30 Min",
        calories: "450 Kcal",
        protein: "20g",
        difficulty: "Médio",
        color: "bg-accent-yellow",
        icon: "casserole",
        ingredients: ["Batata", "Carne Moída/Frango", "Queijo"],
        steps: [
            { title: "Purê", desc: "Faça um purê de batata." },
            { title: "Montar", desc: "Intercale carne e purê, cubra com queijo e gratine." }
        ],
        created_at: Date.now()
    },
    {
        title: "Bolinho de<br/>Arroz",
        category: "Lanche",
        time: "20 Min",
        calories: "220 Kcal",
        protein: "6g",
        difficulty: "Médio",
        color: "bg-accent-orange",
        icon: "tapas",
        ingredients: ["Arroz Cozido", "Ovo", "Farinha", "Cheiro Verde"],
        steps: [
            { title: "Misturar", desc: "Misture tudo até dar liga." },
            { title: "Fritar", desc: "Frite as colheradas em óleo quente." }
        ],
        created_at: Date.now()
    },
    {
        title: "Sanduíche<br/>Natural",
        category: "Jantar",
        time: "10 Min",
        calories: "280 Kcal",
        protein: "12g",
        difficulty: "Fácil",
        color: "bg-accent-green",
        icon: "lunch_dining",
        ingredients: ["Pão de Forma", "Frango Desfiado", "Cenoura", "Maionese"],
        steps: [
            { title: "Pasta", desc: "Misture frango, cenoura ralada e maionese." },
            { title: "Montar", desc: "Recheie o pão e sirva frio." }
        ],
        created_at: Date.now()
    },
    {
        title: "Biscoito<br/>Frito",
        category: "Café",
        time: "20 Min",
        calories: "300 Kcal",
        protein: "2g",
        difficulty: "Médio",
        color: "bg-accent-yellow",
        icon: "cookie",
        ingredients: ["Goma de Tapioca", "Ovo", "Sal", "Açúcar (opc)"],
        steps: [
            { title: "Massa", desc: "Misture goma e ovo até soltar da mão." },
            { title: "Fritar", desc: "Faça argolas e frite em óleo frio (cuidado ao estourar)." }
        ],
        created_at: Date.now()
    },
    {
        title: "Macarronada<br/>Simples",
        category: "Almoço",
        time: "20 Min",
        calories: "450 Kcal",
        protein: "12g",
        difficulty: "Fácil",
        color: "bg-accent-blue",
        icon: "restaurant",
        ingredients: ["Macarrão", "Molho de Tomate", "Cebola"],
        steps: [
            { title: "Molho", desc: "Refogue cebola e apure o molho." },
            { title: "Servir", desc: "Misture ao macarrão cozido." }
        ],
        created_at: Date.now()
    },
    {
        title: "Vitamina de<br/>Banana",
        category: "Lanche",
        time: "5 Min",
        calories: "200 Kcal",
        protein: "5g",
        difficulty: "Fácil",
        color: "bg-accent-purple",
        icon: "blender",
        ingredients: ["Banana", "Leite", "Aveia", "Açúcar"],
        steps: [
            { title: "Bater", desc: "Bata tudo no liquidificador." },
            { title: "Gelo", desc: "Sirva com gelo se preferir." }
        ],
        created_at: Date.now()
    },
    {
        title: "Farofa de<br/>Ovo",
        category: "Almoço",
        time: "10 Min",
        calories: "300 Kcal",
        protein: "10g",
        difficulty: "Fácil",
        color: "bg-accent-yellow",
        icon: "grains",
        ingredients: ["Farinha de Mandioca", "Ovo", "Manteiga", "Cebola"],
        steps: [
            { title: "Ovos", desc: "Frite os ovos na manteiga com cebola." },
            { title: "Finalizar", desc: "Adicione a farinha e torre levemente." }
        ],
        created_at: Date.now()
    },
    {
        title: "Bife<br/>Acebolado",
        category: "Almoço",
        time: "15 Min",
        calories: "350 Kcal",
        protein: "30g",
        difficulty: "Médio",
        color: "bg-accent-orange",
        icon: "skillet",
        ingredients: ["Bife Bovino", "Cebola", "Sal", "Óleo"],
        steps: [
            { title: "Selar", desc: "Frite o bife em fogo alto." },
            { title: "Acebolar", desc: "Frite a cebola na borra da carne." }
        ],
        created_at: Date.now()
    },
    {
        title: "Cachorro<br/>Quente",
        category: "Jantar",
        time: "15 Min",
        calories: "380 Kcal",
        protein: "12g",
        difficulty: "Fácil",
        color: "bg-accent-red",
        icon: "hot_tub", // hotdog symbol might not exist, using generic
        ingredients: ["Pão", "Salsicha", "Molho de Tomate", "Batata Palha"],
        steps: [
            { title: "Salsicha", desc: "Cozinhe a salsicha no molho." },
            { title: "Montar", desc: "Coloque no pão e cubra com batata palha." }
        ],
        created_at: Date.now()
    },
    {
        title: "Arroz de<br/>Forno",
        category: "Almoço",
        time: "30 Min",
        calories: "400 Kcal",
        protein: "15g",
        difficulty: "Médio",
        color: "bg-accent-yellow",
        icon: "casserole",
        ingredients: ["Arroz Cozido", "Presunto", "Queijo", "Seleta de Legumes"],
        steps: [
            { title: "Misturar", desc: "Misture arroz com presunto e legumes." },
            { title: "Gratinar", desc: "Cubra com queijo e leve ao forno." }
        ],
        created_at: Date.now()
    },
    {
        title: "Patê de<br/>Atum",
        category: "Lanche",
        time: "5 Min",
        calories: "150 Kcal",
        protein: "15g",
        difficulty: "Fácil",
        color: "bg-accent-blue",
        icon: "tapas",
        ingredients: ["Atum em Lata", "Maionese", "Cebola"],
        steps: [
            { title: "Misturar", desc: "Escorra o atum e misture com maionese e cebola picada." },
            { title: "Servir", desc: "Sirva com torradas ou bolachas." }
        ],
        created_at: Date.now()
    },
    {
        title: "Gelatina<br/>Colorida",
        category: "Lanche",
        time: "10 Min",
        calories: "80 Kcal",
        protein: "2g",
        difficulty: "Fácil",
        color: "bg-accent-pink",
        icon: "icecream",
        ingredients: ["Pó para Gelatina", "Água", "Leite Condensado (opc)"],
        steps: [
            { title: "Dissolver", desc: "Dissolva o pó em água quente e fria." },
            { title: "Gelar", desc: "Leve à geladeira até firmar." }
        ],
        created_at: Date.now()
    },
    {
        title: "Mousse de<br/>Limão",
        category: "Lanche",
        time: "10 Min",
        calories: "250 Kcal",
        protein: "4g",
        difficulty: "Fácil",
        color: "bg-accent-green",
        icon: "icecream",
        ingredients: ["Leite Condensado", "Creme de Leite", "Limão"],
        steps: [
            { title: "Bater", desc: "Bata tudo no liquidificador até engrossar." },
            { title: "Gelar", desc: "Leve à geladeira." }
        ],
        created_at: Date.now()
    }
];

window.SmartRecipes = {
    checkAndSeed: function () {
        const generated = JSON.parse(localStorage.getItem('generated_recipes') || '{}');
        let updated = false;

        // V1 Seeding
        if (!localStorage.getItem('seed_done')) {
            console.log('Seeding initial recipes (V1)...');
            seedRecipes.forEach((recipe, index) => {
                const id = 'seed_' + index;
                if (!generated[id]) {
                    generated[id] = recipe;
                    updated = true;
                }
            });
            localStorage.setItem('seed_done', 'true');
        }

        // V2 Seeding (More Recipes)
        if (!localStorage.getItem('seed_v2_done')) {
            console.log('Seeding additional recipes (V2)...');
            moreRecipes.forEach((recipe, index) => {
                const id = 'seed_v2_' + index;
                if (!generated[id]) {
                    // Update created_at to now for "New" badge effect
                    recipe.created_at = Date.now();
                    generated[id] = recipe;
                    updated = true;
                }
            });
            localStorage.setItem('seed_v2_done', 'true');
        }

        if (updated) {
            localStorage.setItem('generated_recipes', JSON.stringify(generated));
            // Force reload to render new items
            location.reload();
        }
    },

    checkHourly: async function () {
        const lastGen = parseInt(localStorage.getItem('last_hourly_recipe') || '0');
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;

        if (now - lastGen > oneHour) {
            console.log('Hourly recipe generation triggered');

            // Pick a random ingredient from common list to vary
            const ingredients = ["Arroz", "Feijão", "Macarrão", "Batata", "Ovo", "Frango", "Queijo", "Banana", "Aveia", "Leite", "Linguiça", "Milho"];
            const randomIng = ingredients[Math.floor(Math.random() * ingredients.length)];

            const prompt = `Crie uma receita criativa usando ${randomIng}`;

            if (window.generateRecipe) {
                // We assume generateRecipe handles saving
                // We wrap it to update timestamp
                await window.generateRecipe(prompt, true); // true flag for silent/background if needed
                localStorage.setItem('last_hourly_recipe', now.toString());
            }
        }
    }
};
