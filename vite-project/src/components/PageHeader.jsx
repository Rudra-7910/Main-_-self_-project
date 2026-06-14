function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h1 className="font-bold text-3xl">{title}</h1>
      {subtitle && <p className="mt-1 text-slate-500">{subtitle}</p>}
    </div>
  )
}
export default PageHeader