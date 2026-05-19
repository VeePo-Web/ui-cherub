const ComingSoon = () => (
  <div
    style={{ background: "hsl(270 60% 11%)" }}
    className="min-h-screen flex items-center justify-center"
  >
    <p
      style={{ color: "hsl(0 0% 100%)", fontFamily: "sans-serif" }}
      className="text-2xl tracking-widest uppercase"
    >
      Coming Soon...
    </p>
  </div>
);

const App = () => <ComingSoon />;

export default App;
