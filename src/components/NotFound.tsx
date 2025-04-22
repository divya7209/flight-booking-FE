import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        marginTop: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 25,
        fontWeight: 700,
      }}
    >
      <p className="text-white">Page not found</p>
      <button
        data-testid="return"
        onClick={() => navigate("/")}
        className="border !border-1 border-white px-4 rounded-lg text-white"
      >
        go home
      </button>
    </div>
  );
};

export default NotFound;
