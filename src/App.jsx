import React, { useState } from 'react';
import Title from './components/Title';
import Card from './components/Card';
import Case from './components/Case';





export default function App() {
  const [name, setName] = useState('PPLG'); 

  return (
    <Case>
      <div className="bg-gradient-to-r from-gray-800 via-gray-700 via-gray-600 to-gray-900 flex items-center justify-center min-h-screen">
        <div className="bg-gray-900 border-t border-gray-600 shadow-xl rounded-lg max-w-lg w-full p-6 mb-4 text-center transition-transform transform hover:scale-105">
          <Title name="Ikiewww" page="Home" lang="ReactJS" /> 
          <h4 className="text-white text-2xl mb-4">Halo {name}</h4>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Sebuah pustaka JavaScript untuk membangun antarmuka pengguna
          </p>
          <div className="bg-gray-800 border-t border-gray-500 shadow-lg rounded-lg max-w-lg w-full p-6 mt-4 text-center transition-transform transform hover:scale-105">
            <Card judul="INVENTARIS" content="MERAIH gelar S.KOM" />
            <p className="text-lg text-gray-300 leading-relaxed mt-4">Bismillah</p>
          </div>
        </div>
      </div>
      
    </Case>
    
  );
  
}
