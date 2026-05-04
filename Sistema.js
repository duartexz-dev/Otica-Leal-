// ========================================
// ÓTICA LEAL — Sistema Premium v7.0
// ========================================

let carrinho = JSON.parse(localStorage.getItem("carrinho_leal")) || [];

// ============================
// UTILIDADES
// ============================
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// ============================
// DARK MODE
// ============================
function initTheme() {
    document.documentElement.setAttribute('data-theme', 'dark');
}

function updateThemeIcon(theme) {
    document.querySelectorAll('.theme-toggle i').forEach(icon => {
        icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    });
}

// ============================
// TOAST NOTIFICATION
// ============================
function showToast(message) {
    let toast = document.getElementById('leal-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'leal-toast';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="bi bi-check-circle-fill" style="color:var(--primary)"></i> ${message}`;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================
// SCROLL REVEAL + NAVBAR SCROLL
// ============================
function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    els.forEach(el => observer.observe(el));
}

function initNavbarScroll() {
    const nav = document.querySelector('.custom-navbar');
    const backToTop = document.getElementById('backToTop');
    if (!nav) return;

    const onScroll = () => {
        const scrollValue = window.scrollY;

        if (scrollValue > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        if (backToTop) {
            if (scrollValue > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // estado inicial

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ============================
// CARRINHO DE COMPRAS
// ============================
function salvarCarrinho() {
    localStorage.setItem("carrinho_leal", JSON.stringify(carrinho));
    atualizarContador();
}

function atualizarContador() {
    const totalItens = carrinho.reduce((acc, item) => acc + item.qtd, 0);
    document.querySelectorAll('#contadorCarrinho, .contador-carrinho').forEach(el => {
        el.innerText = totalItens;
        el.style.display = totalItens > 0 ? 'flex' : 'none';
    });

    const badgeMobile = document.getElementById('badgeMobile');
    if (badgeMobile) {
        badgeMobile.style.display = totalItens > 0 ? 'block' : 'none';
    }
}

function atualizarCarrinhoUI() {
    const lista = document.getElementById("listaCarrinho");
    const totalEl = document.getElementById("totalCarrinho");
    const vazio = document.getElementById("carrinhoVazio");

    if (!lista) return;

    lista.innerHTML = "";
    let total = 0;

    if (carrinho.length === 0) {
        if (vazio) vazio.style.display = "block";
        if (totalEl) totalEl.innerText = "R$ 0,00";
        if (document.getElementById("checkoutForm")) document.getElementById("checkoutForm").style.display = "none";
    } else {
        if (vazio) vazio.style.display = "none";
        if (document.getElementById("checkoutForm")) document.getElementById("checkoutForm").style.display = "block";

        carrinho.forEach((item, index) => {
            total += item.preco * item.qtd;
            lista.innerHTML += `
            <div class="d-flex justify-content-between align-items-center py-3" style="border-bottom:1px solid var(--border)">
                <div class="flex-grow-1">
                    <h6 class="mb-0 fw-bold">${item.nome}</h6>
                    <small style="color:var(--text-muted)">${formatarMoeda(item.preco)} × ${item.qtd}</small>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-sm btn-outline-secondary" onclick="alterarQtd(${index}, -1)">−</button>
                    <span class="fw-bold">${item.qtd}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="alterarQtd(${index}, 1)">+</button>
                    <button class="btn btn-sm btn-danger ms-2" onclick="removerItem(${index})"><i class="bi bi-trash"></i></button>
                </div>
            </div>`;
        });
        if (totalEl) totalEl.innerText = formatarMoeda(total);
    }
}

function adicionarCarrinho(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);
    if (itemExistente) {
        itemExistente.qtd++;
    } else {
        carrinho.push({ nome, preco: parseFloat(preco), qtd: 1 });
    }
    salvarCarrinho();
    atualizarCarrinhoUI();

    // Visual feedback on button
    if (event && event.target) {
        const btn = event.target.closest('.btn-buy') || event.target;
        const original = btn.innerHTML;
        btn.innerHTML = '✓ Adicionado!';
        btn.classList.add('success');
        setTimeout(() => {
            btn.innerHTML = original;
            btn.classList.remove('success');
        }, 1800);
    }

    showToast(`${nome} adicionado ao carrinho`);
}

function alterarQtd(index, valor) {
    carrinho[index].qtd += valor;
    if (carrinho[index].qtd <= 0) {
        carrinho.splice(index, 1);
    }
    salvarCarrinho();
    atualizarCarrinhoUI();
}

function removerItem(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinhoUI();
}

// ============================
// FINALIZAÇÃO DE PEDIDO
// ============================
function initCheckout() {
    const btnFinalizar = document.getElementById("finalizarCarrinho");
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", () => {
            if (carrinho.length === 0) {
                showToast("Seu carrinho está vazio!");
                return;
            }

            const nome = document.getElementById("nomePedido").value;
            const tel = document.getElementById("telPedido").value;
            const pagamento = document.getElementById("pagamentoPedido").value;

            if (!nome || !tel) {
                showToast("Preencha seu nome e telefone para finalizar!");
                return;
            }

            let msg = "🛒 *NOVO PEDIDO - ÓTICA LEAL*\n\n";
            msg += `👤 *Nome:* ${nome}\n`;
            msg += `📞 *WhatsApp:* ${tel}\n`;
            msg += `💳 *Pagamento:* ${pagamento}\n\n`;
            msg += "*ITENS:*\n";

            let total = 0;
            carrinho.forEach(item => {
                msg += `• ${item.nome} (${item.qtd}x) - ${formatarMoeda(item.preco * item.qtd)}\n`;
                total += item.preco * item.qtd;
            });
            msg += `\n💰 *Total: ${formatarMoeda(total)}*`;
            msg += "\n\nOlá, gostaria de processar este pedido!";

            const fone = "5521991033702";
            window.open(`https://wa.me/${fone}?text=${encodeURIComponent(msg)}`);
        });
    }
}

// ============================
// AGENDAMENTO DE EXAME
// ============================
function initAgendamento() {
    const btnAg = document.getElementById("enviarAgendamento");
    if (btnAg) {
        btnAg.addEventListener("click", () => {
            const nome = document.getElementById("nomeAg").value;
            const tel = document.getElementById("telAg").value;
            const idade = document.getElementById("idadeAg").value;
            const dor = document.getElementById("dorAg").value;
            const jaUsou = document.getElementById("jaUsouAg").value;
            const hora = document.getElementById("horaAg").value;

            if (!nome || !tel || !dor || !idade) {
                showToast("Por favor, preencha todos os campos!");
                return;
            }

            let msg = `👁️ *SOLICITAÇÃO DE EXAME - ÓTICA LEAL*\n\n`;
            msg += `👤 *Nome:* ${nome}\n`;
            msg += `🎂 *Idade:* ${idade} anos\n`;
            msg += `📞 *WhatsApp:* ${tel}\n`;
            msg += `🤕 *Queixa/Dor:* ${dor}\n`;
            msg += `👓 *Já usou óculos:* ${jaUsou}\n`;
            msg += `⏰ *Preferência:* ${hora}`;

            window.open(`https://wa.me/5521991033702?text=${encodeURIComponent(msg)}`);
        });
    }
}

// ============================
// ESTATÍSTICAS (COUNT UP)
// ============================
function initCounters() {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                const speed = 2000 / target; // 2 seconds duration

                const updateCount = () => {
                    const increment = Math.ceil(target / 100);
                    if (count < target) {
                        count += increment;
                        if (count > target) count = target;
                        entry.target.innerText = count + (entry.target.innerText.includes('+') ? '+' : '');
                        setTimeout(updateCount, 20);
                    } else {
                        entry.target.innerText = target + (target > 15 && target !== 100 ? '+' : '');
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function initFeedback() {
    const btnEnviar = document.getElementById('enviarFeedback');
    if (!btnEnviar) return;

    btnEnviar.addEventListener('click', () => {
        const input = document.getElementById('feedbackText');
        const text = input.value.trim();
        
        if (!text) {
            alert("Por favor, escreva sua mensagem antes de enviar.");
            return;
        }

        // Simulate Sending State
        btnEnviar.disabled = true;
        btnEnviar.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';

        // Simulate Background Sending (Real background WhatsApp requires API/Backend)
        setTimeout(() => {
            // Success State
            btnEnviar.disabled = false;
            btnEnviar.innerHTML = 'Enviar Feedback via WhatsApp';
            
            // Close modal
            const modalEl = document.getElementById('modalFeedback');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
            
            // Show Success Notification
            showToast("✅ Obrigado! Seu feedback foi enviado com sucesso.");
            
            // Clear input
            input.value = "";
        }, 1500);
    });
}

function showToast(message) {
    // Create toast container if not exists
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container position-fixed bottom-0 start-50 translate-middle-x p-3';
        container.style.zIndex = '3000';
        document.body.appendChild(container);
    }

    const id = 'toast-' + Date.now();
    const html = `
        <div id="${id}" class="toast align-items-center text-white bg-dark border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true" style="backdrop-filter: blur(10px); background: rgba(0,0,0,0.8) !important;">
            <div class="d-flex">
                <div class="toast-body py-3">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', html);
    const toastEl = document.getElementById(id);
    const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
    bsToast.show();

    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}

// ============================
// PRELOADER
// ============================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 500); // Small delay for visual impact
        });
    }
}

// ============================
// INICIALIZAÇÃO
// ============================
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initTheme();
    initReveal();
    initNavbarScroll();
    initCheckout();
    initAgendamento();
    initFeedback();
    initCounters();
    atualizarContador();
    atualizarCarrinhoUI();

    // Deep Linking Support (Scroll to product from Search)
    const handleHash = () => {
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
            const id = hash.substring(1);
            // Wait a bit for preloader to fade and page to stabilize
            setTimeout(() => {
                if (window.scrollToProduct) {
                    window.scrollToProduct(id);
                } else {
                    const el = document.getElementById(id);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }, 1000);
        }
    };

    window.addEventListener('load', handleHash);
    window.addEventListener('hashchange', handleHash);
});
