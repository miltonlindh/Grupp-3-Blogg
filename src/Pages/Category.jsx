import { useParams } from 'react-router-dom';

export default function Category() {
    const { name } = useParams();
    return <h1>Kategori: {name}</h1>
}

