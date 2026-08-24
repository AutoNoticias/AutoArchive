const fs = require('fs');
const file = 'src/components/DocumentalesPage.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace Control Bar and Main Catalog View
const sectionRegex = /\{\/\* Control Bar: Search & Interactive Filters[\s\S]*?\{\/\* Footer \*\//;
const newSection = `{/* Control Bar: Search & Interactive Filters */}
      <section className="relative z-30 px-4 sm:px-12 md:px-28 py-4 bg-[#070e17] border-b border-[#4ea0ff]/10">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Buscar documental..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 text-xs text-white placeholder-[#5c7a99] focus:outline-none focus:border-white/30 transition-colors rounded-full"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm opacity-50">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Simple Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <div className="flex bg-white/5 rounded-full p-1 border border-white/5">
              <button
                onClick={() => setCountryFilter('all')}
                className={\`px-4 py-1.5 text-[11px] rounded-full transition-colors \${
                  countryFilter === 'all' ? 'bg-white text-black font-bold' : 'text-white/60 hover:text-white'
                }\`}
              >
                TODOS
              </button>
              <button
                onClick={() => setCountryFilter('japon')}
                className={\`px-4 py-1.5 text-[11px] rounded-full transition-colors \${
                  countryFilter === 'japon' ? 'bg-[#e62628] text-white font-bold' : 'text-white/60 hover:text-white'
                }\`}
              >
                JAPÓN
              </button>
              <button
                onClick={() => setCountryFilter('italia')}
                className={\`px-4 py-1.5 text-[11px] rounded-full transition-colors \${
                  countryFilter === 'italia' ? 'bg-[#ffd451] text-black font-bold' : 'text-white/60 hover:text-white'
                }\`}
              >
                ITALIA
              </button>
              <button
                onClick={() => setCountryFilter('uk')}
                className={\`px-4 py-1.5 text-[11px] rounded-full transition-colors \${
                  countryFilter === 'uk' ? 'bg-[#72b9ff] text-black font-bold' : 'text-white/60 hover:text-white'
                }\`}
              >
                UK
              </button>
              <button
                onClick={() => setCountryFilter('usa')}
                className={\`px-4 py-1.5 text-[11px] rounded-full transition-colors \${
                  countryFilter === 'usa' ? 'bg-[#ff5500] text-black font-bold' : 'text-white/60 hover:text-white'
                }\`}
              >
                USA
              </button>
            </div>
            
            <div className="hidden sm:flex bg-white/5 rounded-full p-1 border border-white/5">
              <button
                onClick={() => setEraFilter('all')}
                className={\`px-4 py-1.5 text-[11px] rounded-full transition-colors \${
                  eraFilter === 'all' ? 'bg-white text-black font-bold' : 'text-white/60 hover:text-white'
                }\`}
              >
                ÉPOCA: TODAS
              </button>
              <button
                onClick={() => setEraFilter('60s')}
                className={\`px-3 py-1.5 text-[11px] rounded-full transition-colors \${
                  eraFilter === '60s' ? 'bg-white text-black font-bold' : 'text-white/60 hover:text-white'
                }\`}
              >
                60s
              </button>
              <button
                onClick={() => setEraFilter('70s')}
                className={\`px-3 py-1.5 text-[11px] rounded-full transition-colors \${
                  eraFilter === '70s' ? 'bg-white text-black font-bold' : 'text-white/60 hover:text-white'
                }\`}
              >
                70s
              </button>
              <button
                onClick={() => setEraFilter('80s')}
                className={\`px-3 py-1.5 text-[11px] rounded-full transition-colors \${
                  eraFilter === '80s' ? 'bg-white text-black font-bold' : 'text-white/60 hover:text-white'
                }\`}
              >
                80s
              </button>
              <button
                onClick={() => setEraFilter('90s')}
                className={\`px-3 py-1.5 text-[11px] rounded-full transition-colors \${
                  eraFilter === '90s' ? 'bg-white text-black font-bold' : 'text-white/60 hover:text-white'
                }\`}
              >
                90s
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog View */}
      <main className="flex-1 px-4 sm:px-12 md:px-28 py-10 bg-[#070e17]">
        {filteredDocs.length === 0 ? (
          <div className="p-12 text-center border border-white/10 bg-white/5 rounded-2xl">
            <span className="text-3xl opacity-50">🔍</span>
            <h3 className="mt-4 text-lg font-bold text-white">No se encontraron resultados</h3>
            <p className="mt-2 text-sm text-white/50">Intenta modificar los filtros o el término de búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDocs.map((doc, idx) => (
              <motion.div
                key={doc.id}
                id={\`doc-card-\${doc.id}\`}
                onClick={() => onNavigate(doc.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group relative aspect-[4/5] sm:aspect-[16/10] xl:aspect-[4/5] overflow-hidden bg-[#0d1d2e] rounded-2xl cursor-pointer shadow-2xl"
              >
                {/* Background Image */}
                <img
                  src={doc.image}
                  alt={doc.imageAlt}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Gradient Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                {/* Top Tags */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span
                    className="px-2.5 py-1 text-[9px] uppercase font-bold tracking-widest rounded-full backdrop-blur-md"
                    style={{
                      backgroundColor: \`\${doc.badgeColor}40\`,
                      color: '#fff',
                      border: \`1px solid \${doc.badgeColor}80\`
                    }}
                  >
                    {doc.badge}
                  </span>
                </div>
                
                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-2 opacity-80">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-white/70">
                      {doc.origin}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: doc.accentColor }}>
                      {doc.years}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-[1.1] text-white group-hover:text-white transition-colors">
                    {doc.title}{' '}
                    <span style={{ color: doc.accentColor }}>
                      {doc.titleAccent}
                    </span>
                  </h2>
                  
                  <p className="mt-2 text-sm text-white/70 line-clamp-2 leading-relaxed">
                    {doc.description}
                  </p>
                  
                  {/* Footer Stats */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex gap-4">
                      <div>
                        <span className="block text-[9px] text-white/50 uppercase tracking-widest mb-0.5">Motor</span>
                        <span className="text-[11px] font-mono text-white/90">{doc.engine.split(' ')[0]} {doc.engine.split(' ')[1]}</span>
                      </div>
                      <div className="hidden sm:block">
                        <span className="block text-[9px] text-white/50 uppercase tracking-widest mb-0.5">Potencia</span>
                        <span className="text-[11px] font-mono text-white/90">{doc.power.split(' ')[0]} {doc.power.split(' ')[1]}</span>
                      </div>
                    </div>
                    
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-white group-hover:text-black transition-colors backdrop-blur-md">
                      <span className="ml-1 text-sm">▶</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}`;

code = code.replace(sectionRegex, newSection);
fs.writeFileSync(file, code);
