export default function WriteNav() {
  return (
    <nav className="container mx-auto h-12 flex items-center justify-between">
      <div>Logo</div>
      <div className="flex items-center gap-2">
        <button>Publish</button>
        <div>Profile</div>
      </div>
    </nav>
  );
}
