import React, { useState, useEffect } from 'react';
import { RefreshCw, Copy, Trash2, Scale } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const units = {
  length: {
    meters: 1,
    kilometers: 0.001,
    centimeters: 100,
    millimeters: 1000,
    inches: 39.3701,
    feet: 3.28084,
    yards: 1.09361,
    miles: 0.000621371
  },
  weight: {
    grams: 1,
    kilograms: 0.001,
    milligrams: 1000,
    pounds: 0.00220462,
    ounces: 0.035274
  },
  temperature: {
    celsius: (v) => v,
    fahrenheit: (v) => (v * 9/5) + 32,
    kelvin: (v) => v + 273.15
  },
  area: {
    'sq meters': 1,
    'sq kilometers': 0.000001,
    'sq feet': 10.7639,
    'sq yards': 1.19599,
    acres: 0.000247105,
    hectares: 0.0001
  }
};

const UnitConverter = () => {
  const [category, setCategory] = useState('length');
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('meters');
  const [results, setResults] = useState({});

  useEffect(() => {
    // Reset units when category changes
    const availableUnits = Object.keys(units[category]);
    setFromUnit(availableUnits[0]);
  }, [category]);

  useEffect(() => {
    const convert = () => {
      const currentCategoryUnits = units[category];
      const newResults = {};

      if (category === 'temperature') {
        const baseCelsius = fromUnit === 'celsius' ? value 
          : fromUnit === 'fahrenheit' ? (value - 32) * 5/9 
          : value - 273.15;
        
        Object.keys(currentCategoryUnits).forEach(unit => {
          newResults[unit] = currentCategoryUnits[unit](baseCelsius);
        });
      } else {
        const baseValue = value / currentCategoryUnits[fromUnit];
        Object.keys(currentCategoryUnits).forEach(unit => {
          newResults[unit] = baseValue * currentCategoryUnits[unit];
        });
      }
      setResults(newResults);
    };

    convert();
  }, [category, value, fromUnit]);

  const handleCopy = (val, unit) => {
    navigator.clipboard.writeText(val.toString());
    toast.success(`${unit} value copied!`);
  };

  return (
    <ToolLayout
      title="Universal Unit Converter"
      description="Convert between length, weight, temperature, and area units with high precision. Essential utility for developers, students, and professionals."
      keywords="unit converter, length conversion, temperature converter, metric to imperial, weight converter"
      icon={RefreshCw}
      category="Utility"
      extendedContent={
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6">The Universal Language of Measurement</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Measurement is the language of science, engineering, and commerce. While the metric system (SI) is the global standard, many regions still rely on imperial units for day-to-day activities. Bridging the gap between these systems is crucial for international collaboration, accurate scientific research, and seamless digital engineering.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Metric vs. Imperial</h3>
              <p className="text-slate-600 leading-relaxed">
                The Metric system is based on powers of ten, making calculations and scaling remarkably simple. The Imperial system, while more complex in its ratios (e.g., 12 inches in a foot), is deeply rooted in human history and physical scales. Our converter ensures that you never have to memorize complex conversion factors again.
              </p>
            </section>

            <section className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Precision in Digital Engineering</h3>
              <p className="text-slate-600 leading-relaxed">
                In web development, we often convert between pixels, rems, and ems. While this tool focuses on physical units, the principle of precise conversion remains the same. Whether you're calculating server rack space in square feet or determining the weight limit for shipping logistics, precision is paramount.
              </p>
            </section>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-bold text-slate-700 capitalize"
            >
              {Object.keys(units).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Value</label>
            <input 
              type="number"
              value={value}
              onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-bold text-slate-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">From Unit</label>
            <select 
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-bold text-slate-700 capitalize"
            >
              {Object.keys(units[category]).map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(results).map(([unit, val]) => (
            <div 
              key={unit}
              className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-teal-200 transition-all cursor-pointer relative"
              onClick={() => handleCopy(val, unit)}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{unit}</span>
                <Copy size={14} className="text-slate-300 group-hover:text-teal-600 transition-colors" />
              </div>
              <p className="text-xl font-mono font-bold text-slate-900 truncate">
                {typeof val === 'number' ? (val.toString().includes('.') ? val.toFixed(4).replace(/\.?0+$/, '') : val) : val}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
};

export default UnitConverter;
