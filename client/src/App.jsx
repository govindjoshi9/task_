import "./App.css";
import MenuList from "./components/MenuList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Cafe Menu Manager</h1>
        </div>
      </header>
      <main>
        <MenuList />
      </main>
    </div>
  );
}

export default App;
