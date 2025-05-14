import { useParams } from 'react-router-dom';

export default function SinglePost() {
 const { slug } = useParams();
 return <h1>med: {slug}</h1>
}
