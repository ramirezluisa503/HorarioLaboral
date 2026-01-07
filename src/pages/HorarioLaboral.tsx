import React, { useState, useEffect } from 'react';

export function HorarioLaboral() {
  const [horaActual, setHoraActual] = useState(new Date());
  const [cedula, setCedula] = useState("");
  
  const [usuariosActivos, setUsuariosActivos] = useState([]);
  

  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  useEffect(() => {
    const timer = setInterval(() => setHoraActual(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const mostrarMensaje = (texto, tipo) => {
    setMensaje({ texto, tipo });
    
    setTimeout(() => setMensaje({ texto: "", tipo: "" }), 3000);
  };

  const manejarIngreso = () => {
    if (!cedula.trim()) return mostrarMensaje("Por favor, ingrese su cédula", "error");

    
    if (usuariosActivos.includes(cedula)) {
      mostrarMensaje("Esta cédula ya tiene un ingreso activo.", "error");
    } else {
      
      setUsuariosActivos([...usuariosActivos, cedula]);
      mostrarMensaje("Ingreso registrado con éxito", "exito");
      setCedula(""); 
    }
  };

  const manejarSalida = () => {
    if (!cedula.trim()) return mostrarMensaje("Por favor, ingrese su cédula", "error");

   
    if (!usuariosActivos.includes(cedula)) {
      mostrarMensaje("No se encontró un ingreso previo para esta cédula.", "error");
    } else {
      
      const nuevoArray = usuariosActivos.filter(item => item !== cedula);
      setUsuariosActivos(nuevoArray);
      mostrarMensaje("Salida registrada con éxito", "exito");
      setCedula(""); 
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-sm md:max-w-2xl transition-all">
        
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-900 mb-2 text-center">
          Control de Jornada
        </h1>

        {/* Reloj */}
        <div className="flex flex-col items-center mb-8">
          <span className="text-4xl md:text-5xl font-mono font-bold text-blue-600">
            {horaActual.toLocaleTimeString()}
          </span>
          <span className="text-sm text-blue-400 uppercase tracking-widest font-medium mt-1">
            {horaActual.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
          </span>
        </div>

        {/* Notificación visual */}
        {mensaje.texto && (
          <div className={`mb-6 p-3 rounded-lg text-center text-sm font-bold transition-all ${
            mensaje.tipo === "error" ? "bg-red-100 text-red-600 border border-red-200" : "bg-green-100 text-green-600 border border-green-200"
          }`}>
            {mensaje.tipo === "error" ? "⚠️ " : "✅ "}{mensaje.texto}
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
            Personal en planta: <span className="text-blue-600 font-bold">{usuariosActivos.length}</span>
          </span>
          <span className="hidden md:block text-xs">@2026</span>
        </div>
      </div>
    </div>
  );
}