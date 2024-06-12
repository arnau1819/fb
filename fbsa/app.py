import random

class Jugador:
    def __init__(self, nombre, posicion):
        self.nombre = nombre
        self.posicion = posicion

class FormacionFutbolSala:
    def __init__(self, alineacion):
        self.alineacion = alineacion
        self.jugadores = []

    def agregar_jugador(self, jugador):
        self.jugadores.append(jugador)

    def mostrar_formacion(self):
        print("Formación de Fútbol Sala:", self.alineacion)
        for i, jugador in enumerate(self.jugadores, start=1):
            print(f"{jugador.posicion}: {jugador.nombre}")

def generar_alineacion_aleatoria(alineacion):
    alineacion_aleatoria = alineacion.copy()
    random.shuffle(alineacion_aleatoria)
    return alineacion_aleatoria

def main():
    # Solicitar la alineación deseada con guiones
    alineacion_con_guiones = input("Ingrese la alineación deseada con guiones (por ejemplo, '1-2-1-1' o '2-2'): ")

    # Dividir la alineación en una lista de números
    alineacion = alineacion_con_guiones.split("-")

    # Crear la formación de acuerdo a la alineación ingresada
    formacion = FormacionFutbolSala('-'.join(alineacion))

    # Solicitar nombres y posiciones de los jugadores
    posicion_indices = {'1': 'Portero', '2': 'Defensa', '3': 'Centrocampista', '4': 'Delantero'}
    for posicion, cantidad in enumerate(alineacion, start=1):
        for _ in range(int(cantidad)):
            nombre = input(f"Ingrese el nombre del {posicion_indices[str(posicion)]}: ")
            jugador = Jugador(nombre, posicion_indices[str(posicion)])
            formacion.agregar_jugador(jugador)

    # Preguntar al usuario si desea generar aleatoriamente la alineación
    opcion = input("¿Desea generar aleatoriamente la alineación? Ingrese 's' para sí, cualquier otra tecla para no: ")
    if opcion.lower().startswith('s'):
        alineacion = generar_alineacion_aleatoria(alineacion)
        formacion = FormacionFutbolSala('-'.join(alineacion))  # Corrección aquí

    # Mostrar formación
    formacion.mostrar_formacion()

if __name__ == "__main__":
    main()
