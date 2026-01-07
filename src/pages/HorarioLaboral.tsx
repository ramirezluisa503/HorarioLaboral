import React from 'react';

export function HorarioLaboral() {
  return (
    <div className="h-auto w-auto bg-blue-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-sm md:max-w-2xl transition-all">
        <h1 className="text-2xl md:text-xl font-extrabold text-blue-900 mb-8 text-center">
          Control de Jornada
        </h1>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#3B82F6] ml-1 ">
              Código de Empleado
            </label>
            <input
              className="text-lg border-2 border-blue-100 rounded-xl p-4 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all"
              placeholder="Ingrese su identificación"
              type="text"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-[#3B82F6] font-bold py-4 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-blue-200">
              Marcar Ingreso
            </button>

            <button className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-4 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-blue-200">
              Marcar Salida
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          <span>
            Estado: <span className="text-blue-600 font-medium">En espera</span>
          </span>
          <span className="hidden md:block">@2026</span>
        </div>
      </div>
    </div>
  );
}
