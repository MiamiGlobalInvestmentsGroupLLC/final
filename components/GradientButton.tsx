export default function GradientButton({children, href, onClick}:{children: React.ReactNode, href?:string, onClick?:()=>void}){
  const btn = (
    <button onClick={onClick} className="px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95">
      {children}
    </button>
  );
  if (href) return <a href={href}>{btn}</a>;
  return btn;
}
