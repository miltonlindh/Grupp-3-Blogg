// src/bloggData.js
import { client } from "./sanity";

// Alla publicerade poster (titel, slug + bild‑URL)
export function getAllPosts() {
  return client.fetch(`*[_type == "post"]|order(_createdAt desc){
    _id,
    title,
    slug,
    mainImage{asset->{url}}
  }`);
}

// En post via slug
export function getPostBySlug(slug) {
  return client.fetch(`*[_type == "post" && slug.current == $slug][0]{
    title,
    body,
    mainImage{asset->{url}}
  }`, { slug });
}

// Poster i en kategori
export function getPostsByCategory(name) {
  return client.fetch(`*[_type == "post" && references(*[_type == "category" && title == $name]._id)]{
    title,
    slug,
    mainImage{asset->{url}}
  }`, { name });
}