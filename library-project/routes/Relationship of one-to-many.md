Relationship of one-to-many
// book1
{
  title: 'Philosipher stone',
  authorId: 1 //Foreign key
 
}

// book2
{
  title: 'Chamber of secrets',
  authorId: 1 //Foreign key
}

//author 
{
  _id: 1, //Primary key
  name: 'J.K. Rolling',
  image: 'img.jpg',
  bio: 'borned in the UK'
}


//Relationship of many-to-many
// book1
{
  title: 'Philosipher stone',
  authorId: [1, 2, 3] //Foreign key
 
}

//book_author
{
  bookid: 1 1 1 2
  authorid: 2 2 3 3
}

//Relationship using embed documents
// book1
{
  title: 'Philosipher stone',
  reviews: [{
    name: 'Bad Place',
    image: 'img.jpg',
    author: 'miguel'
  },
  {
    name: 'Good Place',
    image: 'img3.jpg',
    author: 'lucia'
  }
  ]
}


