export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Yang Zhenzhao</h1>
        <p className="text-xl mb-4">AI Engineer & Full-Stack Developer</p>
        <p className="text-lg mb-8">Computer Engineering student at NUS specializing in AI/ML, full-stack development, and innovative tech solutions.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">SentinelAI</h3>
                <p className="text-slate-300">Cloud-based AI surveillance system</p>
                <a href="https://github.com/Path-yang/SentinelAI" className="text-blue-400 hover:underline">GitHub</a>
              </div>
              <div>
                <h3 className="text-lg font-medium">SilverSigma</h3>
                <p className="text-slate-300">Database management platform</p>
                <a href="https://github.com/Path-yang/SilverSigma" className="text-blue-400 hover:underline">GitHub</a>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-slate-300 mb-2">Email: robertyzz02@gmail.com</p>
            <p className="text-slate-300 mb-2">Phone: +65 9359 8155</p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/zhenzhao-yang-6b30b2165" className="text-blue-400 hover:underline">LinkedIn</a>
              <a href="https://github.com/Zhenzha0" className="text-blue-400 hover:underline">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

