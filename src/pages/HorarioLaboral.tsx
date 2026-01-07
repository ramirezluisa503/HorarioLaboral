/*IMPORTACION DE LIBRERIAS*/
import React, { useState, useEffect } from 'react';
/*useState sirve para que el componente recuerde datos 
useEffect para ejecutar acciones automaticas como por ejemplo la del reloj que mostramos mas adelante*/

/*Exportamos la función HorarioLaboral para luego llamarla en el App.tsx ---------------------------------*/
export function HorarioLaboral() {
  /*creamos una variable que inicia con la hora actual y con la fecha exacta del sistema al cargar la pagina y la almacena*/
  const [horaActual, setHoraActual] = useState(new Date()); //Para almacenar la fecha y la hora del sistema
  const [cedula, setCedula] = useState(''); // Aqui se crea un estado para el campo del texto que inicialmenrte esta vacio, cada número que el usuario escriba de guarda aqui.

  /*Creamos un array tipo lista que esta vacia al inicio para ir guardando las cedulas que vayan ingresando los usuarios */
  const [usuariosActivos, setUsuariosActivos] = useState([]);

  /*Creamos una funcion que guarda el estado del mensaje de error o exito  */
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  /*RELOJ ----------------------------------------------------------------------------------------------*/
  useEffect(() => {
    /*Aqui implementamo una funcion para que el reloj se mueva, se crea un intervalo cada 1000 milisegundos y luego actualiza la variable horaActual con la nueva hora */
    const timer = setInterval(() => setHoraActual(new Date()), 1000);
    /*Si el usuario cierra la pestaña se detiene el reloj para que no se consuma memoria innesesariamente */
    return () => clearInterval(timer);
  }, []); //los corchetes nos indican que este efecto solo debe activarse una vez al cargar la pagina.

  /*CONTROL DE JORNADA LABORAL */
  //Empezamos creando una funcion que recibe el texto y un tipo y lo muestra
  const mostrarMensaje = (texto, tipo) => {
    setMensaje({ texto, tipo });
    //Usamos el setTimeout para borrar automaticamente lo anterior pasados 3 segundo o pues en este caso de ven 3000 milisegundos
    setTimeout(() => setMensaje({ texto: '', tipo: '' }), 3000); //El mensaje desaparece cada 3 segundos
  };

  /*INGRESO DEL TRABAJADOR--------------------------------------------------------------------------*/
  /*Creamos la funcion del ingreso del trabajador que se va a ejecutar al dar click en el boton Marcar Ingreso */
  const manejarIngreso = () => {
    /*Se crea una condicion para verificar si el input que es la cajita en la que se ingresa los datos esta vacia */
    if (!cedula.trim())
      return mostrarMensaje('Por favor, ingrese su cédula', 'error');

    /*Validamos que un trabajador no entre dos veces sin salir*/
    /*Aqui revisamos si la cedula y existe en la lista usuariosActivos que creamos en la parte superior  */
    if (usuariosActivos.includes(cedula)) {
      mostrarMensaje('Esta cédula ya tiene un ingreso activo.', 'error');
    } else {
      /*Si la cedula no existe se añade a la lista de usuariosActivos */
      setUsuariosActivos([...usuariosActivos, cedula]);
      mostrarMensaje('Ingreso registrado con éxito', 'exito');
      setCedula('');
    }
  };

  /*SALIDA DE TRABAJADOR---------------------------------------------------------------------------------*/
  /*Funcion que se ejecuta al dar click en Marcar Salida y verifica con la codicion que el usuario ya alla ingresado*/
  const manejarSalida = () => {
    if (!cedula.trim())
      return mostrarMensaje('Por favor, ingrese su cédula', 'error');

    if (!usuariosActivos.includes(cedula)) {
      mostrarMensaje(
        'No se encontró un ingreso previo para esta cédula.',
        'error'
      );
    } else {
      const nuevoArray = usuariosActivos.filter((item) => item !== cedula); //Filtramos y eliminamos la cedula, al salir se borra la cedula del sistema y luego se actualiza la lista si el dato que se elimino.
      setUsuariosActivos(nuevoArray);
      mostrarMensaje('Salida registrada con éxito', 'exito');
      setCedula('');
    }
  };

  /*INTERFAZ ----------------------------------------------------------------------------------------- */
  return (
    <div className="min-h-screen w-full bg-blue-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-2 sm:p-4 md:p-10 rounded-2xl shadow-xl w-full max-w-[95%] md:max-w-2xl transition-all">
        <h1 className="text-xl md:text-3xl font-extrabold text-blue-900 mb-2 text-center">
          Control de Jornada
        </h1>

        {/* Reloj */}
        <div className="flex flex-col items-center mb-8">
          <span className="text-4xl md:text-5xl font-mono font-bold text-blue-600">
            {/* Transformamos el objeto de flecha complejo en un formato de texto simple */}
            {horaActual.toLocaleTimeString()}
          </span>
          <span className="text-sm text-blue-400 uppercase tracking-widest font-medium mt-1">
            {/* Mostramos la fecha larga en español  */}
            {horaActual.toLocaleDateString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </span>
        </div>

        {/* Notificación visual */}
        {/* Utilizamos el operador ternario */}
        {mensaje.texto && (
          <div
            className={`mb-6 p-3 rounded-lg text-center text-sm font-bold transition-all ${
              mensaje.tipo === 'error'
                ? 'bg-red-100 text-red-600 border border-red-200'
                : 'bg-green-100 text-green-600 border border-green-200'
            }`}
          >
            {mensaje.tipo === 'error' ? '⚠️ ' : '✅ '}
            {mensaje.texto}
          </div>
        )}

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#3B82F6] ml-1">
              Cédula de Identidad
            </label>
            <input
              className="text-lg border-2 border-blue-100 rounded-xl p-4 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all"
              placeholder="Ej: 123456"
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
            {/* El onChange captura cada letra que el usuario presiona y la guarda en el estado de cedula */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={manejarIngreso}
              className="bg-blue-600 hover:bg-blue-700 text-[#3B82F6] font-bold py-4 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-blue-200"
            >
              Marcar Ingreso
            </button>

            <button
              onClick={manejarSalida}
              className="bg-white border-2 border-blue-600 text-[#3B82F6] hover:bg-blue-50 font-bold py-4 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-blue-200"
            >
              Marcar Salida
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          <span>
            Personal en planta:{' '}
            <span className="text-blue-600 font-bold">
              {/* El .length nos cuenta cuantos elementos hay en la lista usuariosActivos y muestra el numero total de trabajadores ingresados  */}
              {usuariosActivos.length}
            </span>
          </span>
          <span className="hidden md:block text-xs">@2026</span>
        </div>
      </div>
    </div>
  );
}
