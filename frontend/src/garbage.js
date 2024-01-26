<button
onClick={() => {
  localStorage.clear("token");
  navigate("/login");
}}
></button>