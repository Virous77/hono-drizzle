const fetchMessage = async () => {
  const res = await fetch("http://localhost:3000/api/todo");
  const data = await res.json();
  return data;
};

const HomePage = async () => {
  const message = await fetchMessage();

  console.log(message);

  return <div>HomePage</div>;
};

export default HomePage;
