import React from 'react';

const Sidebar = ({ routes, onSelectRoute, selectedRoute }) => {
    return (
        <div className="w-80 h-full bg-urban-panel border-r border-gray-700 flex flex-col shadow-xl z-[1000] relative">
            <div className="p-6 border-b border-gray-700 bg-urban-dark">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    UrbanFlow
                </h1>
                <p className="text-gray-400 text-sm mt-1">Live Transit Tracking</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Active Routes</h2>
                <div className="space-y-2">
                    {routes.map(route => (
                        <button
                            key={route.id}
                            onClick={() => onSelectRoute(route)}
                            className={`w-full p-4 rounded-lg flex items-center space-x-3 transition-all duration-200 ${selectedRoute?.id === route.id
                                    ? 'bg-urban-accent text-white shadow-lg transform scale-[1.02]'
                                    : 'bg-[#2a2a2a] hover:bg-[#333] text-gray-300'
                                }`}
                        >
                            <div
                                className="w-3 h-12 rounded-full"
                                style={{ backgroundColor: route.color }}
                            />
                            <div className="text-left">
                                <div className="font-bold text-lg">{route.name}</div>
                                <div className="text-xs opacity-75">Active</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t border-gray-700 text-center text-xs text-gray-500">
                &copy; 2026 UrbanFlow Inc.
            </div>
        </div>
    );
};

export default Sidebar;
