import React, { useState } from "react";

function BookList() {
  const [books, setBooks] = useState([
    { id: 1, title: "Book 1", author: "Author 1" },
    { id: 2, title: "Book 2", author: "Author 2" },
    { id: 3, title: "Book 3", author: "Author 3" },
  ]);
  const [editingBook, setEditingBook] = useState(null);

  const [newBook, setNewBook] = useState({ title: "", author: "" });
  const [editBook, setEditBook] = useState({ id: null, title: "", author: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setNewBook({ ...newBook, [name]: value });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;

    setEditBook({ ...editBook, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const id = books.length + 1;

    setBooks([...books, { id, ...newBook }]);
    setNewBook({ title: "", author: "" });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const updatedBook = { title: editBook.title, author: editBook.author };
    handleEdit(editBook.id, updatedBook);
    setEditingBook(null);
    setEditBook({ id: null, title: "", author: "" });
  };

  const handleEdit = (id, updatedBook) => {
    const updatedBooks = books.map((book) =>
      book.id === id ? { ...book, ...updatedBook } : book
    );

    setBooks(updatedBooks);
  };

  const handleDelete = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);

    setBooks(updatedBooks);
  };

  return (
    <div>
      <div className="book-list">
        <h1 className=" text-2xl font-semibold">Book List</h1>

        <form onSubmit={handleFormSubmit} className="mt-3">
          <label for="title" className="text-lg font-semibold">
            Title:
          </label>
          <input
            className="mt-2 bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border"
            type="text"
            name="title"
            id="title"
            value={newBook.title}
            onChange={handleInputChange}
            placeholder="Title"
          />
          <br />
          <label for="author" className="text-lg font-semibold">
            Author:
          </label>
          <input
            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
            type="text"
            name="author"
            id="author"
            value={newBook.author}
            onChange={handleInputChange}
            placeholder="Author"
          />

          <button className="bg-blue-400 mt-4" type="submit">
            Add Book
          </button>
        </form>

        <table className="mt-6">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>
                  {editingBook === book.id ? (
                    <input
                      type="text"
                      name="title"
                      value={editBook.title}
                      onChange={handleEditInputChange}
                    />
                  ) : (
                    book.title
                  )}
                </td>
                <td>
                  {editingBook === book.id ? (
                    <input
                      type="text"
                      name="author"
                      value={editBook.author}
                      onChange={handleEditInputChange}
                    />
                  ) : (
                    book.author
                  )}
                </td>
                <td>
                  {editingBook === book.id ? (
                    <>
                      <button
                        className="bg-blue-400 p-2 rounded-sm text-white mr-2"
                        onClick={handleEditFormSubmit}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-400 p-2 rounded-sm text-white"
                        onClick={() => setEditingBook(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-blue-400 p-2 rounded-sm text-white mr-2"
                        onClick={() => setEditingBook(book.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-400 p-2 rounded-sm text-white"
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingBook !== null && (
          <form onSubmit={handleEditFormSubmit} className="mt-3">
            <label className="text-lg font-semibold">Edit Title:</label>
            <input
              className="mt-2 bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border"
              type="text"
              name="title"
              value={editBook.title}
              onChange={handleEditInputChange}
            />
            <br />
            <label className="text-lg font-semibold">Edit Author:</label>
            <input
              className="mt-2 bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border"
              type="text"
              name="author"
              value={editBook.author}
              onChange={handleEditInputChange}
            />
            <button className="bg-blue-400 mt-4" type="submit">
              Save
            </button>
            <button
              className="bg-gray-400 p-2 rounded-sm text-white ml-2"
              onClick={() => setEditingBook(null)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default BookList;
