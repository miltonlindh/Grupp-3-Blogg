import { client } from './sanity'

//hämtar alla inlägg
export function getAllPosts() {
    return client.fetch(`[_type == "post"]{title, slug}`);
}
//hämtar inlägg baserat på slug används på /post/:slug
export function getPostBySlug(slug) {
    return client.fetch(
        `[_type == "post" && slug.current == $slug][0]{title, body, mainImage}`,
        { slug }
    );
}
//hämtar inlägg i en viss kategori används på /category/:name
export function getPostsByCategory(name) {
    return client.fetch(
        `*[_type == "post" && category->title == $name]{title, slug}`,
        { name }
    )
}