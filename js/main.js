// Datos de productos
const productos = [
  {
    id: 1,
    nombre: "BTS",
    imagen: "images/poster-1.jpg", // <-- CAMBIAR RUTA AQUÍ
    precio: 19.99,
    descripcion: "Bichito Tsss Siuuu",
  },
  {
    id: 2,
    nombre: "Gato matrix",
    imagen: "images/poster-2.jpg", // <-- CAMBIAR RUTA AQUÍ
    precio: 22.99,
    descripcion: "roja o azul?",
  },
  {
    id: 3,
    nombre: "Los michis",
    imagen: "images/poster-3.jpg", // <-- CAMBIAR RUTA AQUÍ
    precio: 24.99,
    descripcion: "todo lo que necesitas es amor",
  },
  {
    id: 4,
    nombre: "Gato araña",
    imagen: "images/poster-4.jpg", // <-- CAMBIAR RUTA AQUÍ
    precio: 21.99,
    descripcion: "¿Si el hombre rasguña, el gato araña?",
  },
  {
    id: 5,
    nombre: "Gato Samurái",
    imagen: "images/poster-5.jpg", // <-- CAMBIAR RUTA AQUÍ
    precio: 25.99,
    descripcion: "Gato guerrero con katana",
  },
  {
    id: 6,
    nombre: "Gato Hipster",
    imagen: "images/poster-6.jpg", // <-- CAMBIAR RUTA AQUÍ
    precio: 20.99,
    descripcion: "no estan extintos",
  },
  {
    id: 7,
    nombre: "Gato Pizza Lover",
    imagen: "images/poster-7.jpg", // <-- CAMBIAR RUTA AQUÍ
    precio: 19.99,
    descripcion: "Gato adorando su pizza favorita",
  },
  {
    id: 8,
    nombre: "Gato Mago",
    imagen: "images/poster-8.jpg", // <-- CAMBIAR RUTA AQUÍ
    precio: 23.99,
    descripcion: "Gato con poderes mágicos",
  },
]

const carrito = []

// Cargar productos al iniciar
document.addEventListener("DOMContentLoaded", () => {
  cargarProductos()
})

// Función para cargar productos en la galería
function cargarProductos() {
  const productosGrid = document.getElementById("productosGrid")
  productosGrid.innerHTML = ""

  productos.forEach((producto) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"
    productCard.innerHTML = `
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="product-img">
            </div>
            <div class="product-info">
                <h3 class="product-name">${producto.nombre}</h3>
                <p class="product-description">${producto.descripcion}</p>
                <p class="product-price">$${producto.precio.toFixed(2)}</p>
                <button class="add-to-cart-btn" onclick="agregarAlCarrito(${producto.id})">
                    Agregar al Carrito
                </button>
            </div>
        `
    productosGrid.appendChild(productCard)
  })
}

// Función para agregar productos al carrito
function agregarAlCarrito(productoId) {
  const producto = productos.find((p) => p.id === productoId)

  const itemEnCarrito = carrito.find((item) => item.id === productoId)

  if (itemEnCarrito) {
    itemEnCarrito.cantidad++
  } else {
    carrito.push({
      ...producto,
      cantidad: 1,
    })
  }

  actualizarCarrito()
  mostrarNotificacion("¡Producto agregado al carrito!")
}

// Función para actualizar el carrito
function actualizarCarrito() {
  const cartCount = document.querySelector(".cart-count")
  const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0)
  cartCount.textContent = totalProductos

  actualizarModalCarrito()
}

// Función para actualizar el modal del carrito
function actualizarModalCarrito() {
  const cartItems = document.getElementById("cartItems")
  cartItems.innerHTML = ""

  let total = 0

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad
    total += subtotal

    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
            <div>
                <strong>${item.nombre}</strong><br>
                Cantidad: <input type="number" min="1" value="${item.cantidad}" 
                    onchange="cambiarCantidad(${index}, this.value)" style="width: 50px;">
            </div>
            <div>
                $${subtotal.toFixed(2)}
                <button onclick="eliminarDelCarrito(${index})" style="margin-left: 1rem; cursor: pointer; background: #FF6B6B; color: white; border: none; padding: 5px 10px; border-radius: 5px;">
                    ✕
                </button>
            </div>
        `
    cartItems.appendChild(cartItem)
  })

  const totalPrice = document.getElementById("totalPrice")
  totalPrice.textContent = `$${total.toFixed(2)}`
}

// Función para cambiar cantidad
function cambiarCantidad(index, nuevaCantidad) {
  if (nuevaCantidad > 0) {
    carrito[index].cantidad = Number.parseInt(nuevaCantidad)
  } else {
    carrito.splice(index, 1)
  }
  actualizarCarrito()
}

// Función para eliminar del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1)
  actualizarCarrito()
}

// Abrir carrito
document.querySelector(".cart-icon").addEventListener("click", () => {
  document.getElementById("cartModal").style.display = "block"
})

// Cerrar carrito
function closeCart() {
  document.getElementById("cartModal").style.display = "none"
}

// Cerrar modal cuando se hace clic fuera
window.onclick = (event) => {
  const modal = document.getElementById("cartModal")
  if (event.target == modal) {
    modal.style.display = "none"
  }
}

// Scroll a productos
function scrollToProducts() {
  document.getElementById("productos").scrollIntoView({ behavior: "smooth" })
}

// Scroll a categorías
function scrollToCategories() {
  document.getElementById("categorias").scrollIntoView({ behavior: "smooth" })
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje) {
  const notificacion = document.createElement("div")
  notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FF8C00, #1E90FF);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
    `
  notificacion.textContent = mensaje
  document.body.appendChild(notificacion)

  setTimeout(() => {
    notificacion.style.animation = "slideOut 0.3s ease-out"
    setTimeout(() => notificacion.remove(), 300)
  }, 2000)
}

// Animaciones CSS
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Validación del formulario de contacto
document.querySelector(".contact-form")?.addEventListener("submit", function (e) {
  e.preventDefault()
  mostrarNotificacion("¡Mensaje enviado! Te contactaremos pronto 🐱")
  this.reset()
})
