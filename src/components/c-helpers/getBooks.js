const API_KEY='AIzaSyDFp1Hf1Y3Z5Tn0KlhmNiiVGo-4nTf0zSM'

export const getBooks = async (libro) => {

    const url=`https://www.googleapis.com/books/v1/volumes?q=${libro}&download=epub&key=${API_KEY}`
    const x = await fetch(url)

    return x.json()
}