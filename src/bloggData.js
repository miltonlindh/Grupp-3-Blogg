// src/bloggData.js
import { client } from "./sanity";

//hämtar alla poster nyaste först
export function getAllPosts() {
  return client.fetch(`*[_type == "post"]|order(_createdAt desc){
    _id,
    title,
    slug,
    mainImage{asset->{url}}
  }`);
}

//hämtar en specifik post via dens slug
export function getPostBySlug(slug) {
  return client.fetch(`*[_type == "post" && slug.current == $slug][0]{
    title,
    body,
    mainImage{asset->{url}}
  }`, { slug });
}

//hämtar alla posts som tillhör en viss kategori
export function getPostsByCategory(name) {
  return client.fetch(`*[_type == "post" && references(*[_type == "category" && title == $name]._id)]{
    title,
    slug,
    mainImage{asset->{url}}
  }`, { name });
}