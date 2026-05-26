function iniciarSimulacionDemo() {
            const puntoActual = rutaSimulada[currentIndex];
            const siguienteIndex = (currentIndex + 1) % rutaSimulada.length;
            const siguientePunto = rutaSimulada[siguienteIndex];
            const anguloCorregido = calcularAngulo(puntoActual[0], puntoActual[1], siguientePunto[0], siguientePunto[1]) - 90;
            
            let pasoActual = 0;
            const pasosPorTramo = 100; // Un poco más de suavidad

            if(currentIndex === 0) {
                lineaRastro.setLatLngs([]);
            }

            function avanzarPaso() {
                if (pasoActual <= pasosPorTramo) {
                    // Función de "Ease In-Out" para que acelere y frene suave
                    const t = pasoActual / pasosPorTramo;
                    const suave = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
                    
                    const nuevaLat = puntoActual[0] + (siguientePunto[0] - puntoActual[0]) * suave;
                    const nuevaLng = puntoActual[1] + (siguientePunto[1] - puntoActual[1]) * suave;
                    
                    const coordenadaIntermedia = [nuevaLat, nuevaLng];
                    
                    busMarker.setLatLng(coordenadaIntermedia);
                    lineaRastro.addLatLng(coordenadaIntermedia);

                    const iconoElemento = busMarker.getElement();
                    if (iconoElemento) {
                        iconoElemento.style.transform = `${iconoElemento.style.transform.split('rotate')[0]} rotate(${anguloCorregido}deg)`;
                    }
                    pasoActual++;
                    // La velocidad es un poco más dinámica
                    setTimeout(avanzarPaso, 30);
                } else {
                    currentIndex = siguienteIndex;
                    // Pausa breve en los puntos de parada (simula bajada de pasajeros)
                    setTimeout(iniciarSimulacionDemo, 1000);
                }
            }
            avanzarPaso();
        }