export const getBook = async (book) => {

    const url= `https://www.googleapis.com/books/v1/volumes/${book}`

    const x = await fetch(url)

    return await x.json()

}