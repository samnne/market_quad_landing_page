
export default function Section({ title, children }) {
  return <div className="mb-6">
    <h2 className="text-xl font-semibold mb-2 text-text">{title}</h2>
    <div className="space-y-2 text-text/90">{children}</div>
  </div>
};
