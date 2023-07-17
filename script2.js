// Agregar informacion de los productos a un objeto
const producto = {
    lista: [],
    agregarProducto(nombre, precio, cantidad) {
      const producto = {
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
      };
      this.lista.push(producto);
    },
    // Calcular el importe total
    calcularImporteTotal() {
      return this.lista.reduce((total, producto) => +producto.precio * producto.cantidad, 0);
    },
    // Aplicar descuento
    aplicarDescuento(descuentoFunc) {
      this.lista.forEach((producto) => {
        producto.precio = descuentoFunc(producto.precio);
      });
    },
  };
  // Reintegro Billetera
  function reintegroBilletera(importe) {
    importe = importe - (importe * 0.3);
    return importe;
  }
  // 6 cuotas con 25% de interes
  function seisCuotas(importe) {
    importe = (importe * 1.25) / 6;
    return importe;
  }
  // 12 cuotas con 50% de interes
  function doceCuotas(importe) {
    importe = (importe * 1.5) / 12;
    return importe;
  }
  // un pago con 10% de descuento
  function unPago(importe) {
    importe = importe - (importe * 0.1);
    return importe;
  }
  // agregar productos al objeto
  function agregarProductos() {
    producto.agregarProducto('Remera', 120, 1);
    producto.agregarProducto('Zapatillas', 500, 2);
  }
  // mostrar un mensaje de bienvenida
  function mostrarMensajeBienvenida() {
    const mensajesBienvenida = [
      '¡Bienvenid@ a nuestra tienda!',
      '¡Tenemos las mejores ofertas especiales para vos!',
      '¡Hace tus compras con total confianza y seguridad!',
      '¡Envíos gatis en compras superiores a $300!!',
    ];

    // mensaje aleatorio
    const mensajeAleatorio = mensajesBienvenida[Math.floor(Math.random() * mensajesBienvenida.length)];
    alert(mensajeAleatorio);
  }
  // iniciar simulador de compra
  function iniciarSimulador() {
    mostrarMensajeBienvenida(); // Mostrar mensaje de bienvenida aleatorio
    agregarProductos();
    const importeTotal = producto.calcularImporteTotal();
    producto.aplicarDescuento(seisCuotas);
    mostrarTotalCompra(importeTotal);
  
    const metodoDePago = parseInt(
      prompt('Seleccione un método de pago: 1 = Billetera, 2 = Seis cuotas, 3 = Doce cuotas, 4 = Un pago')
    );
  
    let importeFinal;
  
    if (metodoDePago === 1) {
      importeFinal = reintegroBilletera(importeTotal);
      mostrarMetodoPagoSeleccionado('Billetera');
    } else if (metodoDePago === 2) {
      importeFinal = seisCuotas(importeTotal);
      mostrarMetodoPagoSeleccionado('Seis cuotas');
    } else if (metodoDePago === 3) {
      importeFinal = doceCuotas(importeTotal);
      mostrarMetodoPagoSeleccionado('Doce cuotas');
    } else if (metodoDePago === 4) {
      importeFinal = unPago(importeTotal);
      mostrarMetodoPagoSeleccionado('Un pago');
    } else {
      alert('Método de pago inválido');
      return;
    }
  
    mostrarResultado(importeTotal, importeFinal, metodoDePago);
  }
  // Muestra el total de la compra
  function mostrarTotalCompra(importeTotal) {
    const totalCompraElement = document.getElementById('totalCompra');
    totalCompraElement.innerText = importeTotal.toFixed(2);
  }
  // Metodo de pago seleccionado
  function mostrarMetodoPagoSeleccionado(metodoPago) {
    const metodoPagoElement = document.getElementById('metodoPagoSeleccionado');
    metodoPagoElement.innerText = metodoPago;
  }
  // resultado total
  function mostrarResultado(importeTotal, importeFinal, metodoDePago) {
    const mensajeResultadoElement = document.getElementById('mensajeResultado');
    let mensaje = `Monto total: $${importeTotal.toFixed(2)}`;
    if (metodoDePago === 4) {
      mensaje += `<br>Un pago de: $${importeFinal.toFixed(2)}`;
    } else {
      mensaje += `<br>Importe con descuento: $${importeFinal.toFixed(2)}`;
    }
    mensajeResultadoElement.innerHTML = mensaje;
  }
  
  document.getElementById('btnIniciarSimulador').addEventListener('click', iniciarSimulador);
  