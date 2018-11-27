let token = null

const blogs = 
[
    {
      "title": "Maastopyörä",
      "id": "5bacd37f4fedd0055cedf9fc",
      "author": "Masa",
      "url": "www.google.fi",
      "likes": 20,
      "user": {
        "_id": "5bacd3544fedd0055cedf9fb",
        "username": "Karppa",
        "name": "Kari"
      }
    },
    {
      "title": "Äänestysnappi",
      "id": "5bacd3d84fedd0055cedf9fd",
      "author": "Häiriö",
      "url": "www",
      "likes": 12,
      "user": {
        "_id": "5bacd3544fedd0055cedf9fb",
        "username": "Karppa",
        "name": "Kari"
      }
    },
    {
      "title": "Tulekoo",
      "id": "5bb4f645dfc8bb04f273a0d8",
      "author": "Minä",
      "url": "www",
      "likes": 4,
      "user": {
        "_id": "5bacd3544fedd0055cedf9fb",
        "username": "Karppa",
        "name": "Kari"
      }
    }
]
const getAll = () => {
    return Promise.resolve(blogs)
}
export default { getAll, blogs }