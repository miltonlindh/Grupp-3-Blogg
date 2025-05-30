# Grupp 3-Blog

##Funktioner
- Visar alla blogginlägg på startsidan
- visa inlägg per kategori
- visa ensklida inlägg med bild och innehåll
- Adminpanel för:
  - Logga in
  - Skapa nytt inlägg
  - redigera befintliga inlägg
  - ta bort inlägg
  - välja kategori för inlägg
## Tekniker
- **react** för frontend
- **React Router** för navigering
- **Sanity** för headless cms
- **@sanity/client** för att hämta och skicka data
- **Cypress** för tester

## Installation
```bash
   git clone https://github.com/miltonlindh/Grupp-3-Blogg.git
   cd Grupp-3-Blogg
   npm install
   npm run dev
```
## Lösenhord för Admin panelen
```
hemligt
```
## Kodexempel
### Hämta alla blogginlägg, BloggData.js
```js
export function getAllPosts() {
  return client.fetch(`*[_type == "post"]|order(_createdAt desc){
    _id, title, slug, mainImage{asset->{url}}
  }`);
}
```
### Rendera inlägg på Home.jsx
```js
useEffect(() => {
  getAllPosts()
    .then((data) => setPosts(data))
    .finally(() => setLoading(false));
}, []);
```
### Skapa inlägg i Admin.jsx
```js
const newPost = {
  _type: 'post',
  title: newTitle,
  slug: { _type: 'slug', current: newSlug },
  categories: selectedCategoryId ? [{
    _type: 'reference', _ref: selectedCategoryId
  }] : []
};

client.create(newPost)
```

