import { Link, useLocation } from 'react-router-dom'


function useQuery(){
const { search } = useLocation()
return new URLSearchParams(search)
}


export default function NoResults(){
const q = useQuery().get('q') || ''
return (
<div className="card" style={{padding:24}}>
<h2 className="title">Sonuç bulunamadı</h2>
<p><em>“{q}”</em> için bir kayıt bulunamadı.</p>
<div className="sub">Daha iyi bir arama için başa dönün.</div>
<div style={{marginTop:14}}>
<Link className="btn" to="/">Anasayfaya dön</Link>
</div>
</div>
)
}