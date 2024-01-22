import { redirect } from 'next/navigation'

const App = () => {
  return <div>
      {redirect("/home")}
  </div>
};

export default App;