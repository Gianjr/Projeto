document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.querySelector('.gallery_container');
    const galleryControlsContainer = document.querySelector('.gallery_controls');
    const galleryControls = ['previous', 'next'];
    const galleryItems = Array.from(document.querySelectorAll('.gallery_item')); // Corrigido para "item"

    if (!galleryContainer || galleryItems.length === 0) {
        console.error("❌ ERRO: Elementos da galeria não encontrados!");
        return;
    }

    class Carrousel {
        constructor(container, galleryItems, controls) {
            this.carrouselContainer = container;
            this.carrouselControls = controls;
            this.carrouselArray = [...galleryItems];
            this.currentIndex = 0; // Para rastrear a posição atual
            this.totalItems = galleryItems.length;
        }

        // Atualiza a galeria movendo os itens para o índice correto
        updateGallery() {
            // Remove as classes antigas
            this.carrouselArray.forEach((el) => {
                el.classList.remove('gallery_item1', 'gallery_item2', 'gallery_item3', 'gallery_item4', 'gallery_item5');
            });

            // Define a nova ordem dos itens com base no currentIndex
            const ordem = [0, 1, 2, 3, 4]; // A sequência dos itens no carrossel

            ordem.forEach((pos, i) => {
                const index = (this.currentIndex + pos) % this.totalItems;
                this.carrouselArray[index].classList.add(`gallery_item${i + 1}`);
            });
        }

        // Controla a navegação entre os itens da galeria
        setCurrentState(button) {
            if (button.classList.contains('gallery_controls-previous')) {
                // Navega para o item anterior
                this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
            } else {
                // Navega para o próximo item
                this.currentIndex = (this.currentIndex + 1) % this.totalItems;
            }

            this.updateGallery(); // Atualiza a galeria com o novo índice
        }

        // Cria os botões de controle (previous e next)
        setControls() {
            this.carrouselControls.forEach(control => {
                const button = document.createElement('button');
                button.className = `gallery_controls-${control}`;
                button.innerText = control.charAt(0).toUpperCase() + control.slice(1); // Formata o texto dos botões
                galleryControlsContainer.appendChild(button);
            });
        }

        // Adiciona os event listeners aos botões de controle
        useControls() {
            const triggers = [...galleryControlsContainer.childNodes];
            triggers.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault(); // Impede o comportamento padrão do botão
                    this.setCurrentState(e.target); // Atualiza o estado do carrossel com base no botão clicado
                });
            });
        }
    }

    // Criando a instância do carrossel
    const exampleCarrousel = new Carrousel(galleryContainer, galleryItems, galleryControls);

    // Inicializa os controles e a navegação do carrossel
    exampleCarrousel.setControls();
    exampleCarrousel.useControls();
    exampleCarrousel.updateGallery(); // Garante que a galeria inicializa corretamente
});
